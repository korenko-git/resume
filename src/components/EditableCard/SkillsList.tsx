import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
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

    return (
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
    );
}
