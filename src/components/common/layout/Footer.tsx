'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const isEditorPage = pathname === '/editor';

  return (
    <footer className="mt-16 py-8 border-t text-center text-sm text-muted-foreground">
      <p className="mb-2">
        {isEditorPage ? (
          <>
            Return to the <Link
              href="/"
              className="inline-flex items-baseline font-medium leading-tight 
          text-slate-700 hover:text-blue-500
          dark:text-slate-50 dark:hover:text-blue-300 
          focus-visible:text-blue-500 dark:focus-visible:text-blue-400
          text-base"
            >
              resume view
            </Link>
          </>
        ) : (
          <>
            This resume is hosted on GitHub Pages and can be updated through the{' '}
            <Link
              href="/editor"
              className="inline-flex items-baseline font-medium leading-tight 
          text-slate-700 hover:text-blue-500
          dark:text-slate-50 dark:hover:text-blue-300 
          focus-visible:text-blue-500 dark:focus-visible:text-blue-400
          text-base"
            >
              online editor
            </Link>
          </>
        )}
      </p>

      <p>
        © {new Date().getFullYear()} - Built with Next.js and Tailwind CSS
      </p>
    </footer>
  );
}