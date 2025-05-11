// import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostCard from "~@/components/post-card";
import { posts, authors } from "~@/lib/data";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "~@/components/icons/SocialIcons";
// import { generateAuthorMetadata } from "~@/lib/metadata";

// type Props = {
//   params: { username: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   return generateAuthorMetadata(params.username);
// }

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const author = authors.find((a) => a.username === username) || authors[0];
  const authorPosts = posts.filter((p) => p.author.id === author?.id);

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Author Profile */}
      <div className="rounded-lg p-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
            <Image
              src={author?.avatar || "/placeholder.svg"}
              alt={author?.name || "Author avatar"}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">{author?.name}</h1>
          <p className="mb-2">Writer & Editor</p>
          <p className="max-w-2xl mx-auto mb-4">
            {author?.bio ||
              `Meet ${author?.name}, a passionate writer and blogger with a love for technology and travel. ${author?.name} holds a degree in Computer Science and has spent years working in the tech industry, gaining a deep understanding of the impact technology has on our lives.`}
          </p>
          <div className="flex space-x-4">
            <a href="https://" className="hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://" className="hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://" className="hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://" className="hover:text-blue-600">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Latest Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {authorPosts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No posts found</h2>
            <p className="text-gray-600 mb-6">
              This author hasn't published any posts yet.
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
    </div>
  );
}
