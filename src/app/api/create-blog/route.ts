// api/create-blog/route.ts
import { clerkClient } from "@clerk/express";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "~@/server/db";

// Define an interface for the expected Cloudinary upload result
interface CloudinaryUploadResult {
  secure_url: string;
  // Add other properties if you need them, e.g.:
  // public_id: string;
  // version: number;
  // signature: string;
  // width: number;
  // height: number;
  // format: string;
  // resource_type: string;
  // created_at: string;
  // bytes: number;
  // type: string;
  // etag: string;
  // url: string;
  // original_filename: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, error: "User not authenticated." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Internal user not found." },
        { status: 404 }
      );
    }

    const role = user.role;
    if (role !== "author") {
      return NextResponse.json(
        { success: false, error: "You are not authorized to create a blog!" },
        { status: 403 }
      );
    }

    const authorProfile = user.profile;

    if (!authorProfile) {
      return NextResponse.json(
        { success: false, error: "Author profile not found!" },
        { status: 404 }
      );
    }

    const formData = await request.formData();

    console.log("Received formData:", [...formData.entries()]);

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string | null;
    const file = formData.get("imageUrl") as File;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const tagsJson = formData.get("tags") as string;

    if (!title || !slug || !content || !categoryId || !tagsJson || !file) {
      return NextResponse.json(
        { success: false, error: "Missing required form fields." },
        { status: 400 }
      );
    }

    let tags: string[] = [];
    try {
      tags = JSON.parse(tagsJson);
      if (!Array.isArray(tags)) {
        throw new Error("Tags is not a valid array.");
      }
    } catch (parseError) {
      console.error("Failed to parse tags JSON:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid tags format." },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Cast the result to the defined interface
        const cloudinaryUploadResult = (await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                // Explicitly check if result is defined before resolving
                if (result !== undefined) {
                  resolve(result); // Now result is of type UploadApiResponse (which has secure_url)
                } else {
                  // This case should ideally not happen if there's no error,
                  // but it's good for type safety.
                  reject(
                    new Error(
                      "Cloudinary upload stream did not return a result."
                    )
                  );
                }
              }
            }
          );
          stream.end(buffer);
        })) as CloudinaryUploadResult; // Explicit cast here

        imageUrl = cloudinaryUploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            error: "Image upload failed.",
            details: String(uploadError),
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    console.log("Creating post with authorId (Clerk ID):", clerkUserId);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        imageUrl: imageUrl,
        content,
        authorId: clerkUserId,
        profileId: authorProfile.id,
        categoryId,
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { tagName: tag },
                create: { tagName: tag },
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error("Error in create blog API:", error);
    let errorMessage = "An unexpected error occurred.";
    let errorDetails = "No specific details available.";

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || error.toString();
    } else if (typeof error === "object" && error !== null) {
      try {
        errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
      } catch (stringifyError) {
        errorDetails = `Could not stringify error object: ${String(error)}`;
      }
    } else {
      errorDetails = String(error);
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
