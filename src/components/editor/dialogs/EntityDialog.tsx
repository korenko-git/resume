import { useState } from "react";

import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { createDefaultEntity } from "@/lib/entityUtils";
import { ResumeDataKeysWithEntries, ResumeDataWithEntries } from "@/types/resume";

import { EntityForm } from "../forms/EntityForm";

interface EntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: ResumeDataKeysWithEntries;
  title?: string;
  onConfirm: (entity: ResumeDataWithEntries) => void;
}

export function EntityDialog({
  open,
  onOpenChange,
  entityType,
  title,
  onConfirm,
}: EntityDialogProps) {
  const [entity, setEntity] = useState<ResumeDataWithEntries>(
    createDefaultEntity(entityType)
  );

  const handleUpdate = (updatedEntity: ResumeDataWithEntries) => {
    setEntity(updatedEntity);
  };

  const handleConfirm = () => {
    onConfirm(entity);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const dialogTitle = title || `Add ${entityType}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <EntityForm
            type={entityType}
            data={entity}
            onChange={handleUpdate}
            hideSubmitButton
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}