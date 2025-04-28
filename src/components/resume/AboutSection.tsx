'use client';

import { AboutData } from '@/types/resume';
import Section from './Section';
import { Description } from '../EntryBlock/Description';
import { useResume } from '@/contexts/ResumeContext';

interface AboutSectionProps {
  editable?: boolean;
}

export function AboutSection({ editable = true }: AboutSectionProps) {
  const { data } = useResume();
  const sectionData = data?.about as AboutData;

  return (
    <Section id="about" aria-label="About me" title="About" sr={!editable}>
      <Description
        data={sectionData as any}
      />
    </Section>
  );
}