import Link from "next/link";

import { Button } from "@/components/common/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the requested page does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return to home</Link>
      </Button>
    </div>
  );
}
