import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 1. Import Next.js Script

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elevate Remote Solutions - Assessment",
  description: "Applicant screening portal for Elevate Remote Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 2. Add the AdSense Script (Replace with your actual Publisher ID) */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5795189169885877`}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}