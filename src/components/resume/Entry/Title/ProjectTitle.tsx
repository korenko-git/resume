import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ProjectTitleProps {
  data: { title: string; demo?: string; source?: string };
}

export function ProjectTitle({ data }: ProjectTitleProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-foreground leading-snug font-medium">{data.title}</h3>

      <div className="flex gap-4" role="list" aria-label="Project links">
        {data.demo && (
          <Link
            href={data.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link text-foreground hover:text-primary focus-visible:text-primary inline-flex items-baseline text-base leading-tight font-medium"
            aria-label={`Demo of ${data.title} (opens in a new tab)`}
            role="listitem"
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>

            <span className="inline-block">
              Demo
              <ArrowUpRight
                className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1 motion-reduce:transition-none"
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
            className="group/link text-foreground hover:text-primary focus-visible:text-primary relative inline-flex items-baseline text-base leading-tight font-medium"
            aria-label={`Source of ${data.title} (opens in a new tab)`}
            role="listitem"
          >
            <span className="inline-block">
              Source
              <ArrowUpRight
                className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
