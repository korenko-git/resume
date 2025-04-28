
import { useResume } from "@/contexts/ResumeContext";
import { ExperienceEntry } from "@/types/resume";
import Section from "./Section";
import EntryBlock from "../EntryBlock";
import { filterPublished } from "./utils";

interface ExperienceSectionProps {
  editable?: boolean;
}

export function ExperienceSection({ editable = true }: ExperienceSectionProps) {
  const { data } = useResume();
  const sectionData = filterPublished(data?.experience.entries, editable);

  return (
    <Section id="experience" aria-label="Work experience" title="Experience" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((experience: ExperienceEntry) => {

          return (
            <li key={experience.id} className="mb-12">
              <EntryBlock typeData='experience' id={experience.id} />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}