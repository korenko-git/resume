import { Plus, Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";

import { Badge } from "@/components/common/ui/badge";
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
import { useSkills } from "@/hooks/useSkills";
import { cn } from "@/lib/utils";
import { skillCategoryOrder, SkillCategoryType } from "@/types/skill";

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkills();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-800";
      case "backend":
        return "bg-green-100 text-green-800";
      case "language":
        return "bg-purple-100 text-purple-800";
      case "database":
        return "bg-orange-100 text-orange-800";
      case "tool":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-slate-100 text-slate-800";
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
          <div className="md:col-span-2">
            <Label htmlFor="new-skills">
              Skills (comma or space separated)
            </Label>
            <Input
              id="new-skills"
              value={newSkillsInput}
              onChange={(e) => setNewSkillsInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="React, TypeScript, Node.js..."
              className="w-full"
            />
          </div>

          <div>
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
                {skillCategoryOrder.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
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
          <div>
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

          <div>
            <Label htmlFor="filter">Filter by Category</Label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {skillCategoryOrder.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => {
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                {category.charAt(0).toUpperCase() + category.slice(1)} (
                {categorySkills.length})
              </h4>

              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <Badge
                    key={skill.id}
                    className={cn(
                      "group cursor-pointer transition-colors hover:bg-red-100 hover:text-red-800",
                      getCategoryColor(skill.category || "uncategorized"),
                    )}
                    onClick={() => handleSkillClick(skill.id)}
                  >
                    {skill.id}
                    <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
                  </Badge>
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
