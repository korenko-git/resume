'use client';

import { useResume } from '@/contexts/ResumeContext';
import Resume from '@/components/resume';
import Navigation from '@/components/Navigation';
import Person from '@/components/Person';
import SocialLinks from '@/components/SocialLinks';
import Link from 'next/link';

export default function Home() {
  const { loading, error } = useResume();

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error.message}</div>;
  }

  return (<>
    <div className="lg:flex lg:justify-between lg:gap-4">
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 text-center lg:text-left">
        <div>
          <Person />
          <Navigation />
        </div>

        <SocialLinks />
      </header>

      <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
        <Resume editable={false} />
      </main>


    </div>

    <footer className="mt-16 py-8 border-t text-center text-sm text-muted-foreground">
      <p className="mb-2">
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
      </p>


      <p>
        © {new Date().getFullYear()} - Built with Next.js and Tailwind CSS
      </p>
    </footer>
  </>
  );
}