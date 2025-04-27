'use client';

import { EditableCard } from '@/components/EditableCard';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { CertificationEntry } from '@/types/resume';

interface CertificationSectionProps {
  entries: CertificationEntry[];
  editable?: boolean;
}

export function CertificationSection({ entries, editable = true }: CertificationSectionProps) {
  const { updateData } = useResume();
  const handleAdd = () => {
    const newEntry: CertificationEntry = {
      id: `cert-${Date.now()}`,
      title: "New Certificate",
      description: "Certificate Description",
      isPublished: true,
      skills: [],
      date: ""
    };
    updateData('certifications', newEntry);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
      {entries.map((entry) => (
        <EditableCard
          key={entry.id}
          id={entry.id}
          typeData='certifications'
          editable={editable}
        />
      ))}
      {editable && (
        <Button onClick={handleAdd} className="mt-4">
          Add Certificate
        </Button>
      )}
    </section>
  );
}