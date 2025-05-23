import { useEffect, useState } from "react";

import { AllEntityFields, ResumeDataWithEntries } from "@/types/resume";

interface UseEntityFormStateProps {
  initialData: ResumeDataWithEntries;
  onChange?: (data: ResumeDataWithEntries) => void;
}

export function useEntityFormState({
  initialData,
  onChange,
}: UseEntityFormStateProps) {
  const [formData, setFormData] = useState<ResumeDataWithEntries>(initialData);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: AllEntityFields, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return {
    formData,
    isPreviewMode,
    handleChange,
    togglePreview,
  };
}
