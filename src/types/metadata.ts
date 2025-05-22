import {
  Award,
  Briefcase,
  Building2,
  FolderKanban,
  GraduationCap,
  LucideIcon,
  User,
  Wrench
} from 'lucide-react';

export const entityMetadata: Record<string, { title: string; icon: LucideIcon }> = {
  about: {
    title: 'About me',
    icon: User
  },
  experience: {
    title: 'Experience',
    icon: Briefcase
  },
  education: {
    title: 'Education',
    icon: GraduationCap
  },
  projects: {
    title: 'Projects',
    icon: FolderKanban
  },
  certifications: {
    title: 'Certificates',
    icon: Award
  },
  organizations: {
    title: 'Organizations',
    icon: Building2
  },
  skills: {
    title: "Manage Skills",
    icon: Wrench,
  },
};

export type EditorTabKey = keyof typeof entityMetadata;