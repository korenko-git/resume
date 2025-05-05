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
 * Checks if a value is a base64 encoded image
 * @param value value to check
 * @returns true if the value is a base64 encoded image
 */
export function isBase64Image(value: any): boolean {
  return typeof value === 'string' && value.startsWith('data:image');
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
      
      if (isBase64Image(imageValue)) {
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

/**
 * Processes all image fields in an entry
 * @param entry entry to process
 * @param prefix prefix for the file name
 * @param imageFiles array to store image files
 * @returns processed entry
 */
export async function processEntryImages<T extends { id: string; [key: string]: any }>(
  entry: T,
  prefix: string,
  imageFiles: File[]
): Promise<T> {
  const processedEntry = { ...entry };
  
  for (const key in entry) {
    const value = entry[key];
    
    if (isBase64Image(value)) {
      const fileName = `${prefix}-${entry.id}-${key}.png`;
      const file = await convertBase64ImageToFile(value, fileName);
      imageFiles.push(file);
      
      (processedEntry as any)[key] = `images/${fileName}`;
    }
  }
  
  return processedEntry;
}

/**
 * Processes all entries in a section
 * @param entries array of entries
 * @param sectionPrefix prefix for the file name
 * @param imageFiles array to store image files
 * @returns processed array of entries
 */
export async function processAllEntryImages<T extends { id: string; [key: string]: any }>(
  entries: T[],
  sectionPrefix: string,
  imageFiles: File[]
): Promise<T[]> {
  return Promise.all(
    entries.map(entry => processEntryImages(entry, sectionPrefix, imageFiles))
  );
}