import { Metadata } from "next";

interface OpenGraphMetadataProps {
  title: string;
  description?: string;
  siteName?: string;
  baseUrl?: string;
}

export function createOpenGraphMetadata({
  title,
  description = "Professional resume with editing capabilities",
  siteName = "Online Resume",
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/",
}: OpenGraphMetadataProps): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      siteName,
      images: [
        {
          url: "/og/resume-og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/resume-og.png"],
    },
  };
}
