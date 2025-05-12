// app/actions/post.ts
"use server";

import { prisma } from "./db"; // adjust based on your project structure
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string | null;
    const imageUrl = formData.get("imageUrl") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string | null;

    // You'll need to get authorId from the current session/auth context
    const authorId = "cmak1vqsn0002r3u8cm4uei3d"; // Replace this properly
    if (!authorId) throw new Error("Not authenticated");

    // 👇 Log the data being sent to Prisma
    console.log("Creating post with data:", {
      title,
      slug,
      excerpt,
      imageUrl,
      content,
      authorId,
      categoryId,
      published: true,
    });

    // const post = await prisma.post.create({
    //   data: {
    //     title,
    //     slug,
    //     excerpt,
    //     imageUrl,
    //     content,
    //     authorId,
    //     categoryId,
    //     published: true,
    //   },
    // });

    revalidatePath("/");
    // return { success: true, post };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (err: any) {
    console.error(err);
    return { error: err.message || "Something went wrong" };
  }
}
