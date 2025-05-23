import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useDraftResume } from "@/hooks/useDraftResume";
import { getResume } from "@/lib/getResume";
import { ResumeData } from "@/types/resume";

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(getResume());
  const { updateDraft: updateDraftLocal } = useDraftResume(data);

  const updateDraft = useCallback(
    (updatedDataToSave: ResumeData) => {
      try {
        updateDraftLocal(updatedDataToSave);
        setData(updatedDataToSave);
        toast.success("Resume draft saved");
      } catch (e) {
        console.error("Error saving draft:", e);
        toast.error("Failed to save resume draft");
      }
    },
    [setData, updateDraftLocal]
  );

  return {
    data,
    setData,
    updateDraft,
  };
}
