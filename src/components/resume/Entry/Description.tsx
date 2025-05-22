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
              "cursor-pointer hover:text-primary focus-visible:text-primary",
              hrefWithIcon && "relative mt-2 inline-flex items-center",
              !hrefWithIcon && "border-b border-primary/50"
            )}
            href={href}
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${children} (opens in a new tab)`}
          >
            {hrefWithIcon && <LinkIcon className="w-4 h-4 mr-2" />}
            <span>{children}</span>
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-2"> {children}</ul>
        ),
      }}
    >
      {data.description}
    </ReactMarkdown>
  );
}
