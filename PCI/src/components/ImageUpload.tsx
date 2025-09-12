import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  currentImageUrl?: string;
  onFileSelect: (file: File | null) => void;
  onImageRemove: () => void;
  disabled?: boolean;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onFileSelect,
  onImageRemove,
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    if (file?.type.startsWith("image/")) {
      setSelectedFile(file);
      onFileSelect(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Cleanup previous preview URL
      return () => URL.revokeObjectURL(url);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle remove image
  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    onFileSelect(null);
    onImageRemove();

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle click to open file dialog
  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Get display image URL
  const displayImageUrl = previewUrl || currentImageUrl;
  const hasImage = displayImageUrl && displayImageUrl.trim() !== "";

  return (
    <div className={`relative ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload area */}
      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200
          ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
          ${hasImage ? "border-solid" : ""}
        `}
      >
        {hasImage ? (
          // Image preview
          <div className="relative">
            <img
              src={displayImageUrl}
              alt="Featured image"
              className="h-48 w-full object-cover"
            />

            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              disabled={disabled}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white shadow-lg hover:bg-red-700 disabled:opacity-50"
            >
              <X size={16} />
            </button>

            {/* Overlay with replace text */}
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-200 hover:bg-opacity-30">
              <div className="flex h-full items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100">
                <div className="rounded bg-white px-3 py-1 text-sm font-medium text-gray-800">
                  Click to replace
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Upload placeholder
          <div className="flex h-48 flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-3">
              {dragActive ? (
                <Upload className="h-6 w-6 text-blue-600" />
              ) : (
                <ImageIcon className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <div className="mb-2">
              <span className="text-sm font-medium text-gray-900">
                {dragActive
                  ? "Drop image here"
                  : "Click to upload featured image"}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              PNG, JPG, GIF, WebP up to 5MB
            </p>

            {dragActive && (
              <p className="mt-2 text-xs text-blue-600">Release to upload</p>
            )}
          </div>
        )}
      </div>

      {/* File info */}
      {selectedFile && (
        <div className="mt-2 flex items-center text-xs text-gray-600">
          <span className="truncate">
            New file: {selectedFile.name} (
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
