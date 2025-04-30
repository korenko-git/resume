import Link from "next/link";
import { ReactNode } from "react";

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function IconLink({ href, icon, label }: IconLinkProps) {
  return (
    <li className="mr-4 last:mr-0 shrink-0 text-xs">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`${label} (opens in a new tab)`}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
}