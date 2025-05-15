"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "../icons/SocialIcons";
import BecomeAuthor from "../become-author";
import { useUser } from "@clerk/nextjs";

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 ">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.svg"
                  alt="MetaBlog Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                Meta<span className="text-blue-600">Blog</span>
              </span>
            </Link>
            <p>
              A modern blog platform for sharing ideas, stories, and knowledge
              with the world.
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

            <div>
              {user?.unsafeMetadata?.role === "user" && <BecomeAuthor />}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-blue-600">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/categories/technology"
                  className="hover:text-blue-600"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/lifestyle"
                  className="hover:text-blue-600"
                >
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/categories/travel" className="hover:text-blue-600">
                  Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/business"
                  className="hover:text-blue-600"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link href="/categories/health" className="hover:text-blue-600">
                  Health & Wellness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Subscribe</h3>
            <p className="mb-4">
              Subscribe to our newsletter to get the latest updates directly in
              your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p>© {new Date().getFullYear()} MetaBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
