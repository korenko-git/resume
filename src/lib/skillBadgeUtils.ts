import { SkillCategoryType } from "@/constants/skills";

import { cn } from "./utils";

function buildSkillClass({
  category,
  variant,
}: {
  category: SkillCategoryType | string;
  variant: "normal" | "resume";
}) {
  const kebab = category.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  if (variant === "normal") {
    return cn(
      `bg-skill-${kebab} text-skill-${kebab}-text border-skill-${kebab}-text/20`,
      `hover:text-skill-${kebab} hover:bg-skill-${kebab}-text`,
    );
  }

  return cn(
    `lg:group-hover:bg-skill-${kebab}`,
    `lg:group-hover:text-skill-${kebab}-text`,
    `lg:group-hover:border-skill-${kebab}-text/20`,
  );
}

export function getSkillBadgeClassName(
  category: SkillCategoryType | string = "uncategorized",
  baseClasses: string = "",
  isHoverOnly = false,
) {
  const variant = isHoverOnly ? "resume" : "normal";
  return cn(baseClasses, buildSkillClass({ category, variant }));
}
