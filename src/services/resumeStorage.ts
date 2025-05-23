import { resumeSchema } from "@/lib/validationSchemas";
import { ResumeData } from "@/types/resume";

const RESUME_DRAFT_KEY = "resumeDraft";

export const resumeStorage = {
  saveDraft: (data: ResumeData): void => {
    try {
      const currentRootVersion = data.version || 0;
      const dataWithBumpedVersion: ResumeData = {
        ...data,
        version: currentRootVersion + 1,
      };
      localStorage.setItem(
        RESUME_DRAFT_KEY,
        JSON.stringify(dataWithBumpedVersion),
      );
    } catch (e) {
      console.error("Error saving draft:", e);
      throw e;
    }
  },

  getDraft: (): ResumeData | null => {
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
  },

  removeDraft: (): void => {
    localStorage.removeItem(RESUME_DRAFT_KEY);
  },
};
