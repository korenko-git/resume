"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/common/ui/card";
import { entityMetadata } from "@/constants/editor";
import { useResume } from "@/contexts/ResumeContext";
import { useEntityFilters } from "@/hooks/useEntityFilters";
import { createDefaultEntity } from "@/lib/entityUtils";
import { ResumeDataKeysWithEntries } from "@/types/resume";

import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";
import { EntitiesFilters } from "./EntitiesFilters";
import { EntityCard } from "./EntityCard";

interface EntitiesListProps {
  entityType: ResumeDataKeysWithEntries;
  onSelect: (id: string) => void;
}

export function EntitiesList({ entityType, onSelect }: EntitiesListProps) {
  const { data, updateData, deleteEntry } = useResume();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const entities = data[entityType].entries;
  const metadata = entityMetadata[entityType];

  const organizations = useMemo(
    () => data.organizations?.entries || [],
    [data.organizations?.entries],
  );

  const skillCategories = useMemo(() => {
    if (entityType !== "skills") return [];
    const cats = new Set<string>();
    entities.forEach((s: any) => s.category && cats.add(s.category));
    return Array.from(cats);
  }, [entityType, entities]);

  const { filters, setters, filteredEntities } = useEntityFilters(
    entities,
    entityType,
    data,
  );

  const handleAddEntity = () => {
    const newEntity = createDefaultEntity(entityType);
    updateData(entityType, newEntity);
    onSelect(newEntity.id);
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      deleteEntry(entityType, deletingId);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getOrganization = (organizationId: string) => {
    return data.organizations.entries.find((org) => org.id === organizationId);
  };

  return (
    <div className="entity-list space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">{metadata.title}</h2>
        <EntitiesFilters
          entities={entities}
          entityType={entityType}
          organizations={organizations}
          skillCategories={skillCategories}
          filters={filters}
          setters={setters}
          onAddEntity={handleAddEntity}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntities.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-muted-foreground pt-6 text-center">
              No entries. Click &quot;Add&quot; to create a new entry.
            </CardContent>
          </Card>
        ) : (
          filteredEntities.map((entity) => (
            <EntityCard
              key={entity.id}
              entity={entity}
              entityType={entityType}
              data={data}
              onSelect={onSelect}
              onDelete={handleDeleteClick}
              getOrganization={getOrganization}
            />
          ))
        )}
      </div>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
}
