import { Edit, ExternalLink, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/card";
import { formatDate } from "@/lib/dateUtils";
import { isUsed } from "@/lib/entityUtils";
import {
  ResumeData,
  ResumeDataKeysWithEntries,
  ResumeDataWithEntries,
} from "@/types/resume";

interface EntityCardProps {
  entity: ResumeDataWithEntries;
  entityType: ResumeDataKeysWithEntries;
  data: ResumeData;
  onSelect: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  getOrganization: (id: string) => any;
}

export function EntityCard({
  entity,
  entityType,
  data,
  onSelect,
  onDelete,
  getOrganization,
}: EntityCardProps) {
  return (
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
            onClick={(e) => onDelete(entity.id, e)}
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

        {"startDate" in entity && (
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDate(entity.startDate)} -{" "}
            {entity.endDate ? formatDate(entity.endDate) : "Present"}
          </div>
        )}

        {"date" in entity && (
          <div className="mt-2 text-xs text-muted-foreground">
            {formatDate(entity.date)}
          </div>
        )}

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
  );
}
