# 📟 Resume Editor — GitHub-Powered & Serverless

A fully static, GitHub-powered resume website builder. This project allows you to create, edit, and manage your resume content through a web interface, storing data in JSON files and leveraging GitHub Actions for updates and deployment.

## ✨ Features

*   **Static Site Generation:** Built with Next.js for a fast, secure, and easily deployable static website.
*   **Data-Driven:** Resume content (About, Experience, Education, Projects, Certifications, Organizations) is managed via JSON files in `src/data`.
*   **In-Browser Editor:** A dedicated `/editor` route provides a user-friendly interface to modify resume content. Drafts are saved locally using `localStorage`.
*   **Live Preview:** The main `/` route displays the formatted resume based on the current data.
*   **ATS-Friendly PDF Export:** Includes a script (`scripts/generate-ats-resume.ts`) to generate a simplified Markdown and PDF version suitable for Applicant Tracking Systems (ATS), outputting to the `public/` directory.
*   **GitHub Workflow:** Edits made in the editor can be downloaded as a `.zip` archive. Submitting this archive via a GitHub Pull Request triggers GitHub Actions to update the content, rebuild the site, and regenerate the PDF.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v15+) with [React](https://reactjs.org/) (v19+)
*   **Language:** TypeScript
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) & [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** React Context API (`ResumeContext.tsx`)
*   **UI Enhancements:**
    *   [React Joyride](https://docs.react-joyride.com/) for the welcome tour.
    *   [dnd-kit](https://dndkit.com/) for drag-and-drop functionality (e.g., skills).
*   **Data Storage:** JSON files & Browser `localStorage`
*   **PDF Generation:** [Pandoc](https://pandoc.org/) via `wkhtmltopdf` engine
*   **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

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

*   `npm run dev`: Starts the Next.js development server with Turbopack.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server (requires `npm run build` first).
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run typecheck`: Checks TypeScript types.
*   `npm run test`: Runs tests using Jest.
*   `npm run test:watch`: Runs tests in watch mode.
*   `npm run test:coverage`: Runs tests and generates a coverage report.
*   `npm run pdf`: Generates the ATS-friendly PDF resume using the script in `scripts/`.

## ✍️ Editing Workflow

1.  Navigate to the `/editor` page on your deployed site or local development server.
2.  Make desired changes to the resume sections using the inline editing forms. Upload new images if needed.
3.  Click the **"Download Changes"** button to get a `.zip` archive containing the updated JSON data and any new images.
4.  Commit and push this `.zip` file to the `/updates` directory in your GitHub repository (typically via a Pull Request).
5.  GitHub Actions will automatically detect the new `.zip` file, extract its contents, update the corresponding JSON files and images in `src/data` and `public/images`, delete the processed `.zip`, rebuild the Next.js site, and regenerate the `public/cv-ats.pdf`.

## 📄 License

MIT

