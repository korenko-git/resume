import { Save } from "lucide-react";

import { Button } from "@/components/common/ui/button";
import { EntryBlock } from "@/components/resume/Entry";
import { ResumeDataWithEntries } from "@/types/resume";

interface FormPreviewProps {
  formData: ResumeDataWithEntries;
  onEdit: () => void;
  onSave: () => void;
}

export function FormPreview({ formData, onEdit, onSave }: FormPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button onClick={onEdit} variant="outline" className="mr-2">
          Edit
        </Button>
        <Button onClick={onSave} className="save-button">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
      <div className="border rounded-lg p-4">
        <EntryBlock entryData={formData} />
      </div>
    </div>
  );
}
