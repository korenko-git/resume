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

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Input
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
          className="text-xs text-blue-500 hover:underline block truncate"
        >
          {value}
        </a>
      )}
    </div>
  );
}
