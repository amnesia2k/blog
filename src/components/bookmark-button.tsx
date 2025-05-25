import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function BookmarkButton() {
  return (
    <Button
      asChild
      // onClick={toggleTheme}
      variant="ghost"
      aria-label="Bookmark Button"
      className="rounded-full border w-10 h-10 cursor-pointer"
    >
      {/* <span className="sr-only">Toggle theme</span> */}
      <Link href="/bookmarks">
        <Bookmark />
      </Link>
    </Button>
  );
}
