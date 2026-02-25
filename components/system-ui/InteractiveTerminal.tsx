"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/lib/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Maximize2 } from "lucide-react";

const COMMANDS: Record<string, string | string[]> = {
    help: [
        "Available commands:",
        "  whoami        — About me",
        "  skills        — Tech stack",
        "  projects      — View deployments",
        "  experience    — System logs",
        "  contact       — Get in touch",
        "  github        — Open GitHub profile",
        "  resume        — Download resume",
        "  clear         — Clear terminal",
        "  neofetch      — System info",
    ],
    whoami: [
        `Name: ${CONFIG.name}`,
        `Role: ${CONFIG.role}`,
        `Location: India`,
        `Status: Building the future`,
    ],
    skills: CONFIG.skills.map((s) => `[${s.category}] ${s.items.join(", ")}`),
    neofetch: [
        "  ╔══════════════════════╗",
        "  ║   PORTFOLIO_OS 2.0   ║",
        "  ╠══════════════════════╣",
        `  ║ Host: ${CONFIG.name.padEnd(15)}║`,
        "  ║ OS: Next.js 15       ║",
        "  ║ Shell: TypeScript    ║",
        "  ║ Theme: Futuristic    ║",
        "  ║ Uptime: 99.9%        ║",
        "  ╚══════════════════════╝",
    ],
};

const NAV_COMMANDS: Record<string, string> = {
    projects: "/projects",
    experience: "/experience",
    contact: "/contact",
    about: "/about",
    home: "/",
};

interface TermLine {
    type: "input" | "output";
    text: string;
}

export const InteractiveTerminal = () => {
    const [open, setOpen] = useState(false);
    const [lines, setLines] = useState<TermLine[]>([
        { type: "output", text: 'Welcome to PORTFOLIO_OS terminal. Type "help" for commands.' },
    ]);
    const [input, setInput] = useState("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        const newLines: TermLine[] = [
            ...lines,
            { type: "input", text: `visitor@portfolio:~$ ${cmd}` },
        ];

        if (cmd === "clear") {
            setLines([]);
            setInput("");
            return;
        }

        if (cmd === "github") {
            newLines.push({ type: "output", text: "Opening GitHub..." });
            setLines(newLines);
            setInput("");
            window.open(CONFIG.socials.github, "_blank");
            return;
        }

        if (cmd === "resume") {
            newLines.push({ type: "output", text: "Initializing resume transport..." });
            newLines.push({ type: "output", text: "Opening secure document..." });
            setLines(newLines);
            setInput("");
            window.open(CONFIG.socials.resume!, "_blank");
            return;
        }

        if (NAV_COMMANDS[cmd]) {
            newLines.push({ type: "output", text: `Navigating to /${cmd}...` });
            setLines(newLines);
            setInput("");
            setTimeout(() => {
                router.push(NAV_COMMANDS[cmd]);
                setOpen(false);
            }, 500);
            return;
        }

        if (COMMANDS[cmd]) {
            const output = Array.isArray(COMMANDS[cmd]) ? COMMANDS[cmd] : [COMMANDS[cmd]];
            (output as string[]).forEach((line) => {
                newLines.push({ type: "output", text: line });
            });
        } else {
            newLines.push({
                type: "output",
                text: `Command not found: "${cmd}". Type "help" for available commands.`,
            });
        }

        setLines(newLines);
        setInput("");
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-full flex items-center justify-center text-primary transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(19,91,236,0.3)] backdrop-blur-sm"
                title="Open Terminal"
            >
                <Terminal className="w-5 h-5" />
            </button>

            {/* Terminal Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] bg-[#0d1117] border border-primary/30 rounded-lg overflow-hidden shadow-2xl shadow-black/60"
                    >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-primary/10 border-b border-primary/20">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                    interactive_shell
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Output */}
                        <div
                            ref={scrollRef}
                            className="h-[280px] overflow-y-auto p-4 font-mono text-xs space-y-1"
                        >
                            {lines.map((line, i) => (
                                <div
                                    key={i}
                                    className={
                                        line.type === "input"
                                            ? "text-primary"
                                            : "text-slate-400"
                                    }
                                >
                                    {line.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-primary/20 bg-black/30">
                            <span className="text-primary text-xs font-mono">{">"}</span>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-slate-600"
                                placeholder="Type a command..."
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
