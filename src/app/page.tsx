import type { Metadata } from "next";

import HomeContent from "@/components/pages/HomeContent";
import aboutData from "@/data/about.json";
import { getFirstPublishedEntry } from "@/lib/entityUtils";

export async function generateMetadata(): Promise<Metadata> {
  const person = getFirstPublishedEntry(aboutData?.entries)
  if (!aboutData || !person) {
    return {
      title: "Online Resume",
      description: "Professional resume with editing capabilities",
    };
  }
  
  const { title, subtitle, description } = person;
  
  return {
    title: `${title} - ${subtitle}`,
    description: description || "Professional resume with editing capabilities",
    openGraph: {
      title: `${title} - ${subtitle}`,
      description: description || "Professional resume with editing capabilities",
    },
  };
}

export default function Home() {
  return <HomeContent />;
}