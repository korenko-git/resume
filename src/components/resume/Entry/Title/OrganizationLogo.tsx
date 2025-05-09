'use client';

import { getAssetPath } from "@/lib/assetPath";

interface OrganizationLogoProps {
  logo: string;
  title: string;
}

export function OrganizationLogo({ logo, title }: OrganizationLogoProps) {
  return (
    <img
      className="w-10 h-10 rounded bg-white lg:grayscale lg:group-hover:grayscale-0"
      src={getAssetPath(logo)}
      alt={`${title} logo`}
      onError={(e) => {
        e.currentTarget.src = getAssetPath("/images/placeholder-logo.png");
        e.currentTarget.onerror = null;
      }}
    />
  );
}