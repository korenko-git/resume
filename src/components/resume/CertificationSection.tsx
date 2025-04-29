'use client';

import { useResume } from '@/contexts/ResumeContext';
import { CertificationEntry } from '@/types/resume';
import Section from './Section';
import EntryBlock from '../EntryBlock';
import OutlineLinkButton from '../ui/OutlineLinkButton';
import { filterPublished } from './utils';
import { AddButton } from "../ui/AddButton";

interface CertificationSectionProps {
  withLinkToArchive: boolean;
  editable?: boolean;
}

export function CertificationSection({ withLinkToArchive, editable = true }: CertificationSectionProps) {
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
      organizationId: ""
    };
    
    updateData("certifications", newCertification);
  };

  return (
    <Section id="certifications" aria-label="Certifications" title="Certifications" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((certification: CertificationEntry) => {
          return (
            <li key={certification.id} className="mb-12">
              <EntryBlock typeData='certifications' id={certification.id} editable={editable} />
            </li>
          );
        })}
      </ol>

      {editable && (
        <AddButton onClick={handleAddCertification} label="certificate" />
      )}

      {withLinkToArchive && (
        <OutlineLinkButton aria-label="View Full Certificate Archive" href="/archive/certification">
          View Full Certificate Archive
        </OutlineLinkButton>
      )}
    </Section>
  );
}