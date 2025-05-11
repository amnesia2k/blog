"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
  // Close sidebar when Escape key is pressed
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling when sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      // Restore scrolling when sidebar is closed
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <div>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClose();
              }
            }}
          />

          {/* Sidebar */}
          <div
            className="fixed inset-y-0 right-0 z-50 w-64 max-w-full bg-white dark:bg-background p-4 shadow-lg"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="mt-8">
              <div className="flex flex-col items-center space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="w-full text-center rounded-lg py-2 px-4 transition-colors"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
