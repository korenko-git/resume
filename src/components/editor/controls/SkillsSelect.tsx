"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/common/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/ui/popover";
import { useSkills } from "@/hooks/useSkills";
import { cn } from "@/lib/utils";
import { Skill, skillCategoryOrder, SkillCategoryType } from "@/types/skill";

interface SkillsSelectProps {
  selectedSkillIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function SkillsSelect({
  selectedSkillIds,
  onSelectionChange,
}: SkillsSelectProps) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const { addSkills: addNewSkillToGlobalList, skills: globalSkills } =
    useSkills();

  const availableSkills = globalSkills;

  const handleSelectSkill = (skillId: string) => {
    const newSelection = selectedSkillIds.includes(skillId)
      ? selectedSkillIds.filter((id) => id !== skillId)
      : [...selectedSkillIds, skillId];
    onSelectionChange(newSelection);
    setSearchTerm("");
  };

  const handleAddNewSkill = (skillIdToAdd: string) => {
    const trimmedSkillId = skillIdToAdd.trim();
    if (trimmedSkillId === "") return;

    const skillExists = availableSkills.some(
      (skill) => skill.id.toLowerCase() === trimmedSkillId.toLowerCase(),
    );

    if (skillExists) {
      if (!selectedSkillIds.includes(trimmedSkillId)) {
        onSelectionChange([...selectedSkillIds, trimmedSkillId]);
      }
      setSearchTerm("");
      setPopoverOpen(false);
      return;
    }

    addNewSkillToGlobalList("uncategorized", trimmedSkillId);

    if (!selectedSkillIds.includes(trimmedSkillId)) {
      onSelectionChange([...selectedSkillIds, trimmedSkillId]);
    }
    setSearchTerm("");
  };

  const groupedSkills = React.useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    skillCategoryOrder.forEach((cat) => (groups[cat] = []));
    groups["uncategorized"] = groups["uncategorized"] || [];

    availableSkills.forEach((skill) => {
      const categoryKey = skill.category as SkillCategoryType | string;
      if (!groups[categoryKey]) {
        groups[categoryKey] = [];
      }
      groups[categoryKey].push(skill);
    });
    return groups;
  }, [availableSkills]);

  return (
    <div className="space-y-2">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={popoverOpen}
            className="h-auto min-h-10 w-full justify-between"
          >
            <div className="flex flex-wrap gap-1">
              {selectedSkillIds.length > 0
                ? selectedSkillIds.map((id) => (
                    <Badge key={id} variant="secondary">
                      {id}
                    </Badge>
                  ))
                : "Select skills..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command shouldFilter={true}>
            {" "}
            <CommandInput
              placeholder="Search or add skill..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim() !== "") {
                  const isSkillInList = availableSkills.some(
                    (skill) =>
                      skill.id.toLowerCase() ===
                      searchTerm.trim().toLowerCase(),
                  );
                  if (!isSkillInList) {
                    e.preventDefault();
                    handleAddNewSkill(searchTerm);
                  }
                }
              }}
            />
            <CommandList>
              <CommandEmpty>
                {searchTerm.trim() === "" ? (
                  "Type to search for a skill."
                ) : (
                  <div className="py-2 text-center text-sm">
                    No skill found for &quot;{searchTerm}&quot;.
                    <Button
                      variant="link"
                      className="h-auto px-1 py-0 text-blue-600"
                      onClick={() => handleAddNewSkill(searchTerm)}
                    >
                      Add as new skill?
                    </Button>
                  </div>
                )}
              </CommandEmpty>
              {skillCategoryOrder.map((category) => {
                const skillsInCategory = (groupedSkills[category] || []).filter(
                  (skill) =>
                    skill.id.toLowerCase().includes(searchTerm.toLowerCase()),
                );

                if (skillsInCategory.length === 0 && searchTerm) return null;
                if (
                  !searchTerm &&
                  skillsInCategory.length === 0 &&
                  category !== "uncategorized"
                )
                  return null;

                return (
                  <CommandGroup
                    key={category}
                    heading={
                      skillsInCategory.length > 0 ||
                      category === "uncategorized"
                        ? category.charAt(0).toUpperCase() + category.slice(1)
                        : undefined
                    }
                  >
                    {skillsInCategory.map((skill) => (
                      <CommandItem
                        key={skill.id}
                        value={skill.id}
                        onSelect={() => {
                          handleSelectSkill(skill.id);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSkillIds.includes(skill.id)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {skill.id}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
