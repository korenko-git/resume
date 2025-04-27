'use client';

import { EditableCard } from '@/components/EditableCard';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { EducationEntry } from '@/types/resume';

interface EducationSectionProps {
  entries: EducationEntry[];
  editable?: boolean;
}

export function EducationSection({ entries, editable = true }: EducationSectionProps) {
  const { updateData } = useResume();
  const handleAdd = () => {
    const newEntry: EducationEntry = {
      id: `edu-${Date.now()}`,
      title: "New Education",
      description: "Education Description",
      isPublished: true,
      skills: [],
      startDate: "",
      endDate: ""
    };
    updateData('education', newEntry);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {entries.map((entry) => (
        <EditableCard
          key={entry.id}
          id={entry.id}
          typeData='education'
          editable={editable}
        />
      ))}
      {editable && (
        <Button onClick={handleAdd} className="mt-4">
          Add Education
        </Button>
      )}
    </section>
  );
}