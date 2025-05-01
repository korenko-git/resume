"use client";

import { useResume } from "@/contexts/ResumeContext";
import { ProjectEntry } from "@/types/resume";
import { AddButton } from "@/components/common/ui/AddButton";
import OutlineLinkButton from "@/components/common/ui/OutlineLinkButton";
import Section from "@/components/common/layout/Section";
import EntryBlock from "../Entry";
import { filterPublished } from "../utils";

interface ProjectSectionProps {
  withLinkToArchive: boolean;
  editable?: boolean;
  className?: string;
}

export function ProjectSection({
  withLinkToArchive,
  editable = true,
  className,
}: ProjectSectionProps) {
  const { data, updateData } = useResume();
  const sectionData = filterPublished(data?.projects.entries, editable);

  const handleAddProject = () => {
    const newProject: ProjectEntry = {
      id: `proj-${Date.now().toString(36)}`,
      title: "New Project",
      description: "Description of your project",
      isPublished: false,
      skills: [],
      source: "",
      demo: "",
    };

    updateData("projects", newProject);
  };

  return (
    <Section
      id="projects"
      aria-label="My Projects"
      title="Projects"
      sr={!editable}
      className={className}
    >
      <ol className="group/list">
        {sectionData.map((project: ProjectEntry) => {
          return (
            <li key={project.id} className="mb-12">
              <EntryBlock
                typeData="projects"
                id={project.id}
                editable={editable}
              />
            </li>
          );
        })}
      </ol>

      {editable && <AddButton onClick={handleAddProject} label="project" />}

      {withLinkToArchive && (
        <OutlineLinkButton
          className="mt-12"
          aria-label="View Full Project Archive"
          href="/archive/project"
        >
          View Full Project Archive
        </OutlineLinkButton>
      )}
    </Section>
  );
}
