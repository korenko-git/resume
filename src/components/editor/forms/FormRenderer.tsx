import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Switch } from "@/components/common/ui/switch";
import { Textarea } from "@/components/common/ui/textarea";
import { SkillsSelect } from "@/components/editor/controls/SkillsSelect";
import {
  AllEntityFields,
  FieldDefinition,
  ResumeDataWithEntries,
} from "@/types/resume";

import { DateInput } from "../controls/DateInput";
import { ImageUpload } from "../controls/ImageUpload";
import { ImageUrlInput } from "../controls/ImageUrlInput";
import { OrganizationSelector } from "../controls/OrganizationSelector";
import { UrlInput } from "../controls/UrlInput";

interface FormRendererProps {
  formData: ResumeDataWithEntries;
  onFieldChange: (field: AllEntityFields, value: any) => void;
}

export function FormRenderer({ formData, onFieldChange }: FormRendererProps) {
  const renderField = (field: FieldDefinition) => {
    const {
      name,
      label,
      type: fieldType,
      required,
      placeholder,
      options,
    } = field;
    const value = (formData as any)[name];

    switch (fieldType) {
      case "text":
        return (
          <div className="form-field space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              value={value || ""}
              onChange={(e) =>
                onFieldChange(name as AllEntityFields, e.target.value)
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
                onFieldChange(name as AllEntityFields, e.target.value)
              }
              rows={5}
              required={required}
              placeholder={placeholder}
            />
          </div>
        );
      case "switch":
        return (
          <div className="form-field published-toggle flex items-center justify-end space-x-2">
            <Switch
              id={name}
              checked={value || false}
              onCheckedChange={(checked) =>
                onFieldChange(name as AllEntityFields, checked)
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
            onChange={(value) => onFieldChange(name as AllEntityFields, value)}
            required={required}
            placeholder={placeholder}
          />
        );
      case "organization":
        return (
          <OrganizationSelector
            value={value || ""}
            onChange={(value) => onFieldChange(name as AllEntityFields, value)}
            label={label}
          />
        );
      case "skills":
        return (
          <SkillsSelect
            selectedSkillIds={(value as string[]) || []}
            onSelectionChange={(value) =>
              onFieldChange(name as AllEntityFields, value)
            }
          />
        );
      case "url":
        return (
          <UrlInput
            label={label}
            value={value || ""}
            onChange={(value) => onFieldChange(name as AllEntityFields, value)}
            placeholder={placeholder}
          />
        );
      case "image":
        return (
          <ImageUpload
            label={label}
            value={value || ""}
            onChange={(value) => onFieldChange(name as AllEntityFields, value)}
          />
        );
      case "imageWithUrl":
        return (
          <ImageUrlInput
            label={label}
            value={value || ""}
            onChange={(value) => onFieldChange(name as AllEntityFields, value)}
            urlPlaceholder={placeholder}
          />
        );
      case "select":
        return (
          <div className="form-field space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Select
              value={value || ""}
              onValueChange={(val) =>
                onFieldChange(name as AllEntityFields, val)
              }
            >
              <SelectTrigger id={name}>
                <SelectValue placeholder={placeholder || "Select..."} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return { renderField };
}
