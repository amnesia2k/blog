import { Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "~@/components/post-card";
import { posts, categories } from "~@/lib/data";
import { baseMetadata } from "~@/lib/metadata";

export const metadata: Metadata = {
  title: "Blog Articles",
  description:
    "Browse all our blog articles on various topics including technology, lifestyle, travel, and more.",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Blog Articles | MetaBlog",
    description:
      "Browse all our blog articles on various topics including technology, lifestyle, travel, and more.",
    url: "https://metablog.example.com/blog",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Blog Articles | MetaBlog",
    description:
      "Browse all our blog articles on various topics including technology, lifestyle, travel, and more.",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Blog</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="inline-flex">
              <a href="https://" className="px-3 py-2 rounded-l-md border">
                Previous
              </a>
              <a href="https://" className="px-3 py-2 border text-blue-600">
                1
              </a>
              <a href="https://" className="px-3 py-2 border">
                2
              </a>
              <a href="https://" className="px-3 py-2 border">
                3
              </a>
              <a href="https://" className="px-3 py-2 rounded-r-md border">
                Next
              </a>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Search */}
          <div className="border p-6 shadow-xl rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="p-6 rounded-lg shadow-xl border mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex justify-between items-center hover:text-blue-600"
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {category.postCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="p-6 rounded-lg shadow-xl border mb-6">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="flex space-x-3">
                  <div className="shrink-0 w-16 h-16 relative">
                    <div>
                      <div className="absolute inset-0">
                        <img
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="p-6 rounded-lg shadow-xl border mb-6">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Technology
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                AI
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Travel
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Food
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Health
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Lifestyle
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Business
              </a>
              <a
                href="https://"
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
              >
                Finance
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
