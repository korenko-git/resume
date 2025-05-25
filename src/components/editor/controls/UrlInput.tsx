import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { cn } from "@/lib/utils";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  showPreview?: boolean;
}

export function UrlInput({
  value,
  onChange,
  label,
  placeholder = "https://",
  className,
  required = false,
  disabled = false,
  showPreview = true,
}: UrlInputProps) {
  const isValidUrl = value && value.startsWith("http");
  const inputId = label ? `url-input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={inputId} className="text-sm font-medium">{label}</Label>}

      <Input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full pr-10"
      />

      {isValidUrl && showPreview && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-xs text-blue-500 hover:underline"
        >
          {value}
        </a>
      )}
    </div>
  );
}
