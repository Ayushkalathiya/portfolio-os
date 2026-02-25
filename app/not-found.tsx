"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <div className="max-w-2xl w-full">

                {/* Big 404 with blinking cursor */}
                <div className="mb-8 relative inline-block">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-white font-mono font-bold leading-none tracking-tighter text-[120px] md:text-[180px]"
                    >
                        404
                        <span
                            className="inline-block align-middle ml-2 bg-primary"
                            style={{
                                width: "14px",
                                height: "1.5rem",
                                animation: "blink 1s step-end infinite",
                                verticalAlign: "middle",
                            }}
                        />
                    </motion.h1>

                    {/* Critical Failure badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="absolute -top-4 -right-6 md:-right-10 px-3 py-1 bg-red-500/20 text-red-400 text-[10px] font-mono rounded border border-red-500/30 uppercase tracking-[0.2em]"
                    >
                        Critical_Failure
                    </motion.div>
                </div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 md:p-8 backdrop-blur-sm"
                >
                    {/* Window chrome dots */}
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="text-[10px] font-mono text-slate-500 ml-2 uppercase tracking-widest">
                            system_terminal — bash
                        </span>
                    </div>

                    {/* Terminal output */}
                    <div className="text-left font-mono text-sm md:text-base space-y-4">
                        <p className="text-red-400">
                            <span className="text-slate-500">[ERROR]</span> 404: Route Not Found
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            The requested resource{" "}
                            <span className="text-primary">&quot;/$(path)&quot;</span> could not
                            be located in the architectural cluster. Kernel lookup failed.
                        </p>
                        <p className="text-slate-600 text-xs">
                            Exit code: 404 | Signal: SIGNOTFOUND | PID: 0x000000
                        </p>

                        {/* Go Home button */}
                        <div className="pt-4">
                            <Link
                                href="/"
                                className="group inline-flex items-center gap-3 bg-slate-800/80 hover:bg-primary/10 border border-slate-700 hover:border-primary px-6 py-3 rounded-lg transition-all"
                            >
                                <span className="text-primary font-bold">~/ayush {">"}</span>
                                <span className="text-slate-200 font-mono">cd /home</span>
                                <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
