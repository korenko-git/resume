import { Metadata } from "next";

import { OutlineLinkButton } from "@/components/common/ui/OutlineLinkButton";
import { ResumeSections } from "@/components/resume/sections/ResumeSections";
import { getResume } from "@/lib/getResume";

export const metadata: Metadata = {
  title: "Certification Archive",
  description: "Complete archive of all certifications",
};

export default function CertificationArchivePage() {
  const data = getResume();

  return (
    <div className="lg:py-24">
      <OutlineLinkButton href="/" isLeftArrow>
        Home
      </OutlineLinkButton>

      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl my-8">
        All Certifications
      </h1>

      <ResumeSections
        data={data}
        sections={["certifications"]}
        includeUnpublished={true}
      />
    </div>
  );
}
