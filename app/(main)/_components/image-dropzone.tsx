"use client";

import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing.utils";
import { useDropzone } from "@uploadthing/react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

export interface ImageFile {
  id: string;
  url: string;
  file: File;
  progress: number;
  uploadedUrl?: string;
}

interface ImageDropZoneProps {
  images: ImageFile[];
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number; // New prop for configurable max files
}

const ImageDropZone = ({
  images,
  setImages,
  onUploadComplete,
  maxFiles = Infinity, // Default to unlimited files
}: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (!res) return;

      const uploadedUrls = res.map((file) => file.url);

      setImages((prev) =>
        prev.map((img, index) => ({
          ...img,
          uploadedUrl: uploadedUrls[index] || "",
        }))
      );

      if (onUploadComplete) {
        onUploadComplete(uploadedUrls);
      }

      setIsUploading(false);
      setErrorMessage(null);
    },
    onUploadError: (error) => {
      setIsUploading(false);
      setErrorMessage(error.message || "Error uploading files");
      console.error("Upload error:", error);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const totalFiles = images.length + acceptedFiles.length;

      if (totalFiles > maxFiles) {
        setErrorMessage(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const newImages = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file: file,
        progress: 0,
      }));

      setImages((prev) => [...prev, ...newImages]);
      setIsDragging(false);
      setErrorMessage(null);

      startUpload(acceptedFiles);
    },
    [startUpload, setImages, images.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
    maxFiles: maxFiles,
    multiple: true, // Explicitly enable multiple file selection
  });

  const removeFile = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImages((prev) => prev.filter((img) => img.id !== id));
    },
    [setImages]
  );

  useEffect(() => {
    if (isUploading) {
      const progressIntervals = images.map((img) => {
        let progress = 0;

        const interval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress > 100) progress = 100;

          setImages((prev) =>
            prev.map((prevImg) =>
              prevImg.id === img.id ? { ...prevImg, progress } : prevImg
            )
          );

          if (progress === 100) {
            clearInterval(interval);
          }
        }, 500);

        return interval;
      });

      return () => {
        progressIntervals.forEach((interval) => clearInterval(interval));
      };
    }
  }, [isUploading, images, setImages]);

  return (
    <div className="space-y-4">
      <Label className="text-white">
        Photos {maxFiles !== Infinity && `(up to ${maxFiles})`}
      </Label>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-all duration-200",
          isDragging || isDragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-slate-600 hover:border-slate-500"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="p-4 bg-slate-700 rounded-full">
            <Upload className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-white">
              Drop multiple images here
            </p>
            <p className="text-sm text-slate-400">
              or click to browse from your computer
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Supported formats: JPEG, PNG, GIF
          </p>
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-slate-900">
                <div className="w-full h-full relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${img.url})` }}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!isUploading && (
                      <div
                        onClick={(e) => removeFile(img.id, e)}
                        className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  {/* Progress Bar */}
                  {isUploading && !img.uploadedUrl && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                      <Progress value={img.progress} className="h-1 w-full" />
                      <div className="text-xs text-white text-center mt-1">
                        {Math.round(img.progress)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
