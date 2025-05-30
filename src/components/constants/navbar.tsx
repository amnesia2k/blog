"use client";

import Link from "next/link";
import Image from "next/image";
// import { Search } from "../icons/Search";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../theme-toggle";
import { Menu, Plus, User } from "lucide-react";
import MobileSidebar from "../mobile-sidebar";
import { useEffect, useRef, useState } from "react";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import BookmarkButton from "../bookmark-button";
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
  const { user } = useUser();

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
          {/* <div className="relative h-8 w-8">
            <Image
              src="/logo.svg"
              alt="MetaBlog Logo"
              fill
              className="object-contain"
            />
          </div> */}
          <span className="text-xl font-bold">
            Meta
            <span className="text-secondary dark:text-secondary-foreground">
              Blog
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-x-5">
          <nav className="hidden md:flex items-center space-x-5">
            {navbarLinks.map((link) => (
              <Link
                key={link?.id}
                href={link?.href}
                className={`transition-colors ${
                  pathname === link?.href
                    ? "text-secondary font-bold dark:text-secondary-foreground"
                    : "hover:text-secondary-foreground/50"
                }`}
              >
                {link?.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <BookmarkButton />
              <ModeToggle />
            </div>

            <ClerkLoaded>
              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "outline-none",
                        userButtonPopoverCard: "!mx-2",
                      },
                    }}
                  >
                    {user?.unsafeMetadata?.role === "author" && (
                      <UserButton.MenuItems>
                        <UserButton.Link
                          label="New Post"
                          labelIcon={<Plus size={15} />}
                          href="/create"
                        />
                      </UserButton.MenuItems>
                    )}
                  </UserButton>

                  <div className="hidden md:block text-xs">
                    <p className="italic">Welcome Back,</p>
                    <p className="font-bold">{user?.fullName}</p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="rounded-full border w-10 h-10 cursor-pointer"
                  >
                    <User />
                  </Button>
                </SignInButton>
              )}
            </ClerkLoaded>

            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden cursor-pointer"
            >
              <Menu size={30} />
            </button>
          </div>
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

// biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
{
  /* <div className="relative">
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
          </div> */
}
// biome-ignore lint/complexity/noUselessLoneBlockStatements: <explanation>
{
  /* <UploadWidget /> */
}
