import { Button } from "@/components/common/ui/button";
import { getAssetPath } from "@/lib/assetPath";
import { AboutEntry } from "@/types/resume";

interface PersonProps {
  sectionData?: AboutEntry;
}

export function Person({ sectionData }: PersonProps) {
  if (!sectionData) {
    return null;
  }

  return (
    <>
      <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
        {sectionData.title}
      </h1>
      <h2 className="text-muted-foreground mt-3 text-lg font-medium tracking-tight sm:text-xl">
        {sectionData.subtitle}
      </h2>

      <div
        className="mt-4 flex items-center justify-center lg:justify-start"
        role="group"
        aria-label="Contact actions"
      >
        <Button asChild variant="outline" className="mr-4 shrink-0 text-xs">
          <a
            href={getAssetPath("/ats/cv-ats.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download ATS-friendly CV (opens in new tab)"
            title="Download ATS-friendly CV (opens in new tab)"
          >
            ATS CV
          </a>
        </Button>

        {sectionData.email && (
          <Button asChild variant="outline" className="shrink-0 text-xs">
            <a
              href={`mailto:${sectionData.email}`}
              aria-label={`Send email to ${sectionData.email}`}
              title={`Send email to ${sectionData.email}`}
            >
              <span>Email me</span>
              <span
                className="h-2 w-2 animate-pulse rounded-full bg-green-400 duration-1000"
                aria-hidden="true"
                title="Available for contact"
              ></span>
            </a>
          </Button>
        )}
      </div>
    </>
  );
}
