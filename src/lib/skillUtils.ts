import { Skill, skillCategoryOrder,SkillCategoryType } from "@/types/skill";

export function sortSkills(skills: Skill[]): Skill[] {
  return [...skills].sort((a, b) => {
    const aCategory = a.category as SkillCategoryType;
    const bCategory = b.category as SkillCategoryType;

    const aIndex = skillCategoryOrder.indexOf(aCategory);
    const bIndex = skillCategoryOrder.indexOf(bCategory);

    if (aIndex === -1 && bIndex === -1) {
      if (aCategory === bCategory) {
        return a.id.localeCompare(b.id); 
      }
      return (aCategory as string).localeCompare(bCategory as string);
    }
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return a.id.localeCompare(b.id); 
  });
}