import { useResume } from "@/contexts/ResumeContext";
import {
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import { useEffect, useState } from "react";
import { DateHeader } from "./Header/DateHeader";
import { ImageHeader } from "./Header/ImageHeader";
import { OrganizationTitle } from "./Title/OrganizationTitle";
import { ProjectTitle } from "./Title/ProjectTitle";
import { Description } from "./Description";
import { cn } from "@/lib/utils";
import { OrganizationModal } from "../OrganizationModal";
import { EditableButtons } from "../EditableCard/EditableButtons";
import { SkillsList } from "./Skills/SkillsList";

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
  const { getEntryFromData, version, updateData } = useResume();
  const [entryData, setEntryData] = useState(getEntryFromData(typeData, id));
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

 useEffect(() => {
    setEntryData(getEntryFromData(typeData, id));
  }, [version]);

  if (!entryData) return null;

  const handleEditStart = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (entryData) {
      updateData(typeData, entryData);
    }
    setIsEditing(false);
  };

  const handleDataChange = (updatedData: Partial<ResumeDataWithEntries>) => {
    setEntryData((prevData) =>
      prevData ? { ...prevData, ...updatedData } : null
    );
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEntryData(getEntryFromData(typeData, id));
    setIsEditing(false);
    e.stopPropagation();
  };

  const Header =
    "date" in entryData || "startDate" in entryData ? DateHeader : ImageHeader;

  return (
    <>
      <div
        onClick={handleEditStart}
        className={cn(
          "group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50",
          editable && "cursor-pointer"
        )}
      >
        <div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
      lg:group-hover:bg-slate-100 dark:lg:group-hover:bg-sky-400/10
      lg:group-hover:shadow-sm lg:group-hover:drop-shadow-lg"
        ></div>

        <Header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 sm:col-span-2 
      lg:group-hover:text-slate-900 dark:lg:group-hover:text-slate-200 editable-header"
          data={entryData as any}
          onDataChange={handleDataChange}
          isEditing={isEditing}
        />

        <div className="z-10 sm:col-span-6">
          <div className="flex gap-x-2 items-center">
            {"organizationId" in entryData && (
              <OrganizationTitle
                data={entryData as any}
                editable={editable}
                isEditing={isEditing}
                onDataChange={handleDataChange}
                onOrgModalOpen={() => setIsOrgModalOpen(true)}
              />
            )}
            {("source" in entryData || "demo" in entryData) && (
              <ProjectTitle
                data={entryData as any}
                editable={editable}
                onDataChange={handleDataChange}
                isEditing={isEditing}
              />
            )}
          </div>

          <Description
            data={entryData as any}
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
              data={entryData}
              onDataChange={(newData) => setEntryData(newData)}
              onUpdate={handleUpdate}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>

      {isEditing && "organizationId" in entryData && (
        <OrganizationModal
          isOpen={isOrgModalOpen}
          onClose={() => setIsOrgModalOpen(false)}
          organizationId={entryData.organizationId}
          updateOrganizonId={(id) => handleDataChange({ organizationId: id })}
        />
      )}
    </>
  );
}
