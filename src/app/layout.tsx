import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import BackgroundAnimation from "@/components/common/layout/BackgroundAnimation";
import ClientThemeProvider from "@/components/common/layout/ClientThemeProvider";
import Container from "@/components/common/layout/Container";
import { Footer } from "@/components/common/layout/Footer";
import { Toaster } from "@/components/common/ui/toaster";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { createOpenGraphMetadata } from "@/lib/metadata";

import { RESUME_THEME_STORAGE_KEY } from "@/constants/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createOpenGraphMetadata({
    title: "Online Resume",
  }),
  title: {
    default: "Online Resume",
    template: "%s | Online Resume",
  },
  keywords: ["resume", "portfolio", "career", "job", "skills"],
  authors: [{ name: "Resume Builder" }],
  creator: "Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('${RESUME_THEME_STORAGE_KEY}');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased z-10 relative
        leading-relaxed tracking-wide selection:bg-primary/20 
        dark:selection:bg-neutral-300 dark:selection:text-neutral-900
        `}
      >
        <ClientThemeProvider>
          <ErrorBoundary>
            <ResumeProvider>
              <BackgroundAnimation />
              <Container>
                {children}
                <Footer />
              </Container>
            </ResumeProvider>
            <Toaster />
          </ErrorBoundary>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
