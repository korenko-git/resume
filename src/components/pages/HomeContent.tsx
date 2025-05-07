'use client';

import Navigation from '@/components/common/layout/Navigation';
import Person from '@/components/resume/sections/Person';
import SocialLinks from '@/components/resume/sections/SocialLinks';
import { useResume } from '@/contexts/ResumeContext';

import { AboutSection } from '../resume/sections/AboutSection';
import { ResumeSections } from '../resume/sections/ResumeSections';

export default function HomeContent() {
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
        <AboutSection />
        <ResumeSections />
      </main>
    </div>
  </>
  );
}