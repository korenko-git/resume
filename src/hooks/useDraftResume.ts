import { useCallback } from "react";

import { deepEqual, deepMerge } from "@/lib/utils";
import { resumeSchema } from "@/lib/validationSchemas";
import { ResumeData } from "@/types/resume";

const RESUME_DRAFT_KEY = "resumeDraft";

export function useDraftResume(currentData: ResumeData) {
  const getDraft = useCallback(() => {
    const savedDraft = localStorage.getItem(RESUME_DRAFT_KEY);
    if (!savedDraft) return null;
    try {
      const draft = JSON.parse(savedDraft);
      resumeSchema.parse(draft);
      return draft;
    } catch {
      localStorage.removeItem(RESUME_DRAFT_KEY);
      return null;
    }
  }, []);

  const hasNewerDraft = useCallback(() => {
    const draft = getDraft();
    if (!draft) return false;
    const draftVersion = Number(draft.version?.version) || 0;
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
    localStorage.removeItem(RESUME_DRAFT_KEY);
  }, []);

  const updateDraft = useCallback((updatedData: ResumeData) => {
    try {
      const currentRootVersion = updatedData.version || 0;
      const dataWithBumpedVersion: ResumeData = {
        ...updatedData,
        version: currentRootVersion + 1,
      };
      localStorage.setItem(RESUME_DRAFT_KEY, JSON.stringify(dataWithBumpedVersion));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { getDraft, hasNewerDraft, restoreDraft, removeDraft, updateDraft };
}