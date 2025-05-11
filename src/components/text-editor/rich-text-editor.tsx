"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./menu-bar";

export default function RichTextEditor() {
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

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("Editor content in HTML format:", html);
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
