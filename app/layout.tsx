import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Kalathiya | Systems Architect",
  description: "Futuristic developer portfolio and system dashboard of Ayush Kalathiya, a Systems Architect and Developer.",
  keywords: ["Ayush Kalathiya", "Developer", "Systems Architect", "Portfolio", "Next.js", "TypeScript"],
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
        
        {children}
      </body>
    </html>
  );
}
