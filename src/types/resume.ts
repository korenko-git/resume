import {
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Building2,
  User,
  LucideIcon
} from 'lucide-react';

export type Version = number;
export interface BaseEntry {
  id: string;
  title: string;
  description: string;
  isPublished?: boolean;
}

export interface Organization extends Omit<BaseEntry, "isPublished"> {
  logo: string;
  url: string;
}
export interface AboutEntry extends BaseEntry {
  subtitle: string;
  location?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  website?: string;
  avatar?: string;
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

export type ResumeDataWithEntries = 
  | AboutEntry
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
  version: Version;
  about: { entries: AboutEntry[] };
  experience: { entries: ExperienceEntry[] };
  education: { entries: EducationEntry[] };
  projects: { entries: ProjectEntry[] };
  certifications: { entries: CertificationEntry[] };
  organizations: { entries: Organization[] };
}

export type ResumeDataKeysWithEntries = 
  | 'about'
  | 'experience' 
  | 'education' 
  | 'projects' 
  | 'certifications' 
  | 'organizations';

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

// Field type definitions for dynamic form generation
export type FieldType = 
  | 'text'
  | 'textarea'
  | 'switch'
  | 'date'
  | 'dateRange'
  | 'organization'
  | 'skills'
  | 'url'
  | 'image';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  grid?: boolean; // Whether this field should be in a grid layout
  gridSpan?: number; // How many columns this field should span
}

// Define form fields for each entity type
export const entityFields: Record<ResumeDataKeysWithEntries, FieldDefinition[]> = {
  about: [
    { name: 'title', label: 'Name', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'subtitle', label: 'Position', type: 'text', required: true, grid: true },
    { name: 'description', label: 'About me', type: 'textarea', required: true },
    { name: 'location', label: 'Location', type: 'text', grid: true },
    { name: 'email', label: 'Email', type: 'text', grid: true },
    { name: 'phone', label: 'Phone', type: 'text', grid: true },
    { name: 'github', label: 'GitHub', type: 'url', placeholder: 'https://github.com/...', grid: true },
    { name: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/in/...', grid: true },
    { name: 'leetcode', label: 'LeetCode', type: 'url', placeholder: 'https://leetcode.com/...', grid: true },
    { name: 'website', label: 'Website', type: 'url', placeholder: 'https://...', grid: true },
    { name: 'avatar', label: 'Profile Photo', type: 'image' }
  ],
  experience: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true, grid: true },
    { name: 'endDate', label: 'End Date', type: 'date', placeholder: 'Present', grid: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' }
  ],
  education: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'startDate', label: 'Start Date', type: 'date', required: true, grid: true },
    { name: 'endDate', label: 'End Date', type: 'date', required: true, grid: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' }
  ],
  projects: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' },
    { name: 'source', label: 'Source Code', type: 'url', placeholder: 'https://github.com/...', grid: true },
    { name: 'demo', label: 'Demo', type: 'url', placeholder: 'https://...', grid: true },
    { name: 'image', label: 'Project Image', type: 'image' }
  ],
  certifications: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'isPublished', label: 'Published', type: 'switch', grid: true },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'organizationId', label: 'Organization', type: 'organization', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'skills', label: 'Skills', type: 'skills' }
  ],
  organizations: [
    { name: 'title', label: 'Title', type: 'text', required: true, grid: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'url', label: 'Website', type: 'url', placeholder: 'https://...' },
    { name: 'logo', label: 'Logo', type: 'image' }
  ]
};

/**
 * Defines relationships between entity types
 */
export const entityRelationships: Record<ResumeDataKeysWithEntries, { referencedIn: Array<{ type: ResumeDataKeysWithEntries, field: string }> }> = {
  organizations: {
    referencedIn: [
      { type: 'experience', field: 'organizationId' },
      { type: 'education', field: 'organizationId' },
      { type: 'certifications', field: 'organizationId' }
    ]
  },
  about: { referencedIn: [] },
  experience: { referencedIn: [] },
  education: { referencedIn: [] },
  projects: { referencedIn: [] },
  certifications: { referencedIn: [] }
};
