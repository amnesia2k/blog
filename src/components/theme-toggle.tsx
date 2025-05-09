"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      className="rounded-full bg-transparent hover:bg-transparent"
    >
      {/* <span className="sr-only">Toggle theme</span> */}
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
