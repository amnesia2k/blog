import Image from "next/image";
import Link from "next/link";
import type { Post } from "~@/types/blog";

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="relative h-[400px] w-full">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-linear-to-t from-black/80 to-transparent text-white">
        <div className="mb-4">
          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <Link href={`/blogs/${post.slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-2 md:line-clamp-none">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between md:justify-start md:gap-x-3">
          <div className="flex items-center gap-x-3">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs md:text-base">{post.author.name}</span>
          </div>
          <span className="hidden md:block">•</span>
          <span className="text-xs md:text-base">{post.date}</span>
        </div>
      </div>
    </div>
  );
}
