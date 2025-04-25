import Link from "next/link";
import Image from "next/image";
import { Search } from "./icons/Search";

export default function Navbar() {
  return (
    <header className="bg-white py-4 shadow-xs">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
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

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/blog/single-post"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Single Post
          </Link>
          <Link
            href="/pages"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Pages
          </Link>
          <Link
            href="/contact"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-3 pr-10 py-1.5 rounded-full bg-gray-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 w-32 md:w-48"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <button
            type="button"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-100"
          >
            <span className="sr-only">Theme toggle</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
          <button type="button" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
