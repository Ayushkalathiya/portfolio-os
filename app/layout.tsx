import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { GlobalEffects } from "@/components/system-ui/GlobalEffects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Kalathiya | Systems Architect & Full-Stack Developer",
  description: "Futuristic developer portfolio and system dashboard of Ayush Kalathiya — a Systems Architect building resilient digital infrastructures.",
  keywords: ["Ayush Kalathiya", "Developer", "Systems Architect", "Portfolio", "Next.js", "TypeScript", "Full-Stack"],
  authors: [{ name: "Ayush Kalathiya" }],
  openGraph: {
    title: "Ayush Kalathiya | Systems Architect",
    description: "Futuristic developer portfolio featuring real-time GitHub analytics, interactive terminal, and system-interface UI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kalathiya | Systems Architect",
    description: "Futuristic developer portfolio with real-time system metrics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased selection:bg-primary/30 min-h-screen relative`}
      >
        {/* Background Effects */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
          <div className="scanline animate-scanline" />
        </div>

        <GlobalEffects>
          {children}
        </GlobalEffects>
      </body>
    </html>
  );
}
