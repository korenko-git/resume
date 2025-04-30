import { Button } from "@/components/ui/button";
import { EditableSwitch } from "./EditableSwitch";
import { Loader2, Trash2 } from "lucide-react";

interface EditableButtonsProps {
  isPublished?: boolean;
  onPublishedChange?: (value: boolean) => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export function EditableButtons({
  isPublished,
  onPublishedChange,
  onSave,
  onCancel,
  onDelete,
  isSaving = false,
  isDeleting = false,
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
            id="published-switch"
          />
        </div>
      )}
      <div 
        className="mt-4 flex gap-2 save-cancel-buttons" 
        role="group" 
        aria-label="Form actions"
      >
        {onDelete && (
          <Button 
            onClick={onDelete} 
            variant="destructive" 
            className="mr-auto delete-button"
            disabled={isSaving || isDeleting}
            aria-busy={isDeleting}
            aria-label={isDeleting ? "Deleting..." : "Delete"}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Delete</span>
              </>
            )}
          </Button>
        )}
        <Button 
          onClick={onSave} 
          variant="default" 
          disabled={isSaving || isDeleting}
          aria-busy={isSaving}
          aria-label={isSaving ? "Saving..." : "Save"}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Saving...</span>
            </>
          ) : "Save"}
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outline" 
          className="cancel-button"
          disabled={isSaving || isDeleting}
          aria-label="Cancel changes"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}