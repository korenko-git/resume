import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import { useState } from "react";
import { Description } from "./Description";
import { cn } from "@/lib/utils";
import { OrganizationDialog } from "@/components/editor/dialogs/OrganizationDialog";
import { SkillsList } from "./Skills/SkillsList";
import { useEntryData } from "@/hooks/useEntryData";
import { EditableButtons } from "@/components/editor/controls/EditableButtons";
import EntryHeader from "./Header/EntryHeader";
import EntryTitle from "./Title/EntryTitle";
import { DeleteConfirmationDialog } from "@/components/editor/dialogs/DeleteConfirmationDialog";

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
    isDeleting,
    isDeleteDialogOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel,
  } = useEntryData<ResumeDataWithEntries>(typeData, id, { editable });

  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  if (!entryData) return null;

  const hasOrganizationId = "organizationId" in entryData;
  const hasSkills = "skills" in entryData && entryData.skills;

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
        />

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

          {hasSkills && (
            <SkillsList
              skills={entryData.skills}
              isEditing={isEditing}
              onUpdate={(newSkills: string[]) =>
                handleDataChange({ skills: newSkills })
              }
            />
          )}

          {isEditing && (
            <EditableButtons
              isPublished={entryData?.isPublished}
              onPublishedChange={(value) =>
                handleDataChange({ isPublished: value })
              }
              onSave={handleUpdate}
              onCancel={handleCancel}
              isSaving={isSaving}
              isDeleting={isDeleting}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Confirm Deletion"
        description={`Are you sure you want to delete this ${typeData} entry? This action cannot be undone.`}
      />

      {isEditing && hasOrganizationId && (
        <OrganizationDialog
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
