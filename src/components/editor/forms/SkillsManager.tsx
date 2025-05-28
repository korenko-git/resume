import { Plus, Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";

import { SkillBadge } from "@/components/common/SkillBadge";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import {
  skillCategoryOrder,
  SkillCategoryType,
  SKILL_OPTIONS,
} from "@/constants/skills";
import { useSkills } from "@/hooks/useSkills";

import { SmartSkillDeleteDialog } from "../dialogs/SmartSkillDeleteDialog";

export function SkillsManager() {
  const { skills, addSkills, smartRemoveSkill } = useSkills();
  const [newSkillsInput, setNewSkillsInput] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategoryType>("coreFrontend");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string>("");

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch = skill.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "all" || skill.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchTerm, filterCategory]);

  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skills> = {};
    skillCategoryOrder.forEach((cat) => (groups[cat] = []));
    groups["uncategorized"] = [];

    filteredSkills.forEach((skill) => {
      const category = skill.category || "uncategorized";
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
    });

    return groups;
  }, [filteredSkills]);

  const handleAddSkills = () => {
    if (!newSkillsInput.trim()) return;

    addSkills(selectedCategory, newSkillsInput);
    setNewSkillsInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkills();
    }
  };

  const handleSkillClick = (skillId: string) => {
    setSkillToDelete(skillId);
    setDeleteDialogOpen(true);
  };

  const handleSmartDelete = (
    action: "delete" | "rename" | "changeCategory",
    newName?: string,
    newCategory?: SkillCategoryType,
  ) => {
    if (skillToDelete) {
      smartRemoveSkill(skillToDelete, action, newName, newCategory);
      setSkillToDelete("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Add New Skills</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="new-skills">
              Skills (comma or space separated)
            </Label>
            <Input
              id="new-skills"
              value={newSkillsInput}
              onChange={(e) => setNewSkillsInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="React, TypeScript, Node.js..."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) =>
                setSelectedCategory(value as SkillCategoryType)
              }
            >
              <SelectTrigger>
                <SelectValue />
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
        </div>

        <Button onClick={handleAddSkills} className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Skills
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Manage Existing Skills</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="search">Search Skills</Label>
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter">Filter by Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SKILL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => {
          if (categorySkills.length === 0) return null;

          const categoryLabel = SKILL_OPTIONS.find(
            (option) => option.value === category,
          )?.label || category.charAt(0).toUpperCase() + category.slice(1);

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                {categoryLabel} ({categorySkills.length})
              </h4>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    skill={skill}
                    variant="editor"
                    onClick={() => handleSkillClick(skill.id)}
                  >
                    <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
                  </SkillBadge>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSkills.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            {searchTerm || filterCategory !== "all"
              ? "No skills found matching your criteria."
              : "No skills added yet. Add some skills above!"}
          </div>
        )}
      </div>

      <SmartSkillDeleteDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSkillToDelete("");
        }}
        skillId={skillToDelete}
        onConfirm={handleSmartDelete}
      />
    </div>
  );
}
