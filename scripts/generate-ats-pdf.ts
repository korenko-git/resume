import fs from "fs";
import MarkdownIt from "markdown-it";
import path from "path";
import puppeteer from "puppeteer";

const md = new MarkdownIt();

async function generateATSPdf() {
  try {
    const atsDir = path.join(process.cwd(), "public/ats");
    const mdPath = path.join(atsDir, "cv-ats.md");
    const pdfPath = path.join(atsDir, "cv-ats.pdf");
    const cssPath = path.join(atsDir, "style.css");

    // Check if markdown file exists
    if (!fs.existsSync(mdPath)) {
      throw new Error("Markdown file not found. Please generate it first.");
    }

    // css
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    const styleContent = `<style>${cssContent}</style>`;

    // html
    const atsContent = fs.readFileSync(mdPath, "utf-8");
    const htmlContent = md.render(atsContent);

    /*fs.writeFileSync(
      path.join(atsDir, "index.html"),
      styleContent + htmlContent,
      "utf-8",
    );*/

    const browser = await puppeteer.launch({
      headless: "shell",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(styleContent + htmlContent);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });

    await browser.close();

    console.log("ATS PDF generated successfully");
    return true;
  } catch (error) {
    console.error("Error generating ATS PDF:", error);
    throw error;
  }
}

generateATSPdf().catch(console.error);
