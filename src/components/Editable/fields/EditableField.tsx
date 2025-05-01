import { ReactNode, KeyboardEvent } from "react";

export interface EditableFieldProps<T> {
  value: T;
  isEditing: boolean;
  onChange: (value: T) => void;
  onEditStart?: () => void;
  renderDisplay: (value: T) => ReactNode;
  renderEdit: (value: T, onChange: (value: T) => void) => ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function EditableField<T>({
  value,
  isEditing,
  onChange,
  onEditStart,
  renderDisplay,
  renderEdit,
  className,
  ariaLabel,
}: EditableFieldProps<T>) {
  if (isEditing) {
    return (
      <div
        className={className}
        role="form"
        aria-label={ariaLabel || "Edit form"}
      >
        {renderEdit(value, onChange)}
      </div>
    );
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEditStart?.();
    }
  };

  return (
    <div
      className={className}
      onClick={onEditStart}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || "Click to edit"}
    >
      {renderDisplay(value)}
    </div>
  );
}
