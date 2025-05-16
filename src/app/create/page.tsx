"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Input } from "~@/components/ui/input";
import RichTextEditor from "~@/components/text-editor/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~@/components/ui/select";
import { Label } from "~@/components/ui/label";
import TagsInput from "~@/components/tags-input";

export default function CreateBlogPage() {
  const router = useRouter();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editorRef = useRef<any>(null);
  const [formState, setFormState] = useState({ loading: false, error: null });
  const { user, isLoaded } = useUser();

  // 🚫 Redirect non-authors
  useEffect(() => {
    if (isLoaded) {
      const role = user?.unsafeMetadata?.role;
      if (role !== "author") {
        toast.warning("You do not have access for this action!");
        router.push("/");
      }
    }
  }, [user, isLoaded, router]);

  const role = user?.unsafeMetadata?.role;
  if (!isLoaded || role !== "author") return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Get editor content
    const editorContent = editorRef.current?.getHTML();
    formData.append("content", editorContent || "");

    setFormState({ loading: true, error: null });

    try {
      const response = await fetch("/api/create-blog", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      const result = await response.json();

      console.log("API response:", result);

      if (response.ok && result.success) {
        toast.success("Post published!");
        router.push("/");
      } else {
        // Show detailed error message if available
        toast.error(result.details || result.error || "Failed to create post");
        const errorMsg = result.error || "Failed to create post";
        const detailedMsg = result.details ? `: ${result.details}` : "";
        throw new Error(errorMsg + detailedMsg);
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setFormState({ loading: false, error: null });
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Title */}
        <Input
          type="text"
          name="title"
          placeholder="Post title"
          required
          className="w-full p-2"
        />

        {/* Slug */}
        <Input
          type="text"
          name="slug"
          placeholder="Custom slug (e.g. react-server-actions)"
          required
          className="w-full p-2"
        />

        {/* Excerpt */}
        <Input
          type="text"
          name="excerpt"
          placeholder="Optional excerpt (for previews, SEO)"
          className="w-full p-2"
        />

        {/* Image upload */}
        <Input
          type="file"
          name="imageUrl"
          accept="image/*"
          required
          className="w-full"
        />

        {/* Category selection (Shadcn Select) */}
        <div className="w-full">
          <Label className="text-sm font-medium mb-1 block">Category</Label>
          <Select name="categoryId">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: Dynamically load categories */}
              <SelectItem value="catid-1">Tech</SelectItem>
              <SelectItem value="catid-2">Lifestyle</SelectItem>
              <SelectItem value="catid-3">Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TagsInput name="tags" />

        {/* Rich Text Editor */}
        <div>
          <Label className="text-sm font-medium mb-1 block">Content</Label>
          <RichTextEditor ref={editorRef} />
        </div>

        {/* Submit Button */}
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
    </div>
  );
}
