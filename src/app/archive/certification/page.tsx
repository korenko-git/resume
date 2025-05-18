import { Metadata } from "next";

import { OutlineLinkButton } from "@/components/common/ui/OutlineLinkButton";
import { ResumeSections } from "@/components/resume/sections/ResumeSections";
import { getResume } from "@/lib/getResume";
import { createOpenGraphMetadata } from "@/lib/metadata";

export const metadata: Metadata = createOpenGraphMetadata({
  title: "Certification Archive",
  description: "Complete archive of all certifications",
});

export default function CertificationArchivePage() {
  const data = getResume();

  return (
    <div className="lg:py-24">
      <OutlineLinkButton href="/" isLeftArrow>
        Home
      </OutlineLinkButton>

      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl my-8">
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
