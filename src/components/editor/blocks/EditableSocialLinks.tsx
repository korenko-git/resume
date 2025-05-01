import { Input } from '@/components/common/ui/input';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import Link from 'next/link';

interface EditableSocialLinksProps {
  isEditing: boolean;
  data: {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    email?: string;
  };
  onDataChange: (data: any) => void;
}

export function EditableSocialLinks({ isEditing, data, onDataChange }: EditableSocialLinksProps) {
  if (isEditing) {
    return (
      <div className="space-y-3 social-links" role="group" aria-label="Social media links">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5" aria-hidden="true" />
          <Input
            id="github-input"
            value={data.github}
            onChange={(e) => onDataChange({ ...data, github: e.target.value })}
            placeholder="GitHub URL"
            className="flex-1"
            aria-label="GitHub URL"
          />
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="h-5 w-5" aria-hidden="true" />
          <Input
            id="linkedin-input"
            value={data.linkedin}
            onChange={(e) => onDataChange({ ...data, linkedin: e.target.value })}
            placeholder="LinkedIn URL"
            className="flex-1"
            aria-label="LinkedIn URL"
          />
        </div>
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5" aria-hidden="true" />
          <Input
            id="leetcode-input"
            value={data.leetcode}
            onChange={(e) => onDataChange({ ...data, leetcode: e.target.value })}
            placeholder="LeetCode URL"
            className="flex-1"
            aria-label="LeetCode URL"
          />
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5" aria-hidden="true" />
          <Input
            id="email-input"
            value={data.email}
            onChange={(e) => onDataChange({ ...data, email: e.target.value })}
            placeholder="Email"
            type="email"
            className="flex-1"
            aria-label="Email address"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-4 social-links" role="list" aria-label="Social media links">
      {data.github && (
        <Link
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub profile"
          role="listitem"
        >
          <Github className="h-5 w-5" aria-hidden="true" />
          <span>GitHub</span>
        </Link>
      )}
      {data.linkedin && (
        <Link
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn profile"
          role="listitem"
        >
          <Linkedin className="h-5 w-5" aria-hidden="true" />
          <span>LinkedIn</span>
        </Link>
      )}
      {data.leetcode && (
        <Link
          href={data.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LeetCode profile"
          role="listitem"
        >
          <Code2 className="h-5 w-5" aria-hidden="true" />
          <span>LeetCode</span>
        </Link>
      )}
      {data.email && (
        <Link
          href={`mailto:${data.email}`}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Email contact"
          role="listitem"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          <span>Email</span>
        </Link>
      )}
    </div>
  );
}