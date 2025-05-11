import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "~@/lib/data";
import { baseMetadata } from "~@/lib/metadata";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse all categories on MetaBlog including technology, lifestyle, travel, business, and health.",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Categories | MetaBlog",
    description:
      "Browse all categories on MetaBlog including technology, lifestyle, travel, business, and health.",
    url: "https://metablog.example.com/categories",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Categories | MetaBlog",
    description:
      "Browse all categories on MetaBlog including technology, lifestyle, travel, business, and health.",
  },
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesPage() {
  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Categories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="block"
          >
            <div className="p-6 rounded-lg shadow-xl dark:border dark:border-gray-500">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600">
                  {category.postCount} posts
                </span>
                <span className="text-gray-500">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
