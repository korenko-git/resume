import { Button } from "@/components/ui/button";
import { EditableSwitch } from "./EditableSwitch";

interface EditableButtonsProps {
  isPublished?: boolean;
  onPublishedChange?: (value: boolean) => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function EditableButtons({
  isPublished,
  onPublishedChange,
  onSave,
  onCancel,
}: EditableButtonsProps) {
  return (
    <>
      {onPublishedChange && (
        <div className="mt-4">
          <EditableSwitch
            value={isPublished || false}
            isEditing={true}
            onChange={onPublishedChange}
            label="Published"
          />
        </div>
      )}
      <div className="mt-4 flex gap-2 save-cancel-buttons">
        <Button onClick={onSave} variant="default">
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" className="cancel-button">
          Cancel
        </Button>
      </div>
    </>
  );
}