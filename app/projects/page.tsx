"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { CONFIG } from "@/lib/config/site";
import { motion } from "framer-motion";
import { Github, ExternalLink, Box, Globe, Shield, Code } from "lucide-react";
import Link from "next/link";

export default function Projects() {
    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto space-y-12">
                <section className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-primary glow-border" />
                        <h1 className="text-3xl font-mono font-bold tracking-tight uppercase">System_Deployments</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CONFIG.projects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <TerminalCard title={`deployment_${project.id}`} className="h-full flex flex-col">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h2 className="text-xl font-bold tracking-tighter text-white group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-[8px] px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/5 font-mono uppercase">
                                                <Shield className="w-2.5 h-2.5" />
                                                {project.status}
                                            </div>
                                        </div>

                                        <div className="aspect-video bg-background border border-primary/10 rounded overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                                                <Code className="w-12 h-12 text-primary/20" />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                                            <div className="absolute bottom-2 left-2 flex gap-2">
                                                {project.tech.map((t, i) => (
                                                    <span key={i} className="text-[8px] bg-black/50 border border-white/10 px-1.5 py-0.5 rounded text-slate-400">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-primary/10 flex justify-between items-center">
                                        <Link
                                            href={project.repo}
                                            className="flex items-center gap-2 text-[10px] font-mono text-slate-500 hover:text-white transition-colors"
                                        >
                                            <Github className="w-3.5 h-3.5" /> REPOSITORY
                                        </Link>
                                        <Link
                                            href={project.live}
                                            className="flex items-center gap-2 text-[10px] font-mono text-primary hover:text-white transition-colors group"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" /> LIVE_DEPLOY
                                            <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                                        </Link>
                                    </div>
                                </TerminalCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center space-y-4">
                    <h2 className="text-xl font-mono font-bold uppercase tracking-widest text-primary">Need a custom system?</h2>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">
                        I am currently accepting new development protocols. Reach out to discuss your architectural requirements.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-primary px-8 py-3 rounded text-sm font-bold tracking-widest hover:bg-primary/80 transition-all hover:scale-105"
                        >
                            INITIALIZE_CONTACT
                        </Link>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
