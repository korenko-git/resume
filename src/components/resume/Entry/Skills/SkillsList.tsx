import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Button } from '@/components/common/ui/button';
import { Plus } from 'lucide-react';
import { SortableSkill } from './SortableSkill';
import { DeleteZone } from './DeleteZone';

interface SkillsListProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
  isEditing: boolean;
}

export function SkillsList({ skills, onUpdate, isEditing }: SkillsListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (over.id === 'delete-zone') {
      onUpdate([...skills].filter((skill) => skill !== active.id));
    } else if (active.id !== over.id) {
      const newSkills = [...skills];
      const oldIndex = newSkills.indexOf(active.id as string);
      const newIndex = newSkills.indexOf(over.id as string);

      onUpdate(arrayMove(newSkills, oldIndex, newIndex));
    }
  };

  const handleAddSkill = () => {
    const input = prompt('Enter skill names (separated by comma or space):');
    if (input) {
      const newSkillsRaw = input
        .split(/[,\s]+/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const uniqueNewSkills = [...new Set(newSkillsRaw)];

      const skillsToAdd = uniqueNewSkills.filter(
        (newSkill) => !skills.includes(newSkill)
      );

      if (skillsToAdd.length > 0) {
        onUpdate([...skills, ...skillsToAdd]);
      }
    }
  };

  return (
    <div className="space-y-4 skills-section">
      {isEditing && (<div className="flex items-center justify-between">
        <h4 className="font-medium">Skills</h4>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddSkill}
        >
          <Plus className="h-4 w-4 mr-1" />
          add Skill
        </Button>

      </div>
      )}
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={skills}>
          <div className="flex flex-wrap">
            {skills.map((skill) => (
              <SortableSkill key={skill} skill={skill} isEditing={isEditing} />
            ))}
          </div>
        </SortableContext>

        {isEditing && <DeleteZone />}
      </DndContext>
    </div>
  );
}
