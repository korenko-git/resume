'use client';

import { EditableCard } from '@/components/EditableCard';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { ExperienceEntry } from '@/types/resume';

interface ExperienceSectionProps {
  entries: ExperienceEntry[];
  editable?: boolean;
}

export function ExperienceSection({ entries, editable = true }: ExperienceSectionProps) {
  const { updateData } = useResume();
  const handleAdd = () => {
    const newEntry: ExperienceEntry = {
      id: `exp-${Date.now()}`,
      title: "New Position",
      description: "Position Description",
      isPublished: true,
      startDate: "",
      endDate: "",
      skills: []
    };
    updateData('experience', newEntry);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
      {entries.map((entry) => (
        <EditableCard
          key={entry.id}
          id={entry.id}
          typeData='experience'
          editable={editable}
        />
      ))}
      {editable && (
        <Button onClick={handleAdd} className="mt-4">
          Add Work Experience
        </Button>
      )}
    </section>
  );
}