import React from "react";

import RichTextEditor from "~@/components/text-editor/rich-text-editor";

export default function CreateBlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <form>
        <RichTextEditor />
      </form>
    </div>
  );
}
