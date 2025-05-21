export const skillCategoryOrder = [
  "language",
  "coreBackend",
  "coreFrontend",
  "database",
  "devOps",
  "testing",
  "tooling",
  "uncategorized",
] as const;

export type SkillCategoryType = (typeof skillCategoryOrder)[number];

export interface Skill {
  id: string;
  category: SkillCategoryType | string;
}
