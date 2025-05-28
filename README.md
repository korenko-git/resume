# 📟 Resume Editor — GitHub-Powered & Serverless

A fully static, GitHub-powered resume website builder. This project allows you to create, edit, and manage your resume content through a web interface, storing data in JSON files and leveraging GitHub Actions for updates and deployment.

## ✨ Features

- **Static Site Generation:** Built with Next.js for a fast, secure, and easily deployable static website.
- **Data-Driven:** Resume content (About, Experience, Education, Projects, Certifications, Organizations) is managed via JSON files in `src/data`.
- **In-Browser Editor:** A dedicated `/editor` route provides a user-friendly interface to modify resume content. Drafts are saved locally using `localStorage`.
- **Live Preview:** The main `/` route displays the formatted resume based on the current data.
- **ATS-Friendly PDF Export:** Includes a script (`scripts/generate-ats-resume.ts`) to generate a simplified Markdown and PDF version suitable for Applicant Tracking Systems (ATS), outputting to the `public/` directory.
- **GitHub Workflow:** Edits made in the editor can be downloaded as a `.zip` archive. Submitting this archive via a GitHub Pull Request triggers GitHub Actions to update the content, rebuild the site, and regenerate the PDF.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15+) with [React](https://reactjs.org/) (v19+)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** React Context API (`ResumeContext.tsx`)
- **UI Enhancements:**
  - [React Joyride](https://docs.react-joyride.com/) for the welcome tour.
- **Data Storage:** JSON files & Browser `localStorage`
- **PDF Generation:** [Pandoc](https://pandoc.org/) via `wkhtmltopdf` engine with Puppeteer fallback
- **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd resume
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the main resume page.
    Open [http://localhost:3000/editor](http://localhost:3000/editor) to access the editor.

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack for faster refresh times and improved development experience. Access the site at http://localhost:3000.
- `npm run build`: Builds the application for production, generating optimized static files ready for deployment.
- `npm run start`: Starts the production server using the built files. Requires running `npm run build` first.
- `npm run lint`: Lints the codebase using ESLint to identify and fix code style issues and potential errors in JavaScript, JSX, TypeScript, and TSX files.
- `npm run typecheck`: Checks TypeScript types across the project without emitting compiled files, ensuring type safety.
- `npm run test`: Runs Jest tests to verify code functionality and prevent regressions.
- `npm run test:watch`: Runs Jest tests in watch mode, automatically re-running tests when files change.
- `npm run test:coverage`: Runs Jest tests and generates a coverage report to identify untested code.
- `npm run pdf`: Generates an ATS-friendly PDF resume using the script in `scripts/generate-ats-resume.ts`. The output is saved to `public/cv-ats.pdf`.
- `npm run og`: Generates an OpenGraph image for social media sharing using the script in `scripts/generate-og-image.ts`. The output is saved to `public/og/resume-og.png`.

## 📁 Project Structure

- `.github/workflows/`: GitHub Actions workflows for CI/CD
  - `apply-updates.yml`: Processes ZIP files in the updates directory
  - `build-static.yml`: Builds and deploys the static site to GitHub Pages
  - `generate-ats-cv.yml`: Generates ATS-friendly resume versions
  - `generate-og-image.yml`: Creates OpenGraph image for social sharing
  - `yearly-update.yml`: Automatically triggers rebuild on January 1st
- `public/`: Static assets and generated files
- `scripts/`: Utility scripts for PDF generation
- `src/`: Source code
  - `app/`: Next.js app router components
  - `components/`: Reusable UI components
  - `contexts/`: React context providers
  - `data/`: JSON data files for resume content
  - `hooks/`: Custom React hooks
  - `lib/`: Utility functions
  - `services/`: Business logic and data storage services
  - `types/`: TypeScript type definitions
- `updates/`: Directory for ZIP files containing resume updates

## ✍️ Editing Workflow

1.  Navigate to the `/editor` page on your deployed site or local development server.
2.  Make desired changes to the resume sections using the inline editing forms. Upload new images if needed.
3.  Click the **"Download Changes"** button to get a `.zip` archive containing the updated JSON data and any new images.
4.  Commit and push this `.zip` file to the `/updates` directory in your GitHub repository (typically via a Pull Request).
5.  GitHub Actions will automatically:
    - Detect the new `.zip` file
    - Extract its contents
    - Update the corresponding JSON files and images
    - Delete the processed `.zip`
    - Rebuild the Next.js site
    - Generate ATS-friendly versions (Markdown and PDF)
    - Deploy to GitHub Pages

## 🤖 GitHub Actions Workflows

This project uses several GitHub Actions workflows to automate the resume update and deployment process:

### Apply Resume Updates (`apply-updates.yml`)

- **Trigger**: Push to master, pull requests, or manual dispatch
- **Purpose**: Processes ZIP files uploaded to the `/updates` directory
- **Actions**:
  - Extracts JSON data and images from ZIP files
  - Updates the corresponding files in the repository
  - Validates JSON files for correctness
  - Removes processed ZIP files
  - Commits and pushes changes

### Build Static Next.js (`build-static.yml`)

- **Trigger**: After Apply Resume Updates workflow completes, or manual dispatch
- **Purpose**: Builds and deploys the static Next.js site to GitHub Pages
- **Actions**:
  - Runs linting, type checking, and tests
  - Triggers ATS CV generation
  - Configures base path for GitHub Pages deployment
  - Builds the static site with Next.js
  - Deploys to GitHub Pages

### Generate ATS CV (`generate-ats-cv.yml`)

- **Trigger**: Called by other workflows or manual dispatch
- **Purpose**: Creates ATS-friendly versions of the resume
- **Actions**:
  - Checks for changes in JSON data files
  - Generates Markdown version of the resume
  - Creates PDF version using Pandoc and wkhtmltopdf
  - Commits and pushes the generated files

### Generate OG Image (`generate-og-image.yml`)

- **Trigger**: Called by other workflows or manual dispatch
- **Purpose**: Creates OpenGraph image for social media sharing
- **Actions**:
  - Checks for changes in JSON data files
  - Generates a PNG image using Puppeteer
  - Commits and pushes the generated image

### Yearly Date Update (`yearly-update.yml`)

- **Trigger**: Scheduled to run at 00:05 on January 1st, or manual dispatch
- **Purpose**: Ensures the resume is rebuilt at the start of each year to update relative dates
- **Actions**:
  - Triggers the Build Static workflow

## 📄 License

[MIT License](LICENSE.md)
