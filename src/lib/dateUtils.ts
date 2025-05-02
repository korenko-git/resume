/**
 * Formats a date string in YYYY-MM format to a human-readable format (Month Year)
 * 
 * @param dateString - The date string in YYYY-MM format
 * @returns Formatted date string (e.g., "January 2023") or empty string if input is invalid
 */
export function formatDate(dateString: string): string {
  if (!dateString || dateString.length < 7) return '';
  
  const [year, month] = dateString.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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
  if (!dateString) return '';
  return dateString.slice(0, 7);
}