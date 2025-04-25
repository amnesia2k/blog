"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      title,
      content,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      coverImage,
    });
    alert("Blog post created successfully!");
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Blog Post</h1>
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Create Blog</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-xs p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cover Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="coverImage"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {coverImage ? coverImage.name : "No file chosen"}
              </span>
            </div>
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  className="h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Health">Health</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. technology, ai, future"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center space-x-2 p-2 border-b border-gray-300 bg-gray-50">
                <button type="button" className="p-1 hover:bg-gray-200 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </button>
                <button type="button" className="p-1 hover:bg-gray-200 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                  </svg>
                </button>
                <div className="h-5 border-l border-gray-300 mx-1" />
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded font-bold"
                >
                  B
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded italic"
                >
                  I
                </button>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-200 rounded underline"
                >
                  U
                </button>
              </div>

              {/* Editor */}
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 min-h-[300px] focus:outline-hidden"
                placeholder="Write your blog post content here..."
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
