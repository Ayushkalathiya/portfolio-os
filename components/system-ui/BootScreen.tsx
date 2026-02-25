"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
    { text: "BIOS v4.2.0 — Initializing hardware...", delay: 0 },
    { text: "CPU: Ayush_Kalathiya_Core™ @ 3.8GHz .............. [OK]", delay: 200 },
    { text: "RAM: 16GB Creative_Memory DDR5 ................... [OK]", delay: 400 },
    { text: "GPU: Imagination_RTX_4090 ........................ [OK]", delay: 550 },
    { text: "DISK: 2TB Experience_SSD NVMe .................... [OK]", delay: 700 },
    { text: "NET: Full_Stack_Interface eth0 ................... [LINK UP]", delay: 850 },
    { text: "Loading kernel modules...", delay: 1050 },
    { text: "  → react.ko .................................... [LOADED]", delay: 1150 },
    { text: "  → nextjs.ko ................................... [LOADED]", delay: 1250 },
    { text: "  → typescript.ko ............................... [LOADED]", delay: 1350 },
    { text: "  → creativity.ko ............................... [LOADED]", delay: 1450 },
    { text: "Mounting filesystems.............................. [DONE]", delay: 1600 },
    { text: "Starting network services......................... [DONE]", delay: 1750 },
    { text: "Launching portfolio_os v2.0.4...", delay: 1900 },
    { text: "", delay: 2050 },
    { text: "System ready. Welcome, visitor.", delay: 2100 },
];

const TOTAL_DURATION = 2800; // ms before fade out

export const BootScreen = () => {
    const [visible, setVisible] = useState(true);
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if already booted this session
        if (sessionStorage.getItem("booted")) {
            setVisible(false);
            return;
        }

        // Show boot lines with delays
        BOOT_LINES.forEach(({ text, delay }) => {
            setTimeout(() => {
                setLines((prev) => [...prev, text]);
                setProgress(Math.min(100, Math.round((delay / (TOTAL_DURATION - 500)) * 100)));
            }, delay);
        });

        // Finish boot
        setTimeout(() => {
            setProgress(100);
        }, TOTAL_DURATION - 400);

        setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("booted", "1");
        }, TOTAL_DURATION);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-[#0a0e17] flex flex-col justify-center items-center p-8"
                >
                    <div className="w-full max-w-2xl">
                        {/* Logo */}
                        <div className="mb-8 text-center">
                            <span className="text-primary font-mono text-2xl font-black tracking-widest">
                                PORTFOLIO_OS
                            </span>
                            <div className="text-slate-600 font-mono text-[10px] mt-1 tracking-[0.3em]">
                                SYSTEM BOOT SEQUENCE
                            </div>
                        </div>

                        {/* Terminal Output */}
                        <div className="bg-black/40 border border-primary/20 rounded-lg p-6 font-mono text-xs h-[320px] overflow-hidden">
                            <div className="space-y-1">
                                {lines.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`${line.includes("[OK]") || line.includes("[LOADED]") || line.includes("[DONE]") || line.includes("[LINK UP]")
                                                ? "text-emerald-400"
                                                : line.includes("Welcome")
                                                    ? "text-primary font-bold"
                                                    : line.startsWith("  →")
                                                        ? "text-slate-400"
                                                        : "text-slate-300"
                                            }`}
                                    >
                                        {line}
                                        {i === lines.length - 1 && (
                                            <span className="inline-block w-2 h-4 bg-primary ml-1 animate-blink" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2">
                                <span>LOADING SYSTEM</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(19,91,236,0.6)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
