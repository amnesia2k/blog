import type { Metadata } from "next";
import { posts, authors, categories } from "~@/lib/data";
import type { Author, Category, Post } from "~@/types/blog";

// Base metadata that will be used across the site
export const baseMetadata = {
  title: {
    default: "MetaBlog - Your Modern Blog Platform",
    template: "%s | MetaBlog",
  },
  description: "A modern blog platform built with Next.js and TailwindCSS",
  keywords: ["blog", "technology", "lifestyle", "travel", "business", "health"],
  authors: [{ name: "MetaBlog Team" }],
  creator: "MetaBlog",
  publisher: "MetaBlog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://metablog.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metablog.example.com",
    siteName: "MetaBlog",
    title: "MetaBlog - Your Modern Blog Platform",
    description: "A modern blog platform built with Next.js and TailwindCSS",
    images: [
      {
        url: "https://metablog.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MetaBlog - Your Modern Blog Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetaBlog - Your Modern Blog Platform",
    description: "A modern blog platform built with Next.js and TailwindCSS",
    creator: "@metablog",
    images: ["https://metablog.example.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: "large" satisfies "none" | "standard" | "large",
      maxSnippet: -1,
    },
  },
};

// Helper function to get post by slug
export async function getPostBySlug(slug: string) {
  // In a real app, this would be a database query
  // Simulating async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = posts.find((post) => post.slug === slug);
      resolve(post);
    }, 10);
  });
}

// Helper function to get author by username
export async function getAuthorByUsername(username: string) {
  // In a real app, this would be a database query
  // Simulating async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      const author = authors.find((author) => author.username === username);
      resolve(author);
    }, 10);
  });
}

// Helper function to get category by slug
export async function getCategoryBySlug(slug: string) {
  // In a real app, this would be a database query
  // Simulating async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      const category = categories.find((category) => category.slug === slug);
      resolve(category);
    }, 10);
  });
}

// Generate post metadata
export async function generatePostMetadata(slug: string): Promise<Metadata> {
  const post = (await getPostBySlug(slug)) as Post;

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const { title, excerpt, content, coverImage, author, category } = post;

  // Extract a description from the content if no excerpt is available
  const description =
    excerpt || content.substring(0, 160).replace(/<[^>]*>/g, "");

  return {
    title: title,
    description: description,
    authors: [{ name: author.name }],
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: `https://metablog.example.com/blog/${slug}`,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: post.date,
      authors: [author.name],
      tags: [category],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [coverImage],
    },
  };
}

// Generate author metadata
export async function generateAuthorMetadata(
  username: string
): Promise<Metadata> {
  const author = (await getAuthorByUsername(username)) as Author;

  if (!author) {
    return {
      title: "Author Not Found",
      description: "The requested author could not be found.",
    };
  }

  const { name, bio, avatar } = author;

  return {
    title: `${name} - Author Profile`,
    description: bio || `Read articles by ${name} on MetaBlog.`,
    openGraph: {
      type: "profile",
      title: `${name} - Author Profile`,
      description: bio || `Read articles by ${name} on MetaBlog.`,
      url: `https://metablog.example.com/author/${username}`,
      images: [
        {
          url: avatar,
          width: 400,
          height: 400,
          alt: name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${name} - Author Profile`,
      description: bio || `Read articles by ${name} on MetaBlog.`,
      images: [avatar],
    },
  };
}

// Generate category metadata
export async function generateCategoryMetadata(
  slug: string
): Promise<Metadata> {
  const category = (await getCategoryBySlug(slug)) as Category;

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  const { name, description } = category;

  return {
    title: `${name} Articles`,
    description: description || `Read all articles about ${name} on MetaBlog.`,
    openGraph: {
      type: "website",
      title: `${name} Articles`,
      description:
        description || `Read all articles about ${name} on MetaBlog.`,
      url: `https://metablog.example.com/categories/${slug}`,
    },
    twitter: {
      card: "summary",
      title: `${name} Articles`,
      description:
        description || `Read all articles about ${name} on MetaBlog.`,
    },
  };
}
