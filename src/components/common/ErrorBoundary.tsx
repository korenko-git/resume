"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/common/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error);
      setError(error.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="mb-6 text-muted-foreground">
          An unexpected error occurred while loading the page.
        </p>
        <div className="mb-6 p-4 bg-muted/50 rounded-md overflow-auto max-w-full">
          <pre className="text-sm text-left">
            {error.message || "Unknown error"}
          </pre>
        </div>
        <Button onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}