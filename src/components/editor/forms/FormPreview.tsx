import { Save } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/common/ui/button";
import { EntryBlock } from "@/components/resume/Entry";
import { useResumeData } from "@/hooks/useResumeData";
import { getEntityFull } from "@/lib/entityUtils";
import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

interface FormPreviewProps {
  formData: ResumeDataWithEntries;
  entityType: ResumeDataKeysWithEntries;
  onEdit: () => void;
  onSave: () => void;
}

export function FormPreview({
  formData,
  entityType,
  onEdit,
  onSave,
}: FormPreviewProps) {
  const { data: resumeData } = useResumeData();

  const fullEntityData = useMemo(() => {
    if (!resumeData) return formData;

    const tempData = {
      ...resumeData,
      [entityType]: {
        ...resumeData[entityType],
        entries: [
          ...resumeData[entityType].entries.filter((e) => e.id !== formData.id),
          formData,
        ],
      },
    };

    return getEntityFull(tempData, entityType, formData.id) || formData;
  }, [formData, entityType, resumeData]);

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
      <div className="rounded-lg border p-4">
        <EntryBlock entryData={fullEntityData} />
      </div>
    </div>
  );
}
