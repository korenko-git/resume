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

      <h1 className="text-foreground my-8 text-4xl font-bold tracking-tight sm:text-5xl">
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
