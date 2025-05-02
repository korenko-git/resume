import {
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Building2,
  User,
  LucideIcon
} from 'lucide-react';

export interface BaseEntry {
  id: string;
  title: string;
  description: string;
  isPublished?: boolean;
}

export interface Organization extends BaseEntry {
  logo: string;
  url: string;
}

export interface ExperienceEntry extends BaseEntry {
  startDate: string;
  endDate: string;
  skills: string[];
  organizationId: string;
}

export interface EducationEntry extends BaseEntry {
  startDate: string;
  endDate: string;
  skills: string[];
  organizationId: string;
}

export interface ProjectEntry extends BaseEntry {
  skills: string[];
  source?: string;
  demo?: string;
  image?: string;
}

export interface CertificationEntry extends BaseEntry {
  date: string;
  skills: string[];
  organizationId: string;
}

export interface AboutData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isPublished?: boolean;
  location?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  website?: string;
  avatar?: string;
  version?: number;
}

export type ResumeDataWithEntries = 
  | ExperienceEntry 
  | EducationEntry 
  | ProjectEntry 
  | CertificationEntry 
  | Organization;

export type AllEntityFields =
  | keyof BaseEntry
  | keyof ExperienceEntry
  | keyof EducationEntry
  | keyof ProjectEntry
  | keyof CertificationEntry
  | keyof Organization;

export interface ResumeData {
  about: AboutData | null;
  experience: { entries: ExperienceEntry[] };
  education: { entries: EducationEntry[] };
  projects: { entries: ProjectEntry[] };
  certifications: { entries: CertificationEntry[] };
  organizations: { entries: Organization[] };
}

export type ResumeDataKeysWithEntries = 
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'certifications' 
  | 'organizations';

export type ResumeDataKeys = 'about' | ResumeDataKeysWithEntries;

export type ResumeDataTypes = 
  | AboutData 
  | ResumeDataWithEntries;

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
  }
};
