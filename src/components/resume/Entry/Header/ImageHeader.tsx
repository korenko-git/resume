import { getAssetPath } from "@/lib/assetPath";

interface ImageHeaderProps {
  className: string;
  title?: string;
  image?: string;
}

export function ImageHeader({ className, title, image }: ImageHeaderProps) {
  return (
    <header className={className} aria-label={title}>
      {image && (
        <img
          src={getAssetPath(image)}
          alt={title}
          loading="lazy"
          width="200"
          height="48"
          className="border-border/10 group-hover:border-border/30 aspect-video rounded border-2 object-cover transition sm:order-1 sm:col-span-2 sm:translate-y-1 lg:grayscale lg:group-hover:grayscale-0"
          onError={(e) => {
            e.currentTarget.src = getAssetPath("/images/placeholder-logo.png");
            e.currentTarget.onerror = null;
          }}
        />
      )}
    </header>
  );
}
