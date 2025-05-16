"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";

type TagsInputProps = {
  name: string;
};

export default function TagsInput({ name }: TagsInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Tags</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} className="rounded-full">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1"
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
          }
        }}
        className="w-full border p-2 rounded"
      />

      {/* Hidden input to pass tags as JSON string */}
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
    </div>
  );
}
