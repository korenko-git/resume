"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { Input } from "@/components/common/ui/input";
import { Textarea } from "@/components/common/ui/textarea";
import { Button } from "@/components/common/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Organization } from "@/types/resume";
import { useResume } from "@/contexts/ResumeContext";
import { getAssetPath } from "@/lib/assetPath";
import { handleImageFileChange } from "@/lib/fileUtils";

interface OrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId?: string;
  updateOrganizationId: (id: string) => void;
}

export function OrganizationDialog({
  isOpen,
  onClose,
  organizationId,
  updateOrganizationId,
}: OrganizationDialogProps) {
  const { organizations, updateOrganization } = useResume();
  const [selectedOrgId, setSelectedOrgId] = useState<string>("");
  const [formData, setFormData] = useState<Organization>({
    id: "",
    title: "",
    description: "",
    url: "",
    logo: "",
  });

  useEffect(() => {
    if (organizationId) {
      setSelectedOrgId(organizationId);
      const organization = organizations.find(
        (entry) => entry.id === organizationId
      );
      if (organization) {
        setFormData(organization);
      }
    }
  }, [organizationId, organizations]);

  const handleSelectChange = (value: string) => {
    setSelectedOrgId(value);
    if (value === "new") {
      setFormData({
        id: `org-${Date.now()}`,
        title: "",
        description: "",
        url: "",
        logo: "",
      });
    } else {
      const selectedOrg = organizations.find((org) => org.id === value);
      if (selectedOrg) {
        setFormData(selectedOrg);
      }
    }
  };

  const handleSave = () => {
    if (organizationId && organizationId !== formData.id) {
      updateOrganizationId(formData.id);
    }

    updateOrganization(formData);
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageFileChange(e, (base64) => {
      setFormData({ ...formData, logo: base64 });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[500px]"
        onKeyDown={handleKeyDown}
        aria-labelledby="organization-dialog-title"
        role="dialog"
        aria-modal="true"
      >
        <DialogTitle className="sr-only">Organization</DialogTitle>

        <DialogHeader>
          <DialogTitle id="organization-dialog-title">Organization</DialogTitle>
        </DialogHeader>

        <div
          className="space-y-4 py-4"
          role="form"
          aria-label="Organization form"
        >
          <div>
            <label
              id="org-select-label"
              className="text-sm font-medium mb-1 block"
            >
              Select Organization
            </label>
            <Select
              value={selectedOrgId}
              onValueChange={handleSelectChange}
              aria-labelledby="org-select-label"
            >
              <SelectTrigger aria-label="Select an organization">
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Add new organization</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="org-name"
                className="text-sm font-medium mb-1 block"
              >
                Name
              </label>
              <Input
                id="org-name"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                aria-required="true"
              />
            </div>
            <div>
              <label
                htmlFor="org-description"
                className="text-sm font-medium mb-1 block"
              >
                Description
              </label>
              <Textarea
                id="org-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="org-url"
                className="text-sm font-medium mb-1 block"
              >
                URL
              </label>
              <Input
                id="org-url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                type="url"
                aria-describedby="url-format"
              />
              <span id="url-format" className="sr-only">
                Enter URL in format: https://example.com
              </span>
            </div>
            <div>
              <label
                htmlFor="org-logo-url"
                className="text-sm font-medium mb-1 block"
              >
                Logo
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  id="org-logo-url"
                  value={formData.logo}
                  onChange={(e) =>
                    setFormData({ ...formData, logo: e.target.value })
                  }
                  placeholder="Logo URL"
                  aria-describedby="logo-help"
                />
                <Input
                  id="org-logo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="max-w-[150px]"
                  aria-label="Upload logo image"
                />
              </div>
              <span id="logo-help" className="sr-only">
                Enter a URL for the organization logo or upload an image file
              </span>
              {formData.logo && (
                <div className="mt-2">
                  <img
                    src={getAssetPath(formData.logo)}
                    alt={`${formData.title || "Organization"} logo preview`}
                    className="w-16 h-16 object-contain bg-white rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="flex justify-end gap-4"
          role="group"
          aria-label="Form actions"
        >
          <Button
            variant="outline"
            onClick={onClose}
            aria-label="Cancel and close dialog"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} aria-label="Save organization">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
