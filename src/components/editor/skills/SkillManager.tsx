import { useSkills } from "@/hooks/useSkills";

import { SkillCategory } from "./SkillCategory";
import { SKILL_CATEGORIES } from "./сonstants";

export function SkillManager() {
  const { skills, addSkills, removeSkill } = useSkills();

  return (
    <div className="space-y-6 mx-auto">
      {SKILL_CATEGORIES.map((cat) => {
        const categorySkills = skills.filter((s) => s.category === cat.name);

        return (
          <SkillCategory
            key={cat.name}
            category={cat}
            skills={categorySkills}
            onAdd={addSkills}
            onRemove={(skillId) => removeSkill(skillId)}
            clearMessages={() => {}}
          />
        );
      })}
    </div>
  );
}
