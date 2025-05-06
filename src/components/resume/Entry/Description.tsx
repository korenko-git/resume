import { LinkIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface DescriptionProps {
  data: { description: string };
}

export function Description({ data }: DescriptionProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children, ...props }) => (
          <a
            className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-blue-300 focus-visible:text-blue-300"
            href={href}
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${children} (opens in a new tab)`}
          >
            <LinkIcon className="w-4 h-4 mr-2"/>
            <span>{children}</span>
          </a>
        ),
      }}
    >
      {data.description}
    </ReactMarkdown>
  );
}
