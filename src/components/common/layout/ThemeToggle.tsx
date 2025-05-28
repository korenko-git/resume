"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Current theme: ${theme}. Click to switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" && (
        <Sun className="text-foreground h-5 w-5" aria-hidden="true" />
      )}
      {theme === "dark" && (
        <Moon className="text-foreground h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
