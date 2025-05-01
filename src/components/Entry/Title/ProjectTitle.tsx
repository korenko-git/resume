import { EditableField } from "@/components/Editable/fields/EditableField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <EditableField
      value={data}
      isEditing={isEditing}
      onChange={onDataChange}
      className="w-full"
      renderDisplay={(value) => (
        <div className="flex flex-col">
          <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
            {value.title}
          </h3>

          <div className="flex gap-4" role="list" aria-label="Project links">
            {value.demo && (
              <Link
                href={value.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
                aria-label={`Demo of ${value.title} (opens in a new tab)`}
                role="listitem"
              >
                {!editable && (
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                )}
                <span className="inline-block">
                  Demo
                  <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true" />
                </span>
              </Link>
            )}

            {value.source && (
              <Link
                href={value.source}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
                aria-label={`Source of ${value.title} (opens in a new tab)`}
                role="listitem"
              >
                <span className="inline-block">
                  Source
                  <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
      renderEdit={(value, onChange) => (
        <div className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              value={value.title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              placeholder="Enter project title"
              className="font-medium leading-snug"
              aria-required="true"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="demo-link">Demo Link</Label>
            <Input
              id="demo-link"
              value={value.demo || ""}
              onChange={(e) => onChange({ ...value, demo: e.target.value })}
              placeholder="https://example.com/demo"
              type="url"
              aria-describedby="demo-link-desc"
            />
            <span id="demo-link-desc" className="sr-only">URL to the live demo of your project</span>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="source-link">Source Link</Label>
            <Input
              id="source-link"
              value={value.source || ""}
              onChange={(e) => onChange({ ...value, source: e.target.value })}
              placeholder="https://github.com/user/repo"
              type="url"
              aria-describedby="source-link-desc"
            />
            <span id="source-link-desc" className="sr-only">URL to the source code repository</span>
          </div>
        </div>
      )}
    />
  );
}
