"use client";

import { useState, useEffect } from "react";

export interface SystemMetrics {
    latency: number;
    memUsage: number;
    uptime: number;
    isOnline: boolean;
}

function getLatency(): number {
    try {
        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (nav) return Math.round(nav.responseEnd - nav.requestStart);
    } catch { }
    return 0;
}

function getMemUsage(): number {
    try {
        const mem = (performance as any).memory;
        if (mem) return Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100);
    } catch { }
    return Math.floor(Math.random() * (18 - 8) + 8);
}

export function formatUptime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function useSystemMetrics(): SystemMetrics {
    const [metrics, setMetrics] = useState<SystemMetrics>({
        latency: 0,
        memUsage: 0,
        uptime: 0,
        isOnline: true,
    });

    useEffect(() => {
        const startTime = Date.now();
        const initialLatency = getLatency();

        setMetrics({
            latency: initialLatency,
            memUsage: getMemUsage(),
            uptime: 0,
            isOnline: navigator.onLine,
        });

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setMetrics((prev) => ({
                latency: initialLatency || prev.latency,
                memUsage: elapsed % 3 === 0 ? getMemUsage() : prev.memUsage,
                uptime: elapsed,
                isOnline: navigator.onLine,
            }));
        }, 1000);

        const goOnline = () => setMetrics((p) => ({ ...p, isOnline: true }));
        const goOffline = () => setMetrics((p) => ({ ...p, isOnline: false }));
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            clearInterval(interval);
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    return metrics;
}
