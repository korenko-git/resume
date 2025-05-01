import type { Metadata } from "next";
import HomeContent from "@/components/pages/HomeContent";

import aboutData from "@/data/about.json";

export async function generateMetadata(): Promise<Metadata> {
  if (!aboutData) {
    return {
      title: "Online Resume",
      description: "Professional resume with editing capabilities",
    };
  }
  
  const { title, subtitle, description } = aboutData;
  
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