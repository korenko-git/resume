"use client";

import { AboutData } from "@/types/resume";
import Section from "./Section";
import { EditableSocialLinks } from "../EditableField/EditableSocialLinks";
import { EditableText, EditableTextarea } from "@/components/EditableField";
import { EditableButtons } from "@/components/EditableField/EditableButtons";
import { useEntryData } from "@/hooks/useEntryData";

interface AboutSectionProps {
  editable?: boolean;
}

export function AboutSection({ editable = true }: AboutSectionProps) {
  const {
    entryData: sectionData,
    isEditing,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel,
  } = useEntryData<AboutData>("about", undefined, { editable });

  return (
    <Section id="about" aria-label="About me" title="About" sr={!editable}>
      <EditableTextarea
        value={sectionData?.description || ""}
        isEditing={isEditing}
        onChange={(value) => handleDataChange({ description: value })}
        onEditStart={handleEditStart}
        className="editable-header"
        markdown={true}
      />

      {editable && (
        <EditableText
          value={sectionData?.subtitle || ""}
          isEditing={isEditing}
          onChange={(value) => handleDataChange({ subtitle: value })}
          onEditStart={handleEditStart}
          label={isEditing ? "Subtitle" : undefined}
          placeholder="Enter subtitle"
          className="mt-2 mb-4"
          displayClassName="text-base text-slate-600 dark:text-slate-400"
        />
      )}

      {editable && (
        <EditableSocialLinks
          onDataChange={handleDataChange}
          isEditing={isEditing}
          data={sectionData as any}
        />
      )}

      {isEditing && sectionData && (
        <EditableButtons onSave={handleUpdate} onCancel={handleCancel} />
      )}
    </Section>
  );
}
