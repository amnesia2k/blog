"use client";

import React, { useImperativeHandle, forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import MenuBar from "./menu-bar";

const RichTextEditor = forwardRef((_, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-3",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-3",
          },
        },
      }),
      Highlight,
      Image.configure({
        inline: false, // change to true if you want inline images
        allowBase64: true, // helpful for quick testing with base64 paste
        HTMLAttributes: {
          class: "rounded-md max-w-full h-auto", // Tailwind styling
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-md py-2 px-3 text-sm lg:text-base",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() ?? "",
  }));

  if (!editor) return null;

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
