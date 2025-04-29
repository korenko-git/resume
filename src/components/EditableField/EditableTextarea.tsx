import { EditableField } from "./EditableField";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface EditableTextareaProps {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onEditStart?: () => void;
  label?: string;
  placeholder?: string;
  className?: string;
  displayClassName?: string;
  rows?: number;
  markdown?: boolean;
}

export function EditableTextarea({
  value,
  isEditing,
  onChange,
  onEditStart,
  label,
  placeholder,
  className,
  displayClassName,
  rows = 5,
  markdown = true,
}: EditableTextareaProps) {
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      renderDisplay={(value) => (
        <div className={cn("cursor-pointer", displayClassName)}>
          {markdown ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            value || placeholder
          )}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="grid w-full gap-1.5">
          {label && <Label>{label}</Label>}
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="font-mono"
          />
        </div>
      )}
    />
  );
}