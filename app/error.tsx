"use client";

import { useEffect } from "react";
import { Terminal, RefreshCcw, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 grid-overlay opacity-30" />
            <div className="scanline animate-scanline" />

            <div className="max-w-2xl w-full z-10 space-y-8 text-center">
                <div className="w-20 h-20 bg-terminal-red/10 border border-terminal-red/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <ShieldAlert className="w-10 h-10 text-terminal-red" />
                </div>

                <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter text-white glow-text uppercase">
                    System_Failure
                </h1>

                <div className="terminal-window max-w-lg mx-auto overflow-hidden">
                    <div className="terminal-header justify-start">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-terminal-red/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                        </div>
                        <span className="text-[10px] text-slate-500 ml-4 font-mono uppercase tracking-widest">kernel_panic_reporter</span>
                    </div>
                    <div className="terminal-body text-left space-y-4">
                        <div className="space-y-2">
                            <p className="text-terminal-red font-mono text-xs">
                                [FATAL_ERROR] {error.message || "UNIDENTIFIED_KERNEL_EXCEPTION"}
                            </p>
                            <p className="text-slate-500 font-mono text-[10px]">
                                DIGEST: {error.digest || "0x000000"}
                            </p>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed font-mono">
                            The architectural cluster encountered an unhandled exception. Automatic recovery protocols have been initiated.
                        </p>

                        <div className="pt-4">
                            <button
                                onClick={() => reset()}
                                className="group inline-flex items-center gap-3 bg-terminal-red/10 hover:bg-terminal-red/20 border border-terminal-red/30 px-6 py-3 rounded transition-all transition-colors"
                            >
                                <RefreshCcw className="w-4 h-4 text-terminal-red group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-terminal-red font-mono font-bold text-sm tracking-widest">REBOOT_SYSTEM</span>
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    System will attempt to re-sync with core database...
                </p>
            </div>
        </div>
    );
}
