"use client";

import { useEffect } from "react";

import { Button } from "@/components/common/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">
        An error occurred while loading this page.
      </p>
      <div className="mb-6 p-4 bg-muted/50 rounded-md overflow-auto max-w-full">
        <pre className="text-sm text-left">
          {error.message || "Unknown error"}
        </pre>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}