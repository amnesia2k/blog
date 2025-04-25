"use client";

import { Facebook, Twitter, Linkedin } from "~@/components/icons/SocialIcons";
import type { Post } from "~@/types/blog";

export default function ShareButtons({ post }: { post: Post }) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex space-x-4">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`}
        className="text-gray-600 hover:text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook className="w-6 h-6" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(post.title)}`}
        className="text-gray-600 hover:text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="w-6 h-6" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          currentUrl
        )}&title=${encodeURIComponent(post.title)}`}
        className="text-gray-600 hover:text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="w-6 h-6" />
      </a>
    </div>
  );
}
