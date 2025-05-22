"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { useResume } from "@/contexts/ResumeContext";
import { useDraftResume } from "@/hooks/useDraftResume";

interface DraftDialogProps {
  onClose?: () => void;
}

export function DraftDialog({ onClose }: DraftDialogProps) {
  const { data, setData } = useResume();
  const { hasNewerDraft, restoreDraft, removeDraft } = useDraftResume(data);
  const [showDraftDialog, setShowDraftDialog] = useState(false);

  useEffect(() => {
    if (hasNewerDraft()) {
      setShowDraftDialog(true);
    }
  }, [data, hasNewerDraft]);

  const handleRestoreDraft = () => {
    setData(restoreDraft());
    setShowDraftDialog(false);
  };

  const handleClose = () => {
    removeDraft();
    setShowDraftDialog(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={showDraftDialog} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle className="sr-only">Draft Found</DialogTitle>
        <DialogHeader>
          <DialogTitle>Draft Found</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            You have a newer version of your resume in draft. Would you like to
            restore it?
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRestoreDraft}>Restore Draft</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
