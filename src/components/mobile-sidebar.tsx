"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { ModeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{
    id: number;
    name: string;
    href: string;
  }>;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  links,
}: MobileSidebarProps) {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
      />

      {/* Sidebar with animation */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 z-50 w-64 max-w-full bg-white dark:bg-background p-0 shadow-lg transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="border-b w-full flex items-center justify-between p-4">
          {user && isLoaded ? (
            <div>
              <p className="italic text-sm">Welcome Back,</p>
              <p className="font-bold text-sm">{user?.fullName}</p>
            </div>
          ) : (
            <div>
              <p className="italic text-sm">Please Sign In</p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 cursor-pointer"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="mt-8 px-4 flex-1">
          <div className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`w-full text-center transition-colors hover:text-blue-400 ${
                  pathname === link?.href ? "text-blue-600 font-bold" : ""
                }`}
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* ModeToggle Fixed at Bottom */}
        <div className="p-4 border-t mt-auto">
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
