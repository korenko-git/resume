/**
 * File utilities for working with files
 */

/**
 * Converts an image file to a base64 string
 * @param file File to convert
 * @returns Promise with the result as a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Handler for image file change events
 * @param e File input change event
 * @param onFileLoaded Callback function called after file is loaded
 */
export const handleImageFileChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  onFileLoaded: (base64: string) => void,
): Promise<void> => {
  const file = e.target.files?.[0];
  if (file) {
    try {
      const base64 = await fileToBase64(file);
      onFileLoaded(base64);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }
};
