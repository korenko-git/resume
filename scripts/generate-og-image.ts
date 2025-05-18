import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

import { getFirstPublishedEntry } from '@/lib/entityUtils';
import { AboutEntry } from '@/types/resume';

async function generateOGImage() {
  try {
    // Loading data
    const dataPath = path.join(process.cwd(), 'src', 'data');
    const aboutData = JSON.parse(fs.readFileSync(path.join(dataPath, 'about.json'), 'utf-8'));
    
    const about = getFirstPublishedEntry<AboutEntry>(aboutData.entries);
    
    if (!about) {
      throw new Error('No published about entry found');
    }

    // Creating directory for OG image if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    const ogDir = path.join(publicDir, 'og');
    
    if (!fs.existsSync(ogDir)) {
      fs.mkdirSync(ogDir, { recursive: true });
    }

    // Path to save the OG image
    const ogImagePath = path.join(ogDir, 'resume-og.png');
    
    // Checking if the image already exists
    const imageExists = fs.existsSync(ogImagePath);
    
    // Launching browser and creating image
    const browser = await puppeteer.launch({
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Setting page size for OG image
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });
    
    // Creating HTML content for OG image
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #0f172a;
              color: white;
              font-family: system-ui, -apple-system, sans-serif;
              text-align: center;
              padding: 40px;
            }
            h1 {
              font-size: 64px;
              font-weight: 600;
              margin: 0 0 20px;
            }
            p {
              font-size: 32px;
              margin: 0;
              max-width: 80%;
            }
          </style>
        </head>
        <body>
          <h1>${about.title}</h1>
          <p>${about.subtitle || 'Resume'}</p>
        </body>
      </html>
    `;
    
    await page.setContent(htmlContent);
    
    // Creating screenshot and saving as OG image
    await page.screenshot({
      path: ogImagePath,
      type: 'png'
      // Removed quality parameter as it's not supported for PNG
    });
    
    await browser.close();
    
    console.log('OG image generated successfully:', ogImagePath);
    return { success: true, path: ogImagePath, isNew: !imageExists };
  } catch (error) {
    console.error('Error generating OG image:', error);
    throw error;
  }
}

generateOGImage().catch(console.error);