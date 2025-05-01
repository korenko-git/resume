import { AboutSection } from "./Sections/AboutSection"
import { CertificationSection } from "./Sections/CertificationSection"
import { EducationSection } from "./Sections/EducationSection"
import { ExperienceSection } from "./Sections/ExperienceSection"
import { ProjectSection } from "./Sections/ProjectSection"

interface ResumeProps {
  editable?: boolean;
}

export default function Resume({ editable = true }: ResumeProps) {
  return (
    <>
      <AboutSection editable={editable} />
      <ExperienceSection editable={editable} />
      <EducationSection editable={editable} />
      <ProjectSection editable={editable} withLinkToArchive={!editable} />
      <CertificationSection editable={editable} withLinkToArchive={!editable} />
    </>
  )
}