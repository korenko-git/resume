import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/common/ui/input';
import { Button } from '@/components/common/ui/button';
import { Badge } from '@/components/common/ui/badge';
import { cn } from '@/lib/utils';

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
  label = 'Skills'
}: SkillsInputProps) {
  const [skills, setSkills] = useState<string[]>(value);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(value);
  }, [value]);

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    
    // Split input by commas and spaces
    const skillsToAdd = newSkill
      .split(/[,\s]+/)
      .map(skill => skill.trim())
      .filter(skill => skill !== '')
      .filter(skill => !skills.some(existingSkill => 
        existingSkill.toLowerCase() === skill.toLowerCase()
      ));
    
    if (skillsToAdd.length === 0) {
      toast.error('These skills already exist');
      setNewSkill('');
      return;
    }
    
    const updatedSkills = [...skills, ...skillsToAdd];
    setSkills(updatedSkills);
    onChange(updatedSkills);
    setNewSkill('');
    
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
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium block">{label}</label>
      )}
      
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {skill}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => handleRemoveSkill(index)}
              aria-label={`Remove skill ${skill}`}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
      
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
          disabled={newSkill.trim() === ''}
          aria-label="Add skill"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}