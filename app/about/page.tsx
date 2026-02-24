"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { Typewriter } from "@/components/terminal/Typewriter";
import { CONFIG } from "@/lib/config/site";
import { motion } from "framer-motion";
import { Database, Layout, Layers, Box, Cpu, HardDrive } from "lucide-react";

export default function About() {
    return (
        <PageLayout>
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Profile Header */}
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary glow-border" />
                        <h1 className="text-3xl font-mono font-bold tracking-tight uppercase">System_Profile</h1>
                    </div>
                    <TerminalCard title="profile_metadata">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                            <div className="space-y-4">
                                <div className="aspect-square bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Cpu className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                                    <div className="absolute bottom-2 left-2 flex gap-1">
                                        <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                                        <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-75" />
                                        <div className="w-1 h-1 bg-primary rounded-full animate-pulse delay-150" />
                                    </div>
                                </div>
                                <div className="font-mono text-[10px] text-slate-500 space-y-1">
                                    <div>ID: ARCH_AK_01</div>
                                    <div>LEVEL: SENIOR_ARCHITECT</div>
                                    <div suppressHydrationWarning>LAST_SYNC: {new Date().toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <div>
                                    <h2 className="text-primary font-mono text-sm uppercase mb-2">Identification_Summary</h2>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Ayush Kalathiya is a high-performance developer entity specialized in building scalable, secure, and visually immersive systems. With a core focus on the Next.js ecosystem and high-redundancy architecture, I deliver full-stack solutions that operate at the edge of modern technology.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-primary/5 border border-primary/10 p-3 rounded">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Architecture</div>
                                        <div className="text-xs text-white">Event-Driven / Microservices</div>
                                    </div>
                                    <div className="bg-primary/5 border border-primary/10 p-3 rounded">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Optimization</div>
                                        <div className="text-xs text-white">Performance / SEO / UX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TerminalCard>
                </section>

                {/* Experience Timeline */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary glow-border" />
                        <h2 className="text-xl font-mono font-bold tracking-tight uppercase">Operational_History</h2>
                    </div>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-px before:bg-primary/20">
                        {CONFIG.experience.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="pl-12 relative"
                            >
                                <div className="absolute left-[11px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(19,91,236,0.6)]" />
                                <TerminalCard title={`log_${exp.id}_${exp.company.toLowerCase()}`}>
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                                        <div>
                                            <h3 className="text-primary font-bold">{exp.role}</h3>
                                            <span className="text-xs text-slate-500 font-mono">{exp.company}</span>
                                        </div>
                                        <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {exp.logs.map((log, i) => (
                                            <div key={i} className="flex gap-2 text-xs text-slate-400">
                                                <span className="text-primary opacity-50 font-mono">[{i + 1}]</span>
                                                <span>{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TerminalCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack Matrix */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary glow-border" />
                        <h2 className="text-xl font-mono font-bold tracking-tight uppercase">Tech_Stack Matrix</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CONFIG.skills.map((skillGroup, idx) => (
                            <TerminalCard key={idx} title={skillGroup.category.toLowerCase()}>
                                <div className="grid grid-cols-2 gap-4">
                                    {skillGroup.items.map((skill, i) => (
                                        <div key={i} className="flex items-center gap-2 group cursor-default">
                                            <div className="w-1.5 h-1.5 bg-primary/40 group-hover:bg-primary transition-colors" />
                                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors uppercase font-mono tracking-wider">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </TerminalCard>
                        ))}
                    </div>
                </section>

            </div>
        </PageLayout>
    );
}
