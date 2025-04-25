"use client";

import DOMPurify from "dompurify";
import parse from "html-react-parser";

export default function SanitizedHTML({ html }: { html: string }) {
  const cleanHTML = DOMPurify.sanitize(html);
  return <>{parse(cleanHTML)}</>;
}
