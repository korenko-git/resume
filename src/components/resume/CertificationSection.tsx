'use client';

import { useResume } from '@/contexts/ResumeContext';
import { CertificationEntry } from '@/types/resume';
import Section from './Section';
import EntryBlock from '../EntryBlock';
import OutlineLinkButton from '../ui/OutlineLinkButton';
import { filterPublished } from './utils';

interface CertificationSectionProps {
  withLinkToArchive: boolean;
  editable?: boolean;
}

export function CertificationSection({ withLinkToArchive, editable = true }: CertificationSectionProps) {
  const { data } = useResume();
  const sectionData = filterPublished(data?.certifications.entries, editable);

  return (
    <Section id="certifications" aria-label="Certifications" title="Certifications" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((certification: CertificationEntry) => {
          return (
            <li key={certification.id} className="mb-12">
              <EntryBlock typeData='certifications' id={certification.id} />
            </li>
          );
        })}
      </ol>

      {withLinkToArchive && (
        <OutlineLinkButton aria-label="View Full Certificate Archive" href="/archive/certification">
          View Full Certificate Archive
        </OutlineLinkButton>
      )}
    </Section>
  );
}