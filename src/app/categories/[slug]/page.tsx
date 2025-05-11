// import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "~@/components/post-card";
import { posts, categories } from "~@/lib/data";
// import { generateCategoryMetadata } from "~@/lib/metadata";

// type Props = {
//   params: { slug: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return generateCategoryMetadata(params.slug);
// }

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((cat) => cat.slug === slug) || categories[0];
  const categoryPosts = posts.filter(
    (post) => post.category.toLowerCase() === category?.name.toLowerCase()
  );

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span>{category?.name}</span>
        </div>
      </div>

      <p className="mb-8">{category?.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {categoryPosts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
          <p className="text-gray-600 mb-6">
            There are no posts in this category yet.
          </p>
          <Link
            href="/blog"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  );
}
