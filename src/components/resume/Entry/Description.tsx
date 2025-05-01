import { EditableTextarea } from "@/components/editor/fields/EditableTextarea";


interface DescriptionProps {
  className?: string;
  data: { description: string };
  isEditing: boolean;
  onDataChange: (data: Partial<{ description: string }>) => void;
  onEditStart: () => void;
}

export function Description({
  className,
  data,
  isEditing,
  onDataChange,
  onEditStart,
}: DescriptionProps) {
  return (
    <EditableTextarea
      value={data.description}
      isEditing={isEditing}
      onChange={(value) => onDataChange({ description: value })}
      onEditStart={onEditStart}
      label="Description"
      placeholder="Markdown formatting is supported..."
      className={className}
      displayClassName="mt-2 text-sm leading-normal prose prose-sm dark:prose-invert max-w-none"
      rows={5}
      markdown={true}
    />
  );
}
