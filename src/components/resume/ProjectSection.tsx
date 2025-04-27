'use client';

import { EditableCard } from '@/components/EditableCard';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { ProjectEntry } from '@/types/resume';

interface ProjectSectionProps {
  entries: ProjectEntry[];
  onUpdate?: (entries: ProjectEntry[]) => void;
  editable?: boolean;
}

export function ProjectSection({ entries,  editable = true }: ProjectSectionProps) {
  const { updateData } = useResume();
  const handleAdd = () => {
    const newEntry: ProjectEntry = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      description: "Project Description",
      isPublished: true,
      skills: []
    };
    updateData('projects', newEntry);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {entries.map((entry) => (
        <EditableCard
          key={entry.id}
          id={entry.id}
          typeData='projects'
          editable={editable}
        />
      ))}
      {editable && (
        <Button onClick={handleAdd} className="mt-4">
          Add Project
        </Button>
      )}
    </section>
  );
}