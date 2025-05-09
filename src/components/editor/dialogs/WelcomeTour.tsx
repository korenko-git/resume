"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import Joyride, { Step } from "react-joyride";

import { Button } from "@/components/common/ui/button";

const steps: Step[] = [
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
  },
  {
    target: ".preview-button",
    content: "Click here to see how the entry will appear in your resume.",
  },
  {
    target: ".save-button",
    content: 'After making changes, click "Save" to apply them.',
  },
  {
    target: ".back-button",
    content: "Use this button to return to the list of entries.",
  },
  {
    target: ".published-toggle",
    content:
      "Toggle the visibility of an entry in the public resume using this switch.",
  },
  {
    target: ".download-button",
    content:
      "Download your resume changes as a ZIP file. You can upload this archive to the `/updates` folder via GitHub PR to update your resume.",
  },
  {
    target: "body",
    placement: "center",
    content:
      "Now you're ready to edit your resume! Explore different sections and customize them to your needs.",
  },
];

export function WelcomeTour() {
  const { theme } = useTheme();
  const [runTour, setRunTour] = useState(false);
  const isDark = theme === "dark";

  const joyrideStyles = {
    options: {
      arrowColor: isDark ? "#333" : "#fff",
      backgroundColor: isDark ? "#333" : "#fff",
      overlayColor: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
      primaryColor: isDark ? "#3b82f6" : "#2563eb",
      textColor: isDark ? "#fff" : "#000",
      spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setRunTour(true)}>
        Show Tutorial
      </Button>

      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        styles={joyrideStyles}
        callback={(data) => {
          const { status } = data;

          if (status === "finished" || status === "skipped") {
            setRunTour(false);
          }
        }}
      />
    </>
  );
}
