'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/common/ui/button';
import { ThemeToggle } from '@/components/common/layout/ThemeToggle';
import { DraftDialog } from '@/components/editor/dialogs/DraftDialog';
import { WelcomeTour } from '@/components/editor/dialogs/WelcomeTour';
import Resume from '@/components/resume';
import { createUpdateZip } from '@/lib/zipUtils';
import { processEntriesWithImages } from '@/lib/imageUtils';

export default function EditorContent() {
  const router = useRouter();
  const { data, loading, error } = useResume();
  const [runTour, setRunTour] = useState(false);

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error.message}</div>;
  }

  const handleDownload = async () => {
    const imageFiles: File[] = [];
    const dataWithImagePaths = { ...data };

    dataWithImagePaths.organizations.entries = await processEntriesWithImages(
      data.organizations.entries,
      'logo',
      'org',
      imageFiles
    );

    dataWithImagePaths.projects.entries = await processEntriesWithImages(
      data.projects.entries,
      'image',
      'project',
      imageFiles
    );

    const zip = await createUpdateZip(dataWithImagePaths, imageFiles, {
      submittedBy: 'guest_user'
    });

    const url = URL.createObjectURL(zip);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-update.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <DraftDialog />

      <WelcomeTour
        run={runTour}
        onFinish={() => setRunTour(false)}
      />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 resume-editor-header gap-4">
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={() => setRunTour(true)}>
              Show Tutorial
            </Button>
            <Button variant="outline" onClick={() => router.push('/')} className="view-button">
              View
            </Button>
            <Button onClick={handleDownload} className="download-button">
              Download Changes as ZIP
            </Button>
          </div>
        </div>

        <Resume editable />
      </div>
    </>
  );
}