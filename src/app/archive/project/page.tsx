import { Metadata } from "next";

import OutlineLinkButton from "@/components/common/ui/OutlineLinkButton";
import { ResumeSections } from "@/components/resume/sections/ResumeSections";

export const metadata: Metadata = {
  title: "Project Archive",
  description: "Complete archive of all projects",
};

export default function ProjectArchivePage() {
  return (
    <div className="lg:py-24">
      <OutlineLinkButton href="/" isLeftArrow>
        Home
      </OutlineLinkButton>

      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl my-8">
        All Projects
      </h1>

      <ResumeSections sections={["projects"]} includeUnpublished={true} />
    </div>
  );
}
