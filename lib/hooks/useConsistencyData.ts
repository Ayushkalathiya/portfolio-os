"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

const GITHUB_USERNAME = "Ayushkalathiya";
const API_BASE = "https://github-contributions-api.jogruber.de/v4";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

export interface ConsistencyStats {
    currentStreak: number;
    longestStreak: number;
    totalActiveDays: number;
    totalContributions: number;
    totalDays: number;
    consistencyPercent: number;
    grade: string;
    gradeColor: string;
    weeklyAvg: number[];          // Sun=0 .. Sat=6
    weeklyLabels: string[];
    monthlyData: { month: string; count: number }[];
    streakCalendar: ContributionDay[];
    bestDay: { date: string; count: number } | null;
    bestWeekday: string;
    loading: boolean;
    error: string | null;
    year: number;
}

function computeGrade(pct: number): { grade: string; color: string } {
    if (pct >= 90) return { grade: "S+", color: "text-yellow-300" };
    if (pct >= 80) return { grade: "A+", color: "text-emerald-400" };
    if (pct >= 70) return { grade: "A", color: "text-emerald-400" };
    if (pct >= 60) return { grade: "B+", color: "text-primary" };
    if (pct >= 50) return { grade: "B", color: "text-primary" };
    if (pct >= 40) return { grade: "C+", color: "text-amber-400" };
    if (pct >= 30) return { grade: "C", color: "text-amber-400" };
    if (pct >= 20) return { grade: "D", color: "text-orange-400" };
    return { grade: "F", color: "text-red-400" };
}

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function useConsistencyData(initialYear?: number): [ConsistencyStats, (yr: number) => void] {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(initialYear || currentYear);
    const [contributions, setContributions] = useState<ContributionDay[]>([]);
    const [totalFromApi, setTotalFromApi] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (yr: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/${GITHUB_USERNAME}?y=${yr}`);
            if (!res.ok) throw new Error("Failed to fetch data");
            const json = await res.json();
            setContributions(json.contributions || []);
            setTotalFromApi(json.total?.[String(yr)] ?? 0);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(year);
    }, [year, fetchData]);

    const stats = useMemo<ConsistencyStats>(() => {
        if (loading || contributions.length === 0) {
            return {
                currentStreak: 0, longestStreak: 0, totalActiveDays: 0,
                totalContributions: 0, totalDays: 0, consistencyPercent: 0,
                grade: "—", gradeColor: "text-slate-500", weeklyAvg: new Array(7).fill(0),
                weeklyLabels: WEEKDAY_NAMES, monthlyData: [], streakCalendar: contributions,
                bestDay: null, bestWeekday: "—", loading, error, year,
            };
        }

        // Only count up to today (not future days)
        const today = new Date().toISOString().slice(0, 10);
        const relevantDays = contributions.filter((d) => d.date <= today);
        const totalDays = relevantDays.length;
        const activeDays = relevantDays.filter((d) => d.count > 0).length;
        const totalContributions = relevantDays.reduce((s, d) => s + d.count, 0);

        // Current streak (count backwards from today)
        let currentStreak = 0;
        for (let i = relevantDays.length - 1; i >= 0; i--) {
            if (relevantDays[i].count > 0) currentStreak++;
            else break;
        }
        // If today has 0 contributions, check if yesterday started a streak
        if (relevantDays.length > 0 && relevantDays[relevantDays.length - 1].count === 0) {
            currentStreak = 0;
            for (let i = relevantDays.length - 2; i >= 0; i--) {
                if (relevantDays[i].count > 0) currentStreak++;
                else break;
            }
        }

        // Longest streak
        let longestStreak = 0;
        let streak = 0;
        for (const day of relevantDays) {
            if (day.count > 0) streak++;
            else {
                if (streak > longestStreak) longestStreak = streak;
                streak = 0;
            }
        }
        if (streak > longestStreak) longestStreak = streak;

        // Consistency %
        const consistencyPercent = totalDays > 0 ? Math.round((activeDays / totalDays) * 100) : 0;
        const { grade, color: gradeColor } = computeGrade(consistencyPercent);

        // Weekly averages (per day of week)
        const weekCounts = new Array(7).fill(0);
        const weekTotals = new Array(7).fill(0);
        for (const day of relevantDays) {
            const dow = new Date(day.date).getDay();
            weekCounts[dow]++;
            weekTotals[dow] += day.count;
        }
        const weeklyAvg = weekCounts.map((c, i) => (c > 0 ? +(weekTotals[i] / c).toFixed(1) : 0));

        // Best weekday
        let bestDowIdx = 0;
        for (let i = 1; i < 7; i++) {
            if (weeklyAvg[i] > weeklyAvg[bestDowIdx]) bestDowIdx = i;
        }
        const bestWeekday = WEEKDAY_NAMES[bestDowIdx];

        // Monthly data
        const monthMap: Record<number, number> = {};
        for (const day of relevantDays) {
            const m = new Date(day.date).getMonth();
            monthMap[m] = (monthMap[m] || 0) + day.count;
        }
        const monthlyData = MONTH_NAMES.map((name, i) => ({
            month: name,
            count: monthMap[i] || 0,
        }));

        // Best day
        let bestDay: { date: string; count: number } | null = null;
        for (const day of relevantDays) {
            if (!bestDay || day.count > bestDay.count) {
                bestDay = { date: day.date, count: day.count };
            }
        }

        return {
            currentStreak, longestStreak, totalActiveDays: activeDays,
            totalContributions, totalDays, consistencyPercent,
            grade, gradeColor, weeklyAvg, weeklyLabels: WEEKDAY_NAMES,
            monthlyData, streakCalendar: contributions,
            bestDay, bestWeekday, loading, error, year,
        };
    }, [contributions, loading, error, year]);

    return [stats, setYear];
}
