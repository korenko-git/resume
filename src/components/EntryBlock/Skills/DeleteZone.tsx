import { useDroppable } from '@dnd-kit/core';

export function DeleteZone() {
  const { isOver, setNodeRef } = useDroppable({
    id: 'delete-zone',
    data: {
      type: 'delete-zone',
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        mt-4 p-4 border-2 border-dashed rounded-lg text-center transition-colors
        ${isOver ? 'bg-red-500 text-white border-red-500' : 'bg-muted'}
      `}
    >
      {isOver ? 'Drop to delete' : 'Drag here to delete'}
    </div>
  );
}
