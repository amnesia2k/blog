"use client";

import React from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Strikethrough,
} from "lucide-react";
import { Toggle } from "../ui/toggle";

// interface MenuBarProps {
//   editor: Editor | null;
// }

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const options = [
    {
      id: 1,
      icon: <Heading1 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      id: 2,
      icon: <Heading2 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      id: 3,
      icon: <Heading3 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      id: 4,
      icon: <Pilcrow size={16} />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      id: 5,
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      id: 6,
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      id: 7,
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      id: 8,
      icon: <Highlighter size={16} />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      id: 9,
      icon: <AlignLeft size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      id: 10,
      icon: <AlignCenter size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      id: 11,
      icon: <AlignRight size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      id: 12,
      icon: <AlignJustify size={16} />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive({ textAlign: "justify" }),
    },
    {
      id: 13,
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      id: 14,
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 space-x-2 z-50">
      {options.map((option) => (
        <Toggle
          key={option?.id}
          pressed={option?.pressed}
          onPressedChange={option?.onClick}
        >
          {option?.icon}
        </Toggle>
      ))}
    </div>
  );
}
