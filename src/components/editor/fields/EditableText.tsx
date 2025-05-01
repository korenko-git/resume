import { EditableField } from "./EditableField";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onEditStart?: () => void;
  label?: string;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  id?: string;
}

export function EditableText({
  value,
  isEditing,
  onChange,
  onEditStart,
  label,
  placeholder,
  className,
  displayClassName,
  id,
}: EditableTextProps) {
  const inputId = id || `editable-text-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      ariaLabel={`Edit ${label || "text"}`}
      renderDisplay={(value) => (
        <div className={cn("cursor-pointer", displayClassName)}>
          {value || placeholder}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="grid w-full gap-1.5">
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <Input
            id={inputId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={label || "Text input"}
            aria-required={false}
          />
        </div>
      )}
    />
  );
}