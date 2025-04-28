import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface EditableContentProps {
  isEditing: boolean;
  data: {
    description: string;
    isPublished?: boolean;
    skills?: string[];
  };
  onDataChange: (data: any) => void;
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
          className="mb-4 font-mono editable-content"
          placeholder="Поддерживается Markdown разметка..."
        />
      ) : (
        <div 
          className={cn(
            'prose prose-sm dark:prose-invert max-w-none mb-4',
            isEditing && 'cursor-pointer'
          )} 
          onClick={onEditStart}
        >
          <ReactMarkdown>{data.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
}