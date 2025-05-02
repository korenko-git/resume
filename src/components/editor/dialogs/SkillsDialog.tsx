import { useState } from 'react';
import { Button } from '@/components/common/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/common/ui/dialog';
import { Input } from '@/components/common/ui/input';
import { Label } from '@/components/common/ui/label';

interface SkillsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSkills: (skills: string[]) => void;
}

export function SkillsDialog({ isOpen, onClose, onAddSkills }: SkillsDialogProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      // Process the input - split by commas or spaces
      const newSkillsRaw = input
        .split(/[,\s]+/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      // Remove duplicates from the input
      const uniqueNewSkills = [...new Set(newSkillsRaw)];
      
      // Add the skills
      onAddSkills(uniqueNewSkills);
      
      // Reset the input and close the modal
      setInput('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Skills</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="skills">Enter skills (separated by comma or space)</Label>
              <Input
                id="skills"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="React, TypeScript, Next.js"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Skills</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}