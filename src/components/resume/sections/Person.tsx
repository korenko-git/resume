import { Button } from "@/components/common/ui/button";
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
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {sectionData.title}
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
        {sectionData.subtitle}
      </h2>

      <div className="mt-4 flex items-center justify-center lg:justify-start">
        <Button
          asChild
          variant="outline"
          className="mr-4 shrink-0 text-xs"
          aria-label="Download ATS CV"
        >
          <a href={"/cv-ats.pdf"} target="_blank" rel="noopener noreferrer">
            ATS CV
          </a>
        </Button>

        {sectionData.email && (
          <Button
            asChild
            variant="outline"
            className=" shrink-0 text-xs"
            aria-label="Send email"
          >
            <a
              href={`mailto:${sectionData.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Email me</span>
              <span className="w-2 h-2 rounded-full bg-green-400 duration-1000 animate-pulse"></span>
            </a>
          </Button>
        )}
      </div>
    </>
  );
}
