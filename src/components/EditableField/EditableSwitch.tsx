import { EditableField } from "./EditableField";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface EditableSwitchProps {
  value: boolean;
  isEditing: boolean;
  onChange: (value: boolean) => void;
  onEditStart?: () => void;
  label: string;
  className?: string;
  displayClassName?: string;
}

export function EditableSwitch({
  value,
  isEditing,
  onChange,
  onEditStart,
  label,
  className,
  displayClassName,
}: EditableSwitchProps) {
  return (
    <EditableField
      value={value}
      isEditing={isEditing}
      onChange={onChange}
      onEditStart={onEditStart}
      className={className}
      renderDisplay={(value) => (
        <div className={cn("cursor-pointer", displayClassName)}>
          {label}: {value ? "Yes" : "No"}
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="flex items-center gap-4">
          <Switch
            checked={value}
            onCheckedChange={onChange}
          />
          <span>{label}</span>
        </div>
      )}
    />
  );
}