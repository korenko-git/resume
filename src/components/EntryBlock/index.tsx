import { useResume } from "@/contexts/ResumeContext";
import { ResumeDataKeysWithEntries, } from "@/types/resume";
import { useEffect, useState } from "react";
import { DateHeader } from "./Header/DateHeader";
import { ImageHeader } from "./Header/ImageHeader";
import { OrganizationTitle } from "./Title/OrganizationTitle";
import { ProjectTitle } from "./Title/ProjectTitle";
import { Description } from "./Description";
import Skills from "./Skills";

interface EntryBlockProps {
  id: string;
  typeData: ResumeDataKeysWithEntries;
  editable?: boolean;
}

export default function EntryBlock({
  id,
  typeData,
  editable = true
}: EntryBlockProps) {

  const { getEntryFromData, data } = useResume();
  const [entryData, setEntryData] = useState(getEntryFromData(typeData, id));

  useEffect(() => {
    setEntryData(getEntryFromData(typeData, id));
  }, [data]);

  if (!entryData) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (!editable) return;
    e.stopPropagation();
    console.log('click');
    
  }

  const Header = ('date' in entryData || 'startDate' in entryData) ? DateHeader : ImageHeader;

  return (
    <div onClick={handleClick} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
      lg:group-hover:bg-slate-100 dark:lg:group-hover:bg-sky-400/10
      lg:group-hover:shadow-sm lg:group-hover:drop-shadow-lg">
      </div>

      <Header
        className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 sm:col-span-2 
      lg:group-hover:text-slate-900 dark:lg:group-hover:text-slate-200"
        data={entryData as any}
      />

      <div className="z-10 sm:col-span-6">
        <div className="flex gap-x-2 items-center">
          {'organizationId' in entryData && <OrganizationTitle data={entryData as any} editable={editable} />}
          {('source' in entryData || 'demo' in entryData) && <ProjectTitle data={entryData as any} editable={editable} />}
        </div>

        <Description data={entryData as any} />

        {'skills' in entryData && <Skills data={entryData as any} />}
      </div>
    </div>

  );
}