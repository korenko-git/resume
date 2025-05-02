import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Textarea } from "@/components/common/ui/textarea";
import { Switch } from "@/components/common/ui/switch";
import { DateInput } from "@/components/editor/controls/DateInput";
import { SkillsInput } from "@/components/editor/controls/SkillsInput";
import { UrlInput } from "@/components/editor/controls/UrlInput";
import { OrganizationSelector } from "@/components/editor/controls/OrganizationSelector";
import { ImageUpload } from "@/components/editor/controls/ImageUpload";
import {
  AllEntityFields,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";
import EntryBlock from "@/components/resume/Entry";
import { Eye, Save } from "lucide-react";

interface EntityFormProps {
  type: ResumeDataKeysWithEntries;
  data: ResumeDataWithEntries;
  onUpdate: (updatedData: ResumeDataWithEntries) => void;
}

export function EntityForm({ type, data, onUpdate }: EntityFormProps) {
  const [formData, setFormData] = useState<ResumeDataWithEntries>(data);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: AllEntityFields, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const hasDateRange = type === "experience" || type === "education";
  const hasSingleDate = type === "certifications";
  const hasOrganization =
    type === "experience" || type === "education" || type === "certifications";
  const hasSkills =
    type === "experience" ||
    type === "education" ||
    type === "projects" ||
    type === "certifications";
  const hasUrls = type === "projects";
  const hasImage = type === "projects";

  if (isPreviewMode) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={togglePreview} variant="outline" className="mr-2">
            Edit
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <EntryBlock id={formData.id} typeData={type} editable={false} />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPublished"
            checked={formData.isPublished}
            onCheckedChange={(checked) => handleChange("isPublished", checked)}
          />
          <Label htmlFor="isPublished">Published</Label>
        </div>
      </div>

      {hasDateRange && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            id="startDate"
            label="Start Date"
            value={(formData as any).startDate}
            onChange={(value) => handleChange("startDate", value)}
            required
          />
          <DateInput
            id="endDate"
            label="End Date"
            value={(formData as any).endDate}
            onChange={(value) => handleChange("endDate", value)}
            placeholder="Present"
          />
        </div>
      )}

      {hasSingleDate && (
        <DateInput
          id="date"
          label="Date"
          value={(formData as any).date}
          onChange={(value) => handleChange("date", value)}
          required
        />
      )}

      {hasOrganization && (
        <OrganizationSelector
          value={(formData as any).organizationId}
          onChange={(value) => handleChange("organizationId", value)}
          label="Organization"
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
        />
      </div>

      {hasSkills && (
        <SkillsInput
          value={(formData as any).skills || []}
          onChange={(value) => handleChange("skills", value)}
          label="Skills"
        />
      )}

      {hasUrls && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UrlInput
            label="Source Code"
            value={(formData as any).source || ""}
            onChange={(value) => handleChange("source", value)}
            placeholder="https://github.com/..."
          />
          <UrlInput
            label="Demo"
            value={(formData as any).demo || ""}
            onChange={(value) => handleChange("demo", value)}
            placeholder="https://..."
          />
        </div>
      )}

      {hasImage && (
        <ImageUpload
          label="Project Image"
          value={(formData as any).image || ""}
          onChange={(value) => handleChange("image", value)}
        />
      )}

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
    </form>
  );
}
