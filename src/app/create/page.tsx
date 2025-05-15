// app/(blog)/create/page.tsx or wherever you're routing
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "~@/components/text-editor/rich-text-editor";
import { createPost } from "~@/server/actions"; // we'll write this next
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CreateBlogPage() {
  const router = useRouter();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editorRef = useRef<any>(null);
  const [formState, setFormState] = useState({ loading: false, error: null });
  const { user, isLoaded } = useUser();

  // 🚫 if user is not an author, redirect to home
  useEffect(() => {
    if (isLoaded) {
      const role = user?.publicMetadata?.role;
      if (role !== "author") {
        toast.warning("You do not have access for this action!");
        router.push("/");
      }
    }
  }, [user, isLoaded, router]);

  // ⛔ Don't render the form if user is not loaded or not author
  const role = user?.publicMetadata?.role;
  if (!isLoaded || role !== "author") return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // add TipTap content to FormData
    const editorContent = editorRef.current?.getHTML();
    formData.append("content", editorContent || "");

    setFormState({ loading: true, error: null });

    const result = await createPost(formData);

    if (result?.error) {
      setFormState({ loading: false, error: result.error });
    } else {
      router.push("/"); // or wherever you list posts
    }
  }

  const checkUserRole = async () => {
    const userRole = user;

    console.log(userRole);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="excerpt"
          placeholder="Excerpt"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          className="w-full p-2 border rounded"
        />
        {/* Rich Text Editor */}
        <RichTextEditor ref={editorRef} />

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          disabled={formState.loading}
        >
          {formState.loading ? "Publishing..." : "Publish Post"}
        </button>

        {formState.error && (
          <p className="text-red-500 text-sm">{formState.error}</p>
        )}
      </form>

      <button type="button" onClick={checkUserRole}>
        Check User Role
      </button>
    </div>
  );
}
