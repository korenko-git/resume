import { useResume } from '@/contexts/ResumeContext';
import { AboutData } from '@/types/resume';
import { Github, Linkedin, Code2 } from 'lucide-react';

export default function SocialLinks() {
  const { data } = useResume();
  const sectionData = data?.about as AboutData;

  return (
    <ul
      className="flex items-center justify-center lg:justify-start "
      aria-label="Social media"
    >
      {sectionData.github && (
        <li className="mr-4 last:mr-0 shrink-0 text-xs">
          <a
            href={sectionData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`GitHub (opens in a new tab)`}
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </li>
      )}
      {sectionData.linkedin && (

        <li className="mr-4 last:mr-0 shrink-0 text-xs">
          <a
            href={sectionData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`LinkedIn (opens in a new tab)`}
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>
      )}
      {sectionData.leetcode && (

        <li className="mr-4 last:mr-0 shrink-0 text-xs">
          <a
            href={sectionData.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`LeetCode (opens in a new tab)`}
          >
            <Code2 className="h-5 w-5" />
            <span className="sr-only">LeetCode</span>
          </a>

        </li>
      )}

    </ul>
  );
}