import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    template: "%s | SEO360",
    default: "SEO360 - AI-Powered SEO Audit & Optimization Platform",
  },
  description: "Transform your SEO strategy with AI-powered audits, keyword research, competitor analysis, and automated optimization tools. Built for agencies and enterprises.",
  keywords: ["SEO", "SEO audit", "keyword research", "competitor analysis", "SEO tools", "AI SEO", "white-label SEO"],
  authors: [{ name: "Wilson Kinyua", url: "https://wilsonkinyua.com" }],
  creator: "Wilson Kinyua",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seo360.com",
    title: "SEO360 - AI-Powered SEO Platform",
    description: "Transform your SEO strategy with comprehensive audits and AI-powered optimization tools.",
    siteName: "SEO360",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO360 - AI-Powered SEO Platform",
    description: "Transform your SEO strategy with comprehensive audits and AI-powered optimization tools.",
    creator: "@seo360platform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
