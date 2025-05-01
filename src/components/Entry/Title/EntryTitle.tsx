import { OrganizationTitle } from "./OrganizationTitle";
import { ProjectTitle } from "./ProjectTitle";

interface EntryTitleProps {
  data: {
    organizationId?: string;
    title?: string;
    source?: string;
    demo?: string;
    [key: string]: any;
  };
  editable: boolean;
  isEditing: boolean;
  onDataChange: (data: Partial<EntryTitleProps["data"]>) => void;
  onOrgModalOpen: () => void;
}

export default function EntryTitle({ 
  data, 
  editable, 
  isEditing, 
  onDataChange, 
  onOrgModalOpen 
}: EntryTitleProps) {
  const hasOrganization = "organizationId" in data;
  const hasProjectLinks = "source" in data || "demo" in data;

  return (
    <div className="flex gap-x-2 items-center">
      {hasOrganization && (
        <OrganizationTitle
          data={data as { organizationId: string; title: string }}
          editable={editable}
          isEditing={isEditing}
          onDataChange={onDataChange}
          onOrgModalOpen={onOrgModalOpen}
        />
      )}
      {hasProjectLinks && (
        <ProjectTitle
          data={data as { title: string; demo?: string; source?: string }}
          editable={editable}
          onDataChange={onDataChange}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}
  