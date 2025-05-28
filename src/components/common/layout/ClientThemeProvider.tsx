"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

import { RESUME_THEME_STORAGE_KEY, THEME_OPTIONS } from "@/constants/theme";

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={THEME_OPTIONS.DARK}
      themes={[THEME_OPTIONS.LIGHT, THEME_OPTIONS.DARK]}
      enableSystem={false}
      disableTransitionOnChange
      storageKey={RESUME_THEME_STORAGE_KEY}
    >
      {children}
    </ThemeProvider>
  );
}
