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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        p: ({ node, ...props }) => (
          <p className={cn("", className)} {...props} />
        ),
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
      }}
    >
      {data.description}
    </ReactMarkdown>
  );
}
