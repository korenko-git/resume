import { ReactNode } from "react";

export interface EditableFieldProps<T> {
  value: T;
  isEditing: boolean;
  onChange: (value: T) => void;
  onEditStart?: () => void;
  renderDisplay: (value: T) => ReactNode;
  renderEdit: (value: T, onChange: (value: T) => void) => ReactNode;
  className?: string;
}

export function EditableField<T>({
  value,
  isEditing,
  onChange,
  onEditStart,
  renderDisplay,
  renderEdit,
  className,
}: EditableFieldProps<T>) {
  if (isEditing) {
    return <div className={className}>{renderEdit(value, onChange)}</div>;
  }

  return (
    <div 
      className={className} 
      onClick={onEditStart}
    >
      {renderDisplay(value)}
    </div>
  );
}