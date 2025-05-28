import { Step } from "react-joyride";

export const allSteps: Step[] = [
  {
    target: "body",
    placement: "center",
    content: "Welcome to the resume editor! Let's explore the main features.",
    disableBeacon: true,
  },
  {
    target: ".editor-tabs",
    content:
      "Here you can switch between different sections of your resume: personal information, work experience, education, etc.",
  },
  {
    target: ".mobile-section-select",
    content:
      "On mobile devices, you can select different sections of your resume using this dropdown menu.",
  },
  {
    target: ".entity-list",
    content:
      "This list displays all entries in the selected section. Click on any entry to edit it.",
  },
  {
    target: ".add-entity-button",
    content: "Click here to add a new entry to the current section.",
  },
  {
    target: ".entity-card",
    content:
      "Each card represents a separate entry. You can see basic information and publication status.",
  },
  {
    target: ".edit-button",
    content: "Click the edit button to modify an entry.",
  },
  {
    target: ".delete-button",
    content:
      "Use this button to delete an entry. Be careful - this action cannot be undone!",
  },
  {
    target: ".form-field",
    content:
      "In edit mode, you can modify all fields of an entry. Markdown formatting is supported for descriptions.",
    data: { isFormStep: true },
  },
  {
    target: ".preview-button",
    content: "Click here to see how the entry will appear in your resume.",
    data: { isFormStep: true },
  },
  {
    target: ".save-button",
    content: 'After making changes, click "Save" to apply them.',
    data: { isFormStep: true },
  },
  {
    target: ".back-button",
    content: "Use this button to return to the list of entries.",
    data: { isFormStep: true },
  },
  {
    target: ".published-toggle",
    content:
      "Toggle the visibility of an entry in the public resume using this switch.",
    data: { isFormStep: true },
  },
  {
    target: ".download-button",
    content:
      "Download your resume changes as a ZIP file. You can upload this archive to the `/updates` folder via GitHub PR to update your resume.",
  },
  {
    target: ".skills-input",
    content:
      "Enter your skills here. You can separate multiple skills with commas or spaces.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skills-category-select",
    content:
      "Select a category for your skills. This helps organize them on your resume.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skills-add-button",
    content: "Click here to add the skills you've entered to your resume.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skills-search",
    content:
      "Search through your existing skills to find specific ones quickly.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skills-filter",
    content: "Filter skills by category to manage related skills together.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skills-list",
    content:
      "Here are all your skills, organized by category. Click on any skill to modify or remove it.",
    data: { isSkillsStep: true },
  },
  {
    target: ".skill-badge",
    content:
      "Each badge represents a skill. Click on a skill to delete, rename, or change its category.",
    data: { isSkillsStep: true },
  },
  {
    target: "body",
    placement: "center",
    content:
      "Now you know how to manage your skills! This will help you highlight your expertise in your resume.",
    data: { isSkillsStep: true },
  },
  {
    target: "body",
    placement: "center",
    content:
      "Now you're ready to edit your resume! Explore different sections and customize them to your needs.",
  },
];
