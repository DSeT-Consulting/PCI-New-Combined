import path from "path";

/**
 * Convert absolute file path to relative path for database storage
 * @param filePath - Absolute file path from multer
 * @returns Relative path starting with /uploads/
 */
export const getRelativeImagePath = (filePath: string): string => {
  if (!filePath) return "";

  // Extract the part after 'uploads'
  const uploadsIndex = filePath.indexOf("uploads");
  if (uploadsIndex === -1) return filePath;

  const relativePath = filePath.substring(uploadsIndex);
  return `/${relativePath.replace(/\\/g, "/")}`; // Ensure forward slashes
};

/**
 * Convert relative path to absolute path for file operations
 * @param relativePath - Relative path from database (/uploads/images/...)
 * @returns Absolute file path
 */
export const getAbsoluteImagePath = (relativePath: string): string => {
  if (!relativePath) return "";

  // Remove leading slash if present
  const cleanPath = relativePath.startsWith("/") ? relativePath.substring(1) : relativePath;
  return path.join(process.cwd(), cleanPath);
};

/**
 * Check if a file exists
 * @param filePath - File path to check
 * @returns boolean
 */
export const fileExists = (filePath: string): boolean => {
  const fs = require("fs");
  return fs.existsSync(filePath);
};
