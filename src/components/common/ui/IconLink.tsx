import Link from "next/link";
import { ReactNode } from "react";

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  isExternal?: boolean;
}

export function IconLink({
  href,
  icon,
  label,
  isExternal = false,
}: IconLinkProps) {
  const commonClasses =
    "inline-flex transition-all border border-slate-300 dark:border-neutral-700 hover:border-opacity-0 border-opacity-50 shadow rounded-md bg-white/70 dark:bg-neutral-700/30 px-3 py-2.5 items-center text-slate-800 dark:text-white font-semibold group p-2 text-sm gap-x-2 mt-4 hover:bg-slate-100";

  return (
    <li className="mr-4 last:mr-0 shrink-0 text-xs">
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClasses}
          aria-label={`${label} (opens in a new tab)`}
        >
          {icon}
          <span className="sr-only">{label}</span>
        </a>
      ) : (
        <Link href={href} className={commonClasses} aria-label={label}>
          {icon}
          <span className="sr-only">{label}</span>
        </Link>
      )}
    </li>
  );
}
