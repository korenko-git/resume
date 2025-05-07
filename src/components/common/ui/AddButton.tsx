import { Plus } from "lucide-react";

import { Button } from "./button";

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

export function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      variant="outline" 
      className="mt-4 w-full flex items-center justify-center gap-2"
      aria-label={`Add ${label}`}
    >
      <Plus className="h-4 w-4" />
      <span>Add {label}</span>
    </Button>
  );
}