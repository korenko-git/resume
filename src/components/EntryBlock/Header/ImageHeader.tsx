interface ImageHeaderProps {
  className: string;
  data: { title: string; image: string };
  isEditing?: boolean;
  onDataChange: (data: Partial<ImageHeaderProps["data"]>) => void;
}

export function ImageHeader({
  className,
  data,
  isEditing = false,
  onDataChange,
}: ImageHeaderProps) {
  return (
    <header className={className} aria-label={data.title}>
      <img
        src={data.image}
        alt={data.title}
        loading="lazy"
        width="200"
        height="48"
        className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 lg:grayscale lg:group-hover:grayscale-0"
        onError={(e) => {
          e.currentTarget.src = "/images/placeholder-logo.png";
          e.currentTarget.onerror = null;
        }}
      />
    </header>
  );
}
