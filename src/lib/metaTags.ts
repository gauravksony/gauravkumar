/**
 * Utility functions for generating meta tags
 */

// Base domain for all URLs
export const BASE_URL = "https://gauravkumar.dev";

// Default image to use when no image is provided
export const DEFAULT_IMAGE =
  "https://whnwzoxwuipgmwkqcops.supabase.co/storage/v1/object/public/project_images//1732425738630.jpg";

// Site name for Open Graph tags
export const SITE_NAME = "Gaurav Kumar";

// Twitter handle
export const TWITTER_HANDLE = "@gauravkumarsony";

// Default description
export const DEFAULT_DESCRIPTION =
  "Gaurav Kumar | Full Stack Developer and AI/ML Enthusiast skilled in React, Node.js, Python, C++, SQL, and DSA.";

/**
 * Get the absolute URL for a path
 * @param path - Relative path (e.g., /blogs/123)
 * @returns Full URL (e.g., https://gauravkumar.dev/blogs/123)
 */
export const getAbsoluteUrl = (path: string): string => {
  // Remove leading slash if it exists
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

/**
 * Format a date for use in meta tags
 * @param dateString - ISO date string
 * @returns Formatted date string for meta tags
 */
export const formatMetaDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    return dateString;
  }
};
