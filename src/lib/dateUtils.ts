/**
 * Formats a date string in YYYY-MM format to a human-readable format (Month Year)
 *
 * @param dateString - The date string in YYYY-MM format
 * @returns Formatted date string (e.g., "January 2023") or empty string if input is invalid
 */
export function formatDate(dateString: string): string {
  if (!dateString || dateString.length < 7) return "";

  const [year, month] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} ${year}`;
}

/**
 * Formats a date string for use in input fields
 *
 * @param dateString - The date string to format
 * @returns Date string sliced to YYYY-MM format or empty string if input is empty
 */
export function formatDateForInput(dateString: string): string {
  if (!dateString) return "";
  return dateString.slice(0, 7);
}

/**
 * Formats a month using locale settings
 * @param date - Date object
 * @returns Formatted month string
 */
function formatMonth(date: Date): string {
  return date.toLocaleString("default", { month: "short" });
}

/**
 * Formats date range as a string based on start and end dates
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format or undefined for ongoing periods
 * @returns Formatted date range string
 */
export function getDateRangeString(
  startDate?: string,
  endDate?: string
): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  const startYear = start.getFullYear();

  // Ongoing period
  if (!endDate) {
    return `${startYear} - Present`;
  }

  const end = new Date(endDate);
  const endYear = end.getFullYear();

  // Same year
  if (startYear === endYear) {
    // Same month and year
    if (start.getMonth() === end.getMonth()) {
      return `${formatMonth(start)} ${startYear}`;
    }

    // Same year, different months
    return `${formatMonth(start)} - ${formatMonth(end)} ${startYear}`;
  }

  // Different years
  return `${startYear} - ${endYear}`;
}
