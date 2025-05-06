"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

export default function ClientThemeProvider({ 
  children 
}: { 
  children: ReactNode 
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
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="resume-theme"
    >
      {children}
    </ThemeProvider>
  );
}