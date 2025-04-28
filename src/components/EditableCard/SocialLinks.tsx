import { Input } from '@/components/ui/input';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

interface SocialLinksProps {
  isEditing: boolean;
  data: {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    email?: string;
  };
  onDataChange: (data: any) => void;
}

export function SocialLinks({ isEditing, data, onDataChange }: SocialLinksProps) {
  if (isEditing) {
    return (
      <div className="space-y-3 mt-4 social-links">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          <Input
            value={data.github}
            onChange={(e) => onDataChange({ ...data, github: e.target.value })}
            placeholder="GitHub URL"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="h-5 w-5" />
          <Input
            value={data.linkedin}
            onChange={(e) => onDataChange({ ...data, linkedin: e.target.value })}
            placeholder="LinkedIn URL"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5" />
          <Input
            value={data.leetcode}
            onChange={(e) => onDataChange({ ...data, leetcode: e.target.value })}
            placeholder="LeetCode URL"
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          <Input
            value={data.email}
            onChange={(e) => onDataChange({ ...data, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="flex-1"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-4 social-links">
      {data.github && (
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
          <span>GitHub</span>
        </a>
      )}
      {data.linkedin && (
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin className="h-5 w-5" />
          <span>LinkedIn</span>
        </a>
      )}
      {data.leetcode && (
        <a
          href={data.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Code2 className="h-5 w-5" />
          <span>LeetCode</span>
        </a>
      )}
      {data.email && (
        <a
          href={`mailto:${data.email}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="h-5 w-5" />
          <span>Email</span>
        </a>
      )}
    </div>
  );
}