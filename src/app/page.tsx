'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useResume } from '@/contexts/ResumeContext';
import Resume from '@/components/resume';

export default function Home() {
  const { data, loading, error } = useResume();
  const router = useRouter();

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      
      <Resume data={data} editable={false} />

      <footer className="mt-16 py-8 border-t text-center text-sm text-muted-foreground">
        <p className="mb-2">
          This resume is hosted on GitHub Pages and can be updated through the{' '}
          <a 
            href="/editor"
            className="text-blue-500 hover:underline"
          >
            online editor
          </a>
        </p>
        <p>
          © {new Date().getFullYear()} - Built with Next.js and Tailwind CSS
        </p>
      </footer>
    </div>
  );
}