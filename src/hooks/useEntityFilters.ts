import { useMemo, useState } from "react";

import { isUsed } from "@/lib/entityUtils";
import { ResumeData, ResumeDataKeysWithEntries } from "@/types/resume";

export function useEntityFilters(
  entities: any[],
  entityType: ResumeDataKeysWithEntries,
  data: ResumeData,
) {
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [usedFilter, setUsedFilter] = useState<string>("all");
  const [publishedFilter, setPublishedFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredEntities = useMemo(() => {
    return entities.filter((entity: any) => {
      if (orgFilter !== "all" && "organizationId" in entity) {
        if (entity.organizationId !== orgFilter) return false;
      }
      if (usedFilter !== "all") {
        const used = isUsed(data, entityType, entity.id);
        if (usedFilter === "used" && !used) return false;
        if (usedFilter === "unused" && used) return false;
      }
      if (publishedFilter !== "all" && "isPublished" in entity) {
        if (publishedFilter === "published" && !entity.isPublished)
          return false;
        if (publishedFilter === "draft" && entity.isPublished) return false;
      }
      if (entityType === "skills" && categoryFilter !== "all") {
        if (entity.category !== categoryFilter) return false;
      }
      return true;
    });
  }, [
    entities,
    orgFilter,
    usedFilter,
    publishedFilter,
    categoryFilter,
    data,
    entityType,
  ]);

  return {
    filters: { orgFilter, usedFilter, publishedFilter, categoryFilter },
    setters: {
      setOrgFilter,
      setUsedFilter,
      setPublishedFilter,
      setCategoryFilter,
    },
    filteredEntities,
  };
}
