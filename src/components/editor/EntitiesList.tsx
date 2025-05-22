"use client";

import { Edit, ExternalLink, Plus, Trash2 } from "lucide-react";
import { useMemo,useState } from "react";
import ReactMarkdown from "react-markdown";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { useResume } from "@/contexts/ResumeContext";
import { formatDate } from "@/lib/dateUtils";
import { createDefaultEntity, isUsed } from "@/lib/entityUtils";
import { entityMetadata, ResumeDataKeysWithEntries } from "@/types/resume";

import { DeleteConfirmationDialog } from "./dialogs/DeleteConfirmationDialog";

interface EntitiesListProps {
  entityType: ResumeDataKeysWithEntries;
  onSelect: (id: string) => void;
}

export function EntitiesList({ entityType, onSelect }: EntitiesListProps) {
  const { data, updateData, deleteEntry } = useResume();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [usedFilter, setUsedFilter] = useState<string>("all");
  const [publishedFilter, setPublishedFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const entities = data[entityType].entries;
  const metadata = entityMetadata[entityType];

  // Get organizations list for filter
  const organizations = useMemo(
    () => data.organizations?.entries || [],
    [data.organizations?.entries]
  );
  // Get categories for skills
  const skillCategories = useMemo(() => {
    if (entityType !== "skills") return [];
    const cats = new Set<string>();
    entities.forEach((s: any) => s.category && cats.add(s.category));
    return Array.from(cats);
  }, [entityType, entities]);

  // Apply filters
  const filteredEntities = useMemo(() => {
    return entities.filter((entity: any) => {
      // Organization filter
      if (orgFilter !== "all" && "organizationId" in entity) {
        if (entity.organizationId !== orgFilter) return false;
      }
      // Used/unused filter
      if (usedFilter !== "all") {
        const used = isUsed(data, entityType, entity.id);
        if (usedFilter === "used" && !used) return false;
        if (usedFilter === "unused" && used) return false;
      }
      // Published/Draft filter
      if (publishedFilter !== "all" && "isPublished" in entity) {
        if (publishedFilter === "published" && !entity.isPublished)
          return false;
        if (publishedFilter === "draft" && entity.isPublished) return false;
      }
      // Category filter for skills
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

  // Function to get related organization
  const getOrganization = (organizationId: string) => {
    return data.organizations.entries.find((org) => org.id === organizationId);
  };

  return (
    <div className="space-y-6 entity-list">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <h2 className="text-2xl font-bold">{metadata.title}</h2>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Фильтр по организации */}
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
          {/* Фильтр по used/unused */}
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
          {/* Фильтр по Published/Draft */}
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
          {/* Фильтр по категории для скиллов */}
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
          <Button onClick={handleAddEntity} className="add-entity-button">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEntities.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No entries. Click &quot;Add&quot; to create a new entry.
            </CardContent>
          </Card>
        ) : (
          filteredEntities.map((entity) => (
            <Card
              key={entity.id}
              className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden relative group flex flex-col entity-card"
              onClick={() => onSelect(entity.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex pr-8 justify-between items-start overflow-hidden">
                  <CardTitle className="text-lg truncate">
                    {"title" in entity ? entity.title : entity.id}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => handleDeleteClick(entity.id, e)}
                    className="h-8 w-8 flex-shrink-0 absolute top-4 right-4 hover:bg-destructive hover:text-destructive-foreground transition-colors delete-button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {"isPublished" in entity && (
                    <Badge variant={entity.isPublished ? "default" : "outline"}>
                      {entity.isPublished ? "Published" : "Draft"}
                    </Badge>
                  )}

                  {isUsed(data, entityType, entity.id) && (
                    <Badge variant="secondary">Used</Badge>
                  )}

                  {"category" in entity && (
                    <Badge variant="secondary">{entity.category}</Badge>
                  )}

                  {/* Display related organization */}
                  {"organizationId" in entity && entity.organizationId && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 max-w-full"
                    >
                      <span className="truncate">
                        {getOrganization(entity.organizationId)?.title ||
                          "Organization not found"}
                      </span>
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {"description" in entity && (
                  <div className="text-sm text-muted-foreground line-clamp-2 break-words">
                    <ReactMarkdown>{entity.description}</ReactMarkdown>
                  </div>
                )}

                {/* Display dates */}
                {"startDate" in entity && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {formatDate(entity.startDate)} -{" "}
                    {entity.endDate ? formatDate(entity.endDate) : "Present"}
                  </div>
                )}

                {/* Display date for certificates */}
                {"date" in entity && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {formatDate(entity.date)}
                  </div>
                )}

                {/* Display skills */}
                {"skills" in entity && entity.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entity.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {entity.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{entity.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Display links */}
                <div className="mt-auto pt-3 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-0 edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(entity.id);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Edit</span>
                  </Button>

                  {/* Links for projects */}
                  {"source" in entity && entity.source && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(entity.source, "_blank");
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
