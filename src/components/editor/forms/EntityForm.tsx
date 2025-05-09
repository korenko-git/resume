"use client";

import { Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Switch } from "@/components/common/ui/switch";
import { Textarea } from "@/components/common/ui/textarea";
import EntryBlock from "@/components/resume/Entry";
import {
  AllEntityFields,
  entityFields,
  FieldDefinition,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

import { DateInput } from "../controls/DateInput";
import { ImageUpload } from "../controls/ImageUpload";
import { ImageUrlInput } from "../controls/ImageUrlInput";
import { OrganizationSelector } from "../controls/OrganizationSelector";
import { SkillsInput } from "../controls/SkillsInput";
import { UrlInput } from "../controls/UrlInput";

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
  const [formData, setFormData] = useState<ResumeDataWithEntries>(data);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: AllEntityFields, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange && onChange(updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate && onUpdate(formData);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // Render a field based on its type
  const renderField = (field: FieldDefinition) => {
    const { name, label, type, required, placeholder } = field;
    const value = (formData as any)[name];

    switch (type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              value={value || ""}
              onChange={(e) =>
                handleChange(name as AllEntityFields, e.target.value)
              }
              required={required}
              placeholder={placeholder}
            />
          </div>
        );
      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Textarea
              id={name}
              value={value || ""}
              onChange={(e) =>
                handleChange(name as AllEntityFields, e.target.value)
              }
              rows={5}
              required={required}
              placeholder={placeholder}
            />
          </div>
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2 justify-end">
            <Switch
              id={name}
              checked={value || false}
              onCheckedChange={(checked) =>
                handleChange(name as AllEntityFields, checked)
              }
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
        );
      case "date":
        return (
          <DateInput
            id={name}
            label={label}
            value={value || ""}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
            required={required}
            placeholder={placeholder}
          />
        );
      case "organization":
        return (
          <OrganizationSelector
            value={value || ""}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
            label={label}
          />
        );
      case "skills":
        return (
          <SkillsInput
            value={value || []}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
            label={label}
          />
        );
      case "url":
        return (
          <UrlInput
            label={label}
            value={value || ""}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
            placeholder={placeholder}
          />
        );
      case "image":
        return (
          <ImageUpload
            label={label}
            value={value || ""}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
          />
        );
      case "imageWithUrl":
        return (
          <ImageUrlInput
            label={label}
            value={value || ""}
            onChange={(value) => handleChange(name as AllEntityFields, value)}
            urlPlaceholder={placeholder}
          />
        );
      default:
        return null;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={togglePreview} variant="outline" className="mr-2">
            Edit
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <EntryBlock
            id={formData.id}
            typeData={type}
            editable={false}
            customData={formData}
          />
        </div>
      </div>
    );
  }

  // Get fields for the current entity type
  const fields = entityFields[type] || [];

  // Group fields by whether they should be in a grid
  const gridFields = fields.filter((field) => field.grid);
  const normalFields = fields.filter((field) => !field.grid);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Render grid fields */}
      {gridFields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridFields.map((field) => (
            <div key={field.name}>{renderField(field)}</div>
          ))}
        </div>
      )}

      {/* Render normal fields */}
      {normalFields.map((field) => (
        <div key={field.name}>{renderField(field)}</div>
      ))}

      {!hideSubmitButton && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={togglePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      )}
    </form>
  );
}
