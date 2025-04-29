import { Button } from "@/components/ui/button";
import { EditableSwitch } from "./EditableSwitch";
import { Loader2 } from "lucide-react";

interface EditableButtonsProps {
  isPublished?: boolean;
  onPublishedChange?: (value: boolean) => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving?: boolean;
}

export function EditableButtons({
  isPublished,
  onPublishedChange,
  onSave,
  onCancel,
  isSaving = false,
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
        <Button 
          onClick={onSave} 
          variant="default" 
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outline" 
          className="cancel-button"
          disabled={isSaving}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}