import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // Create User 1 (Regular User)
  const user1 = await prisma.user.create({
    data: {
      clerkId: "clerk_123",
      email: "user1@example.com", // Adding email
      imageUrl: "https://example.com/user1.jpg", // Adding imageUrl
      role: "user",
    },
  });

  // Create User 2 (Author)
  const user2 = await prisma.user.create({
    data: {
      clerkId: "clerk_456",
      email: "author@example.com", // Adding email
      imageUrl: "https://example.com/author.jpg", // Adding imageUrl
      role: "author",
    },
  });

  // Create Author Profile for User 2
  const authorProfile = await prisma.authorProfile.create({
    data: {
      name: "Jane Doe", // Adding name
      bio: "Tech enthusiast and writer.",
      twitterLink: "https://twitter.com/janedoe",
      user: {
        connect: { id: user2.id },
      },
    },
  });

  // Link User 2 to their Profile
  await prisma.user.update({
    where: { id: user2.id },
    data: { profileId: authorProfile.id },
  });

  // Create some tags
  const tag1 = await prisma.tag.create({ data: { tagName: "React" } });
  const tag2 = await prisma.tag.create({ data: { tagName: "NextJS" } });
  const tag3 = await prisma.tag.create({ data: { tagName: "Prisma" } });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: "Getting Started with React",
      slug: "getting-started-react",
      content: "React is a JavaScript library for building user interfaces...",
      imageUrl: "https://example.com/image1.jpg",
      author: { connect: { id: user2.id } },
      profile: { connect: { id: authorProfile.id } },
      tags: {
        create: [
          { tag: { connect: { id: tag1.id } } },
          { tag: { connect: { id: tag2.id } } },
        ],
      },
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "NextJS and Prisma",
      slug: "nextjs-prisma",
      content: "NextJS makes server-side rendering easy...",
      imageUrl: "https://example.com/image1.jpg",
      author: { connect: { id: user2.id } },
      profile: { connect: { id: authorProfile.id } },
      tags: {
        create: [
          { tag: { connect: { id: tag2.id } } },
          { tag: { connect: { id: tag3.id } } },
        ],
      },
    },
  });

  // Create some categories
  const category1 = await prisma.category.create({
    data: {
      name: "Technology",
      slug: "technology",
      posts: {
        connect: [{ id: post1.id }],
      },
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Marketing",
      slug: "marketing",
      posts: {
        connect: [{ id: post2.id }],
      },
    },
  });

  // Update posts to connect them to categories
  await prisma.post.update({
    where: { id: post1.id },
    data: { categoryId: category1.id },
  });

  await prisma.post.update({
    where: { id: post2.id },
    data: { categoryId: category2.id },
  });

  // Add likes
  await prisma.like.createMany({
    data: [
      { userId: user1.id, postId: post1.id },
      { userId: user1.id, postId: post2.id },
    ],
  });

  // Add bookmarks
  await prisma.bookmark.createMany({
    data: [{ userId: user1.id, postId: post2.id }],
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
