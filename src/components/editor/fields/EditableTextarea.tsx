import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/common/ui/textarea";
import { Label } from "@/components/common/ui/label";
import { EditableField } from "./EditableField";
import { cn } from "@/lib/utils";

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
  id?: string;
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
  id,
}: EditableTextareaProps) {
  const textareaId = id || `editable-textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      ariaLabel={`Edit ${label || "text area"}`}
      renderDisplay={(value) => (
        <div 
          className={cn("cursor-pointer", displayClassName)}
          aria-label={`${label || "Content"}: ${value ? "Has content" : "Empty"}`}
        >
          {markdown ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            value || placeholder
          )}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="grid w-full gap-1.5">
          {label && <Label htmlFor={textareaId}>{label}</Label>}
          <Textarea
            id={textareaId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="font-mono"
            aria-label={label || "Text area input"}
            aria-required={false}
          />
        </div>
      )}
    />
  );
}