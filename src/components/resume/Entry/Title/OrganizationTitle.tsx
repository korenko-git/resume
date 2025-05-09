import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Organization } from "@/types/resume";

import { OrganizationLogo } from "./OrganizationLogo";

interface OrganizationTitleProps {
  organization: Organization | undefined;
  titleLink?: string;
  title?: string;
}

export function OrganizationTitle({
  organization,
  titleLink,
  title,
}: OrganizationTitleProps) {
  if (!organization) return null;

  const linkUrl = titleLink || organization.url;

  return (
    <>
      <div className="flex-shrink-0 relative">
        <OrganizationLogo 
          logo={organization.logo} 
          title={organization.title} 
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
          {title}
        </h3>
        <Link
          className="inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 group/link text-base"
          href={linkUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${title} at ${organization.title} (opens in a new tab)`}
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
