'use client';

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  const { theme } = useTheme();
  
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          border: "1px solid",
          borderColor: theme === "dark" ? "#444" : "#eee",
        },
      }}
    />
  );
}