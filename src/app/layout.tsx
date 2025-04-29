import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Editor",
  description: "Edit your resume in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  z-10 relative
        dark:bg-zinc-900 leading-relaxed dark:text-neutral-200 tracking-wide dark:selection:bg-neutral-300 dark:selection:text-neutral-900 z-10
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
            <div className="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
              {children}
            </div>
          </ResumeProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
