"use client";

import { HelpCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Joyride, { Step } from "react-joyride";

import { Button } from "@/components/common/ui/button";

interface WelcomeTourProps {
  isEntityFormOpen?: boolean;
}

const allSteps: Step[] = [
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
    target: "body",
    placement: "center",
    content:
      "Now you're ready to edit your resume! Explore different sections and customize them to your needs.",
  },
];

export function WelcomeTour({ isEntityFormOpen = false }: WelcomeTourProps) {
  const { theme } = useTheme();
  const [runTour, setRunTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isDark = theme === "dark";

  const steps = isEntityFormOpen
    ? allSteps.filter(
        (step) => step?.data?.isFormStep || step.target === "body"
      )
    : allSteps.filter(
        (step) => !step?.data?.isFormStep || step.target === "body"
      );

  const joyrideStyles = {
    options: {
      arrowColor: "var(--card)",
      backgroundColor: "var(--card)",
      overlayColor: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
      primaryColor: "var(--primary)",
      textColor: "var(--card-foreground)",
      spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setRunTour(true)}
        aria-label="Show Tutorial"
        title="Show Tutorial"
        className="rounded-full w-8 h-8 sm:absolute right-0 top-0 z-10"
      >
        <HelpCircle className="h-4 w-4" />
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
