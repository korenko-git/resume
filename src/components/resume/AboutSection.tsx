'use client';

import { EditableCard } from '@/components/EditableCard';
import { AboutData } from '@/types/resume';

interface AboutSectionProps {
  data: AboutData | null;
  onUpdate?: (data: AboutData) => void;
  editable?: boolean;
}

export function AboutSection({ editable = true }: AboutSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <EditableCard
        id="about"
        typeData='about'
        editable={editable}
      />
    </section>
  );
}