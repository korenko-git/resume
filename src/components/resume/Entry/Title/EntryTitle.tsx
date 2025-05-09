import { Organization } from "@/types/resume";

import { OrganizationTitle } from "./OrganizationTitle";
import { ProjectTitle } from "./ProjectTitle";

interface EntryTitleProps {
  data: {
    organization?: Organization;
    title?: string;
    source?: string;
    demo?: string;
    [key: string]: any;
  };
}

export function EntryTitle({ data }: EntryTitleProps) {
  const hasOrganization = "organizationId" in data;
  const hasProjectLinks = "source" in data || "demo" in data;

  return (
    <div className="flex gap-x-2 items-center">
      {hasOrganization && (
        <OrganizationTitle
          organization={data.organization}
          title={data.title}
          titleLink={data.link}
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
