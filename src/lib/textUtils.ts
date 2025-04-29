/**
 * Calculates estimated read time for a given text
 * @param content The text content to calculate read time for
 * @param wordsPerMinute The average reading speed (default: 225 words per minute)
 * @returns Formatted read time string
 */
export function calculateReadTime(
  content: string,
  wordsPerMinute = 225
): string {
  // Remove HTML tags if present
  const textOnly = content.replace(/<[^>]*>/g, "");

  // Calculate word count
  const wordCount = textOnly.trim().split(/\s+/).length;

  // Calculate read time in minutes
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  // Format the read time
  return readTime <= 1 ? "1 min read" : `${readTime} min read`;
}

/**
 * Truncates text to a specific length and adds ellipsis
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength = 150): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength).trim();
  return `${truncated}...`;
}

/**
 * Converts HTML content to plain text
 * @param htmlContent HTML content to convert
 * @returns Plain text without HTML tags
 */
export function htmlToPlainText(htmlContent: string): string {
  return htmlContent.replace(/<[^>]*>/g, "");
}

export default {
  calculateReadTime,
  truncateText,
  htmlToPlainText,
};
