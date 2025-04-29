
import { useResume } from "@/contexts/ResumeContext";
import Section from "./Section";
import { EducationEntry } from "@/types/resume";
import EntryBlock from "../EntryBlock";
import { filterPublished } from "./utils";

interface EducationSectionProps {
  editable?: boolean;
}

export function EducationSection({ editable = true }: EducationSectionProps) {
  const { data } = useResume();
  const sectionData = filterPublished(data?.education.entries, editable);

  return (
    <Section id="education" aria-label="Education" title="Education" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((education: EducationEntry) => {
          
          return (
            <li key={education.id} className="mb-12">
              <EntryBlock typeData='education' id={education.id} editable={editable} />
            </li>
          );
        })}
      </ol>
    </Section>
  );
}