import { cn } from "@/lib/utils";
import { ResumeDataWithEntries, Skill } from "@/types/resume";

import { Description } from "./Description";
import { EntryHeader } from "./Header/EntryHeader";
import { Skills } from "./Skills";
import { EntryTitle } from "./Title/EntryTitle";

interface EntryBlockProps {
  entryData: ResumeDataWithEntries | null;
}

export function EntryBlock({ entryData }: EntryBlockProps) {
  if (!entryData) return null;

  return (
    <>
      <div
        className={cn(
          "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100",
        )}
        role={"article"}
      >
        <div
          className="lg:group-hover:bg-accent/10 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-sm lg:group-hover:drop-shadow-lg"
          aria-hidden="true"
        />

        <EntryHeader data={entryData} />

        <div className="z-10 sm:col-span-6">
          <EntryTitle data={entryData} />
          {"description" in entryData && (
            <Description data={entryData} className="mt-2" />
          )}
          {"skill" in entryData && (
            <Skills skills={entryData.skill as Skill[]} />
          )}
        </div>
      </div>
    </>
  );
}
