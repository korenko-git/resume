import { AlertTriangle, Edit2, Tag, Trash2 } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { SKILL_OPTIONS } from "@/constants/skills";
import { useResume } from "@/contexts/ResumeContext";
import { entityRelationships } from "@/types/relationships";
import { ResumeDataKeysWithEntries } from "@/types/resume";
import { SkillCategoryType } from "@/types/skill";

interface SmartSkillDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  skillId: string;
  onConfirm: (
    action: "delete" | "rename" | "changeCategory",
    newName?: string,
    newCategory?: SkillCategoryType,
  ) => void;
}

export function SmartSkillDeleteDialog({
  isOpen,
  onClose,
  skillId,
  onConfirm,
}: SmartSkillDeleteDialogProps) {
  const { data } = useResume();
  const [action, setAction] = useState<"delete" | "rename" | "changeCategory">(
    "delete",
  );
  const [newSkillName, setNewSkillName] = useState("");
  const [newCategory, setNewCategory] =
    useState<SkillCategoryType>("uncategorized");
  const [isProcessing, setIsProcessing] = useState(false);

  const currentSkill = data.skills?.entries.find(
    (skill) => skill.id === skillId,
  );
  const currentCategory = currentSkill?.category || "uncategorized";

  const getSkillUsage = () => {
    const usage: Array<{ type: string; entityId: string; title: string }> = [];

    const skillRelations = entityRelationships.skills.referencedIn;

    skillRelations.forEach(({ type, field }) => {
      const entityType = type as ResumeDataKeysWithEntries;
      const entities = data[entityType]?.entries || [];

      entities.forEach((entity: any) => {
        if (entity[field] && Array.isArray(entity[field])) {
          if (
            entity[field].some(
              (skill: string) => skill.toLowerCase() === skillId.toLowerCase(),
            )
          ) {
            usage.push({
              type: entityType,
              entityId: entity.id,
              title:
                entity.title || entity.name || `${entityType} ${entity.id}`,
            });
          }
        }
      });
    });

    return usage;
  };

  const skillUsage = getSkillUsage();
  const existingSkills = data.skills?.entries || [];
  const skillExists = (name: string) =>
    existingSkills.some(
      (skill) =>
        skill.id.toLowerCase() === name.toLowerCase() &&
        skill.id.toLowerCase() !== skillId.toLowerCase(),
    );

  const handleConfirm = async () => {
    setIsProcessing(true);

    if (action === "rename") {
      if (!newSkillName.trim()) {
        setIsProcessing(false);
        return;
      }
      onConfirm("rename", newSkillName.trim());
    } else if (action === "changeCategory") {
      onConfirm("changeCategory", undefined, newCategory);
    } else {
      onConfirm("delete");
    }

    setIsProcessing(false);
    onClose();
  };

  const isRenameToExisting = action === "rename" && skillExists(newSkillName);
  const isCategoryChanged =
    action === "changeCategory" && newCategory !== currentCategory;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Manage Skill: {skillId}
          </DialogTitle>
          <DialogDescription>
            This skill is used in {skillUsage.length} entities. Choose how to
            proceed:
          </DialogDescription>
        </DialogHeader>

        {skillUsage.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Used in:</h4>
            <div className="max-h-32 space-y-2 overflow-y-auto">
              {skillUsage.map((usage, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="text-xs">
                    {usage.type}
                  </Badge>
                  <span className="text-muted-foreground">{usage.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="rename"
                name="action"
                checked={action === "rename"}
                onChange={() => setAction("rename")}
                className="h-4 w-4"
              />
              <Label
                htmlFor="rename"
                className="flex cursor-pointer items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Rename skill everywhere
              </Label>
            </div>

            {action === "rename" && (
              <div className="ml-6 space-y-2">
                <Input
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Enter new skill name"
                  className="w-full"
                />
                {isRenameToExisting && (
                  <p className="text-sm text-orange-600">
                    ⚠️ This will merge with existing skill &quot;{newSkillName}
                    &quot; and remove the duplicate.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="changeCategory"
                name="action"
                checked={action === "changeCategory"}
                onChange={() => setAction("changeCategory")}
                className="h-4 w-4"
              />
              <Label
                htmlFor="changeCategory"
                className="flex cursor-pointer items-center gap-2"
              >
                <Tag className="h-4 w-4" />
                Change skill category
              </Label>
            </div>

            {action === "changeCategory" && (
              <div className="ml-6 space-y-2">
                <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                  Current category:{" "}
                  <Badge variant="outline">{currentCategory}</Badge>
                </div>
                <Select
                  value={newCategory}
                  onValueChange={(value: SkillCategoryType) =>
                    setNewCategory(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select new category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="delete"
              name="action"
              checked={action === "delete"}
              onChange={() => setAction("delete")}
              className="h-4 w-4"
            />
            <Label
              htmlFor="delete"
              className="flex cursor-pointer items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete skill everywhere
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              isProcessing ||
              (action === "rename" && !newSkillName.trim()) ||
              (action === "changeCategory" && !isCategoryChanged)
            }
            variant={action === "delete" ? "destructive" : "default"}
          >
            {isProcessing
              ? "Processing..."
              : action === "delete"
                ? "Delete"
                : action === "rename"
                  ? "Rename"
                  : "Change Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
