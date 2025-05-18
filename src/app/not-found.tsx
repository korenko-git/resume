import Link from "next/link";

import { Button } from "@/components/common/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page not found</h2>
      <p className="mb-8 text-muted-foreground max-w-md">
        Sorry, the requested page does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return to home</Link>
      </Button>
    </div>
  );
}