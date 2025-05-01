"use client";

import { useEntryData } from "@/hooks/useEntryData";
import { AboutData } from "@/types/resume";
import Section from "@/components/common/layout/Section";
import { EditableButtons } from "@/components/editor/controls/EditableButtons";
import { EditableSocialLinks } from "@/components/editor/blocks/EditableSocialLinks";
import { EditableText } from "@/components/editor/fields/EditableText";
import { EditableTextarea } from "@/components/editor/fields/EditableTextarea";

interface AboutSectionProps {
  editable?: boolean;
  className?: string;
}

export function AboutSection({
  editable = true,
  className,
}: AboutSectionProps) {
  const {
    entryData: sectionData,
    isEditing,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel,
  } = useEntryData<AboutData>("about", undefined, { editable });

  return (
    <Section
      id="about"
      aria-label="About me"
      title="About"
      hideHeadingOnDesktop={true}
      className={className}
    >
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
