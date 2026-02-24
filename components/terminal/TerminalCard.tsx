"use client";

import { motion } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";

interface TerminalCardProps {
    children: React.ReactNode;
    title: string;
    className?: string;
}

export const TerminalCard = ({ children, title, className = "" }: TerminalCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`terminal-window flex flex-col ${className}`}
        >
            <div className="terminal-header flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
            </div>
            <div className="terminal-body flex-1 overflow-auto">
                {children}
            </div>
        </motion.div>
    );
};
