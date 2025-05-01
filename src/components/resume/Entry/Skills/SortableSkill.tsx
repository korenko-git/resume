import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/common/ui/badge';

interface SortableSkillProps {
  skill: string;
  isEditing: boolean;
}

export function SortableSkill({ skill, isEditing }: SortableSkillProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: skill,
    data: {
      type: 'skill'
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      data-dragging={isDragging}
      className={`
        relative 
        ${isDragging ? 'z-10' : ''}
      `}
    >
      <Badge
        className={`
          m-1 
          ${isEditing ? 'cursor-grab active:cursor-grabbing' : ''} 
          ${isDragging ? 'opacity-50 cursor-no-drop' : ''}
        `}
        {...(isEditing ? { ...attributes, ...listeners } : {})}
      >
        {skill}
      </Badge>
    </div>
  );
}