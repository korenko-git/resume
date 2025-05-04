import { useState, useEffect, useCallback } from "react";
import { useResume } from "@/contexts/ResumeContext";
import {
  ResumeDataKeys,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import { toast } from "sonner";

interface UseEntryDataOptions {
  editable?: boolean;
  onAfterUpdate?: () => void;
  onAfterCancel?: () => void;
  onAfterDelete?: () => void;
}

export function useEntryData<T extends ResumeDataWithEntries>(
  type: ResumeDataKeysWithEntries,
  id: string,
  options: UseEntryDataOptions = {}
) {
  const {
    editable = false,
    onAfterUpdate,
    onAfterCancel,
    onAfterDelete,
  } = options;
  const { getEntryFromData, data, version, updateData, deleteEntry } =
    useResume();

  const getDataFromSource = useCallback((): T | null => {
    return getEntryFromData(type as any, id) as T;
  }, [id, type, data, getEntryFromData]);

  const [entryData, setEntryData] = useState<T | null>(getDataFromSource());
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setEntryData(getDataFromSource());
  }, [version]);

  const handleEditStart = useCallback(() => {
    if (editable) {
      setIsEditing(true);
    }
  }, [editable]);

  const handleDataChange = useCallback((updatedData: Partial<T>) => {
    setEntryData((prevData) =>
      prevData ? { ...prevData, ...updatedData } : null
    );
  }, []);

  const handleUpdate = useCallback(
    async (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      if (!entryData) return;

      setIsSaving(true);

      try {
        updateData(type, entryData);
        setIsEditing(false);
        onAfterUpdate?.();

        toast.success("Changes saved successfully");
      } catch (error) {
        toast.error("Failed to save changes");
        console.error("Save error:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [entryData, type, updateData, onAfterUpdate]
  );

  const handleCancel = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setEntryData(getDataFromSource());
      setIsEditing(false);
      onAfterCancel?.();

      toast.info("Changes discarded");
    },
    [getDataFromSource, onAfterCancel]
  );

  const handleDeleteClick = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setIsDeleteDialogOpen(true);
    },
    []
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!id || type === "about" || type === "organizations") {
      if (type === "about") {
        toast.error("Cannot delete the About section");
      }
      setIsDeleteDialogOpen(false);
      return;
    }

    setIsDeleting(true);

    try {
      deleteEntry(type, id);
      setIsEditing(false);
      setIsDeleteDialogOpen(false);
      onAfterDelete?.();

      toast.success("Entry deleted successfully");
    } catch (error) {
      toast.error("Failed to delete entry");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  }, [id, type, deleteEntry, onAfterDelete]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  return {
    entryData,
    isEditing,
    isSaving,
    isDeleting,
    isDeleteDialogOpen,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
}
