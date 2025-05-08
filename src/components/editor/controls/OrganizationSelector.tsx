import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { useResume } from "@/contexts/ResumeContext";
import { cn } from "@/lib/utils";
import { Organization, ResumeDataWithEntries } from "@/types/resume";

import { EntityDialog } from "../dialogs/EntityDialog";

interface OrganizationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function OrganizationSelector({
  value,
  onChange,
  label = "Organization",
  className,
}: OrganizationSelectorProps) {
  const { data, updateData } = useResume();
  const [organizations, setOrganizations] = useState<Organization[]>(
    data.organizations?.entries || []
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setOrganizations(data.organizations?.entries || []);
  }, [data.organizations?.entries]);

  const handleAddOrganization = () => {
    setDialogOpen(true);
  };

  const handleOrganizationCreated = (entity: ResumeDataWithEntries) => {
    const newOrg = entity as Organization;
    updateData("organizations", newOrg);
    onChange(newOrg.id);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {label && <Label className="text-sm font-medium">{label}</Label>}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAddOrganization}
          className="h-8 px-2 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Create new
        </Button>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn("w-full", !value && "text-muted-foreground")}
        >
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.length === 0 ? (
            <div className="text-center py-2 text-sm text-slate-500">
              No organizations. Create a new one.
            </div>
          ) : (
            organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.title}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      <EntityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entityType="organizations"
        title="Add new organization"
        onConfirm={handleOrganizationCreated}
      />
    </div>
  );
}
