export const skillCategoryOrder = [
  "language",
  "coreFrontend",
  "coreBackend",
  "database",
  "devOps",
  "testing",
  "tooling",
  "uncategorized",
] as const;

export type SkillCategoryType = (typeof skillCategoryOrder)[number];

export const SKILL_OPTIONS: { value: SkillCategoryType; label: string }[] = [
  { value: "language", label: "Programming Languages" },
  { value: "coreFrontend", label: "Frontend" },
  { value: "coreBackend", label: "Backend" },
  { value: "database", label: "Databases" },
  { value: "devOps", label: "DevOps" },
  { value: "testing", label: "Testing" },
  { value: "tooling", label: "Tools" },
  { value: "uncategorized", label: "Other" },
];
