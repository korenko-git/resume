
import { useResume } from "@/contexts/ResumeContext";
import Section from "./Section";
import { ProjectEntry } from "@/types/resume";
import EntryBlock from "../EntryBlock";
import OutlineLinkButton from "../ui/OutlineLinkButton";
import { filterPublished } from "./utils";

interface ProjectSectionProps {
  withLinkToArchive: boolean;
  editable?: boolean;
}

export function ProjectSection({ withLinkToArchive, editable = true }: ProjectSectionProps) {
  const { data } = useResume();
  const sectionData = filterPublished(data?.projects.entries, editable);

  return (
    <Section id="projects" aria-label="My Projects" title="Projects" sr={!editable}>
      <ol className="group/list">
        {sectionData.map((project: ProjectEntry) => {

          return (
            <li key={project.id} className="mb-12">
              <EntryBlock typeData='projects' id={project.id} editable={editable} />
            </li>
          );
        })}
      </ol>

      {withLinkToArchive && (
        <OutlineLinkButton aria-label="View Full Project Archive" href="/archive/project">
          View Full Project Archive
        </OutlineLinkButton>
      )}
    </Section>
  );
}