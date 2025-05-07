"use client";

import { Code2,Github, Linkedin } from "lucide-react";

import { IconLink } from "@/components/common/ui/IconLink";
import { useResume } from "@/contexts/ResumeContext";
import { getFirstPublishedEntry } from "@/lib/entityUtils";
import { AboutEntry } from "@/types/resume";

export default function SocialLinks() {
  const { data } = useResume();
  const sectionData = getFirstPublishedEntry<AboutEntry>(data["about"].entries);

  if (!sectionData) {
    return null;
  }

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
    <ul
      className="flex items-center justify-center lg:justify-start"
      aria-label="Social media"
    >
      {socialLinks.map(
        ({ id, url, icon, label }) =>
          url && (
            <IconLink
              key={id}
              href={url}
              icon={icon}
              label={label}
              isExternal
            />
          )
      )}
    </ul>
  );
}
