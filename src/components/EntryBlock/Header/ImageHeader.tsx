import { EditableField } from "@/components/EditableField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <EditableField
      value={data}
      isEditing={isEditing}
      onChange={onDataChange}
      className={className}
      renderDisplay={(value) => (
        <header className={className} aria-label={value.title}>
          <img
            src={value.image}
            alt={value.title}
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
      )}
      renderEdit={(value, onChange) => (
        <div className="grid w-full gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label>Image URL</Label>
            <Input
              value={value.image}
              onChange={(e) => onChange({ ...value, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      )}
    />
  );
}
