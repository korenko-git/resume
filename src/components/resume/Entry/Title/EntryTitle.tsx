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
}

export default function EntryTitle({ data }: EntryTitleProps) {
  const hasOrganization = "organizationId" in data;
  const hasProjectLinks = "source" in data || "demo" in data;

  return (
    <div className="flex gap-x-2 items-center">
      {hasOrganization && (
        <OrganizationTitle
          data={data as { organizationId: string; title: string }}
        />
      )}
      {hasProjectLinks && (
        <ProjectTitle
          data={data as { title: string; demo?: string; source?: string }}
        />
      )}
    </div>
  );
}
