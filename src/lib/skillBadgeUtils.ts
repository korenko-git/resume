import { SkillCategoryType } from "@/constants/skills";
import { cn } from "@/lib/utils";

const SKILL_COLORS = {
  coreFrontend: {
    normal: "bg-skill-core-frontend text-skill-core-frontend-text hover:bg-skill-core-frontend-hover border border-skill-core-frontend-text/20",
    resume: "lg:group-hover:bg-skill-core-frontend lg:group-hover:text-skill-core-frontend-text lg:group-hover:border-skill-core-frontend-text/20",
  },
  coreBackend: {
    normal: "bg-skill-core-backend text-skill-core-backend-text hover:bg-skill-core-backend-hover border border-skill-core-backend-text/20",
    resume: "lg:group-hover:bg-skill-core-backend lg:group-hover:text-skill-core-backend-text lg:group-hover:border-skill-core-backend-text/20",
  },
  language: {
    normal: "bg-skill-language text-skill-language-text hover:bg-skill-language-hover border border-skill-language-text/20",
    resume: "lg:group-hover:bg-skill-language lg:group-hover:text-skill-language-text lg:group-hover:border-skill-language-text/20",
  },
  database: {
    normal: "bg-skill-database text-skill-database-text hover:bg-skill-database-hover border border-skill-database-text/20",
    resume: "lg:group-hover:bg-skill-database lg:group-hover:text-skill-database-text lg:group-hover:border-skill-database-text/20",
  },
  devOps: {
    normal: "bg-skill-devops text-skill-devops-text hover:bg-skill-devops-hover border border-skill-devops-text/20",
    resume: "lg:group-hover:bg-skill-devops lg:group-hover:text-skill-devops-text lg:group-hover:border-skill-devops-text/20",
  },
  testing: {
    normal: "bg-skill-testing text-skill-testing-text hover:bg-skill-testing-hover border border-skill-testing-text/20",
    resume: "lg:group-hover:bg-skill-testing lg:group-hover:text-skill-testing-text lg:group-hover:border-skill-testing-text/20",
  },
  tooling: {
    normal: "bg-skill-tooling text-skill-tooling-text hover:bg-skill-tooling-hover border border-skill-tooling-text/20",
    resume: "lg:group-hover:bg-skill-tooling lg:group-hover:text-skill-tooling-text lg:group-hover:border-skill-tooling-text/20",
  },
  uncategorized: {
    normal: "bg-skill-uncategorized text-skill-uncategorized-text hover:bg-skill-uncategorized-hover border border-skill-uncategorized-text/20",
    resume: "lg:group-hover:bg-skill-uncategorized lg:group-hover:text-skill-uncategorized-text lg:group-hover:border-skill-uncategorized-text/20",
  },
} as const;

export function getSkillBadgeColors(
  category: SkillCategoryType | string,
): string {
  return (
    SKILL_COLORS[category as keyof typeof SKILL_COLORS]?.normal ||
    SKILL_COLORS.uncategorized.normal
  );
}

export function getResumeSkillColors(
  category: SkillCategoryType | string,
): string {
  return (
    SKILL_COLORS[category as keyof typeof SKILL_COLORS]?.resume ||
    SKILL_COLORS.uncategorized.resume
  );
}

export function getSkillBadgeClassName(
  category: SkillCategoryType | string,
  baseClasses: string = "",
  isHoverOnly: boolean = false,
): string {
  if (isHoverOnly) {
    return cn(baseClasses, getResumeSkillColors(category));
  }

  const colorClasses = getSkillBadgeColors(category);
  return cn(baseClasses, colorClasses);
}
