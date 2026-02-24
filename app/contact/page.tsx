"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { CONFIG } from "@/lib/config/site";
import { motion } from "framer-motion";
import {
    Mail,
    Github,
    Linkedin,
    Twitter,
    ArrowUpRight,
    Copy,
    Check,
    Terminal,
    Globe,
    Shield,
} from "lucide-react";
import { useState } from "react";

const channels = [
    {
        icon: Mail,
        label: "Email",
        handle: CONFIG.email,
        href: `mailto:${CONFIG.email}?subject=Hey%20Ayush%20—%20Let's%20Connect`,
        description: "Direct encrypted channel. Opens your default mail client.",
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        primary: true,
    },
    {
        icon: Github,
        label: "GitHub",
        handle: "@ayushkalathiya",
        href: CONFIG.socials.github,
        description: "Source code repositories and open-source contributions.",
        color: "text-slate-300",
        bgColor: "bg-white/5",
        borderColor: "border-white/10",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        handle: "in/ayushkalathiya",
        href: CONFIG.socials.linkedin,
        description: "Professional network and career history.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
    },
    {
        icon: Twitter,
        label: "Twitter / X",
        handle: "@ayush_k",
        href: CONFIG.socials.twitter,
        description: "Thoughts on systems, architecture, and dev culture.",
        color: "text-sky-400",
        bgColor: "bg-sky-500/10",
        borderColor: "border-sky-500/20",
    },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(CONFIG.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Page Header */}
                <section className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary glow-border" />
                        <h1 className="text-3xl font-mono font-bold tracking-tight uppercase">
                            Access_Channel
                        </h1>
                    </div>
                    <p className="text-sm text-slate-400 font-mono max-w-xl">
                        {">"} Select a communication protocol below to establish a secure connection.
                        All channels are monitored and responses are guaranteed.
                    </p>
                </section>

                {/* Email — Primary CTA */}
                <motion.a
                    href={`mailto:${CONFIG.email}?subject=Hey%20Ayush%20—%20Let's%20Connect`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block group"
                >
                    <div className="terminal-window p-0 overflow-hidden hover:border-primary/40 transition-all">
                        <div className="terminal-header">
                            <div className="flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                                    primary_channel — smtp
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 animate-pulse" />
                                <span className="text-[8px] font-mono text-emerald-400 uppercase">ACTIVE</span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold font-mono tracking-tight text-white group-hover:text-primary transition-colors">
                                        {CONFIG.email}
                                    </h2>
                                    <p className="text-xs text-slate-500 font-mono">
                                        Click to open your mail client with a pre-filled subject line.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        copyEmail();
                                    }}
                                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded text-[10px] font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-all"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                                            <span className="text-emerald-400">COPIED</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            COPY
                                        </>
                                    )}
                                </button>
                                <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2.5 rounded text-[10px] font-mono uppercase tracking-widest text-primary group-hover:bg-primary/20 transition-all">
                                    SEND_MAIL
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.a>

                {/* Other Channels */}
                <section className="space-y-4">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] pl-1">
                        Alternative Frequencies
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {channels.slice(1).map((channel, idx) => (
                            <motion.a
                                key={channel.label}
                                href={channel.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (idx + 1), duration: 0.4 }}
                                className="group"
                            >
                                <TerminalCard title={channel.label.toLowerCase()} className="h-full hover:border-primary/30 transition-all">
                                    <div className="flex flex-col gap-4">
                                        <div className={`w-10 h-10 rounded ${channel.bgColor} border ${channel.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <channel.icon className={`w-5 h-5 ${channel.color}`} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                                                    {channel.label}
                                                </span>
                                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                            </div>
                                            <p className="text-[10px] font-mono text-primary/70">{channel.handle}</p>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed">
                                            {channel.description}
                                        </p>
                                    </div>
                                </TerminalCard>
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* Comms Status */}
                <TerminalCard title="connection_metadata">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, label: "Encryption", val: "AES-256-GCM" },
                            { icon: Globe, label: "Location", val: CONFIG.location },
                            { icon: Terminal, label: "Response", val: "< 24 HRS" },
                            { icon: Mail, label: "Protocol", val: "SMTP / HTTPS" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-[8px] text-slate-600 uppercase tracking-widest">
                                        {item.label}
                                    </div>
                                    <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                                        {item.val}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TerminalCard>
            </div>
        </PageLayout>
    );
}
