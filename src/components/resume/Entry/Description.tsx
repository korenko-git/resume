import ReactMarkdown from "react-markdown";

interface DescriptionProps {
  data: { description: string };
}

export function Description({ data }: DescriptionProps) {
  return <ReactMarkdown>{data.description}</ReactMarkdown>;
}
