export type SkillCategoryType =
  | "language"
  | "coreFrontend"
  | "coreBackend"
  | "database"
  | "devOps"
  | "testing"
  | "tooling"
  | "uncategorized";

export interface Skill {
  name: string;
  category: SkillCategoryType;
}