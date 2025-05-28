import { Section } from "@/components/common/layout/Section";
import { OutlineLinkButton } from "@/components/common/OutlineLinkButton";
import {
  filterPublishedEntries,
  getEntityFull,
  getSingularForm,
} from "@/lib/entityUtils";
import {
  ResumeData,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

import { EntryBlock } from "../Entry";

const SECTIONS: ResumeDataKeysWithEntries[] = [
  "experience",
  "education",
  "projects",
  "certifications",
];
type SectionType = ResumeDataKeysWithEntries;

interface ResumeSectionsProps {
  data: ResumeData;
  sections?: SectionType[];
  includeUnpublished?: boolean;
}

const ARCHIVE_SECTIONS = new Set<SectionType>(["projects", "certifications"]);

export function ResumeSections({
  sections = SECTIONS,
  includeUnpublished = false,
  data,
}: ResumeSectionsProps) {
  return sections.map((section) => {
    const entries = filterPublishedEntries<ResumeDataWithEntries>(
      data[section].entries,
      includeUnpublished,
    );
    const showArchiveLink =
      !includeUnpublished && ARCHIVE_SECTIONS.has(section);
    const archiveTitle = getSingularForm(section);

    return (
      <Section key={section} id={section} aria-label={section} title={section}>
        <ol className="group/list">
          {entries.map((entry) => (
            <li key={entry.id} className="mb-12">
              <EntryBlock entryData={getEntityFull(data, section, entry.id)} />
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
