import fs from "fs";
import path from "path";

import { formatDate } from "@/lib/dateUtils";
import {
  getFirstPublishedEntry,
  stripLinksFromMarkdown,
} from "@/lib/entityUtils";
import {
  AboutEntry,
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  Organization,
} from "@/types/resume";

async function generateATSMarkdown() {
  try {
    // Loading data
    const dataPath = path.join(process.cwd(), "src", "data");
    const aboutData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "about.json"), "utf-8"),
    );
    const experience = JSON.parse(
      fs.readFileSync(path.join(dataPath, "experience.json"), "utf-8"),
    );
    const education = JSON.parse(
      fs.readFileSync(path.join(dataPath, "education.json"), "utf-8"),
    );
    const certifications = JSON.parse(
      fs.readFileSync(path.join(dataPath, "certifications.json"), "utf-8"),
    );
    const organizations = JSON.parse(
      fs.readFileSync(path.join(dataPath, "organizations.json"), "utf-8"),
    );

    const about = getFirstPublishedEntry<AboutEntry>(aboutData.entries);

    if (!about) {
      throw new Error("No published about entry found");
    }

    // Creating ATS-optimized text
    let atsContent = "";
    atsContent += `# ${about.title}\n`;
    atsContent +=
      [
        about.email,
        `GitHub: ${about.github}`,
        `LinkedIn: ${about.linkedin}`,
      ].join(" | ") + "\n\n";

    atsContent += `## PROFESSIONAL SUMMARY\n\n`;
    atsContent += `${stripLinksFromMarkdown(about.description)}\n\n`;

    atsContent += "## WORK EXPERIENCE\n\n";
    experience.entries
      .filter((entry: ExperienceEntry) => entry.isPublished)
      .sort(
        (a: ExperienceEntry, b: ExperienceEntry) =>
          Number(new Date(b.startDate)) - Number(new Date(a.startDate)),
      )
      .forEach((entry: ExperienceEntry) => {
        const org = organizations.entries.find(
          (o: Organization) => o.id === entry.organizationId,
        );
        atsContent += `### ${entry.title}\n`;
        atsContent += `${org ? org.title : ""} | ${formatDate(entry.startDate)} - ${formatDate(entry.endDate) || "Present"}\n\n`;
        atsContent += `${stripLinksFromMarkdown(entry.description)}\n\n`;
        if (entry.skills && entry.skills.length > 0) {
          atsContent += `**Key Technologies**: ${entry.skills.join(", ")}\n\n`;
        }
      });

    // Education
    atsContent += "## EDUCATION\n\n";
    education.entries
      .filter((entry: EducationEntry) => entry.isPublished)
      .sort(
        (a: EducationEntry, b: EducationEntry) =>
          Number(new Date(b.startDate)) - Number(new Date(a.startDate)),
      )
      .forEach((entry: EducationEntry) => {
        const org = organizations.entries.find(
          (o: Organization) => o.id === entry.organizationId,
        );
        atsContent += `### ${entry.title}\n`;
        atsContent += `${org ? org.title : ""} | ${formatDate(entry.startDate)} - ${formatDate(entry.endDate)}\n\n`;
      });

    // Certificates
    atsContent += "## Certificates\n\n";
    certifications.entries
      .filter((entry: CertificationEntry) => entry.isPublished)
      .sort(
        (a: CertificationEntry, b: CertificationEntry) =>
          Number(new Date(b.date)) - Number(new Date(a.date)),
      )
      .forEach((entry: CertificationEntry) => {
        const org = organizations.entries.find(
          (o: Organization) => o.id === entry.organizationId,
        );
        atsContent += `- ${entry.title} (${org ? org.title : ""}) - ${formatDate(entry.date)}\n`;
      });

    // Creating public directory if it doesn't exist
    const atsDir = path.join(process.cwd(), "public/ats");
    if (!fs.existsSync(atsDir)) {
      fs.mkdirSync(atsDir, { recursive: true });
    }

    // Saving to markdown file
    const mdPath = path.join(atsDir, "cv-ats.md");
    fs.writeFileSync(mdPath, atsContent, "utf-8");

    console.log("ATS markdown generated successfully");
    return true;
  } catch (error) {
    console.error("Error generating ATS markdown:", error);
    throw error;
  }
}

generateATSMarkdown().catch(console.error);
