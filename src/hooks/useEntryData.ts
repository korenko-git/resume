import { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeDataKeys, ResumeDataTypes } from "@/types/resume";
import { toast } from "sonner";

interface UseEntryDataOptions {
  editable?: boolean;
  onAfterUpdate?: () => void;
  onAfterCancel?: () => void;
}

export function useEntryData<T extends ResumeDataTypes>(
  type: ResumeDataKeys,
  id?: string,
  options: UseEntryDataOptions = {}
) {
  const { editable = true, onAfterUpdate, onAfterCancel } = options;
  const { getEntryFromData, data, version, updateData } = useResume();
  
  const getDataFromSource = (): T | null => {
    return id 
      ? getEntryFromData(type as any, id) as T
      : (data?.[type] as T);
  };
    
  const [entryData, setEntryData] = useState<T | null>(getDataFromSource());
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEntryData(getDataFromSource());
  }, [version, id, type, data]);

  const handleEditStart = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleDataChange = (updatedData: Partial<T>) => {
    setEntryData((prevData) =>
      prevData ? { ...prevData, ...updatedData } : null
    );
  };

  const handleUpdate = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    if (entryData) {
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
    }
  };

  const handleCancel = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setEntryData(getDataFromSource());
    setIsEditing(false);
    onAfterCancel?.();
    
    toast.info("Changes discarded");
  };

  return {
    entryData,
    setEntryData,
    isEditing,
    setIsEditing,
    isSaving,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel
  };
}