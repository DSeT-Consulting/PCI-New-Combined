import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS classes efficiently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string {
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Formats a date range (start and end dates)
 * @param startDate - ISO date string for start date
 * @param endDate - ISO date string for end date
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string {
  const start = new Date(startDate).toLocaleDateString('en-US', options);
  const end = new Date(endDate).toLocaleDateString('en-US', options);
  return `${start} - ${end}`;
}

/**
 * Calculates days remaining until a given date
 * @param dateString - ISO date string
 * @returns Number of days remaining
 */
export function getDaysRemaining(dateString: string): number {
  const today = new Date();
  const targetDate = new Date(dateString);
  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Converts a country code to a flag emoji
 * @param countryCode - Two-letter country code (ISO 3166-1 alpha-2)
 * @returns Flag emoji for the country
 */
export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Adds skeletons or loading placeholders
 * @param count - Number of skeleton items to create
 * @param component - Component function that creates a skeleton
 * @returns Array of skeleton components
 */
export function createSkeletons<T>(count: number, component: () => T): T[] {
  return Array(count).fill(null).map((_, i) => component());
}