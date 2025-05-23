import JSZip from "jszip";

/**
 * Interface defining the structure of the ZIP manifest
 */
interface ZipManifest {
  submittedBy?: string;
  replacedImages?: string[];
}

/**
 * Creates a ZIP archive with JSON data and images
 * @param jsonData Object containing JSON data to be included in the ZIP
 * @param images Array of image files to be included in the ZIP
 * @param manifest Optional manifest information
 * @returns Promise with the generated ZIP as a Blob
 */
export async function createUpdateZip(
  jsonData: Record<string, any>,
  images: File[],
  manifest?: ZipManifest,
): Promise<Blob> {
  const zip = new JSZip();

  // Add JSON data files
  const dataFolder = zip.folder("data");
  Object.entries(jsonData).forEach(([filename, content]) => {
    dataFolder?.file(`${filename}.json`, JSON.stringify(content, null, 2));
  });

  // Add images
  const imagesFolder = zip.folder("images");
  for (const image of images) {
    const buffer = await image.arrayBuffer();
    imagesFolder?.file(image.name, buffer);
  }

  // Add manifest if provided
  if (manifest) {
    zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  }

  return await zip.generateAsync({ type: "blob" });
}
