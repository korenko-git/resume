import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { useResume } from "@/contexts/ResumeContext";
import { getAssetPath } from "@/lib/assetPath";
import { Organization } from "@/types/resume";

interface OrganizationTitleProps {
  data: { organizationId: string; title: string };
}

export function OrganizationTitle({ data }: OrganizationTitleProps) {
  const { organizations } = useResume();
  const organization: Organization | undefined = organizations.find(
    (org) => org.id === data.organizationId
  );

  if (!organization) {
    return null;
  }

  return (
    <>
      <div className="flex-shrink-0 relative">
        <img
          className="w-10 h-10 rounded bg-neutral-400/10 lg:grayscale lg:group-hover:grayscale-0"
          src={getAssetPath(organization.logo)}
          alt={`${organization.title} logo`}
          onError={(e) => {
            e.currentTarget.src = getAssetPath("/images/placeholder-logo.png");
            e.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
          {data.title}
        </h3>
        <Link
          className="inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 group/link text-base"
          href={organization.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${data.title} at ${organization.title} (opens in a new tab)`}
        >
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>

          <span className="inline-block border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-300 lg:border-0">
            {organization.title}
            <ArrowUpRight
              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
              aria-hidden="true"
            />
          </span>
        </Link>
      </div>
    </>
  );
}
