import type { Metadata } from "next";
import "./globals.css";

import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SecureWithMe",
  description: "Cloud & AI Security Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}