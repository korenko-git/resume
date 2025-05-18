import { Metadata } from "next";

import { OutlineLinkButton } from "@/components/common/ui/OutlineLinkButton";
import { ResumeSections } from "@/components/resume/sections/ResumeSections";
import { getResume } from "@/lib/getResume";

export const metadata: Metadata = {
  title: "Project Archive",
  description: "Complete archive of all projects",
};

export default function ProjectArchivePage() {
  const data = getResume();

  return (
    <div className="lg:py-24">
      <OutlineLinkButton href="/" isLeftArrow>
        Home
      </OutlineLinkButton>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl my-8">
        All Projects
      </h1>

      <ResumeSections
        data={data}
        sections={["projects"]}
        includeUnpublished={true}
      />
    </div>
  );
}
