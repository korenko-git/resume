
import { useResume } from "@/contexts/ResumeContext";
import { ExperienceEntry } from "@/types/resume";
import Section from "./Section";
import EntryBlock from "../EntryBlock";
import { filterPublished } from "./utils";
import { AddButton } from "../ui/AddButton";

interface ExperienceSectionProps {
  editable?: boolean;
}

export function ExperienceSection({ editable = true }: ExperienceSectionProps) {
  const { data, updateData } = useResume();
  const sectionData = filterPublished(data?.experience.entries, editable);

  const handleAddExperience = () => {
    const newExperience: ExperienceEntry = {
      id: `exp-${Date.now().toString(36)}`,
      title: "New Position",
      description: "Description of your role and responsibilities",
      isPublished: false,
      startDate: new Date().toISOString().slice(0, 7),
      endDate: "",
      skills: [],
      organizationId: ""
    };
    
    updateData("experience", newExperience);
  };

  return (
    <Section id="experience" aria-label="Work experience" title="Experience" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((experience: ExperienceEntry) => {
          return (
            <li key={experience.id} className="mb-12">
              <EntryBlock typeData='experience' id={experience.id} editable={editable} />
            </li>
          );
        })}
      </ol>
      
      {editable && (
        <AddButton onClick={handleAddExperience} label="experience" />
      )}
    </Section>
  );
}