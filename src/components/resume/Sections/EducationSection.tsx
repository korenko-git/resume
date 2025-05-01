"use client";

import { useResume } from "@/contexts/ResumeContext";
import { EducationEntry } from "@/types/resume";
import { AddButton } from "@/components/common/ui/AddButton";
import Section from "@/components/common/layout/Section";
import EntryBlock from "../Entry";
import { filterPublished } from "../utils";

interface EducationSectionProps {
  editable?: boolean;
}

export function EducationSection({ editable = true }: EducationSectionProps) {
  const { data, updateData } = useResume();
  const sectionData = filterPublished(data?.education.entries, editable);

  const handleAddEducation = () => {
    const newEducation: EducationEntry = {
      id: `edu-${Date.now().toString(36)}`,
      title: "New Degree/Course",
      description: "Description of your education",
      isPublished: false,
      startDate: new Date().toISOString().slice(0, 7),
      endDate: "",
      skills: [],
      organizationId: "",
    };

    updateData("education", newEducation);
  };

  return (
    <Section
      id="education"
      aria-label="Education"
      title="Education"
      hideHeadingOnDesktop={!editable}
    >
      <ol className="group/list">
        {sectionData.map((education: EducationEntry) => {
          return (
            <li key={education.id} className="mb-12">
              <EntryBlock
                typeData="education"
                id={education.id}
                editable={editable}
              />
            </li>
          );
        })}
      </ol>

      {editable && <AddButton onClick={handleAddEducation} label="education" />}
    </Section>
  );
}
