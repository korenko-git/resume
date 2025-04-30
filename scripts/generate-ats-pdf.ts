import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import puppeteer from 'puppeteer';
import MarkdownIt from 'markdown-it';

const execPromise = promisify(exec);
const md = new MarkdownIt();

async function generateATSPdf() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const mdPath = path.join(publicDir, 'cv-ats.md');
    
    // Check if markdown file exists
    if (!fs.existsSync(mdPath)) {
      throw new Error('Markdown file not found. Please generate it first.');
    }
    
    // Read markdown content
    const atsContent = fs.readFileSync(mdPath, 'utf-8');
    
    // Create a CSS file for styling
    const cssPath = path.join(publicDir, 'cv-ats-style.css');
    const cssContent = `
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
    `;
    fs.writeFileSync(cssPath, cssContent, 'utf-8');

    // Generate PDF using Pandoc
    const pdfPath = path.join(publicDir, 'cv-ats.pdf');
    const pandocCommand = `pandoc "${mdPath}" -o "${pdfPath}" --pdf-engine=wkhtmltopdf --css="${cssPath}" -V margin-top=20mm -V margin-right=20mm -V margin-bottom=20mm -V margin-left=20mm`;
    
    try {
      await execPromise(pandocCommand);
      console.log('PDF generated using Pandoc');
    } catch (pandocError) {
      console.warn('Pandoc failed, falling back to Puppeteer:', pandocError);
      
      // Fallback to Puppeteer if Pandoc fails
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
        path: pdfPath,
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
      });

      await browser.close();
      console.log('PDF generated using Puppeteer');
    }
    
    console.log('ATS PDF generated successfully');
    return true;
  } catch (error) {
    console.error('Error generating ATS PDF:', error);
    throw error;
  }
}

generateATSPdf().catch(console.error);