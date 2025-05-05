import { cn } from "@/lib/utils";
import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import EntryHeader from "./Header/EntryHeader";
import EntryTitle from "./Title/EntryTitle";
import { Description } from "./Description";
import Skills from "./Skills";
import { useResume } from "@/contexts/ResumeContext";
import { getEntity } from "@/lib/entityUtils";

interface EntryBlockProps {
  id: string;
  typeData: ResumeDataKeysWithEntries;
  editable?: boolean;
  customData?: ResumeDataWithEntries;
}

export default function EntryBlock({
  id,
  typeData,
  customData,
}: EntryBlockProps) {
  const { data: hookData } = useResume();

  const entryData = customData || getEntity(hookData, typeData, id);

  if (!entryData) return null;

  return (
    <>
      <div
        className={cn(
          "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
        )}
        role={"article"}
      >
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
          lg:group-hover:bg-slate-100 dark:lg:group-hover:bg-sky-400/10
          lg:group-hover:shadow-sm lg:group-hover:drop-shadow-lg"
          aria-hidden="true"
        />

        <EntryHeader data={entryData} />

        <div className="z-10 sm:col-span-6">
          <EntryTitle data={entryData} />
          <Description data={entryData} />
          <Skills data={entryData} />
        </div>
      </div>
    </>
  );
}
