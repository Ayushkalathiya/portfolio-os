"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "@/lib/config/site";
import { Terminal, Activity, Wifi, Cpu, Clock } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSystemMetrics, formatUptime } from "@/lib/hooks/useSystemMetrics";
import { useEasterEggs } from "@/lib/hooks/useEasterEggs";
import Image from "next/image";

export const Navbar = () => {
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const metrics = useSystemMetrics();
    const { handleSecretClick } = useEasterEggs();

    const navLinks = [
        { label: "dashboard", href: "/" },
        { label: "system_profile", href: "/about" },
        { label: "deployments", href: "/projects" },
        { label: "system_logs", href: "/experience" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-background/60 backdrop-blur-xl border-b border-primary/20 h-16 flex items-center px-6">
            <div className="flex items-center gap-2.5 mr-8">
                {/* Avatar — visible identity */}
                <button onClick={handleSecretClick} className="relative w-8 h-8 rounded-full border border-primary/40 overflow-hidden shrink-0 cursor-pointer">
                    <Image
                        src={CONFIG.avatar}
                        alt={CONFIG.name}
                        width={64}
                        height={64}
                        quality={100}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full border border-background" />
                </button>
                <span className="font-mono font-bold text-sm uppercase tracking-tighter hidden sm:inline">
                    {CONFIG.name.toLowerCase().replace(" ", ".")}
                </span>
            </div>

            <nav className="flex-1 flex gap-6 overflow-x-auto no-scrollbar">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`font-mono text-xs uppercase tracking-widest transition-colors relative py-2 whitespace-nowrap ${pathname === link.href
                            ? "text-primary"
                            : "text-slate-400 hover:text-primary"
                            }`}
                    >
                        {link.label}
                        {pathname === link.href && (
                            <motion.div
                                layoutId="nav-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-border"
                            />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="hidden lg:flex items-center gap-5 ml-8 font-mono text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5" title="JS Heap Memory Usage">
                    <Cpu className="w-3 h-3 text-primary animate-pulse" />
                    <span>SYS_LOAD: {metrics.memUsage}%</span>
                </div>
                <div className="flex items-center gap-1.5" title="Page load time">
                    <Wifi className="w-3 h-3 text-primary" />
                    <span>LATENCY: {metrics.latency}ms</span>
                </div>
                <div className="flex items-center gap-1.5" title="Session uptime">
                    <Clock className="w-3 h-3 text-primary" />
                    <span suppressHydrationWarning>UP: {formatUptime(metrics.uptime)}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Browser connectivity">
                    <Activity className="w-3 h-3 text-primary" />
                    <span className={metrics.isOnline ? "text-emerald-400" : "text-red-400"}>
                        {metrics.isOnline ? "ONLINE" : "OFFLINE"}
                    </span>
                </div>
                <Link
                    href="/contact"
                    className="bg-primary/10 hover:bg-primary/20 border border-primary/30 px-3 py-1.5 rounded text-primary transition-all hover:scale-105 active:scale-95"
                >
                    ACCESS_CHANNEL
                </Link>
            </div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left z-50 shadow-[0_0_8px_rgba(19,91,236,0.8)]"
                style={{ scaleX }}
            />
        </header>
    );
};
