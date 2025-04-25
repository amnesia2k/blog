import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "~@/components/PostCard";
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
        <div className="flex items-center text-sm text-gray-600">
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
              <a
                href="https://"
                className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="https://"
                className="px-3 py-2 border-t border-b border-gray-300 bg-white text-blue-600 hover:bg-blue-50"
              >
                1
              </a>
              <a
                href="https://"
                className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="https://"
                className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="https://"
                className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Search */}
          <div className="bg-white p-6 rounded-lg shadow-xs mb-6">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-xs mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex justify-between items-center text-gray-700 hover:text-blue-600"
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
          <div className="bg-white p-6 rounded-lg shadow-xs mb-6">
            <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <li key={post.id} className="flex space-x-3">
                  <div className="shrink-0 w-16 h-16 relative">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="absolute inset-0">
                        <img
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>
                    </Link>
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
          <div className="bg-white p-6 rounded-lg shadow-xs">
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
