"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "../icons/Search";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme-toggle";
import { Menu } from "lucide-react";
import MobileSidebar from "../mobile-sidebar";
import { useEffect, useRef, useState } from "react";
// import UploadWidget from "../upload-widget";

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
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
            Meta<span className="text-blue-600">Blog</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navbarLinks.map((link) => (
            <Link
              key={link?.id}
              href={link?.href}
              className={`hover:text-blue-400 transition-colors ${
                pathname === link?.href ? "text-blue-600 font-bold" : ""
              }`}
            >
              {link?.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          {/* <div className="relative">
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
          </div> */}
          {/* <UploadWidget /> */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden cursor-pointer"
          >
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={navbarLinks}
      />
    </header>
  );
}
