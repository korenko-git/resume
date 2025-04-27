import { AboutSection } from "./AboutSection"
import { CertificationSection } from "./CertificationSection"
import { EducationSection } from "./EducationSection"
import { ExperienceSection } from "./ExperienceSection"
import { ProjectSection } from "./ProjectSection"

interface ResumeProps {
    data: any;
    editable?: boolean;
  }

export default function Resume({data, editable = true} : ResumeProps) {
    return (
        <div className="space-y-8">
        <AboutSection 
          data={data.about}
          editable={editable}
        />
        
        <ExperienceSection
          entries={data.experience.entries}
          editable={editable}
        />

        <ProjectSection
          entries={data.projects.entries}
          editable={editable}
        />

        <EducationSection
          entries={data.education.entries}
          editable={editable}
        />

        <CertificationSection
          entries={data.certifications.entries}
          editable={editable}
        />
      </div>
    )
}