'use client';

import { useRouter } from 'next/navigation';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/common/ui/button';
import { ThemeToggle } from '@/components/common/layout/ThemeToggle';
import { Editor } from '@/components/editor/Editor';

export default function EditorContent() {
  const router = useRouter();
  const { loading, error } = useResume();

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 px-4">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Resume Editor</h1>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Button variant="outline" onClick={() => router.push('/')}>
            Home
          </Button>
        </div>
      </div>

      <Editor />
    </div>
  );
}