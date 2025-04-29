import { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { ResumeDataKeys, ResumeDataTypes } from "@/types/resume";

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

  const handleUpdate = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    if (entryData) {
      updateData(type, entryData);
    }
    setIsEditing(false);
    onAfterUpdate?.();
  };

  const handleCancel = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setEntryData(getDataFromSource());
    setIsEditing(false);
    onAfterCancel?.();
  };

  return {
    entryData,
    setEntryData,
    isEditing,
    setIsEditing,
    handleEditStart,
    handleDataChange,
    handleUpdate,
    handleCancel
  };
}