"use client";

import { Navbar } from "./Navbar";
import { CONFIG } from "@/lib/config/site";
import { useSystemMetrics, formatUptime } from "@/lib/hooks/useSystemMetrics";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const metrics = useSystemMetrics();

    return (
        <div className="flex flex-col min-h-screen pt-16">
            <Navbar />
            <main className="flex-1 container mx-auto px-6 py-12 relative z-10">
                {children}
            </main>
            <footer className="border-t border-primary/10 bg-background/40 py-12 px-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-sm font-bold uppercase tracking-widest text-primary">
                            {CONFIG.name}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500 uppercase">
                            Systems Architect | Secure Deployment 0x{new Date().getUTCFullYear()}
                        </span>
                    </div>

                    <div className="flex gap-8 items-center font-mono text-xs text-slate-400">
                        <a href={CONFIG.socials.github} className="hover:text-primary transition-colors">GITHUB</a>
                        <a href={CONFIG.socials.linkedin} className="hover:text-primary transition-colors">LINKEDIN</a>
                        <a href={CONFIG.socials.twitter} className="hover:text-primary transition-colors">TWITTER</a>
                    </div>

                    <div className="font-mono text-[10px] text-slate-600 uppercase text-right" suppressHydrationWarning>
                        LATENCY: {metrics.latency}ms | UPTIME: {formatUptime(metrics.uptime)} |{" "}
                        STATUS:{" "}
                        <span className={metrics.isOnline ? "text-emerald-500" : "text-red-400"}>
                            {metrics.isOnline ? "ACTIVE" : "OFFLINE"}
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
