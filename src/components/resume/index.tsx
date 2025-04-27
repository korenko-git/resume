import { AboutSection } from "./AboutSection"
import { CertificationSection } from "./CertificationSection"
import { EducationSection } from "./EducationSection"
import { ExperienceSection } from "./ExperienceSection"
import { ProjectSection } from "./ProjectSection"
import type { ResumeData, BaseEntry } from '@/types/resume'

interface ResumeProps {
  data: ResumeData;
  editable?: boolean;
}

export default function Resume({ data, editable = true }: ResumeProps) {
  const filterPublished = <T extends BaseEntry>(entries: T[]): T[] => {
    return editable ? entries : entries.filter(entry => entry.isPublished);
  };

  const experienceData = filterPublished(data.experience.entries);
  const projectData = filterPublished(data.projects.entries);
  const educationData = filterPublished(data.education.entries);
  const certificationData = filterPublished(data.certifications.entries);

  return (
    <div className="space-y-8">
      <AboutSection
        data={data.about}
        editable={editable}
      />

      <ExperienceSection
        entries={experienceData}
        editable={editable}
      />

      <ProjectSection
        entries={projectData}
        editable={editable}
      />

      <EducationSection
        entries={educationData}
        editable={editable}
      />

      <CertificationSection
        entries={certificationData}
        editable={editable}
      />
    </div>
  )
}