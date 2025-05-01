/**
 * Gets the full asset path considering the base path from environment
 * @param path Asset path to process
 * @returns Complete asset path with base path prepended
 */
export function getAssetPath(path?: string) {
    if (!path) return '';
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}