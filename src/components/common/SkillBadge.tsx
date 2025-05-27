import { Badge } from "@/components/common/ui/badge";
import { getSkillBadgeClassName } from "@/lib/skillBadgeUtils";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/entries";

interface SkillBadgeProps {
  skill: Skill;
  variant?: "default" | "editor" | "resume";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function SkillBadge({
  skill,
  variant = "default",
  onClick,
  children,
  className,
}: SkillBadgeProps) {
  const isClickable = !!onClick;
  const isResumeVariant = variant === "resume";

  const badgeClassName = cn(
    "transition-colors duration-400 ease-in-out",
    isClickable && "cursor-pointer group",
    isResumeVariant
      ? cn(
          "border-border border-opacity-70 bg-muted/30 text-muted-foreground lg:group-hover:text-foreground flex items-center rounded-full border px-3 py-1 text-xs leading-5 font-medium shadow",
          getSkillBadgeClassName(skill.category || "uncategorized", "", true),
        )
      : getSkillBadgeClassName(skill.category || "uncategorized"),
    className,
  );

  if (variant === "resume") {
    return (
      <div className={badgeClassName} onClick={onClick}>
        {skill.id}
        {children}
      </div>
    );
  }

  return (
    <Badge variant="secondary" className={badgeClassName} onClick={onClick}>
      {skill.id}
      {children}
    </Badge>
  );
}
