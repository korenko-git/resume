import { X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Skill, SkillCategoryType } from "@/types/skill";

interface Props {
  category: {
    name: SkillCategoryType; 
    description: string;
  };
  skills: Skill[];
  onAdd: (cat: SkillCategoryType, input: string) => void; 
  onRemove: (cat: SkillCategoryType, id: string) => void; 
  clearMessages: () => void;
}

export function SkillCategory({
  category,
  skills,
  onAdd,
  onRemove,
  clearMessages,
}: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(category.name, input);
      setInput("");
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-3">
      <h3 className="text-lg font-semibold capitalize">{category.name}</h3>
      <p className="text-sm text-muted-foreground">{category.description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id} className="flex items-center gap-1">
            {skill.id}
            <button
              onClick={() => {
                onRemove(category.name, skill.id);
                clearMessages();
              }}
              aria-label="remove"
            >
              <X className="w-3 h-3 ml-1" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add skills separated by comma"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={clearMessages}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}