"use client";

import { getAssetPath } from "@/lib/assetPath";

interface ImageHeaderProps {
  className: string;
  title?: string;
  image?: string;
}

const fallback = getAssetPath("/images/placeholder-logo.png");
export function ImageHeader({ className, title, image }: ImageHeaderProps) {
  return (
    <header className={className} aria-label={title}>
      <img
        src={image ? getAssetPath(image) : fallback}
        alt={title}
        loading="lazy"
        width="200"
        height="48"
        className="border-border/10 group-hover:border-border/30 aspect-video rounded border-2 object-cover transition sm:order-1 sm:col-span-2 sm:translate-y-1 lg:grayscale lg:group-hover:grayscale-0"
        onError={(e) => {
          e.currentTarget.src = fallback;
          e.currentTarget.onerror = null;
        }}
      />
    </header>
  );
}
