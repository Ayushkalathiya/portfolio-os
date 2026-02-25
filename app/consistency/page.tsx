"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { ContributionHeatmap } from "@/components/system-ui/ContributionHeatmap";
import { useConsistencyData } from "@/lib/hooks/useConsistencyData";
import { motion } from "framer-motion";
import {
    Flame,
    Trophy,
    CalendarCheck,
    Target,
    TrendingUp,
    Zap,
    Calendar,
    ChevronDown,
    Loader2,
    AlertTriangle,
    BarChart3,
    Clock,
    Star,
} from "lucide-react";
import { useState } from "react";

const currentYear = new Date().getFullYear();
const AVAILABLE_YEARS = Array.from({ length: currentYear - 2022 + 1 }, (_, i) => currentYear - i);

const fadeUp = (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } },
});

export default function ConsistencyPage() {
    const [stats, setYear] = useConsistencyData();
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    const statCards = [
        {
            icon: Flame,
            label: "CURRENT_STREAK",
            value: `${stats.currentStreak}`,
            unit: "days",
            color: stats.currentStreak > 0 ? "text-orange-400" : "text-slate-500",
            glow: stats.currentStreak >= 7,
        },
        {
            icon: Trophy,
            label: "LONGEST_STREAK",
            value: `${stats.longestStreak}`,
            unit: "days",
            color: "text-yellow-400",
            glow: false,
        },
        {
            icon: CalendarCheck,
            label: "ACTIVE_DAYS",
            value: `${stats.totalActiveDays}`,
            unit: `/ ${stats.totalDays}`,
            color: "text-emerald-400",
            glow: false,
        },
        {
            icon: Target,
            label: "CONSISTENCY",
            value: `${stats.consistencyPercent}%`,
            unit: "",
            color: stats.gradeColor,
            glow: stats.consistencyPercent >= 70,
        },
    ];

    const maxWeekly = Math.max(...stats.weeklyAvg, 1);
    const maxMonthly = Math.max(...stats.monthlyData.map((m) => m.count), 1);

    return (
        <PageLayout>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* ── Hero ── */}
                <section className="flex flex-wrap justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold">
                            {stats.loading ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <span className="animate-pulse">●</span>
                            )}
                            {stats.loading ? "COMPUTING_METRICS..." : "ANALYSIS_COMPLETE"}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-primary glow-border" />
                            <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tighter uppercase">
                                Consistency_Tracker
                            </h1>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xl">
                            Daily coding discipline metrics, streak analytics, and weekly pattern analysis — all computed from real GitHub data.
                        </p>
                    </div>

                    {/* Year Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setShowYearDropdown(!showYearDropdown)}
                            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-5 py-2.5 rounded-lg text-sm font-mono font-bold text-primary transition-all"
                        >
                            <Calendar className="w-4 h-4" />
                            {stats.year}
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        {showYearDropdown && (
                            <div className="absolute right-0 top-full mt-1 bg-background-accent border border-primary/20 rounded-lg overflow-hidden z-30 shadow-xl shadow-black/40 min-w-[100px]">
                                {AVAILABLE_YEARS.map((yr) => (
                                    <button
                                        key={yr}
                                        onClick={() => { setYear(yr); setShowYearDropdown(false); }}
                                        className={`block w-full text-left px-4 py-2.5 text-xs font-mono transition-colors ${yr === stats.year
                                                ? "bg-primary text-white font-bold"
                                                : "text-slate-400 hover:bg-primary/10 hover:text-primary"
                                            }`}
                                    >
                                        {yr}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Error ── */}
                {stats.error && (
                    <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-5 py-3 font-mono text-xs text-amber-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{stats.error}</span>
                    </div>
                )}

                {/* ── Grade + Streak Cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Consistency Grade */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4"
                    >
                        <div className="terminal-window h-full flex flex-col items-center justify-center p-8 text-center">
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">
                                Consistency Grade
                            </p>
                            <div className={`text-8xl md:text-9xl font-mono font-black ${stats.gradeColor} leading-none`}>
                                {stats.loading ? "—" : stats.grade}
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-32 h-2 bg-primary/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.consistencyPercent}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                        className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(19,91,236,0.5)]"
                                    />
                                </div>
                                <span className="text-xs font-mono text-slate-400">{stats.consistencyPercent}%</span>
                            </div>
                            <p className="text-[10px] font-mono text-slate-600 mt-3">
                                {stats.totalActiveDays} active / {stats.totalDays} total days
                            </p>
                        </div>
                    </motion.div>

                    {/* Stat Cards */}
                    <div className="lg:col-span-8 grid grid-cols-2 gap-6">
                        {statCards.map((card, idx) => (
                            <motion.div
                                key={card.label}
                                variants={fadeUp(idx)}
                                initial="hidden"
                                animate="visible"
                                className={`group relative overflow-hidden rounded-xl p-6 bg-background-accent/60 border border-primary/15 hover:border-primary/40 transition-all ${card.glow ? "shadow-[0_0_20px_rgba(19,91,236,0.15)]" : ""
                                    }`}
                            >
                                <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <card.icon className="w-10 h-10" />
                                </div>
                                <p className="text-primary/70 text-[10px] font-bold font-mono tracking-widest mb-3">
                                    {card.label}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`font-mono text-3xl md:text-4xl font-bold ${card.color}`}>
                                        {stats.loading ? "—" : card.value}
                                    </span>
                                    {card.unit && (
                                        <span className="text-xs font-mono text-slate-500">{card.unit}</span>
                                    )}
                                </div>
                                {card.label === "CURRENT_STREAK" && stats.currentStreak >= 7 && (
                                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-orange-400">
                                        <Flame className="w-3 h-3" /> ON FIRE!
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Weekly Activity Pattern ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <TerminalCard title="weekly_activity_pattern">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                    <BarChart3 className="w-3.5 h-3.5 text-primary" />
                                    AVG CONTRIBUTIONS PER DAY OF WEEK
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-primary/60">
                                    <Star className="w-3 h-3" />
                                    Best: {stats.bestWeekday}
                                </div>
                            </div>

                            <div className="flex items-end justify-between gap-3 h-40 px-2">
                                {stats.weeklyLabels.map((day, i) => {
                                    const height = maxWeekly > 0 ? (stats.weeklyAvg[i] / maxWeekly) * 100 : 0;
                                    const isBest = stats.weeklyAvg[i] === Math.max(...stats.weeklyAvg) && stats.weeklyAvg[i] > 0;
                                    return (
                                        <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                            <span className="text-[10px] font-mono text-slate-400">
                                                {stats.loading ? "—" : stats.weeklyAvg[i]}
                                            </span>
                                            <div className="w-full relative" style={{ height: "100px" }}>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${height}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                                                    className={`absolute bottom-0 w-full rounded-t ${isBest
                                                            ? "bg-primary shadow-[0_0_12px_rgba(19,91,236,0.5)]"
                                                            : "bg-primary/40"
                                                        }`}
                                                />
                                            </div>
                                            <span className={`text-[10px] font-mono ${isBest ? "text-primary font-bold" : "text-slate-500"}`}>
                                                {day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </TerminalCard>
                </motion.div>

                {/* ── Monthly Breakdown ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <TerminalCard title="monthly_breakdown">
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
                                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                CONTRIBUTIONS PER MONTH — {stats.year}
                            </div>

                            <div className="space-y-3">
                                {stats.monthlyData.map((month, i) => {
                                    const pct = maxMonthly > 0 ? (month.count / maxMonthly) * 100 : 0;
                                    return (
                                        <div key={month.month} className="flex items-center gap-4">
                                            <span className="text-[10px] font-mono text-slate-500 w-8 text-right">
                                                {month.month}
                                            </span>
                                            <div className="flex-1 h-3 bg-primary/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: i * 0.04, ease: "easeOut" }}
                                                    className={`h-full rounded-full ${month.count > 0 ? "bg-primary/70" : ""
                                                        }`}
                                                />
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-400 w-10 text-right">
                                                {stats.loading ? "—" : month.count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </TerminalCard>
                </motion.div>

                {/* ── Contribution Heatmap ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <TerminalCard title="daily_heatmap">
                        <div className="p-2">
                            <ContributionHeatmap />
                        </div>
                    </TerminalCard>
                </motion.div>

                {/* ── Highlights ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Best Day */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0, duration: 0.4 }}
                        className="bg-background-accent/60 border border-primary/15 rounded-xl p-6 text-center"
                    >
                        <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-3" />
                        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-2">
                            Most Productive Day
                        </p>
                        <p className="text-2xl font-mono font-bold text-white">
                            {stats.bestDay ? stats.bestDay.count : "—"}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 mt-1">
                            {stats.bestDay
                                ? new Date(stats.bestDay.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                : "—"}
                        </p>
                    </motion.div>

                    {/* Total Contributions */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="bg-background-accent/60 border border-primary/15 rounded-xl p-6 text-center"
                    >
                        <TrendingUp className="w-6 h-6 text-primary mx-auto mb-3" />
                        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-2">
                            Total Contributions
                        </p>
                        <p className="text-2xl font-mono font-bold text-white">
                            {stats.loading ? "—" : stats.totalContributions.toLocaleString()}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 mt-1">in {stats.year}</p>
                    </motion.div>

                    {/* Best Weekday */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="bg-background-accent/60 border border-primary/15 rounded-xl p-6 text-center"
                    >
                        <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
                        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest mb-2">
                            Strongest Day
                        </p>
                        <p className="text-2xl font-mono font-bold text-white">
                            {stats.bestWeekday}
                        </p>
                        <p className="text-[10px] font-mono text-slate-500 mt-1">
                            avg {Math.max(...stats.weeklyAvg).toFixed(1)} contributions
                        </p>
                    </motion.div>
                </div>

                {/* ── Motivational Footer ── */}
                <div className="text-center py-6">
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em]">
                        {stats.currentStreak > 0
                            ? `🔥 ${stats.currentStreak}-day streak active — keep pushing!`
                            : "Start a new streak today — every commit counts!"}
                    </p>
                </div>

            </div>
        </PageLayout>
    );
}
