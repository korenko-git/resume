"use client";

import { useResume } from "@/contexts/ResumeContext";
import { CertificationEntry } from "@/types/resume";
import Section from "@/components/common/layout/Section";
import EntryBlock from "../Entry";
import OutlineLinkButton from "@/components/common/ui/OutlineLinkButton";
import { AddButton } from "@/components/common/ui/AddButton";
import { filterPublished } from "../utils";

interface CertificationSectionProps {
  withLinkToArchive: boolean;
  editable?: boolean;
  className?: string;
}

export function CertificationSection({
  withLinkToArchive,
  editable = true,
  className,
}: CertificationSectionProps) {
  const { data, updateData } = useResume();
  const sectionData = filterPublished(data?.certifications.entries, editable);

  const handleAddCertification = () => {
    const newCertification: CertificationEntry = {
      id: `cert-${Date.now().toString(36)}`,
      title: "New Certificate",
      description: "Description of your certificate",
      isPublished: false,
      date: new Date().toISOString().slice(0, 7),
      skills: [],
      organizationId: "",
    };

    updateData("certifications", newCertification);
  };

  return (
    <Section
      id="certifications"
      aria-label="Certifications"
      title="Certifications"
      sr={!editable}
      className={className}
    >
      <ol className="group/list">
        {sectionData.map((certification: CertificationEntry) => {
          return (
            <li key={certification.id} className="mb-12">
              <EntryBlock
                typeData="certifications"
                id={certification.id}
                editable={editable}
              />
            </li>
          );
        })}
      </ol>

      {editable && (
        <AddButton onClick={handleAddCertification} label="certificate" />
      )}

      {withLinkToArchive && (
        <OutlineLinkButton
          className="mt-12"
          aria-label="View Full Certificate Archive"
          href="/archive/certification"
        >
          View Full Certificate Archive
        </OutlineLinkButton>
      )}
    </Section>
  );
}
