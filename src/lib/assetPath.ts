export function getAssetPath(path?: string) {
    if (!path) return '';
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
  }