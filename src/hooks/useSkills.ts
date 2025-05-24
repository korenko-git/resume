import { useCallback } from "react";
import { toast } from "sonner";

import { useResume } from "@/contexts/ResumeContext";
import { sortSkills } from "@/lib/skillUtils";
import { entityRelationships } from "@/types/relationships";
import { ResumeData, ResumeDataKeysWithEntries } from "@/types/resume";
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
    [data, currentSkills, updateDraft],
  );

  const removeSkill = useCallback(
    (skillIdToRemove: string) => {
      const skillIdLower = skillIdToRemove.toLowerCase();
      const updatedSkillsList = sortSkills(
        currentSkills.filter((s) => s.id.toLowerCase() !== skillIdLower),
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
    [data, currentSkills, updateDraft],
  );

  const smartRemoveSkill = useCallback(
    (
      skillIdToRemove: string,
      action: "delete" | "rename" | "changeCategory",
      newName?: string,
      newCategory?: SkillCategoryType,
    ) => {
      const skillIdLower = skillIdToRemove.toLowerCase();
      let updatedData = { ...data };

      if (action === "rename" && newName) {
        const existingSkill = currentSkills.find(
          (s) => s.id.toLowerCase() === newName.toLowerCase(),
        );

        if (existingSkill && existingSkill.id.toLowerCase() !== skillIdLower) {
          updatedData = renameSkillEverywhere(
            updatedData,
            skillIdToRemove,
            existingSkill.id,
          );
          updatedData.skills.entries = updatedData.skills.entries.filter(
            (s) => s.id.toLowerCase() !== skillIdLower,
          );
          toast.success(
            `Merged "${skillIdToRemove}" with existing "${existingSkill.id}"`,
          );
        } else {
          updatedData = renameSkillEverywhere(
            updatedData,
            skillIdToRemove,
            newName,
          );
          const skillIndex = updatedData.skills.entries.findIndex(
            (s) => s.id.toLowerCase() === skillIdLower,
          );
          if (skillIndex >= 0) {
            updatedData.skills.entries[skillIndex] = {
              ...updatedData.skills.entries[skillIndex],
              id: newName,
            };
          }
          toast.success(
            `Renamed "${skillIdToRemove}" to "${newName}" everywhere`,
          );
        }
      } else if (action === "changeCategory" && newCategory) {
        const skillIndex = updatedData.skills.entries.findIndex(
          (s) => s.id.toLowerCase() === skillIdLower,
        );
        if (skillIndex >= 0) {
          updatedData.skills.entries[skillIndex] = {
            ...updatedData.skills.entries[skillIndex],
            category: newCategory,
          };
          toast.success(
            `Changed category of "${skillIdToRemove}" to "${newCategory}"`,
          );
        }
      } else {
        updatedData = removeSkillEverywhere(updatedData, skillIdToRemove);
        updatedData.skills.entries = updatedData.skills.entries.filter(
          (s) => s.id.toLowerCase() !== skillIdLower,
        );
        toast.success(`Deleted "${skillIdToRemove}" from everywhere`);
      }

      updatedData.skills.entries = sortSkills(updatedData.skills.entries);
      updateDraft(updatedData);
    },
    [data, currentSkills, updateDraft],
  );

  const removeSkillEverywhere = (
    resumeData: ResumeData,
    skillId: string,
  ): ResumeData => {
    const updatedData = { ...resumeData };
    const skillRelations = entityRelationships.skills.referencedIn;

    skillRelations.forEach(({ type, field }) => {
      const entityType = type as ResumeDataKeysWithEntries;
      if (updatedData[entityType]?.entries) {
        updatedData[entityType] = {
          ...updatedData[entityType],
          entries: updatedData[entityType].entries.map((entity: any) => {
            if (entity[field] && Array.isArray(entity[field])) {
              return {
                ...entity,
                [field]: entity[field].filter(
                  (skill: string) =>
                    skill.toLowerCase() !== skillId.toLowerCase(),
                ),
              };
            }
            return entity;
          }),
        };
      }
    });

    return updatedData;
  };

  const renameSkillEverywhere = (
    resumeData: ResumeData,
    oldSkillId: string,
    newSkillId: string,
  ): ResumeData => {
    const updatedData = { ...resumeData };
    const skillRelations = entityRelationships.skills.referencedIn;

    skillRelations.forEach(({ type, field }) => {
      const entityType = type as ResumeDataKeysWithEntries;
      if (updatedData[entityType]?.entries) {
        updatedData[entityType] = {
          ...updatedData[entityType],
          entries: updatedData[entityType].entries.map((entity: any) => {
            if (entity[field] && Array.isArray(entity[field])) {
              return {
                ...entity,
                [field]: entity[field].map((skill: string) =>
                  skill.toLowerCase() === oldSkillId.toLowerCase()
                    ? newSkillId
                    : skill,
                ),
              };
            }
            return entity;
          }),
        };
      }
    });

    return updatedData;
  };

  return {
    skills: sortSkills(currentSkills),
    addSkills,
    removeSkill,
    smartRemoveSkill,
  };
};
