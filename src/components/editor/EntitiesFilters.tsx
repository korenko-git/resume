import { Plus } from "lucide-react";

import { Button } from "@/components/common/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { hasRelationships } from "@/lib/entityUtils";
import { ResumeDataKeysWithEntries } from "@/types/resume";

interface EntitiesFiltersProps {
  entities: any[];
  entityType: ResumeDataKeysWithEntries;
  organizations: any[];
  skillCategories: string[];
  filters: {
    orgFilter: string;
    usedFilter: string;
    publishedFilter: string;
    categoryFilter: string;
  };
  setters: {
    setOrgFilter: (value: string) => void;
    setUsedFilter: (value: string) => void;
    setPublishedFilter: (value: string) => void;
    setCategoryFilter: (value: string) => void;
  };
  onAddEntity: () => void;
}

export function EntitiesFilters({
  entities,
  entityType,
  organizations,
  skillCategories,
  filters,
  setters,
  onAddEntity,
}: EntitiesFiltersProps) {
  const { orgFilter, usedFilter, publishedFilter, categoryFilter } = filters;
  const { setOrgFilter, setUsedFilter, setPublishedFilter, setCategoryFilter } =
    setters;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {"organizationId" in (entities[0] || {}) && (
        <Select value={orgFilter} onValueChange={setOrgFilter}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orgs</SelectItem>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasRelationships(entityType) && (
        <Select value={usedFilter} onValueChange={setUsedFilter}>
          <SelectTrigger className="min-w-[100px]">
            <SelectValue placeholder="Used" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="unused">Unused</SelectItem>
          </SelectContent>
        </Select>
      )}

      {"isPublished" in (entities[0] || {}) && (
        <Select value={publishedFilter} onValueChange={setPublishedFilter}>
          <SelectTrigger className="min-w-[110px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      )}

      {entityType === "skills" && (
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="min-w-[120px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {skillCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button onClick={onAddEntity} className="add-entity-button">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
