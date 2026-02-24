"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { ContributionHeatmap } from "@/components/system-ui/ContributionHeatmap";
import { METRICS } from "@/lib/config/metrics";
import { CONFIG } from "@/lib/config/site";
import { useGitHubData, formatEventTime, getEventLevel } from "@/lib/hooks/useGitHubData";
import { motion } from "framer-motion";
import {
    Timer,
    Layers,
    Zap,
    GitBranch,
    Star,
    GitFork,
    TrendingUp,
    History,
    Users,
    Loader2,
    AlertTriangle,
} from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 },
    }),
};

export default function Experience() {
    const github = useGitHubData();

    // Build counter cards from real data
    const counters = [
        {
            label: "PUBLIC_REPOS",
            value: github.loading ? "—" : String(github.profile?.publicRepos || 0),
            icon: Layers,
            trend: "LIVE",
            sub: "GitHub",
        },
        {
            label: "TOTAL_STARS",
            value: github.loading ? "—" : String(github.totalStars),
            icon: Star,
            trend: "EARNED",
            sub: "All repos",
        },
        {
            label: "TOTAL_FORKS",
            value: github.loading ? "—" : String(github.totalForks),
            icon: GitFork,
            trend: "COMMUNITY",
            sub: "Open source",
        },
        {
            label: "FOLLOWERS",
            value: github.loading ? "—" : String(github.profile?.followers || 0),
            icon: Users,
            trend: "NETWORK",
            sub: "GitHub",
        },
    ];

    return (
        <PageLayout>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* ── Page Hero ── */}
                <section className="flex flex-wrap justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold">
                            {github.loading ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <span className="animate-pulse">●</span>
                            )}
                            {github.loading ? "FETCHING_GITHUB_DATA..." : "LIVE_SESSION_ACTIVE"}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-primary glow-border" />
                            <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tighter uppercase">
                                System_Logs
                            </h1>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xl">
                            Real-time GitHub analytics, contribution history, and operational logs — fetched live from the GitHub API.
                        </p>
                    </div>
                </section>

                {/* ── Error Banner ── */}
                {github.error && (
                    <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-5 py-3 font-mono text-xs text-amber-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{github.error} — Showing cached/fallback data.</span>
                    </div>
                )}

                {/* ── Counter Cards (REAL GITHUB DATA) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {counters.map((counter, idx) => {
                        const Icon = counter.icon;
                        return (
                            <motion.div
                                key={counter.label}
                                custom={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="group relative overflow-hidden rounded-xl p-6 bg-background-accent/60 border border-primary/15 hover:border-primary/40 transition-all"
                            >
                                <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Icon className="w-10 h-10" />
                                </div>
                                <p className="text-primary/70 text-[10px] font-bold font-mono tracking-widest mb-2">
                                    {counter.label}
                                </p>
                                <p className="text-white font-mono text-3xl md:text-4xl font-bold leading-tight">
                                    {counter.value}
                                </p>
                                <div className="flex items-center gap-1.5 mt-3 text-emerald-400 text-[10px] font-bold font-mono">
                                    <TrendingUp className="w-3 h-3" />
                                    {counter.trend}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Heatmap + Live Events ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Heatmap */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-8"
                    >
                        <TerminalCard title="contribution_heatmap">
                            <div className="p-2">
                                <ContributionHeatmap />
                            </div>
                        </TerminalCard>
                    </motion.div>

                    {/* Live GitHub Events Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-4"
                    >
                        <div className="terminal-window h-full flex flex-col max-h-[440px]">
                            <div className="terminal-header justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="w-3.5 h-3.5 text-primary" />
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                                        live_events
                                    </span>
                                </div>
                                <span className="text-[8px] font-mono text-primary/50">github.api</span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3">
                                {github.loading ? (
                                    <div className="flex items-center gap-2 text-slate-500 py-8 justify-center">
                                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                        <span>Fetching live feed...</span>
                                    </div>
                                ) : github.events.length === 0 ? (
                                    <div className="text-slate-600 text-center py-8">No recent events</div>
                                ) : (
                                    github.events.map((event, i) => {
                                        const { level, color } = getEventLevel(event.type);
                                        return (
                                            <div
                                                key={i}
                                                className="flex gap-3"
                                                style={{ opacity: Math.max(0.35, 1 - i * 0.07) }}
                                            >
                                                <span className="text-slate-600 min-w-[52px] shrink-0" suppressHydrationWarning>
                                                    {formatEventTime(event.createdAt)}
                                                </span>
                                                <span className={`${color} font-bold min-w-[42px] shrink-0`}>
                                                    [{level}]
                                                </span>
                                                <span className="text-slate-300 break-words">{event.message}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <div className="p-3 border-t border-primary/20 bg-primary/5">
                                <div className="flex items-center gap-2 font-mono text-[10px] text-primary/60">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                                    POLLING_GITHUB_API...
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Top Languages (REAL) ── */}
                {!github.loading && github.topLanguages.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <TerminalCard title="language_distribution">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
                                {github.topLanguages.map((lang, idx) => {
                                    const maxCount = github.topLanguages[0].count;
                                    const pct = Math.round((lang.count / maxCount) * 100);
                                    return (
                                        <div key={lang.name} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-mono text-white">{lang.name}</span>
                                                <span className="text-[10px] font-mono text-primary/60">
                                                    {lang.count} repo{lang.count !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.08 }}
                                                    className="h-full bg-primary rounded-full shadow-[0_0_6px_rgba(19,91,236,0.4)]"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </TerminalCard>
                    </motion.div>
                )}

                {/* ── Evolution Timeline ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <TerminalCard title="system_evolution_timeline">
                        <div className="p-4 md:p-6 relative overflow-x-auto">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                            <div className="relative min-w-[600px] pt-16 pb-4">
                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 -translate-y-1/2" />
                                <div className="flex justify-between items-center px-2">
                                    {METRICS.timeline.map((milestone, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-3 relative">
                                            <div
                                                className={`rounded-full border-4 border-background-accent z-10 ${milestone.active
                                                    ? "w-5 h-5 bg-primary animate-pulse"
                                                    : milestone.type === "MILESTONE"
                                                        ? "w-3.5 h-3.5 bg-primary"
                                                        : "w-3.5 h-3.5 bg-primary/40"
                                                    }`}
                                            />
                                            <div className="absolute -top-14 whitespace-nowrap text-center">
                                                <span
                                                    className={`inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${milestone.active
                                                        ? "bg-primary text-white"
                                                        : milestone.type === "MILESTONE"
                                                            ? "bg-primary/10 border border-primary/30 text-primary"
                                                            : "bg-white/5 border border-white/10 text-slate-500"
                                                        }`}
                                                >
                                                    [{milestone.type}]
                                                </span>
                                                <p className="text-white text-[10px] font-bold font-mono mt-1">
                                                    {milestone.label}
                                                </p>
                                            </div>
                                            <p
                                                className={`text-[10px] font-mono ${milestone.active ? "text-primary font-bold" : "text-slate-500"
                                                    }`}
                                            >
                                                {milestone.period}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TerminalCard>
                </motion.div>

                {/* ── Work Experience Logs ── */}
                <section className="space-y-6">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] pl-1">
                        Operational History
                    </div>
                    <TerminalCard title="archive_query_results">
                        <div className="space-y-10 p-2 md:p-4">
                            {CONFIG.experience.map((exp) => (
                                <div key={exp.id} className="relative pl-8 border-l border-primary/20 space-y-4">
                                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary/20 border border-primary animate-pulse" />
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                        <div>
                                            <h2 className="text-lg font-bold text-primary font-mono uppercase tracking-tight">
                                                {exp.role}
                                            </h2>
                                            <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                                                {exp.company}
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
                                            PERIOD: {exp.period}
                                        </div>
                                    </div>
                                    <div className="space-y-2.5 pt-1">
                                        {exp.logs.map((log, i) => (
                                            <div key={i} className="flex gap-3 text-xs font-mono leading-relaxed group">
                                                <span className="text-slate-700 min-w-[15px]">[{i + 1}]</span>
                                                <span className="text-slate-500 opacity-50">INFO:</span>
                                                <span className="text-slate-300 group-hover:text-primary transition-colors">
                                                    {log}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-6 border-t border-primary/10 text-center">
                                <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest animate-pulse">
                                    Listening for new events...
                                </span>
                            </div>
                        </div>
                    </TerminalCard>
                </section>

                {/* ── Health Bars ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {METRICS.healthBars.map((bar, idx) => (
                        <motion.div
                            key={bar.label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="bg-background-accent/60 border border-primary/15 rounded-xl p-5"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold font-mono text-primary/60 uppercase tracking-widest">
                                    {bar.label}
                                </span>
                                <span className="text-[10px] font-bold font-mono text-emerald-400">
                                    {bar.display}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${bar.value}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                    className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(19,91,236,0.5)]"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </PageLayout>
    );
}
