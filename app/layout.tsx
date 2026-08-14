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

// Updated Metadata for SEO and Browser Tabs
export const metadata: Metadata = {
  title: "Elevate Remote Solutions | Assessment Portal",
  description: "Applicant screening and assessment portal for Elevate Remote Solutions.",
};

// Fixed the TypeScript layout props definition
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-slate-50 flex flex-col">
        {children}
      </body>
    </html>
  );
}