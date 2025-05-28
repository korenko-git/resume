"use client";

import { HelpCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Joyride, { ACTIONS, STATUS, Step } from "react-joyride";

import { Button } from "@/components/common/ui/button";
import { allSteps } from "@/constants/tourSteps";

interface WelcomeTourProps {
  isEntityFormOpen?: boolean;
  isSkillsManagerOpen?: boolean;
}

export function WelcomeTour({
  isEntityFormOpen = false,
  isSkillsManagerOpen = false,
}: WelcomeTourProps) {
  const { theme } = useTheme();
  const [runTour, setRunTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tourKey, setTourKey] = useState(0);
  const isDark = theme === "dark";

  let steps: Step[];

  if (isSkillsManagerOpen) {
    steps = allSteps.filter(
      (step) => step?.data?.isSkillsStep || step.target === "body",
    );
  } else if (isEntityFormOpen) {
    steps = allSteps.filter(
      (step) => step?.data?.isFormStep || step.target === "body",
    );
  } else {
    steps = allSteps.filter(
      (step) =>
        (!step?.data?.isFormStep && !step?.data?.isSkillsStep) ||
        step.target === "body",
    );
  }

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
    buttonNext: {
      color: "var(--primary-foreground)",
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleStartTour = () => {
    setTourKey((prev) => prev + 1);
    setRunTour(true);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleStartTour}
        aria-label="Show Tutorial"
        title="Show Tutorial"
        className="top-0 right-0 z-10 h-8 w-8 rounded-full sm:absolute"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      <Joyride
        key={tourKey}
        steps={steps}
        run={runTour}
        continuous
        showSkipButton
        styles={joyrideStyles}
        callback={(data) => {
          const { status, action } = data;

          if (
            action === ACTIONS.CLOSE ||
            status === STATUS.FINISHED ||
            status === STATUS.SKIPPED
          ) {
            setRunTour(false);
          }
        }}
      />
    </>
  );
}
