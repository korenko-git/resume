"use client";

import { AboutData, ResumeDataWithEntries } from "@/types/resume";
import Section from "./Section";
import { Description } from "../EntryBlock/Description";
import { useResume } from "@/contexts/ResumeContext";
import { useState } from "react";
import { EditableSocialLinks } from "../EditableCard/EditableSocialLinks";
import { EditableButtons } from "../EditableCard/EditableButtons";

interface AboutSectionProps {
  editable?: boolean;
}

export function AboutSection({ editable = true }: AboutSectionProps) {
  const { data, updateData } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [sectionData, setSectionData] = useState(data?.about);

  const handleEditStart = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleDataChange = (updatedData: Partial<ResumeDataWithEntries>) => {
    setSectionData((prevData) =>
      prevData ? { ...prevData, ...updatedData } : null
    );
  };

  const handleUpdate = () => {
    if (sectionData) {
      updateData("about", sectionData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSectionData(data?.about);
    setIsEditing(false);
  };

  return (
    <Section id="about" aria-label="About me" title="About" sr={!editable}>
      <Description
        data={sectionData as any}
        onDataChange={handleDataChange}
        isEditing={isEditing}
        onEditStart={handleEditStart}
        className="editable-header"
      />

      {editable && (
        <EditableSocialLinks
          onDataChange={handleDataChange}
          isEditing={isEditing}
          data={sectionData as any}
        />
      )}

      {isEditing && data && (
        <EditableButtons
          data={sectionData as any}
          onDataChange={(newData) => setSectionData(newData)}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          withPublishedSwitch={false}
        />
      )}
    </Section>
  );
}
