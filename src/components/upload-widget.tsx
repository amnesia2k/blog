import { CldUploadWidget } from "next-cloudinary";

import React from "react";

// const signingKey = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function UploadWidget() {
  return (
    <div>
      <CldUploadWidget uploadPreset="blog_unsigned">
        {({ open }) => {
          return (
            <button type="button" onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
