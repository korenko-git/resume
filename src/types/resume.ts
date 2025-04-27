export interface Organization {
  id: string;
  title: string;
  description: string;
  url: string;
  logo: string;
}

export interface BaseEntry {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  organizationId?: string;
}

export interface AboutData extends BaseEntry {
  // additional fields for About if needed
}

export interface ExperienceEntry extends BaseEntry {
  startDate: string;
  endDate: string;
  skills: string[];
}

export interface ProjectEntry extends BaseEntry {
  skills: string[];
}

export interface EducationEntry extends BaseEntry {
  startDate: string;
  endDate: string;
}

export interface CertificationEntry extends BaseEntry {
  date: string;
}

export interface ResumeData {
  about: AboutData | null;
  experience: { entries: ExperienceEntry[] };
  projects: { entries: ProjectEntry[] };
  education: { entries: EducationEntry[] };
  certifications: { entries: CertificationEntry[] };
  organizations: { entries: Organization[] };
}

export type ResumeDataKeys = keyof ResumeData;
export type ResumeDataTypes = AboutData | ProjectEntry | EducationEntry | CertificationEntry