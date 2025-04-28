'use client';

import { useState } from 'react';
import { createUpdateZip } from '@/lib/zipUtils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useResume } from '@/contexts/ResumeContext';
import Resume from '@/components/resume';
import { WelcomeTour } from '@/components/WelcomeTour';

export default function Editor() {
  const { data, loading, error } = useResume();
  const router = useRouter();
  const [runTour, setRunTour] = useState(false);

  if (loading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8">Error: {error.message}</div>;
  }

  const handleDownload = async () => {
    const logoImages: File[] = [];
    const dataWithImagePaths = { ...data };
    
    const processedEntries = await Promise.all(data.organizations.entries.map(async (org) => {
      if (org.logo && org.logo.startsWith('data:image')) {
        const fileName = `org-${org.id}-logo.png`;
        const response = await fetch(org.logo);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: 'image/png' });
        logoImages.push(file);
        
        return {
          ...org,
          logo: `images/${fileName}`
        };
      }
      return org;
    }));

    dataWithImagePaths.organizations.entries = processedEntries;

    const zip = await createUpdateZip(dataWithImagePaths, logoImages, {
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
      <WelcomeTour 
        run={runTour}
        onFinish={() => setRunTour(false)}
      />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8 resume-editor-header">
          <h1 className="text-3xl font-bold">Resume Editor</h1>
          <div className="flex gap-4">
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
        
        <Resume data={data} />
      </div>
    </>
  );
}