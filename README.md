# 📟 Resume Editor — GitHub-Powered & Serverless

A fully static, GitHub-powered resume website. All content is stored in JSON files, images are committed with versioned IDs, and edits are made via downloadable `.zip` packages. GitHub Actions automates site rebuild, PDF generation, and cleanup.

> 🔐 No backend. No tokens. No OAuth. Just GitHub and GitHub Actions.

---

## ✍️ How Editing Works

1. Open the visual editor (hosted on the site).
2. Make edits to resume sections (inline form + drag-and-drop).
3. Upload new images (e.g. company logos).
4. Press **"Download Changes"** to get a `.zip` archive.
5. Upload that archive to the `/updates` folder via:
   - GitHub PR
   - Direct commit (if you have access)
6. GitHub Actions:
   - Unzips the archive
   - Applies edits to JSON and image files
   - Replaces outdated images (if listed)
   - Deletes the `.zip`
   - Rebuilds the site
   - Regenerates the PDF resume

---

## 📆 Zip Format

Each update archive should contain:

```
update-name.zip
🔹 data/
🔹 images/
🔹 manifest.json              # (optional metadata)
```

### Example `manifest.json`

```json
{
  "submittedBy": "guest_user",
  "replacedImages": [
    "old-exp-logo.png",
    "previous-project-image.jpg"
  ]
}
```

---

## 🤖 GitHub Actions

The workflow automatically:

- Applies all `.zip` files in `/updates`
- Replaces JSON and images
- Deletes outdated images (if listed)
- Deletes processed zip files
- Rebuilds the site
- Generates and commits `resume.pdf`

You can find the workflow in:

```
.github/workflows/update-from-zip.yml
```

---

## 💪 Development Setup

```bash
npm install
npm run dev    # run local Next.js site
npm run build  # build static site
```

For GitHub Actions:

- `scripts/generate-resume-pdf.ts` generates a styled PDF
- `scripts/clean-old-images.ts` (optional): delete images no longer in use

---

## 📄 License

MIT
