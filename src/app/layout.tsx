import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { AccessibilitySettings } from "@/components/common/layout/AccessibilitySettings";
import BackgroundAnimation from "@/components/common/layout/BackgroundAnimation";
import ClientThemeProvider from "@/components/common/layout/ClientThemeProvider";
import Container from "@/components/common/layout/Container";
import { ErrorBoundary } from "@/components/common/layout/ErrorBoundary";
import { Footer } from "@/components/common/layout/Footer";
import { ThemeToggle } from "@/components/common/layout/ThemeToggle";
import { Toaster } from "@/components/common/ui/toaster";
import { RESUME_THEME_STORAGE_KEY } from "@/constants/theme";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { createOpenGraphMetadata } from "@/lib/metadata";

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                  
                  var accessibility = localStorage.getItem('accessibility-settings');
                  if (accessibility) {
                    var settings = JSON.parse(accessibility);
                    if (settings.fontSize === 'large') document.documentElement.classList.add('font-large');
                    if (settings.fontSize === 'extra-large') document.documentElement.classList.add('font-extra-large');
                    if (settings.reducedMotion) document.documentElement.classList.add('reduced-motion');
                    if (settings.highContrast) document.documentElement.classList.add('high-contrast');
                    if (settings.screenReaderMode) document.documentElement.classList.add('screen-reader-mode');
                  }
                  
                  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    document.documentElement.classList.add('reduced-motion');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} selection:bg-primary/20 relative z-10 leading-relaxed tracking-wide antialiased dark:selection:bg-neutral-300 dark:selection:text-neutral-900`}
      >
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
        >
          Skip to main content
        </a>

        <ClientThemeProvider>
          <ErrorBoundary>
            <ResumeProvider>
              <div className="no-print fixed top-4 right-4 z-50 flex gap-2 sm:top-8 sm:right-2">
                <ThemeToggle />
                <AccessibilitySettings />
              </div>
              <BackgroundAnimation />
              <Container>
                <main id="main-content">{children}</main>
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
