import { Textarea } from '@/components/ui/textarea';

interface EditableContentProps {
  isEditing: boolean;
  data: {
    description: string;
    isPublished?: boolean;
    skills?: string[];
  };
  onDataChange: (data: any) => void;
  editable?: boolean;
  onEditStart?: () => void;
}

export function EditableContent({
  isEditing,
  data,
  onDataChange,
  onEditStart
}: EditableContentProps) {
  return (
    <>
      {isEditing ? (
        <Textarea
          value={data.description}
          onChange={(e) => onDataChange({ ...data, description: e.target.value })}
          className="mb-4"
        />
      ) : (
        <div className={isEditing ? 'cursor-pointer' : ''} onClick={onEditStart}>
          {data.description}
        </div>
      )}
    </>
  );
}