import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import CursorFollower from "@/components/ui/CursorFollower";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Portfolio — Full-Stack Developer",
  description:
    "Brutalist portfolio: systems, shipping, and public proof of work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${spaceMono.variable} ${inter.variable} min-h-screen antialiased md:cursor-none`}
      >
        <LenisProvider>
          <CursorFollower />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
