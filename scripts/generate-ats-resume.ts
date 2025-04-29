import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import MarkdownIt from 'markdown-it';
import { CertificationEntry, EducationEntry, ExperienceEntry, Organization, ProjectEntry } from '@/types/resume';

const md = new MarkdownIt();

async function generateATSResume() {
  try {
    // Loading data
    const dataPath = path.join(process.cwd(), 'src', 'data');
    const about = JSON.parse(fs.readFileSync(path.join(dataPath, 'about.json'), 'utf-8'));
    const experience = JSON.parse(fs.readFileSync(path.join(dataPath, 'experience.json'), 'utf-8'));
    const education = JSON.parse(fs.readFileSync(path.join(dataPath, 'education.json'), 'utf-8'));
    const certifications = JSON.parse(fs.readFileSync(path.join(dataPath, 'certifications.json'), 'utf-8'));
    const projects = JSON.parse(fs.readFileSync(path.join(dataPath, 'projects.json'), 'utf-8'));
    const organizations = JSON.parse(fs.readFileSync(path.join(dataPath, 'organizations.json'), 'utf-8'));

    // Creating ATS-optimized text
    let atsContent = `# ${about.title}\n\n`;
    atsContent += `${about.description}\n\n`;

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
        atsContent += `Skills: ${entry.skills.join(', ')}\n\n`;
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
        atsContent += `Technologies: ${entry.skills.join(', ')}\n\n`;
      });

    // Creating public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Saving to files
    const mdPath = path.join(publicDir, 'cv-ats.md');
    fs.writeFileSync(mdPath, atsContent, 'utf-8');

    const browser = await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const htmlContent = md.render(atsContent);
    const styleContent = `
    <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
          color: #333;
        }
        h1 { 
          font-size: 24px; 
          margin-bottom: 20px;
          color: #000;
        }
        h2 { 
          font-size: 20px; 
          margin-top: 30px;
          color: #222;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        h3 { 
          font-size: 18px; 
          margin-top: 20px;
          color: #444;
        }
        ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        li {
          margin: 5px 0;
        }
    </style>
  `;

    await page.setContent(styleContent + htmlContent);
    await page.pdf({
      path: path.join(publicDir, 'cv-ats.pdf'),
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
    });

    await browser.close();
    console.log('ATS resume generated successfully');
  } catch (error) {
    console.error('Error generating ATS resume:', error);
    throw error;
  }
}

generateATSResume().catch(console.error);