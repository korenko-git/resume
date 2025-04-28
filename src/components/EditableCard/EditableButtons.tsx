
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface EditableContentProps {
  data: {
    description: string;
    isPublished?: boolean;
    skills?: string[];
  };
  onUpdate: () => void;
  onCancel: () => void;
  children?: ReactNode;
  onDataChange: (data: any) => void;
  editable?: boolean;
  onEditStart?: () => void;
}

export function EditableButtons({
  data,
  onUpdate,
  onCancel,
  onDataChange,
}: EditableContentProps) {
  return (
    <>
      <div className="flex items-center gap-4 mt-4 swtich-publish">
        <Switch
          checked={data.isPublished}
          onCheckedChange={(checked) =>
            onDataChange({ ...data, isPublished: checked })
          }
        />
        <span>Published</span>
      </div>
      <div className="mt-4 flex gap-2 save-cancel-buttons">
        <Button onClick={onUpdate} variant="default">
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" className='cancel-button'>
          Cancel
        </Button>
      </div>
    </>
  );
}