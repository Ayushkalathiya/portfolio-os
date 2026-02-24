// Consistency metrics data
export const METRICS = {
    counters: [
        { label: "DEEP_WORK_HOURS", value: "2,450", icon: "timer", trend: "+12.4%", up: true },
        { label: "SYSTEMS_DESIGNED", value: "12", icon: "architecture", trend: "+2 UNITS", up: true },
        { label: "UPTIME_PERCENT", value: "99.98%", icon: "bolt", trend: "NOMINAL", up: true },
        { label: "CODE_PUSHES", value: "1,842", icon: "terminal", trend: "+5.2%", up: true },
    ],
    kernelLogs: [
        { time: "14:22:01", level: "INFO", color: "text-emerald-500", message: "Initialized AI Visual Search cluster..." },
        { time: "13:45:12", level: "BUILD", color: "text-primary", message: "Successfully deployed v2.0-core..." },
        { time: "11:10:05", level: "WARN", color: "text-amber-500", message: "Latency spike detected in API_GATEWAY" },
        { time: "09:04:33", level: "INFO", color: "text-emerald-500", message: "Backups verified and encrypted." },
        { time: "Yesterday", level: "MERGE", color: "text-primary", message: "Merged PR #442: Redis Optimization" },
        { time: "Yesterday", level: "INFO", color: "text-emerald-500", message: "Scaling group up: +4 nodes" },
        { time: "Yesterday", level: "INFO", color: "text-emerald-500", message: "Systems healthy." },
    ],
    timeline: [
        { label: "GENESIS_OS", period: "Q1_2022", type: "MILESTONE", active: false },
        { label: "FIRST_DEPLOY", period: "Q3_2022", type: "DEPLOY", active: false },
        { label: "SCALABILITY_V2", period: "Q2_2023", type: "MILESTONE", active: false },
        { label: "NEURAL_NET_API", period: "Q4_2023", type: "RESEARCH", active: false },
        { label: "SYSTEMS_ARCHITECT_v4", period: "CURRENT", type: "ACTIVE", active: true },
    ],
    healthBars: [
        { label: "System Integrity", value: 98, display: "98%" },
        { label: "Backend Response", value: 85, display: "12ms" },
        { label: "Cluster Efficiency", value: 92, display: "OPTIMAL" },
    ],
};
