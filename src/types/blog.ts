export interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  author: Author;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}
