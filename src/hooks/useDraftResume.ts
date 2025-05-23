import { useCallback } from "react";

import { deepEqual, deepMerge } from "@/lib/utils";
import { resumeStorage } from "@/services/resumeStorage";
import { ResumeData } from "@/types/resume";

export function useDraftResume(currentData: ResumeData) {
  const getDraft = useCallback(() => {
    return resumeStorage.getDraft();
  }, []);

  const hasNewerDraft = useCallback(() => {
    const draft = getDraft();
    if (!draft) return false;
    const draftVersion = Number(draft.version) || 0;
    const currentVersion = Number(currentData.version) || 0;
    if (draftVersion > currentVersion) {
      const draftWithoutVersion = { ...draft, version: undefined };
      const dataWithoutVersion = { ...currentData, version: undefined };
      return !deepEqual(draftWithoutVersion, dataWithoutVersion);
    }
    return false;
  }, [currentData, getDraft]);

  const restoreDraft = useCallback(() => {
    const draft = getDraft();
    if (!draft) return currentData;
    return deepMerge(currentData, draft);
  }, [currentData, getDraft]);

  const removeDraft = useCallback(() => {
    resumeStorage.removeDraft();
  }, []);

  const updateDraft = useCallback((updatedData: ResumeData) => {
    resumeStorage.saveDraft(updatedData);
  }, []);

  return { getDraft, hasNewerDraft, restoreDraft, removeDraft, updateDraft };
}
