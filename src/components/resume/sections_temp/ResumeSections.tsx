"use client";

import { useResume } from "@/contexts/ResumeContext";
import Section from "@/components/common/layout/Section";
import { filterPublishedEntries } from "@/lib/entityUtils";
import EntryBlock from "../Entry";
import OutlineLinkButton from "@/components/common/ui/OutlineLinkButton";
import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

const SECTIONS: ResumeDataKeysWithEntries[] = [
  "experience",
  "education",
  "projects",
  "certifications",
];
type SectionType = ResumeDataKeysWithEntries;

interface ResumeSectionsProps {
  sections?: SectionType[];
  includeUnpublished?: boolean;
}

const ARCHIVE_SECTIONS = new Set<SectionType>(["projects", "certifications"]);

const getSingularForm = (section: string) =>
  section.endsWith("s") ? section.slice(0, -1) : section;

export function ResumeSections({
  sections = SECTIONS,
  includeUnpublished = false,
}: ResumeSectionsProps) {
  const { data } = useResume();

  return sections.map((section) => {
    const entries = filterPublishedEntries<ResumeDataWithEntries>(
      data[section].entries,
      includeUnpublished
    );
    const showArchiveLink =
      !includeUnpublished && ARCHIVE_SECTIONS.has(section);
    const archiveTitle = getSingularForm(section);

    return (
      <Section key={section} id={section} aria-label={section} title={section}>
        <ol className="group/list">
          {entries.map((entry) => (
            <li key={entry.id} className="mb-12">
              <EntryBlock typeData={section} id={entry.id} />
            </li>
          ))}
        </ol>

        {showArchiveLink && (
          <OutlineLinkButton
            className="mt-12"
            aria-label={`View Full ${archiveTitle} Archive`}
            href={`/archive/${archiveTitle}`}
          >
            View Full {archiveTitle} Archive
          </OutlineLinkButton>
        )}
      </Section>
    );
  });
}
