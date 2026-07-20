import type { Metadata } from "next";
import "./globals.css";

import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SecureWithMe | Cloud & AI Security Engineer",
  description:
    "Portfolio of Kaushal Kumar Bairwa - Cloud & AI Security Engineer, Researcher and Security Consultant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable}`}
      >
        {children}
      </body>
    </html>
  );
}