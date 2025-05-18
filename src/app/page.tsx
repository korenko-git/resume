import type { Metadata } from "next";

import { Navigation } from "@/components/common/layout/Navigation";
import { AboutSection } from "@/components/resume/sections/AboutSection";
import { Person } from "@/components/resume/sections/Person";
import { ResumeSections } from "@/components/resume/sections/ResumeSections";
import { SocialLinks } from "@/components/resume/sections/SocialLinks";
import { getFirstPublishedEntry } from "@/lib/entityUtils";
import { getResume } from "@/lib/getResume";
import { AboutEntry } from "@/types/resume";
import { createOpenGraphMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const data = getResume();
  const person = getFirstPublishedEntry(data.about.entries);

  if (!person) {
    return createOpenGraphMetadata({
      title: "Online Resume",
    });
  }

  const { title, subtitle, description } = person;
  const pageTitle = `${title} - ${subtitle}`;

  return createOpenGraphMetadata({
    title: pageTitle,
    description: description || "Professional resume with editing capabilities",
  });
}

export default function Home() {
  const data = getResume();
  const about = getFirstPublishedEntry<AboutEntry>(data["about"].entries);

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 text-center lg:text-left">
        <div>
          <Person sectionData={about} />
          <Navigation />
        </div>

        <SocialLinks sectionData={about} />
      </header>

      <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
        <AboutSection sectionData={about} />
        <ResumeSections data={data} />
      </main>
    </div>
  );
}
