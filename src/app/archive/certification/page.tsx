import { Metadata } from "next";
import { CertificationSection } from "@/components/resume/Sections/CertificationSection";
import OutlineLinkButton from "@/components/common/ui/OutlineLinkButton";

export const metadata: Metadata = {
  title: "Certification Archive",
  description: "Complete archive of all certifications",
};

export default function CertificationArchivePage() {
  return (
    <div className="lg:py-24">
      <OutlineLinkButton href="/" isLeftArrow>
        Home
      </OutlineLinkButton>

      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl sm:my-8">
        All Certifications
      </h1>

      <CertificationSection
        editable={false}
        withLinkToArchive={false}
        className="mb-8"
      />
    </div>
  );
}