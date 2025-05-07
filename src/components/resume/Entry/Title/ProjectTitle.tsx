import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectTitleProps {
  data: { title: string; demo?: string; source?: string };
}

export function ProjectTitle({ data }: ProjectTitleProps) {
  return (
    <div className="flex flex-col">
      <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
        {data.title}
      </h3>

      <div className="flex gap-4" role="list" aria-label="Project links">
        {data.demo && (
          <Link
            href={data.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
            aria-label={`Demo of ${data.title} (opens in a new tab)`}
            role="listitem"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>

            <span className="inline-block">
              Demo
              <ArrowUpRight
                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              />
            </span>
          </Link>
        )}

        {data.source && (
          <Link
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link relative inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 text-base"
            aria-label={`Source of ${data.title} (opens in a new tab)`}
            role="listitem"
          >
            <span className="inline-block">
              Source
              <ArrowUpRight
                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
