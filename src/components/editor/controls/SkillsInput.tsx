import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { ArrowDownUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { cn } from "@/lib/utils";

import { SortableSkill } from "./SortableSkill";

interface SkillsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  label?: string;
}

export function SkillsInput({
  value = [],
  onChange,
  className,
  label = "Skills",
}: SkillsInputProps) {
  const [skills, setSkills] = useState<string[]>(value);
  const [newSkill, setNewSkill] = useState("");
  const [sortMode, setSortMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setSkills(value);
  }, [value]);

  const handleAddSkill = () => {
    if (newSkill.trim() === "") return;

    // Split input by commas and spaces
    const skillsToAdd = newSkill
      .split(/[,\s]+/)
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "")
      .filter(
        (skill) =>
          !skills.some(
            (existingSkill) =>
              existingSkill.toLowerCase() === skill.toLowerCase()
          )
      );

    if (skillsToAdd.length === 0) {
      toast.error("These skills already exist");
      setNewSkill("");
      return;
    }

    const updatedSkills = [...skills, ...skillsToAdd];
    setSkills(updatedSkills);
    onChange(updatedSkills);
    setNewSkill("");

    if (skillsToAdd.length === 1) {
      toast.success(`Skill "${skillsToAdd[0]}" added`);
    } else {
      toast.success(`${skillsToAdd.length} skills added`);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const skillToRemove = skills[index];
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onChange(updatedSkills);
    toast.success(`Skill "${skillToRemove}" removed`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const toggleSortMode = () => {
    setSortMode(!sortMode);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = skills.indexOf(active.id as string);
      const newIndex = skills.indexOf(over.id as string);

      const newSkills = arrayMove(skills, oldIndex, newIndex);
      setSkills(newSkills);
      onChange(newSkills);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        {label && <label className="text-sm font-medium block">{label}</label>}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleSortMode}
          className="h-8 px-2 text-xs"
        >
          <ArrowDownUp className="h-3 w-3 mr-1" />
          {sortMode ? "Done" : "Sort"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {skills.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={skills}
              strategy={horizontalListSortingStrategy}
              disabled={!sortMode}
            >
              {skills.map((skill, index) => (
                <SortableSkill
                  key={skill}
                  skill={skill}
                  index={index}
                  onRemove={handleRemoveSkill}
                  sortMode={sortMode}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {!sortMode && (
        <div className="flex gap-2">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add skills (separate by commas or spaces)"
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleAddSkill}
            disabled={newSkill.trim() === ""}
            aria-label="Add skill"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
