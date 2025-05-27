import { SkillCategoryType } from "@/constants/skills";
import { cn } from "@/lib/utils";

const SKILL_COLORS = {
  coreFrontend: {
    normal: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    resume: "lg:group-hover:bg-blue-100 lg:group-hover:text-blue-800",
  },
  coreBackend: {
    normal: "bg-green-100 text-green-800 hover:bg-green-200",
    resume: "lg:group-hover:bg-green-100 lg:group-hover:text-green-800",
  },
  language: {
    normal: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    resume: "lg:group-hover:bg-purple-100 lg:group-hover:text-purple-800",
  },
  database: {
    normal: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    resume: "lg:group-hover:bg-orange-100 lg:group-hover:text-orange-800",
  },
  devOps: {
    normal: "bg-red-100 text-red-800 hover:bg-red-200",
    resume: "lg:group-hover:bg-red-100 lg:group-hover:text-red-800",
  },
  testing: {
    normal: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    resume: "lg:group-hover:bg-yellow-100 lg:group-hover:text-yellow-800",
  },
  tooling: {
    normal: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    resume: "lg:group-hover:bg-gray-100 lg:group-hover:text-gray-800",
  },
  uncategorized: {
    normal: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    resume: "lg:group-hover:bg-slate-100 lg:group-hover:text-slate-800",
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
