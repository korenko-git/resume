"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isEditorPage = pathname === "/editor";

  return (
    <footer className="text-muted-foreground no-print mt-16 border-t py-8 text-center text-sm">
      <p className="mb-2">
        {isEditorPage ? (
          <>
            Return to the{" "}
            <Link
              href="/"
              className="text-foreground hover:text-primary focus-visible:text-primary inline-flex items-baseline text-base leading-tight font-medium"
            >
              resume view
            </Link>
          </>
        ) : (
          <>
            This resume is hosted on GitHub Pages and can be updated through the{" "}
            <Link
              href="/editor"
              className="text-foreground hover:text-primary focus-visible:text-primary inline-flex items-baseline text-base leading-tight font-medium"
            >
              online editor
            </Link>
          </>
        )}
      </p>

      <p>© {new Date().getFullYear()} - Built with Next.js and Tailwind CSS</p>
    </footer>
  );
}
