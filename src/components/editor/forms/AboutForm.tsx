import { useState, useEffect } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Textarea } from "@/components/common/ui/textarea";
import { UrlInput } from "@/components/editor/controls/UrlInput";
import { ImageUpload } from "@/components/editor/controls/ImageUpload";

interface AboutFormProps {
  data: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    isPublished?: boolean;
    location?: string;
    email?: string;
    phone?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    avatar?: string;
  };
}

export function AboutForm({ data }: AboutFormProps) {
  const { updateData } = useResume();
  const [formData, setFormData] = useState(data);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData("about", formData);
  };

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  if (isPreviewMode) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Name</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Position</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">About</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UrlInput
          label="GitHub"
          value={formData.github || ""}
          onChange={(value) => handleChange("github", value)}
          placeholder="https://github.com/username"
        />

        <UrlInput
          label="LinkedIn"
          value={formData.linkedin || ""}
          onChange={(value) => handleChange("linkedin", value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <UrlInput
        label="Website"
        value={formData.website || ""}
        onChange={(value) => handleChange("website", value)}
        placeholder="https://example.com"
      />

      <ImageUpload
        label="Avatar"
        value={formData.avatar || ""}
        onChange={(value) => handleChange("avatar", value)}
      />

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
