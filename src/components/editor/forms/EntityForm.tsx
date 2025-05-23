"use client";

import { Eye, Save } from "lucide-react";

import { Button } from "@/components/common/ui/button";
import { useEntityFormState } from "@/hooks/useEntityFormState";
import {
  entityFields,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

import { FormPreview } from "./FormPreview";
import { FormRenderer } from "./FormRenderer";

interface EntityFormProps {
  type: ResumeDataKeysWithEntries;
  data: ResumeDataWithEntries;
  onUpdate?: (data: ResumeDataWithEntries) => void;
  onChange?: (data: ResumeDataWithEntries) => void;
  hideSubmitButton?: boolean;
}

export function EntityForm({
  type,
  data,
  onUpdate,
  onChange,
  hideSubmitButton = false,
}: EntityFormProps) {
  const { formData, isPreviewMode, handleChange, togglePreview } =
    useEntityFormState({
      initialData: data,
      onChange,
    });

  const { renderField } = FormRenderer({
    formData,
    onFieldChange: handleChange,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) onUpdate(formData);
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(formData);
  };

  if (isPreviewMode) {
    return (
      <FormPreview
        formData={formData}
        onEdit={togglePreview}
        onSave={handleSave}
      />
    );
  }

  const fields = entityFields[type] || [];
  const gridFields = fields.filter((field) => field.grid);
  const normalFields = fields.filter((field) => !field.grid);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {gridFields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridFields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
          ))}
        </div>
      )}

      {normalFields.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}

      {!hideSubmitButton && (
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={togglePreview}
            className="preview-button"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button type="submit" className="save-button">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      )}
    </form>
  );
}
