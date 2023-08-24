export default function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - date.getTime());
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "just now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 30) {
    return `${diffDays}d ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths}m ago`;
  } else {
    return `${diffYears}y ago`;
  }
}

/**
 * Formats a date string to "Month Year" format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string in "Month Year" format.
 */
export function formatDateString(date: Date): string {
  // const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}
