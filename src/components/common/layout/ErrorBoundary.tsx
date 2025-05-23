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
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred while loading the page.
        </p>
        <div className="bg-muted/50 mb-6 max-w-full overflow-auto rounded-md p-4">
          <pre className="text-left text-sm">
            {error.message || "Unknown error"}
          </pre>
        </div>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </div>
    );
  }

  return <>{children}</>;
}
