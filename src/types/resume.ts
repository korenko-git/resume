import { Organization,Version } from "./common";
import {
  AboutEntry,
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  ProjectEntry,
} from "./entries";

export type ResumeDataKeysWithEntries =
  | "about"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "organizations";

export interface ResumeData {
  version: Version;
  about: { entries: AboutEntry[] };
  experience: { entries: ExperienceEntry[] };
  education: { entries: EducationEntry[] };
  projects: { entries: ProjectEntry[] };
  certifications: { entries: CertificationEntry[] };
  organizations: { entries: Organization[] };
}

export * from "./common";
export * from "./entries";
export * from "./forms";
export * from "./metadata";
export * from "./relationships";
export * from "./skill";
