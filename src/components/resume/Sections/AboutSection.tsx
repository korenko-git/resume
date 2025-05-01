"use client";

import { AboutData } from "@/types/resume";
import Section from "../../layout/Section";
import { EditableSocialLinks } from "../../Editable/blocks/EditableSocialLinks";
import { useEntryData } from "@/hooks/useEntryData";
import { EditableText } from "@/components/Editable/fields/EditableText";
import { EditableTextarea } from "@/components/Editable/fields/EditableTextarea";
import { EditableButtons } from "@/components/Editable/controls/EditableButtons";

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
    <Section id="about" aria-label="About me" title="About" sr={true}>
      {editable && (
        <EditableText
          value={sectionData?.title || ""}
          isEditing={isEditing}
          onChange={(value) => handleDataChange({ title: value })}
          onEditStart={handleEditStart}
          label={isEditing ? "Title" : undefined}
          placeholder="Enter title"
          displayClassName="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
        />
      )}

      {editable && (
        <EditableText
          value={sectionData?.subtitle || ""}
          isEditing={isEditing}
          onChange={(value) => handleDataChange({ subtitle: value })}
          onEditStart={handleEditStart}
          label={isEditing ? "Subtitle" : undefined}
          placeholder="Enter subtitle"
          displayClassName="text-base text-slate-600 dark:text-slate-400"
        />
      )}

      <EditableTextarea
        value={sectionData?.description || ""}
        isEditing={isEditing}
        onChange={(value) => handleDataChange({ description: value })}
        onEditStart={handleEditStart}
        className="editable-header"
        markdown={true}
        label="Description"
        placeholder="Markdown formatting is supported..."
      />

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
