"use client";

import { AboutData } from "@/types/resume";
import Section from "./Section";
import { Description } from "../EntryBlock/Description";
import { useResume } from "@/contexts/ResumeContext";
import { useState } from "react";
import { EditableSocialLinks } from "../EditableCard/EditableSocialLinks";
import { EditableButtons } from "../EditableCard/EditableButtons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AboutSectionProps {
  editable?: boolean;
}

export function AboutSection({ editable = true }: AboutSectionProps) {
  const { data, updateData } = useResume();
  const [isEditing, setIsEditing] = useState(false);
  const [sectionData, setSectionData] = useState<AboutData | null>(data?.about);

  const handleEditStart = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleDataChange = (updatedData: Partial<AboutData>) => {
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

      {isEditing ? (
        <div className="grid w-full gap-1.5 mt-4 mb-4">
          <Label>Subtitle</Label>
          <Input
            value={sectionData?.subtitle || ""}
            onChange={(e) => handleDataChange({ subtitle: e.target.value })}
            placeholder="Enter subtitle"
            className="font-medium"
          />
        </div>
      ) : (
        <div 
          className="mt-2 mb-4 text-base text-slate-600 dark:text-slate-400 cursor-pointer"
          onClick={handleEditStart}
        >
          {sectionData?.subtitle}
        </div>
      )}

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
          onDataChange={(newData) => setSectionData(newData as AboutData)}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          withPublishedSwitch={false}
        />
      )}
    </Section>
  );
}
