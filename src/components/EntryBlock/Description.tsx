import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

interface DescriptionProps {
  className?: string;
  data: { description: string; }
}

export function Description({
  className,
  data,
}: DescriptionProps) {
  return (
    <div
      className={cn("mt-2 text-sm leading-normal", className)}
    >
      <ReactMarkdown>{data.description}</ReactMarkdown>
    </div>
  );
}