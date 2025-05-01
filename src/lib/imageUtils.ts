/**
 * Utility for processing base64 encoded images
 */

/**
 * Converts a base64 image to a File object
 * @param base64Image base64 string of the image
 * @param fileName name of the file
 * @param fileType file type (default is image/png)
 * @returns Promise with a File object
 */
export async function convertBase64ImageToFile(
  base64Image: string,
  fileName: string,
  fileType: string = 'image/png'
): Promise<File> {
  const response = await fetch(base64Image);
  const blob = await response.blob();
  return new File([blob], fileName, { type: fileType });
}

/**
 * Processes an array of entries with images
 * @param entries array of entries
 * @param imageKey key containing the image
 * @param prefix prefix for the file name
 * @param imageFiles array to store image files
 * @returns processed array of entries
 */
export async function processEntriesWithImages<T extends { id: string; [key: string]: any }>(
  entries: T[],
  imageKey: keyof T,
  prefix: string,
  imageFiles: File[]
): Promise<T[]> {
  return Promise.all(
    entries.map(async (entry) => {
      const imageValue = entry[imageKey];
      
      if (typeof imageValue === 'string' && imageValue.startsWith('data:image')) {
        const fileName = `${prefix}-${entry.id}-${String(imageKey)}.png`;
        const file = await convertBase64ImageToFile(imageValue, fileName);
        imageFiles.push(file);

        return {
          ...entry,
          [imageKey]: `images/${fileName}`
        };
      }
      return entry;
    })
  );
}