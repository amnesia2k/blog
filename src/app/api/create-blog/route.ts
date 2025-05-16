import { clerkClient } from "@clerk/express";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { prisma } from "~@/server/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User not authenticated." },
        { status: 401 }
      );
    }

    const user = await clerkClient.users.getUser(userId);
    const role = user.unsafeMetadata?.role;

    if (role !== "author") {
      return NextResponse.json(
        { success: false, error: "You are not authorized to create a blog!" },
        { status: 403 }
      );
    }

    // logic for getting formData
    const formData = await request.formData();

    console.log("Received formData:", [...formData.entries()]);

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string | null;
    const files = formData.getAll("imageUrl");
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const tagsJson = formData.get("tags") as string;
    const tags: string[] = JSON.parse(tagsJson);

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please upload an image." },
        { status: 400 }
      );
    }

    const res = await Promise.all(
      files.map(async (file) => {
        if (typeof file === "string") {
          throw new Error("Expected a file upload, but got a string.");
        }
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const imageUrl = res.map(
      (result) => (result as { secure_url: string }).secure_url
    );

    console.log("Creating post with authorId:", userId);

    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        imageUrl: imageUrl[0] ?? "",
        content,
        authorId: userId,
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
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
