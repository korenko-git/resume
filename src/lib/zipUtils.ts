import JSZip from 'jszip';

interface ZipManifest {
  submittedBy?: string;
  replacedImages?: string[];
}

// Define return type for better type safety
export async function createUpdateZip(
  jsonData: Record<string, any>,
  images: File[],
  manifest?: ZipManifest
): Promise<Blob> {
  const zip = new JSZip();

  // Add JSON data files
  const dataFolder = zip.folder('data');
  Object.entries(jsonData).forEach(([filename, content]) => {
    dataFolder?.file(`${filename}.json`, JSON.stringify(content, null, 2));
  });

  // Add images
  const imagesFolder = zip.folder('images');
  for (const image of images) {
    const buffer = await image.arrayBuffer();
    imagesFolder?.file(image.name, buffer);
  }

  // Add manifest if provided
  if (manifest) {
    zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  }

  return await zip.generateAsync({ type: 'blob' });
}