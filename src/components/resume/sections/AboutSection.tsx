"use client";

import ReactMarkdown from "react-markdown";

import Section from "@/components/common/layout/Section";
import { useResume } from "@/contexts/ResumeContext";
import { getFirstPublishedEntry } from "@/lib/entityUtils";
import { AboutEntry } from "@/types/resume";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const { data } = useResume();
  const sectionData = getFirstPublishedEntry<AboutEntry>(data["about"].entries);

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
      <ReactMarkdown>{sectionData.description}</ReactMarkdown>
    </Section>
  );
}
