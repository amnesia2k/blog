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

export default function CreateBlogPage() {
  const router = useRouter();
  const editorRef = useRef<{ getHTML: () => string } | null>(null);
  const [formState, setFormState] = useState({ loading: false, error: null });
  const { user, isLoaded } = useUser();

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      // Get editor content
      const editorContent = editorRef.current?.getHTML();
      formData.append("content", editorContent || "");

      // ====== NEW: Extract first image src from editor content =======
      let imageUrlFromContent = "";

      if (editorContent) {
        // Create a temporary DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorContent, "text/html");
        const firstImg = doc.querySelector("img");
        if (firstImg?.src) {
          imageUrlFromContent = firstImg.src;
        }
      }

      // ====== NEW: Fallback image URL if no image found in content =======
      const fallbackImageUrl =
        "https://your-default-image-host.com/default-post-image.jpg";

      // Append imageUrl as string to form data (either extracted or fallback)
      formData.append("imageUrl", imageUrlFromContent || fallbackImageUrl);

      setFormState({ loading: true, error: null });

      await toast.promise(
        (async () => {
          const response = await fetch("/api/create-blog", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            const errorMsg = result.error || "Failed to create post";
            const detailedMsg = result.details ? `: ${result.details}` : "";
            throw new Error(errorMsg + detailedMsg);
          }

          // Navigate on success
          router.push("/");
          return "Post published!";
        })(),
        {
          loading: "Publishing post...",
          success: (msg) => msg,
          error: (err) =>
            err instanceof Error
              ? err.message
              : "Something went wrong while publishing.",
        }
      );

      setFormState({ loading: false, error: null });
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
            <Select name="categoryId" required>
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

        {/* Removed ImageUploader since no manual image required */}

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
          disabled={formState.loading}
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

// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { Input } from "~@/components/ui/input";
// import RichTextEditor from "~@/components/text-editor/rich-text-editor";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "~@/components/ui/select";
// import { Label } from "~@/components/ui/label";
// import TagsInput from "~@/components/tags-input";
// import ImageUploader, {
//   type ImageUploaderRef,
// } from "~@/components/image-uploader"; // Import the new component and its ref type

// export default function CreateBlogPage() {
//   const router = useRouter();
//   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//   const editorRef = useRef<any>(null);
//   const imageUploaderRef = useRef<ImageUploaderRef>(null); // Ref for the ImageUploader
//   const [formState, setFormState] = useState({ loading: false, error: null });
//   const { user, isLoaded } = useUser();
//   const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // State to hold the selected image file

//   // 🚫 Redirect non-authors
//   useEffect(() => {
//     if (isLoaded) {
//       const role = user?.unsafeMetadata?.role;
//       if (role !== "author") {
//         toast.warning("You do not have access to access this page!");
//         router.push("/");
//       }
//     }
//   }, [user, isLoaded, router]);

//   const handleImageFileSelect = useCallback((file: File | null) => {
//     setSelectedImageFile(file);
//   }, []);

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();

//       const formData = new FormData(e.currentTarget);

//       // Get editor content
//       const editorContent = editorRef.current?.getHTML();
//       formData.append("content", editorContent || "");

//       // Get the selected image file
//       const imageFile = imageUploaderRef.current?.getSelectedFile();
//       if (!imageFile) {
//         toast.error("Please select an image for the post.");
//         return;
//       }
//       formData.append("imageUrl", imageFile);

//       setFormState({ loading: true, error: null });

//       await toast.promise(
//         (async () => {
//           const response = await fetch("/api/create-blog", {
//             method: "POST",
//             body: formData,
//           });

//           const result = await response.json();

//           if (!response.ok || !result.success) {
//             const errorMsg = result.error || "Failed to create post";
//             const detailedMsg = result.details ? `: ${result.details}` : "";
//             throw new Error(errorMsg + detailedMsg);
//           }

//           // Navigate on success
//           router.push("/");
//           return "Post published!";
//         })(),
//         {
//           loading: "Publishing post...",
//           success: (msg) => msg,
//           error: (err) =>
//             err instanceof Error
//               ? err.message
//               : "Something went wrong while publishing.",
//         }
//       );

//       setFormState({ loading: false, error: null });
//     },
//     [router]
//   );

//   const role = user?.unsafeMetadata?.role;
//   if (!isLoaded || role !== "author") {
//     return null;
//   }

//   return (
//     <div className="max-w-3xl mx-auto py-8 space-y-6 px-4 sm:px-0">
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6"
//         encType="multipart/form-data"
//       >
//         {/* Responsive Layout for Title, Slug, Excerpt, Category */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="md:col-span-2">
//             <Input
//               type="text"
//               name="title"
//               placeholder="Post title"
//               required
//               className="w-full p-2"
//             />
//           </div>
//           <div>
//             <Input
//               type="text"
//               name="slug"
//               placeholder="Custom slug (e.g. react-server-actions)"
//               required
//               className="w-full p-2"
//             />
//           </div>
//           <div>
//             <Input
//               type="text"
//               name="excerpt"
//               placeholder="Optional excerpt (for previews, SEO)"
//               className="w-full p-2"
//             />
//           </div>
//           {/* Category selection (Shadcn Select) */}
//           <div className="w-full md:col-span-2">
//             <Label className="text-sm font-medium mb-1 block">Category</Label>
//             <Select name="categoryId">
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {/* TODO: Dynamically load categories */}
//                 <SelectItem value="catid-1">Tech</SelectItem>
//                 <SelectItem value="catid-2">Lifestyle</SelectItem>
//                 <SelectItem value="catid-3">Travel</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Image Uploader Component */}
//         <div>
//           <Label className="text-sm font-medium mb-1 block">
//             Featured Image
//           </Label>
//           <ImageUploader
//             ref={imageUploaderRef}
//             onFileSelect={handleImageFileSelect}
//           />
//         </div>

//         <TagsInput name="tags" />

//         {/* Rich Text Editor */}
//         <div>
//           <Label className="text-sm font-medium mb-1 block">Content</Label>
//           <RichTextEditor ref={editorRef} />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={formState.loading || !selectedImageFile} // Use the state from the parent component
//         >
//           {formState.loading ? "Publishing..." : "Publish Post"}
//         </button>

//         {formState.error && (
//           <p className="text-red-500 text-sm mt-2">{formState.error}</p>
//         )}
//       </form>
//     </div>
//   );
// }
