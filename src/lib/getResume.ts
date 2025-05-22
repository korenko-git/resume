import aboutData from "@/data/about.json";
import certificationsData from "@/data/certifications.json";
import educationData from "@/data/education.json";
import experienceData from "@/data/experience.json";
import organizationsData from "@/data/organizations.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import vesrionData from "@/data/version.json";
import type { ResumeData } from "@/types/resume";

export function getResume(): ResumeData {
  return {
    version: vesrionData.version,

    about: aboutData,
    experience: experienceData,
    projects: projectsData,
    education: educationData,
    certifications: certificationsData,
    organizations: organizationsData,
    skills: skillsData,
  };
}
