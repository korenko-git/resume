import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight } from "lucide-react";

interface ProjectTitleProps {
  data: { title: string; demo?: string; source?: string };
  isEditing: boolean;
  editable: boolean;
  onDataChange: (data: Partial<ProjectTitleProps["data"]>) => void;
}
export function ProjectTitle({
  data,
  isEditing,
  editable,
  onDataChange,
}: ProjectTitleProps) {
  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label>Project Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onDataChange({ title: e.target.value })}
            placeholder="Enter project title"
            className="font-medium leading-snug"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Demo Link</Label>
          <Input
            value={data.demo || ""}
            onChange={(e) => onDataChange({ demo: e.target.value })}
            placeholder="https://example.com/demo"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label>Source Link</Label>
          <Input
            value={data.source || ""}
            onChange={(e) => onDataChange({ source: e.target.value })}
            placeholder="https://github.com/user/repo"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
        {data.title}
      </h3>

      <div className="flex gap-4">
        {data.demo && (
          <a
            href={data.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link  inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
            aria-label={`Demo of ${data.title} (opens in a new tab)`}
          >
            {!editable && (
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            )}
            <span className="inline-block">
              Demo
              <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
            </span>
          </a>
        )}

        {data.source && (
          <a
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
            aria-label={`Source of ${data.title} (opens in a new tab)`}
          >
            <span className="inline-block">
              Source
              <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
