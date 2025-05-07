import fs from 'fs';
import path from 'path';

import { getFirstPublishedEntry } from '@/lib/entityUtils';
import { AboutEntry,CertificationEntry, EducationEntry, ExperienceEntry, Organization, ProjectEntry } from '@/types/resume';

async function generateATSMarkdown() {
  try {
    // Loading data
    const dataPath = path.join(process.cwd(), 'src', 'data');
    const aboutData = JSON.parse(fs.readFileSync(path.join(dataPath, 'about.json'), 'utf-8'));
    const experience = JSON.parse(fs.readFileSync(path.join(dataPath, 'experience.json'), 'utf-8'));
    const education = JSON.parse(fs.readFileSync(path.join(dataPath, 'education.json'), 'utf-8'));
    const certifications = JSON.parse(fs.readFileSync(path.join(dataPath, 'certifications.json'), 'utf-8'));
    const projects = JSON.parse(fs.readFileSync(path.join(dataPath, 'projects.json'), 'utf-8'));
    const organizations = JSON.parse(fs.readFileSync(path.join(dataPath, 'organizations.json'), 'utf-8'));

    const about = getFirstPublishedEntry<AboutEntry>(aboutData.entries)
    
    if (!about) {
      throw new Error('No published about entry found');
    }

    // Creating ATS-optimized text
    let atsContent = `# ${about.title} - ${about.subtitle}\n\n`;
    atsContent += `${about.description}\n\n`;
    
    if (about.email) {
      atsContent += `Email: ${about.email}\n`;
    }
    
    if (about.location) {
      atsContent += `Location: ${about.location}\n`;
    }
    
    if (about.github || about.linkedin || about.website) {
      atsContent += '\n';
      if (about.github) atsContent += `GitHub: ${about.github}\n`;
      if (about.linkedin) atsContent += `LinkedIn: ${about.linkedin}\n`;
      if (about.website) atsContent += `Website: ${about.website}\n`;
    }
    
    atsContent += '\n';

    // Work Experience
    atsContent += '## Work Experience\n\n';
    experience.entries
      .filter((entry: ExperienceEntry) => entry.isPublished)
      .sort((a: ExperienceEntry, b: ExperienceEntry) => Number(new Date(b.startDate)) - Number(new Date(a.startDate)))
      .forEach((entry: ExperienceEntry) => {
        const org = organizations.entries.find((o: Organization) => o.id === entry.organizationId);
        atsContent += `### ${entry.title}\n`;
        atsContent += `${org ? org.title : ''} | ${entry.startDate} - ${entry.endDate || 'Present'}\n\n`;
        atsContent += `${entry.description}\n\n`;
        if (entry.skills && entry.skills.length > 0) {
          atsContent += `Skills: ${entry.skills.join(', ')}\n\n`;
        }
      });

    // Education
    atsContent += '## Education\n\n';
    education.entries
      .filter((entry: EducationEntry) => entry.isPublished)
      .sort((a: EducationEntry, b: EducationEntry) => Number(new Date(b.startDate)) - Number(new Date(a.startDate)))
      .forEach((entry: EducationEntry) => {
        const org = organizations.entries.find((o: Organization) => o.id === entry.organizationId);
        atsContent += `### ${entry.title}\n`;
        atsContent += `${org ? org.title : ''} | ${entry.startDate} - ${entry.endDate}\n\n`;
        atsContent += `${entry.description}\n\n`;
        if (entry.skills && entry.skills.length > 0) {
          atsContent += `Skills: ${entry.skills.join(', ')}\n\n`;
        }
      });

    // Certificates
    atsContent += '## Certificates\n\n';
    certifications.entries
      .filter((entry: CertificationEntry) => entry.isPublished)
      .sort((a: CertificationEntry, b: CertificationEntry) => Number(new Date(b.date)) - Number(new Date(a.date)))
      .forEach((entry: CertificationEntry) => {
        const org = organizations.entries.find((o: Organization) => o.id === entry.organizationId);
        atsContent += `- ${entry.title} (${org ? org.title : ''}) - ${entry.date}\n`;
      });

    // Projects
    atsContent += '\n## Projects\n\n';
    projects.entries
      .filter((entry: ProjectEntry) => entry.isPublished)
      .forEach((entry: ProjectEntry) => {
        atsContent += `### ${entry.title}\n\n`;
        atsContent += `${entry.description}\n\n`;
        if (entry.skills && entry.skills.length > 0) {
          atsContent += `Technologies: ${entry.skills.join(', ')}\n\n`;
        }
        if (entry.source || entry.demo) {
          atsContent += 'Links: ';
          if (entry.source) atsContent += `[Source](${entry.source}) `;
          if (entry.demo) atsContent += `[Demo](${entry.demo})`;
          atsContent += '\n\n';
        }
      });

    // Creating public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Saving to markdown file
    const mdPath = path.join(publicDir, 'cv-ats.md');
    fs.writeFileSync(mdPath, atsContent, 'utf-8');
    
    console.log('ATS markdown generated successfully');
    return true;
  } catch (error) {
    console.error('Error generating ATS markdown:', error);
    throw error;
  }
}

generateATSMarkdown().catch(console.error);