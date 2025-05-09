import { DateHeader } from "./DateHeader";
import { ImageHeader } from "./ImageHeader";

interface EntryHeaderProps {
  data: {
    date?: string;
    startDate?: string;
    endDate?: string;
    image?: string;
    title?: string;
    [key: string]: any;
  };
}

export const EntryHeader = ({ data }: EntryHeaderProps) => {
  const className =
    "z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 sm:col-span-2 lg:group-hover:text-slate-900 dark:lg:group-hover:text-slate-200 editable-header";

  if ("date" in data || "startDate" in data) {
    return (
      <DateHeader
        className={className}
        startDate={data.startDate}
        endDate={data.endDate}
        date={data.date}
      />
    );
  } else {
    return (
      <ImageHeader
        className={className}
        image={data.image}
        title={data.title}
      />
    );
  }
};
