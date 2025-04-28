import { useResume } from "@/contexts/ResumeContext";
import { Organization } from "@/types/resume";
import { ArrowUpRight } from "lucide-react";

interface OrganizationTitleProps {
  data: { organizationId: string, title: string };
  editable?: boolean;
}

export function OrganizationTitle({ data, editable }: OrganizationTitleProps) {
  const { organizations } = useResume();
  const organization: Organization | undefined = organizations.find((org) => org.id === data.organizationId);

  if (!organization) {
    return null;
  }

  return (
    <>
      <img
        className="w-10 h-10 rounded bg-neutral-400/10 lg:grayscale lg:group-hover:grayscale-0"
        src={organization.logo}
        alt="${company.title} logo"
        onError={(e) => {
          e.currentTarget.src = '/images/placeholder-logo.png';
          e.currentTarget.onerror = null;
        }}
      />
      <div className="flex flex-col ">
        <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
          {data.title}
        </h3>

        <a
          className="inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 group/link text-base "
          href={organization.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${data.title} at ${organization.title} (opens in a new tab)`}
        >
          {!editable && <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>}

          <span className="inline-block border-b border-blue-600 dark:border-blue-300 lg:border-0">
            {organization.title}
            <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
          </span>
        </a>
      </div>

    </>
  );
}