"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
import ImageUploader, {
  type ImageUploaderRef,
} from "~@/components/image-uploader"; // Import the new component and its ref type

export default function CreateBlogPage() {
  const router = useRouter();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editorRef = useRef<any>(null);
  const imageUploaderRef = useRef<ImageUploaderRef>(null); // Ref for the ImageUploader
  const [formState, setFormState] = useState({ loading: false, error: null });
  const { user, isLoaded } = useUser();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // State to hold the selected image file

  // 🚫 Redirect non-authors
  useEffect(() => {
    if (isLoaded) {
      const role = user?.unsafeMetadata?.role;
      if (role !== "author") {
        toast.warning("You do not have access to access this page!");
        router.push("/");
      }
    }
  }, [user, isLoaded, router]);

  const handleImageFileSelect = useCallback((file: File | null) => {
    setSelectedImageFile(file);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      // Get editor content
      const editorContent = editorRef.current?.getHTML();
      formData.append("content", editorContent || "");

      // Get the selected image file from the ImageUploader ref
      const imageFile = imageUploaderRef.current?.getSelectedFile();
      if (imageFile) {
        formData.append("imageUrl", imageFile);
      } else {
        toast.error("Please select an image for the post.");
        return; // Stop the submission if no image is selected
      }

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
          toast.error(
            result.details || result.error || "Failed to create post"
          );
          const errorMsg = result.error || "Failed to create post";
          const detailedMsg = result.details ? `: ${result.details}` : "";
          throw new Error(errorMsg + detailedMsg);
        }
      } catch (err) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setFormState({ loading: false, error: null });
      }
    },
    [router]
  );

  const role = user?.unsafeMetadata?.role;
  if (!isLoaded || role !== "author") {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6 px-4 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Responsive Layout for Title, Slug, Excerpt, Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              name="title"
              placeholder="Post title"
              required
              className="w-full p-2"
            />
          </div>
          <div>
            <Input
              type="text"
              name="slug"
              placeholder="Custom slug (e.g. react-server-actions)"
              required
              className="w-full p-2"
            />
          </div>
          <div>
            <Input
              type="text"
              name="excerpt"
              placeholder="Optional excerpt (for previews, SEO)"
              className="w-full p-2"
            />
          </div>
          {/* Category selection (Shadcn Select) */}
          <div className="w-full md:col-span-2">
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
        </div>

        {/* Image Uploader Component */}
        <div>
          <Label className="text-sm font-medium mb-1 block">
            Featured Image
          </Label>
          <ImageUploader
            ref={imageUploaderRef}
            onFileSelect={handleImageFileSelect}
          />
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
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={formState.loading || !selectedImageFile} // Use the state from the parent component
        >
          {formState.loading ? "Publishing..." : "Publish Post"}
        </button>

        {formState.error && (
          <p className="text-red-500 text-sm mt-2">{formState.error}</p>
        )}
      </form>
    </div>
  );
}
