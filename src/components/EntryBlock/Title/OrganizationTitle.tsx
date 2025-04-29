import { EditableField } from "@/components/EditableField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResume } from "@/contexts/ResumeContext";
import { Organization } from "@/types/resume";
import { ArrowUpRight, Edit } from "lucide-react";

interface OrganizationTitleProps {
  data: { organizationId: string; title: string };
  editable?: boolean;
  isEditing: boolean;
  onDataChange: (data: Partial<OrganizationTitleProps["data"]>) => void;
  onOrgModalOpen: () => void;
}

export function OrganizationTitle({
  data,
  editable,
  isEditing,
  onDataChange,
  onOrgModalOpen,
}: OrganizationTitleProps) {
  const { organizations } = useResume();
  const organization: Organization | undefined = organizations.find(
    (org) => org.id === data.organizationId
  );

  if (!organization) {
    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <button onClick={onOrgModalOpen} className="text-sm text-blue-600 hover:underline">
            Select organization
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <EditableField
      value={data}
      isEditing={isEditing}
      onChange={onDataChange}
      className="flex gap-x-2 items-center"
      renderDisplay={(value) => (
        <>
          <div className="flex-shrink-0 relative">
            <img
              className="w-10 h-10 rounded bg-neutral-400/10 lg:grayscale lg:group-hover:grayscale-0"
              src={organization.logo}
              alt={`${organization.title} logo`}
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder-logo.png";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium leading-snug text-slate-700 dark:text-slate-50">
              {value.title}
            </h3>
            <a
              className="inline-flex items-baseline font-medium leading-tight text-slate-700 hover:text-blue-600 focus-visible:text-blue-600 dark:text-slate-50 dark:hover:text-blue-200 group/link text-base"
              href={organization.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${value.title} at ${organization.title} (opens in a new tab)`}
            >
              {!editable && (
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              )}

              <span className="inline-block border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-300 lg:border-0">
                {organization.title}
                <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
              </span>
            </a>
          </div>
        </>
      )}
      renderEdit={(value, onChange) => (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid w-full items-center gap-1.5">
            <Label>Position</Label>
            <Input
              value={value.title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              className="font-medium leading-snug text-base"
              placeholder="Position title"
            />
          </div>
          
          <Label>Organization</Label>
          <div onClick={onOrgModalOpen} title="Change organization" className="flex items-center gap-2 mt-1 cursor-pointer">
            <div className="flex-shrink-0 relative">
              <img
                className="w-10 h-10 rounded bg-neutral-400/10"
                src={organization.logo}
                alt={`${organization.title} logo`}
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder-logo.png";
                  e.currentTarget.onerror = null;
                }}
              />
              
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded opacity-0 hover:opacity-100 transition-opacity">
                <Edit className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <span className="text-base text-muted-foreground">{organization.title}</span>
          </div>
        </div>
      )}
    />
  );
}
