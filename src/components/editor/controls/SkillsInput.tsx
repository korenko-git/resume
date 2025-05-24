import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/common/ui/badge";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { useSkills } from "@/hooks/useSkills";
import { cn } from "@/lib/utils";
import { Skill } from "@/types/skill";

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
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
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
            {selectedSkillIds.map((skill) => {
              const skillData = globalSkills.find((s) => s.id === skill);
              const category = skillData?.category || "uncategorized";

              return (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={cn(
                    "group cursor-pointer transition-colors",
                    category === "frontend" &&
                      "bg-blue-100 text-blue-800 hover:bg-blue-200",
                    category === "backend" &&
                      "bg-green-100 text-green-800 hover:bg-green-200",
                    category === "language" &&
                      "bg-purple-100 text-purple-800 hover:bg-purple-200",
                    category === "database" &&
                      "bg-orange-100 text-orange-800 hover:bg-orange-200",
                    category === "tool" &&
                      "bg-gray-100 text-gray-800 hover:bg-gray-200",
                    category === "uncategorized" &&
                      "bg-slate-100 text-slate-800 hover:bg-slate-200",
                  )}
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="ml-1 h-3 w-3 opacity-50 group-hover:opacity-100" />
                </Badge>
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
                    return (
                      <div
                        key={skill.id}
                        className={cn(
                          "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
                          globalIndex === activeSuggestionIndex &&
                            "bg-blue-100",
                        )}
                        onClick={() => handleSuggestionClick(skill)}
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
