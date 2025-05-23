import { Metadata } from "next";

interface OpenGraphMetadataProps {
  title: string;
  description?: string;
  siteName?: string;
  baseUrl?: string;
}

/**
 * Removes Markdown formatting from text
 */
function stripMarkdown(text: string): string {
  if (!text) return "";

  // Remove backticks (code blocks)
  let cleanText = text.replace(/`([^`]+)`/g, "$1");

  // Remove links [text](url) -> text
  cleanText = cleanText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Remove bold/italic markers
  cleanText = cleanText.replace(/(\*\*|__)(.*?)\1/g, "$2");
  cleanText = cleanText.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove headers
  cleanText = cleanText.replace(/^#+\s+/gm, "");

  return cleanText;
}

export function createOpenGraphMetadata({
  title,
  description = "Professional resume with editing capabilities",
  siteName = "Online Resume",
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_PATH ||
    "http://localhost:3000/",
}: OpenGraphMetadataProps): Metadata {
  // Clean markdown from title and description
  const cleanTitle = stripMarkdown(title);
  const cleanDescription = stripMarkdown(description);

  // Generate a cache-busting parameter
  const cacheBuster = `v=${Date.now()}`;
  const ogImagePath = `/og/resume-og.png?${cacheBuster}`;

  return {
    title: cleanTitle,
    description: cleanDescription,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      title: cleanTitle,
      description: cleanDescription,
      siteName,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [ogImagePath],
    },
  };
}
