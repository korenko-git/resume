import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { cn } from "@/lib/utils";

interface SortableSkillProps {
  skill: string;
  index: number;
  onRemove: (index: number) => void;
  sortMode: boolean;
}

export function SortableSkill({
  skill,
  index,
  onRemove,
  sortMode,
}: SortableSkillProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: skill });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Badge
      {...{ ref: setNodeRef }}
      style={style}
      variant="secondary"
      className={cn("flex items-center gap-1", sortMode && "cursor-move")}
      {...(sortMode ? { ...attributes, ...listeners } : {})}
    >
      {skill}
      {!sortMode && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 ml-1"
          onClick={() => onRemove(index)}
          aria-label={`Remove skill ${skill}`}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Badge>
  );
}
