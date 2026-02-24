"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, ChevronDown } from "lucide-react";

const GITHUB_USERNAME = "Ayushkalathiya";
const API_BASE = "https://github-contributions-api.jogruber.de/v4";

interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

interface ContributionData {
    total: Record<string, number>;
    contributions: ContributionDay[];
}

// GitHub account created Dec 2022 → available years
const currentYear = new Date().getFullYear();
const AVAILABLE_YEARS = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => currentYear - i
);

const LEVEL_COLORS = [
    "bg-primary/5",     // level 0  (no contributions)
    "bg-primary/25",    // level 1
    "bg-primary/50",    // level 2
    "bg-primary/75",    // level 3
    "bg-primary",       // level 4
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export const ContributionHeatmap = () => {
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hoveredCell, setHoveredCell] = useState<ContributionDay | null>(null);

    const fetchData = useCallback(async (yr: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/${GITHUB_USERNAME}?y=${yr}`);
            if (!res.ok) throw new Error("Failed to fetch contribution data");
            const json: ContributionData = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message || "Fetch failed");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(year);
    }, [year, fetchData]);

    // Organize contributions into weeks (columns) × days (rows)
    const weeks: (ContributionDay | null)[][] = [];
    if (data?.contributions) {
        let currentWeek: (ContributionDay | null)[] = [];

        // Pad the first week with nulls if it doesn't start on Sunday
        const firstDay = new Date(data.contributions[0]?.date);
        const startDow = firstDay.getDay(); // 0=Sun
        for (let i = 0; i < startDow; i++) {
            currentWeek.push(null);
        }

        for (const day of data.contributions) {
            currentWeek.push(day);
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }
    }

    const totalContributions = data?.total?.[String(year)] ?? 0;

    // Calculate month label positions
    const monthLabels: { label: string; weekIdx: number }[] = [];
    if (data?.contributions) {
        let lastMonth = -1;
        let dayIndex = 0;
        const firstDow = new Date(data.contributions[0]?.date).getDay();

        for (const day of data.contributions) {
            const month = new Date(day.date).getMonth();
            if (month !== lastMonth) {
                const weekIdx = Math.floor((dayIndex + firstDow) / 7);
                monthLabels.push({
                    label: new Date(day.date).toLocaleString("en", { month: "short" }),
                    weekIdx,
                });
                lastMonth = month;
            }
            dayIndex++;
        }
    }

    return (
        <div>
            {/* Header: total + year selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-white font-bold">
                        {loading ? "—" : totalContributions.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                        contributions in {year}
                    </span>
                </div>

                {/* Year Selector */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-3 py-1.5 rounded text-xs font-mono text-primary transition-all"
                    >
                        {year}
                        <ChevronDown className="w-3 h-3" />
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 top-full mt-1 bg-background-accent border border-primary/20 rounded-lg overflow-hidden z-30 shadow-xl shadow-black/40">
                            {AVAILABLE_YEARS.map((yr) => (
                                <button
                                    key={yr}
                                    onClick={() => {
                                        setYear(yr);
                                        setShowDropdown(false);
                                    }}
                                    className={`block w-full text-left px-4 py-2 text-xs font-mono transition-colors ${yr === year
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
            </div>

            {/* Loading / Error states */}
            {loading && (
                <div className="flex items-center justify-center gap-2 py-16 text-slate-500 font-mono text-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Fetching contribution data...
                </div>
            )}

            {error && !loading && (
                <div className="text-center py-16 text-amber-400 font-mono text-xs">
                    [ERROR] {error}
                </div>
            )}

            {/* Heatmap Grid */}
            {!loading && !error && data && (
                <div className="relative">
                    {/* Tooltip */}
                    {hoveredCell && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background-accent border border-primary/30 px-3 py-1.5 rounded text-[10px] font-mono text-white z-20 whitespace-nowrap shadow-lg">
                            {hoveredCell.count} contribution{hoveredCell.count !== 1 ? "s" : ""} on{" "}
                            {new Date(hoveredCell.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    )}

                    <div className="overflow-x-auto pb-2">
                        <div className="flex gap-0 min-w-[700px]">
                            {/* Day labels */}
                            <div className="flex flex-col gap-[3px] mr-2 pt-5">
                                {DAY_LABELS.map((label, i) => (
                                    <div
                                        key={i}
                                        className="h-[11px] text-[9px] font-mono text-slate-600 leading-[11px]"
                                    >
                                        {label}
                                    </div>
                                ))}
                            </div>

                            {/* Weeks */}
                            <div className="flex-1">
                                {/* Month labels */}
                                <div className="flex h-5 mb-0.5 relative">
                                    {monthLabels.map((m, i) => {
                                        const leftPct = (m.weekIdx / Math.max(weeks.length, 1)) * 100;
                                        return (
                                            <span
                                                key={`${m.label}-${i}`}
                                                className="absolute text-[9px] font-mono text-slate-500"
                                                style={{ left: `${leftPct}%` }}
                                            >
                                                {m.label}
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Grid */}
                                <div className="flex gap-[3px]">
                                    {weeks.map((week, wi) => (
                                        <div key={wi} className="flex flex-col gap-[3px]">
                                            {Array.from({ length: 7 }, (_, di) => {
                                                const day = week[di] ?? null;
                                                if (!day) {
                                                    return <div key={di} className="w-[11px] h-[11px]" />;
                                                }
                                                return (
                                                    <div
                                                        key={di}
                                                        className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[day.level] || LEVEL_COLORS[0]
                                                            } hover:ring-1 hover:ring-primary/70 transition-all cursor-crosshair`}
                                                        onMouseEnter={() => setHoveredCell(day)}
                                                        onMouseLeave={() => setHoveredCell(null)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-end items-center gap-1.5 mt-3">
                        <span className="text-[8px] font-mono text-slate-600 mr-1">LESS</span>
                        {LEVEL_COLORS.map((color, i) => (
                            <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
                        ))}
                        <span className="text-[8px] font-mono text-slate-600 ml-1">MORE</span>
                    </div>
                </div>
            )}
        </div>
    );
};
