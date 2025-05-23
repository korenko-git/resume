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
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground mb-6">
        An error occurred while loading this page.
      </p>
      <div className="bg-muted/50 mb-6 max-w-full overflow-auto rounded-md p-4">
        <pre className="text-left text-sm">
          {error.message || "Unknown error"}
        </pre>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
