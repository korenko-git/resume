import { Code2, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/common/ui/button";
import { AboutEntry } from "@/types/resume";

interface SocialLinksProps {
  sectionData?: AboutEntry;
}

export function SocialLinks({ sectionData }: SocialLinksProps) {
  if (!sectionData) return null;

  const socialLinks = [
    {
      id: "github",
      url: sectionData.github,
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
    },
    {
      id: "linkedin",
      url: sectionData.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
    },
    {
      id: "leetcode",
      url: sectionData.leetcode,
      icon: <Code2 className="h-5 w-5" />,
      label: "LeetCode",
    },
  ];

  return (
    <div
      className="flex items-center justify-center lg:justify-start"
      aria-label="Social media"
    >
      {socialLinks.map(
        ({ id, url, icon, label }) =>
          url && (
            <Button
              key={id}
              asChild
              variant="outline"
              className="mr-4 shrink-0 text-xs last:mr-0"
              aria-label={`${label} (opens in a new tab)`}
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                {icon} <span className="sr-only">{label}</span>
              </a>
            </Button>
          ),
      )}
    </div>
  );
}
