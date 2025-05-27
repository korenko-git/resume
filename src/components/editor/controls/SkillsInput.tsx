import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { SkillBadge } from "@/components/common/SkillBadge";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { useSkills } from "@/hooks/useSkills";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/entries";

interface SkillsInputProps {
  selectedSkillIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  label?: string;
  placeholder?: string;
}

export function SkillsInput({
  selectedSkillIds,
  onSelectionChange,
  label = "Skills",
  placeholder = "Type skills separated by comma or space...",
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Skill[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  const { addSkills: addNewSkillToGlobalList, skills: globalSkills } =
    useSkills();

  const parseSkillsInput = (input: string): string[] => {
    return input
      .split(/[,\s]+/)
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  const addSkills = (skillsToAdd: string[]) => {
    const newSkills = skillsToAdd.filter(
      (skill) =>
        !selectedSkillIds.some(
          (existing) => existing.toLowerCase() === skill.toLowerCase(),
        ),
    );

    if (newSkills.length === 0) return;

    const existingSkillIds = globalSkills.map((s) => s.id.toLowerCase());
    const skillsToCreate = newSkills.filter(
      (skill) => !existingSkillIds.includes(skill.toLowerCase()),
    );

    if (skillsToCreate.length > 0) {
      addNewSkillToGlobalList("uncategorized", skillsToCreate.join(", "));
    }

    onSelectionChange([...selectedSkillIds, ...newSkills]);
  };

  const removeSkill = (skillToRemove: string) => {
    onSelectionChange(
      selectedSkillIds.filter((skill) => skill !== skillToRemove),
    );
  };

  const scrollToActiveItem = () => {
    if (activeItemRef.current && suggestionsRef.current) {
      const container = suggestionsRef.current;
      const item = activeItemRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.bottom > containerRect.bottom) {
        container.scrollTop += itemRect.bottom - containerRect.bottom + 8;
      } else if (itemRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - itemRect.top + 8;
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim()) {
      const filteredSuggestions = globalSkills
        .filter(
          (skill) =>
            skill.id.toLowerCase().includes(value.toLowerCase()) &&
            !selectedSkillIds.includes(skill.id),
        )
        .slice(0, 8);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setActiveSuggestionIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        addSkills([suggestions[activeSuggestionIndex].id]);
      } else if (inputValue.trim()) {
        const skills = parseSkillsInput(inputValue);
        addSkills(skills);
      }

      setInputValue("");
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => {
        const newIndex = prev < suggestions.length - 1 ? prev + 1 : prev;
        return newIndex;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    } else if (
      e.key === "Backspace" &&
      !inputValue &&
      selectedSkillIds.length > 0
    ) {
      removeSkill(selectedSkillIds[selectedSkillIds.length - 1]);
    }
  };

  const handleSuggestionClick = (skill: Skill) => {
    addSkills([skill.id]);
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (inputValue.trim()) {
        const skills = parseSkillsInput(inputValue);
        addSkills(skills);
        setInputValue("");
      }
      setShowSuggestions(false);
    }, 150);
  };

  useEffect(() => {
    scrollToActiveItem();
  }, [activeSuggestionIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const groupedSuggestions = suggestions.reduce(
    (acc, skill) => {
      const category = skill.category || "uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="space-y-2">
        {selectedSkillIds.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedSkillIds.map((skillId) => {
              const skillData = globalSkills.find((s) => s.id === skillId) || {
                id: skillId,
                category: "uncategorized" as const,
              };

              return (
                <SkillBadge
                  key={skillId}
                  skill={skillData}
                  variant="editor"
                  onClick={() => removeSkill(skillId)}
                >
                  <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
                </SkillBadge>
              );
            })}
          </div>
        )}

        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className="w-full"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg"
            >
              {Object.entries(groupedSuggestions).map(([category, skills]) => (
                <div key={category}>
                  <div className="border-b bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                  {skills.map((skill) => {
                    const globalIndex = suggestions.indexOf(skill);
                    const isActive = globalIndex === activeSuggestionIndex;
                    return (
                      <div
                        key={skill.id}
                        ref={isActive ? activeItemRef : null}
                        className={cn(
                          "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 focus:bg-blue-100 focus:outline-none",
                          isActive && "bg-blue-100",
                        )}
                        onClick={() => handleSuggestionClick(skill)}
                        tabIndex={-1}
                      >
                        {skill.id}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Tip: Type skills and press Enter or comma to add. Use Backspace to
        remove last skill.
      </div>
    </div>
  );
}
