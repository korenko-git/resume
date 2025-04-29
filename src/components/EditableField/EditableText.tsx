import { EditableField } from "./EditableField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}: EditableTextProps) {
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      renderDisplay={(value) => (
        <div className={cn("cursor-pointer", displayClassName)}>
          {value || placeholder}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="grid w-full gap-1.5">
          {label && <Label>{label}</Label>}
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  );
}