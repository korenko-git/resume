import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import { useState } from "react";
import { Description } from "./Description";
import { cn } from "@/lib/utils";
import { OrganizationModal } from "../OrganizationModal";
import { SkillsList } from "./Skills/SkillsList";
import { useEntryData } from "@/hooks/useEntryData";
import { EditableButtons } from "../EditableField/EditableButtons";
import EntryHeader from "./Header/EntryHeader";
import EntryTitle from "./Title/EntryTitle";

interface EntryBlockProps {
  id: string;
  typeData: ResumeDataKeysWithEntries;
  editable?: boolean;
}

export default function EntryBlock({
  id,
  typeData,
  editable = true,
}: EntryBlockProps) {
  const {
    entryData,
    isEditing,
    isSaving,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel,
  } = useEntryData<ResumeDataWithEntries>(typeData, id, { editable });

  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  if (!entryData) return null;

  return (
    <>
      <div
        onClick={handleEditStart}
        className={cn(
          "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50",
          editable && "cursor-pointer"
        )}
        role={editable ? "button" : "article"}
        tabIndex={editable ? 0 : undefined}
        aria-label={editable ? `Edit ${typeData} entry` : undefined}
        onKeyDown={(e) => {
          if (editable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleEditStart();
          }
        }}
      >
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
      lg:group-hover:bg-slate-100 dark:lg:group-hover:bg-sky-400/10
      lg:group-hover:shadow-sm lg:group-hover:drop-shadow-lg"
          aria-hidden="true"
        ></div>

        <EntryHeader
          data={entryData}
          onDataChange={handleDataChange}
          isEditing={isEditing}
        />

        <div className="z-10 sm:col-span-6">
          <EntryTitle
            data={entryData}
            editable={editable}
            isEditing={isEditing}
            onDataChange={handleDataChange}
            onOrgModalOpen={() => setIsOrgModalOpen(true)}
          />

          <Description
            data={entryData}
            onDataChange={handleDataChange}
            isEditing={isEditing}
            onEditStart={handleEditStart}
            className="my-4 editable-content"
          />

          {"skills" in entryData && entryData.skills && (
            <SkillsList
              skills={entryData.skills}
              isEditing={isEditing}
              onUpdate={(newSkills: string[]) =>
                handleDataChange({ skills: newSkills })
              }
            />
          )}

          {isEditing && entryData && (
            <EditableButtons
              isPublished={entryData?.isPublished}
              onPublishedChange={(value) =>
                handleDataChange({ isPublished: value })
              }
              onSave={handleUpdate}
              onCancel={handleCancel}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>

      {isEditing && "organizationId" in entryData && (
        <OrganizationModal
          isOpen={isOrgModalOpen}
          onClose={() => setIsOrgModalOpen(false)}
          organizationId={entryData.organizationId}
          updateOrganizationId={(id) =>
            handleDataChange({ organizationId: id })
          }
        />
      )}
    </>
  );
}
