import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "~@/lib/data";
import { Facebook, Twitter, Linkedin } from "~@/components/icons/SocialIcons";
import { generatePostMetadata } from "~@/lib/metadata";
import ShareButtons from "~@/components/share-buttons";
import SanitizedHTML from "~@/components/sanitized-html";

interface Props {
  params: {
    slug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return generatePostMetadata(params.slug);
}

export default function SinglePostPage({ params }: Props) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Category and Title */}
      <div className="mb-6 text-center">
        <Link
          href={`/categories/${post.category.toLowerCase()}`}
          className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-4"
        >
          {post.category}
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 line-clamp-2">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="32px"
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
      </div>

      {/* Featured Image */}
      <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-8">
            <SanitizedHTML html={post.content} />
          </article>

          {/* Tags - Now using actual post tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <ShareButtons post={post} />
          </div>

          {/* Author Bio - Only show this once */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <div className="flex items-start space-x-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {post.author.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.author.bio || "Writer and content creator"}
                </p>
                <div className="flex space-x-3">
                  {post.author.socialLinks?.facebook && (
                    <a
                      href={post.author.socialLinks.facebook}
                      className="text-gray-600 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {post.author.socialLinks?.twitter && (
                    <a
                      href={post.author.socialLinks.twitter}
                      className="text-gray-600 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {post.author.socialLinks?.linkedin && (
                    <a
                      href={post.author.socialLinks.linkedin}
                      className="text-gray-600 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Comments (3)</h3>
            <div className="space-y-6">
              {/* Comment 1 */}
              <div className="flex space-x-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Commenter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">John Doe</h4>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Great article! I've been thinking about this topic a lot
                    lately.
                  </p>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="flex space-x-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Commenter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Jane Smith</h4>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    I would love to see a follow-up article on this topic!
                  </p>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* Comment 3 */}
              <div className="flex space-x-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Commenter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Mike Johnson</h4>
                    <span className="text-sm text-gray-500">5 days ago</span>
                  </div>
                  <p className="text-gray-700 mb-2">
                    This is exactly what I needed to read today. Thanks for
                    sharing!
                  </p>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Form */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Leave a comment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your comment"
                  rows={5}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Related Posts */}
          <div className="bg-white p-6 rounded-lg shadow-xs">
            <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="flex space-x-3">
                  <div className="shrink-0 w-16 h-16 relative">
                    <Link href={`/blogs/${relatedPost.slug}`}>
                      <Image
                        src={relatedPost.coverImage || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/blogs/${relatedPost.slug}`}
                      className="text-sm font-medium hover:text-blue-600"
                    >
                      {relatedPost.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {relatedPost.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
