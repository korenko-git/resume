import { EditableField } from "./EditableField";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface EditableSwitchProps {
  value: boolean;
  isEditing: boolean;
  onChange: (value: boolean) => void;
  onEditStart?: () => void;
  label?: string;
  className?: string;
  displayClassName?: string;
  id?: string;
}

export function EditableSwitch({
  value,
  isEditing,
  onChange,
  onEditStart,
  label,
  className,
  displayClassName,
  id,
}: EditableSwitchProps) {
  const switchId = id || `editable-switch-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      ariaLabel={`Toggle ${label || "option"}`}
      renderDisplay={(value) => (
        <div className={cn("cursor-pointer", displayClassName)}>
          {label}: {value ? "Yes" : "No"}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="flex items-center gap-4">
          <Switch
            id={switchId}
            checked={value}
            onCheckedChange={onChange}
            aria-label={label}
            aria-checked={value}
          />
          <label htmlFor={switchId} className="cursor-pointer">{label}</label>
        </div>
      )}
    />
  );
}