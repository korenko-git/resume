import { useCallback } from "react";
import { toast } from "sonner";

import { useResume } from "@/contexts/ResumeContext";
import { sortSkills } from "@/lib/skillUtils";
import { ResumeData } from "@/types/resume";
import { Skill, SkillCategoryType } from "@/types/skill";

export const useSkills = () => {
  const { data, updateDraft } = useResume();

  const currentSkills = data.skills?.entries || [];

  const addSkills = useCallback(
    (category: SkillCategoryType, input: string) => {
      const newIds = input
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s);

      if (newIds.length === 0) return;

      const existingSkillIds = currentSkills.map((s) => s.id.toLowerCase());
      const uniqueNewSkillInputs = input
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s)
        .filter((id) => !existingSkillIds.includes(id.toLowerCase()));

      if (uniqueNewSkillInputs.length === 0) {
        toast.error("All entered skills already exist.");
        return;
      }

      const newSkillsToAdd: Skill[] = uniqueNewSkillInputs.map((id) => ({
        id,
        category,
      }));

      const updatedSkillsList = sortSkills([
        ...currentSkills,
        ...newSkillsToAdd,
      ]);

      const updatedResumeData: ResumeData = {
        ...data,
        skills: { entries: updatedSkillsList },
      };
      updateDraft(updatedResumeData);
      toast.success(`Added: ${uniqueNewSkillInputs.join(", ")}`);
    },
    [data, currentSkills, updateDraft]
  );

  const removeSkill = useCallback(
    (skillIdToRemove: string) => {
      const skillIdLower = skillIdToRemove.toLowerCase();
      const updatedSkillsList = sortSkills(
        currentSkills.filter((s) => s.id.toLowerCase() !== skillIdLower)
      );

      if (updatedSkillsList.length < currentSkills.length) {
        const updatedResumeData: ResumeData = {
          ...data,
          skills: { entries: updatedSkillsList },
        };
        updateDraft(updatedResumeData);
        toast.success(`Removed skill: ${skillIdToRemove}`);
      } else {
        toast.info(`Skill "${skillIdToRemove}" not found for removal.`);
      }
    },
    [data, currentSkills, updateDraft]
  );

  return {
    skills: sortSkills(currentSkills),
    addSkills,
    removeSkill,
  };
};
