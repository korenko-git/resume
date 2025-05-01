'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/common/ui/dialog';
import { Button } from '@/components/common/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { useEffect, useState } from 'react';
import { deepEqual } from '@/lib/utils';

interface DraftDialogProps {
  onClose?: () => void;
}

export function DraftDialog({ onClose }: DraftDialogProps) {
  const { data, setData, setVersion } = useResume();
  
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  const handleRestoreDraft = () => {
    if (draftData) {
      setData(draftData);
      setVersion(draftData.about.version);
    }
    setShowDraftDialog(false);
  };

  const handleClose = () => {
    localStorage.removeItem('resumeDraft');
    setShowDraftDialog(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (showDraftDialog) return;

    const savedDraft = localStorage.getItem('resumeDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      const draftVersion = Number(draft.about.version) || 0;
      const currentVersion = Number(data.about?.version) || 0;

      if (draftVersion > currentVersion) {
        const draftWithoutVersion = { ...draft, about: { ...draft.about, version: undefined } };
        const dataWithoutVersion = { ...data, about: { ...data.about, version: undefined } };

        if (!deepEqual(draftWithoutVersion, dataWithoutVersion)) {
          setDraftData(draft);
          setShowDraftDialog(true);
        }
      }
    }
  }, [data, showDraftDialog]);

  return (
    <Dialog open={showDraftDialog} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Draft Found</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>You have a newer version of your resume in draft. Would you like to restore it?</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRestoreDraft}>
            Restore Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}