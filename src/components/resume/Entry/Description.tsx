import { LinkIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

interface DescriptionProps {
  data: { description: string };
  className?: string;
  hrefWithIcon?: boolean;
}

export function Description({
  data,
  className,
  hrefWithIcon,
}: DescriptionProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className={cn("", className)}>{children}</p>,
        a: ({ href, children, ...props }) => (
          <a
            className={cn(
              "hover:text-primary focus-visible:text-primary relative cursor-pointer",
              hrefWithIcon && "mt-2 inline-flex items-center",
              !hrefWithIcon && "border-primary/50 border-b",
            )}
            href={href}
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${children} (opens in a new tab)`}
          >
            {hrefWithIcon && <LinkIcon className="mr-2 h-4 w-4" />}
            <span>{children}</span>
          </a>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc pl-6"> {children}</ul>
        ),
      }}
    >
      {data.description}
    </ReactMarkdown>
  );
}
