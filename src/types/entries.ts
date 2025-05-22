import { BaseEntry, LinkableEntity, Organization } from "./common";
import { Skill } from "./skill";

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

export interface ExperienceEntry extends BaseEntry, LinkableEntity {
  startDate: string;
  endDate: string;
  skills: string[];
  organizationId: string;
}

export interface EducationEntry extends BaseEntry, LinkableEntity {
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

export interface CertificationEntry extends BaseEntry, LinkableEntity {
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
  | Organization
  | Skill;

export type AllEntityFields =
  | keyof BaseEntry
  | keyof ExperienceEntry
  | keyof EducationEntry
  | keyof ProjectEntry
  | keyof CertificationEntry
  | keyof Organization
  | keyof Skill;
