"use client";

import { getAssetPath } from "@/lib/assetPath";

interface OrganizationLogoProps {
  logo: string;
  title: string;
}

export function OrganizationLogo({ logo, title }: OrganizationLogoProps) {
  return (
    <img
      className="h-10 w-10 rounded bg-white transition duration-300 lg:grayscale lg:group-hover:grayscale-0"
      src={getAssetPath(logo)}
      alt={`${title} logo`}
      onError={(e) => {
        e.currentTarget.src = getAssetPath("/images/placeholder-logo.png");
        e.currentTarget.onerror = null;
      }}
    />
  );
}
