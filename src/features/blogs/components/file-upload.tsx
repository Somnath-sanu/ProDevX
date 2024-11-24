"use client";

import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FileUploadProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export const FileUpload = ({ value, onChange, className }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    },
  });

  const removeFile = () => {
    onChange(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  return (
    <div className={twMerge("w-full", className)}>
      {value && preview ? (
        <div className="relative w-full h-64">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background/90"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
          <Image
            src={preview}
            alt="Preview"
            className="object-contain rounded-lg"
            fill
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={twMerge(
            "w-full p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
            isDragActive
              ? "border-primary/50 bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-sm text-muted-foreground">Drop the file here</p>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or JPEG (max. 1 file)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};