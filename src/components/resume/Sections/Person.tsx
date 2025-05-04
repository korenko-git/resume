'use client';

import { useResume } from "@/contexts/ResumeContext";
import { AboutEntry } from "@/types/resume";
import { IconLink } from "@/components/common/ui/IconLink";
import { getFirstPublishedEntry } from "@/lib/entityUtils";

export default function Person() {
  const { data } = useResume();
  const sectionData = getFirstPublishedEntry<AboutEntry>(data["about"].entries);

  if (!sectionData) {
    return null;
  }

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
        {sectionData.title}
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-700 dark:text-slate-200 sm:text-xl">
        {sectionData.subtitle}
      </h2>

      <ul className="flex items-center justify-center lg:justify-start">
        <IconLink
          href="cv-ats.pdf"
          icon={<span>ATS CV</span>}
          label="Download ATS CV"
        />

        {sectionData.email && (
          <IconLink
            href={`mailto:${sectionData.email}`}
            icon={
              <>
                <span>Email me</span>
                <span className="w-2 h-2 rounded-full bg-green-400 duration-1000 animate-pulse"></span>
              </>
            }
            label="Send email"
          />
        )}
      </ul>
    </>
  );
}
