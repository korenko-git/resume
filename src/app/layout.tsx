import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import BackgroundAnimation from "@/components/common/layout/BackgroundAnimation";
import ClientThemeProvider from "@/components/common/layout/ClientThemeProvider";
import Container from "@/components/common/layout/Container";
import { Footer } from "@/components/common/layout/Footer";
import { Toaster } from "@/components/common/ui/toaster";
import { ResumeProvider } from "@/contexts/ResumeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Online Resume",
    template: "%s | Online Resume"
  },
  description: "Professional resume with editing capabilities",
  keywords: ["resume", "portfolio", "career", "job", "skills"],
  authors: [{ name: "Resume Builder" }],
  creator: "Resume Builder",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Online Resume",
    description: "Professional resume with editing capabilities",
    siteName: "Online Resume",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased z-10 relative
        leading-relaxed tracking-wide selection:bg-primary/20 selection:text-foreground
        `}
      >
        <ClientThemeProvider>
          <ResumeProvider>
            <BackgroundAnimation />
            <Container>
              {children}
              <Footer />
            </Container>
          </ResumeProvider>
          <Toaster />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
