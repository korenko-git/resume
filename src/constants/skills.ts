import { SkillCategoryType } from "@/types/skill";

export const SKILL_OPTIONS: { value: SkillCategoryType; label: string }[] = [
  { value: "language", label: "language" },
  { value: "coreFrontend", label: "coreFrontend" },
  { value: "coreBackend", label: "coreBackend" },
  { value: "database", label: "database" },
  { value: "devOps", label: "devOps" },
  { value: "testing", label: "testing" },
  { value: "tooling", label: "tooling" },
  { value: "uncategorized", label: "uncategorized" },
];
