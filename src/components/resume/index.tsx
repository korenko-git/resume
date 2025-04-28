import { AboutSection } from "./AboutSection"
import { CertificationSection } from "./CertificationSection"
import { EducationSection } from "./EducationSection"
import { ExperienceSection } from "./ExperienceSection"
import { ProjectSection } from "./ProjectSection"

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