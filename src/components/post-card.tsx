import Image from "next/image";
import Link from "next/link";
import type { Post } from "~@/types/blog";
import { Card, CardContent } from "./ui/card";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card className="rounded-lg overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow duration-300 p-0">
      <div className="block relative h-48 w-full">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 text-sm mb-2">
          <div className="relative h-6 w-6 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <Link
            href={`/author/${post.author.username}`}
            className="hover:text-blue-600"
          >
            {post.author.name}
          </Link>
          <span>•</span>
          <span>{post.date}</span>
        </div>
      </CardContent>
    </Card>
  );
}
