import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import { ResumeProvider } from "@/contexts/ResumeContext";
import { Toaster } from "@/components/common/ui/toaster";
import Container from "@/components/common/layout/Container";
import { Footer } from "@/components/common/layout/Footer";

import "./globals.css";

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
        dark:bg-zinc-900 leading-relaxed dark:text-neutral-200 tracking-wide dark:selection:bg-neutral-300 dark:selection:text-neutral-900
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResumeProvider>
            <div className="bg-animation">
              <div id='stars3'></div>
              <div id='stars4'></div>
            </div>
            <Container>
              {children}
              <Footer />
            </Container>
          </ResumeProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
