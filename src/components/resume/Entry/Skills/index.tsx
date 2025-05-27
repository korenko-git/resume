import { useMemo } from "react";

import { SkillBadge } from "@/components/common/SkillBadge";
import { sortSkills } from "@/lib/skillUtils";
import { Skill } from "@/types/entries";

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const sortedSkills = useMemo(() => {
    if (!skills || skills.length === 0) return [];
    return sortSkills(skills);
  }, [skills]);

  if (sortedSkills.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
      {sortedSkills.map((skill: Skill) => (
        <li className="mt-2 mr-1.5" key={skill.id}>
          <SkillBadge skill={skill} variant="resume" />
        </li>
      ))}
    </ul>
  );
}
