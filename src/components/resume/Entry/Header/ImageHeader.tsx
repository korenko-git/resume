
import { EditableField } from "@/components/editor/fields/EditableField";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { getAssetPath } from "@/lib/assetPath";
import { handleImageFileChange } from "@/lib/fileUtils";

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
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageFileChange(e, (base64) => {
      onDataChange({ ...data, image: base64 });
    });
  };

  return (
    <EditableField
      value={data}
      isEditing={isEditing}
      onChange={onDataChange}
      className={className}
      renderDisplay={(value) => (
        <header className={className} aria-label={value.title}>
          {value.image && (
            <img
              src={getAssetPath(value.image)}
              alt={value.title}
              loading="lazy"
              width="200"
              height="48"
              className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 lg:grayscale lg:group-hover:grayscale-0"
              onError={(e) => {
                e.currentTarget.src = getAssetPath(
                  "/images/placeholder-logo.png"
                );
                e.currentTarget.onerror = null;
              }}
            />
          )}
        </header>
      )}
      renderEdit={(value) => (
        <div className="grid w-full gap-2">
          <div className="grid w-full items-center gap-1.5">
            <Label>Image URL</Label>
            <Input
              type="file"
              accept="image/*"
              value={value.image}
              onChange={handleFileChange}
              className="max-w-[150px]"
              aria-label="Upload image"
            />
          </div>
        </div>
      )}
    />
  );
}
