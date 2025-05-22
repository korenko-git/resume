"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { useResume } from "@/contexts/ResumeContext";
import { deepEqual, deepMerge } from "@/lib/utils";
import { resumeSchema } from "@/lib/validationSchemas";

interface DraftDialogProps {
  onClose?: () => void;
}

export function DraftDialog({ onClose }: DraftDialogProps) {
  const { data, setData } = useResume();

  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  const handleRestoreDraft = () => {
    if (draftData) {
      setData(deepMerge(data, draftData));
    }
    setShowDraftDialog(false);
  };

  const handleClose = () => {
    localStorage.removeItem("resumeDraft");
    setShowDraftDialog(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem("resumeDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        const draftVersion = Number(draft.version.version) || 0;
        const currentVersion = Number(data.version) || 0;

        if (draftVersion > currentVersion) {
          const draftWithoutVersion = { ...draft, version: undefined };
          const dataWithoutVersion = { ...data, version: undefined };

          if (!deepEqual(draftWithoutVersion, dataWithoutVersion)) {
            resumeSchema.parse(draft);
            setDraftData(draft);
            setShowDraftDialog(true);
          }
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Draft validation error:", error.errors);
        } else {
          console.error("Error parsing draft JSON:", error);
        }

        localStorage.removeItem("resumeDraft");
      }
    }
  }, [data, showDraftDialog]);

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
