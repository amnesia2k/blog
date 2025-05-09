"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "../icons/Search";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme-toggle";

const navbarLinks = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },

  {
    id: 2,
    name: "Blogs",
    href: "/blogs",
  },

  {
    id: 3,
    name: "Contact Us",
    href: "/contact",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="py-4 shadow-xs">
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
            Meta<span className="text-primary">Blog</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navbarLinks.map((link) => (
            <Link
              key={link?.id}
              href={link?.href}
              className={`hover:text-primary transition-colors ${
                pathname === link?.href ? "text-primary font-bold" : ""
              }`}
            >
              {link?.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-3 pr-10 py-1.5 rounded-full border text-sm focus:outline-hidden w-32 md:w-48"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <ModeToggle />
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
