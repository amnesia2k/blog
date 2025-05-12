import type { Metadata } from "next";
import CustomButton from "~@/components/button";
import FeaturedPost from "~@/components/featured-post";
import PostCard from "~@/components/post-card";
import { posts } from "~@/lib/data";
import { baseMetadata } from "~@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const featuredPost = posts[0];
  const latestPosts = posts.slice(0, 6);

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : `https://${process.env.URL}`;

  console.log(url);

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Featured Post */}
      <div className="mb-12">
        {featuredPost && <FeaturedPost post={featuredPost} />}
      </div>

      {/* Advertisement */}
      <div className="bg-gray-200 p-6 mb-12 text-center rounded-lg">
        <p className="text-gray-500 text-xs mb-2">Advertisement</p>
        <p className="text-gray-700">You can place ads here</p>
        <p className="text-gray-700">750x100</p>
      </div>

      {/* Latest Posts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="p-8 border shadow-xl rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest posts delivered right to your inbox
          </p>
          <form className="flex flex-col items-center sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="grow px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              required
            />
            <CustomButton variant="outline" type="submit" className="px-6 py-5">
              Subscribe
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";
// // import { prisma } from "~@/server/db";

// export default async function HomePage() {
//   // let posts = [];

//   // try {
//   //   posts = await prisma.post.findMany();
//   // } catch (error) {
//   //   posts = [{ id: "1", title: "Example Post" }];
//   // }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="max-w-[1200px] flex flex-col items-center justify-center gap-12 px-4 py-16">
//         <h1 className="font-extrabold text-5xl text-white tracking-tight sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="font-bold text-2xl">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="font-bold text-2xl">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* <div className="flex flex-col gap-y-4">
//         {posts.map((post) => (
//           <Link
//             href={`/post/${post?.id}`}
//             key={post?.id}
//             className="border-y py-3 text-center"
//           >
//             {post?.title}
//           </Link>
//         ))}
//       </div> */}
//     </main>
//   );
// }
