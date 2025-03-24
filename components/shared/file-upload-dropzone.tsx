"use client";

import React, { useCallback, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface FileUploadDropzoneProps {
  onFileUpload?: (uploadedFile: File, imageUrl?: string) => void;
  isLoading?: boolean;
  maxFileSize?: number;
  allowMultiple?: boolean;
}

const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({
  onFileUpload,
  isLoading = false,
  maxFileSize = 4,
  allowMultiple = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [uploadErrors, setUploadErrors] = useState<{ [key: string]: string }>(
    {}
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) {
        setIsDragging(true);
      }
    },
    [isDragging]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const newFiles: File[] = Array.from(e.dataTransfer.files);
      if (newFiles.length > 0) {
        if (!allowMultiple) {
          // Replace existing files if multiple files are not allowed
          setFiles(newFiles.slice(0, 1));
        } else {
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
      }
    },
    [allowMultiple]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles: File[] = Array.from(e.target.files);
        if (newFiles.length > 0) {
          if (!allowMultiple) {
            // Replace existing files if multiple files are not allowed
            setFiles(newFiles.slice(0, 1));
          } else {
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
          }
        }
      }
    },
    [allowMultiple]
  );

  const removeFile = useCallback(
    (indexToRemove: number) => {
      setFiles(files.filter((_, index) => index !== indexToRemove));

      // Also clean up progress and error states for this file
      const fileKey = `${files[indexToRemove].name}-${indexToRemove}`;
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[fileKey];
        return newProgress;
      });

      setUploadErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fileKey];
        return newErrors;
      });
    },
    [files]
  );

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadPromises = files.map(async (file, index) => {
      const fileKey = `${file.name}-${index}`;
      try {
        // Check file size
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > maxFileSize) {
          throw new Error(`File size exceeds ${maxFileSize}MB limit`);
        }

        const formData = new FormData();
        formData.append("file", file);

        // Create XHR request to track progress
        const xhr = new XMLHttpRequest();

        // Create promise to handle response
        const uploadPromise = new Promise<string>((resolve, reject) => {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress((prev) => ({
                ...prev,
                [fileKey]: progress,
              }));
            }
          });

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                const imageUrl =
                  response.url || response.imageUrl || response.path;

                // Notify parent component about the upload
                if (onFileUpload && typeof onFileUpload === "function") {
                  onFileUpload(file, imageUrl);
                }
                
                resolve(imageUrl);
              } catch (error) {
                console.error("Error parsing response:", error);
                reject(new Error("Failed to parse response"));
              }
            } else {
              setUploadErrors((prev) => ({
                ...prev,
                [fileKey]: `Upload failed: ${
                  xhr.statusText || "Unknown error"
                }`,
              }));
              reject(new Error(xhr.statusText || "Unknown error"));
            }
          };

          xhr.onerror = () => {
            setUploadErrors((prev) => ({
              ...prev,
              [fileKey]: "Network error occurred",
            }));
            reject(new Error("Network error"));
          };
        });

        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/image";
        xhr.open("POST", url, true);
        xhr.withCredentials = true;
        xhr.send(formData);

        return uploadPromise;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setUploadErrors((prev) => ({
          ...prev,
          [fileKey]: errorMessage,
        }));
        throw error;
      }
    });

    try {
      await Promise.all(uploadPromises);

      if (!allowMultiple) {
        setFiles([]);
      }
    } catch (error) {
      console.error("Some uploads failed", error);
    } finally {
      setUploading(false);
    }
  };

  // Allow immediate upload of a single file
  const uploadSingleFile = useCallback(
    async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/image";
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        const imageUrl = data.url || data.imageUrl || data.path;

        // Notify parent component
        if (onFileUpload && typeof onFileUpload === "function") {
          onFileUpload(file, imageUrl);
        }

        return imageUrl;
      } catch (error) {
        console.error("Upload failed:", error);
        throw error;
      }
    },
    [onFileUpload]
  );

  // Handle immediate upload when a file is selected (if !allowMultiple)
  const handleImmediateUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!allowMultiple && e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFiles([file]);

        try {
          setUploading(true);
          await uploadSingleFile(file);
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setUploading(false);
        }
      } else {
        // Use normal file input handler for multiple files
        handleFileInput(e);
      }
    },
    [allowMultiple, handleFileInput, uploadSingleFile]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Determine if component is in a loading state (either internal or from parent)
  const isDisabled = uploading || isLoading;

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        } ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={!allowMultiple ? handleImmediateUpload : handleFileInput}
          multiple={allowMultiple}
          disabled={isDisabled}
        />

        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          {isDisabled ? (
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}

          <h3 className="text-lg font-medium text-gray-700">
            {isDisabled ? "Uploading..." : "Drag files here or click to upload"}
          </h3>
          <p className="text-sm text-gray-500">
            Upload any file type. Maximum file size: {maxFileSize}MB
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-md font-medium text-gray-700">
              {allowMultiple ? "Uploaded Files" : "Selected File"}
            </h4>
            {allowMultiple && (
              <button
                onClick={uploadFiles}
                disabled={isDisabled}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
              >
                {isDisabled ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload All"
                )}
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {files.map((file, index) => {
              const fileKey = `${file.name}-${index}`;
              const progress = uploadProgress[fileKey] || 0;
              const error = uploadErrors[fileKey];

              return (
                <li
                  key={fileKey}
                  className="flex flex-col p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between overflow-hidden">
                    <div className="flex items-center overflow-hidden">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium uppercase text-gray-500">
                          {file.name.split(".").pop()}
                        </span>
                      </div>
                      <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      disabled={isDisabled}
                      className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  {progress > 0 && (
                    <div className="w-full mt-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {progress}%
                      </p>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <p className="text-xs text-red-500 mt-2">{error}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadDropzone;
