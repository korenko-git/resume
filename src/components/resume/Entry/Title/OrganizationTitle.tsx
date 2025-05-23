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
      <div className="relative flex-shrink-0">
        <OrganizationLogo logo={organization.logo} title={organization.title} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-foreground leading-snug font-medium">{title}</h3>
        <Link
          className="text-foreground hover:text-primary focus-visible:text-primary group/link inline-flex items-baseline text-base leading-tight font-medium"
          href={linkUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${title} at ${organization.title} (opens in a new tab)`}
        >
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>

          <span className="group-hover:border-primary inline-block border-b border-transparent lg:border-0">
            {organization.title}
            <ArrowUpRight
              className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </span>
        </Link>
      </div>
    </>
  );
}
