// components/image-uploader.tsx
import {
  useCallback,
  useState,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import { cn } from "~@/lib/utils";

interface ImageUploaderProps {
  // Remove name prop here if it's only used for the input name
  onFileSelect?: (file: File | null) => void;
}

export interface ImageUploaderRef {
  getSelectedFile: () => File | null;
  clearSelectedFile: () => void;
}

const ImageUploader = forwardRef<ImageUploaderRef, ImageUploaderProps>(
  ({ onFileSelect }, ref) => {
    // Remove name from here
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useImperativeHandle(ref, () => ({
      getSelectedFile: () => selectedImage,
      clearSelectedFile: () => setSelectedImage(null),
    }));

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
          setSelectedImage(file);
          onFileSelect?.(file);
        } else {
          setSelectedImage(null);
          onFileSelect?.(null);
        }
      },
      [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      multiple: false,
    });

    const imagePreviewUrl = useMemo(() => {
      if (selectedImage) {
        return URL.createObjectURL(selectedImage);
      }
      return null;
    }, [selectedImage]);

    useEffect(() => {
      return () => {
        if (imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
      };
    }, [imagePreviewUrl]);

    return (
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center cursor-pointer",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        )}
      >
        {/* REMOVE name={name} from here */}
        <input {...getInputProps()} />

        {selectedImage ? (
          <div>
            <Image
              src={imagePreviewUrl as string}
              alt="Image preview"
              width={200}
              height={200}
              objectFit="contain"
              className="mx-auto mb-4"
            />
            <p className="text-gray-600 text-sm">{selectedImage.name}</p>
            <p className="text-blue-600 text-sm mt-1">
              Click to change image or drag and drop another one
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">
              Drag and drop an image here, or click to select a file
            </p>
          </div>
        )}
      </div>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
