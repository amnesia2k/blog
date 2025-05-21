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
import { cn } from "~@/lib/utils";

interface ImageUploaderProps {
  name: string;
  onFileSelect?: (file: File | null) => void;
}

export interface ImageUploaderRef {
  getSelectedFile: () => File | null;
  clearSelectedFile: () => void;
}

const ImageUploader = forwardRef<ImageUploaderRef, ImageUploaderProps>(
  ({ name, onFileSelect }, ref) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);

    useImperativeHandle(ref, () => ({
      getSelectedFile: () => selectedImage,
      clearSelectedFile: () => setSelectedImage(null),
    }));

    const handleFileChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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

    const handleDrop = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        const file = event.dataTransfer.files?.[0];
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

    const handleDragLeave = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
      },
      []
    );

    const handleDragOver = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
      },
      []
    );

    const handleDragEnter = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
      },
      []
    );

    const imagePreviewUrl = useMemo(() => {
      if (selectedImage) {
        return URL.createObjectURL(selectedImage);
      }
      return null;
    }, [selectedImage]);

    useEffect(() => {
      // Clean up the object URL when the component unmounts or image changes
      return () => {
        if (imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
      };
    }, [imagePreviewUrl]);

    return (
      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center cursor-pointer",
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(`${name}-upload`)?.click()}
      >
        <input
          id={`${name}-upload`}
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
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

ImageUploader.displayName = "ImageUploader"; // Good practice for forwardRef

export default ImageUploader;
