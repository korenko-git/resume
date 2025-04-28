import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

interface DescriptionProps {
  className?: string;
  data: { description: string };
  isEditing: boolean;
  onDataChange: (data: Partial<{ description: string }>) => void;
  onEditStart: () => void;
}

export function Description({
  className,
  data,
  isEditing,
  onDataChange,
  onEditStart,
}: DescriptionProps) {
  if (isEditing) {
    return (
      <div className="grid w-full gap-1.5 mt-2">
        <Label >Description</Label>
        <Textarea
          id="description-edit"
          value={data.description}
          onChange={(e) => onDataChange({ description: e.target.value })}
          className={cn("mt-2 text-sm leading-normal font-mono", className, "mt-0")}
          placeholder="Markdown formatting is supported..."
          rows={5}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-2 text-sm leading-normal prose prose-sm dark:prose-invert max-w-none",
        className,
        isEditing && "cursor-pointer"
      )}
      onClick={onEditStart}
    >
      <ReactMarkdown>{data.description}</ReactMarkdown>
    </div>
  );
}
