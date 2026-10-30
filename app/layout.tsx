import type { Metadata } from "next";
import { Doto, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  title: "Priyansh Rawat | Full-stack Developer",
  description: "Full-stack developer and Computer Science + Physics student at BITS Goa. Building CabLite, Sarthi, and software for real communities.",
  openGraph: {
    title: "Priyansh Rawat | Full-stack Developer",
    description: "Full-stack developer and Computer Science + Physics student at BITS Goa. Building CabLite, Sarthi, and software for real communities.",
    siteName: "Priyansh Rawat",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Priyansh Rawat | Full-stack Developer",
    description: "Full-stack developer and Computer Science + Physics student at BITS Goa. Building CabLite, Sarthi, and software for real communities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.VERCEL && <><Analytics /><SpeedInsights /></>}
      </body>
    </html>
  );
}
