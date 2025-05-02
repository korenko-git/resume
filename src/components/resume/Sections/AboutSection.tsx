"use client";

import ReactMarkdown from "react-markdown";

import { useEntryData } from "@/hooks/useEntryData";
import { AboutData } from "@/types/resume";
import Section from "@/components/common/layout/Section";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  const { entryData } = useEntryData<AboutData>("about");

  if (!entryData) {
    return null;
  }

  return (
    <Section
      id="about"
      aria-label="About me"
      title="About"
      className={className}
    >
      <ReactMarkdown>{entryData.description}</ReactMarkdown>
    </Section>
  );
}
