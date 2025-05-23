import { Section } from "@/components/common/layout/Section";
import { Description } from "@/components/resume/Entry/Description";
import { AboutEntry } from "@/types/resume";

interface AboutSectionProps {
  sectionData?: AboutEntry;
  className?: string;
}

export function AboutSection({ className, sectionData }: AboutSectionProps) {
  if (!sectionData) {
    return null;
  }

  return (
    <Section
      id="about"
      aria-label="About me"
      title="About"
      className={className}
    >
      <Description data={sectionData} />
    </Section>
  );
}
