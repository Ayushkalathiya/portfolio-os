"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { Typewriter } from "@/components/terminal/Typewriter";
import { CONFIG } from "@/lib/config/site";
import { motion } from "framer-motion";
import { Shield, Server, Code, Zap, ArrowRight, ExternalLink, Github, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Hero Terminal */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <TerminalCard title="system_core_kernel" className="min-h-[400px]">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <span className="text-primary text-xs uppercase opacity-70">Initiating boot sequence...</span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter glow-text">
                  <Typewriter text={`ROOT@AYUSH:~$ WHOAMI`} delay={70} />
                </h1>
              </div>

              <div className="space-y-4 text-slate-300">
                <p className="leading-relaxed">
                  I am <span className="text-primary font-bold">Ayush Kalathiya</span>, a visionary Systems Architect and Full-Stack Developer specializing in the construction of resilient digital infrastructures.
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-primary">{">"}</span>
                  <p>My mission is to architect experiences that bridge the gap between complex system logic and seamless human interaction.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">{">"}</span>
                  <p>Current operation: <span className="text-neon-blue">Engineering future-proof deployments.</span></p>
                </div>
              </div>

              <div className="pt-8 flex flex-wrap gap-4">
                <Link href="/projects" className="group flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 px-6 py-3 rounded text-sm font-mono transition-all">
                  VIEW_DEPLOYMENTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded text-sm font-mono transition-all">
                  ESTABLISH_CONNECTION
                </Link>
                <a
                  href={CONFIG.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-6 py-3 rounded text-sm font-mono transition-all text-primary"
                >
                  DOWNLOAD_CV
                </a>
              </div>
            </div>
          </TerminalCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TerminalCard title="deployments_active">
              <div className="space-y-4">
                {CONFIG.projects.slice(0, 2).map((project) => (
                  <div key={project.id} className="group border-b border-primary/10 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-primary font-bold uppercase text-xs">{project.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{project.description}</p>
                    <div className="flex gap-4">
                      <Link href={project.repo} className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-white transition-colors">
                        <Github className="w-3 h-3" /> REPOSITORY
                      </Link>
                      <Link href={project.live} className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3" /> LIVE_PROTO
                      </Link>
                    </div>
                  </div>
                ))}
                <Link href="/projects" className="block text-center text-[10px] text-primary hover:underline pt-2 uppercase tracking-widest">
                  view_all_deployments
                </Link>
              </div>
            </TerminalCard>

            <TerminalCard title="system_logs_recent">
              <div className="space-y-3">
                {CONFIG.experience[0].logs.map((log, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="text-slate-600" suppressHydrationWarning>[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-slate-300">{log}</span>
                  </div>
                ))}
              </div>
            </TerminalCard>
          </div>
        </div>

        {/* Right Column: Status Widgets */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <TerminalCard title="system_status">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                  <span>uptime</span>
                  <span className="text-primary">{CONFIG.uptime}</span>
                </div>
                <div className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "99.9%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(19,91,236,0.5)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Security", val: "ACTIVE", href: "" },
                  { icon: Server, label: "Nodes", val: "STABLE", href: "" },
                  { icon: Code, label: "Protocols", val: "v2.0.4", href: "/consistency" },
                  { icon: Zap, label: "Performance", val: "OPTIMIZED", href: "" }
                ].map((stat, i) => {
                  const inner = (
                    <>
                      <stat.icon className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-widest">{stat.label}</div>
                        <div className="text-[10px] text-primary font-bold">{stat.val}</div>
                      </div>
                    </>
                  );
                  return stat.href ? (
                    <Link key={i} href={stat.href} className="bg-primary/5 border border-primary/10 p-3 rounded flex flex-col gap-2 cursor-pointer">
                      {inner}
                    </Link>
                  ) : (
                    <div key={i} className="bg-primary/5 border border-primary/10 p-3 rounded flex flex-col gap-2">
                      {inner}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-primary/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-4 tracking-widest">Global_Tech_Stack</div>
                <div className="flex flex-wrap gap-2">
                  {CONFIG.skills.flatMap(s => s.items).slice(0, 8).map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono hover:border-primary/40 hover:text-primary transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="incoming_broadcasts">
            <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 animate-float">
                <TerminalIcon className="w-8 h-8 text-primary shadow-glow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono text-primary">NO_NEW_BROADCASTS</h3>
                <p className="text-[10px] text-slate-500 uppercase leading-relaxed">System is currently in idle state. Monitoring external frequencies for available collaborations.</p>
              </div>
              <button className="w-full mt-4 py-2 border border-primary/30 text-primary hover:bg-primary/10 transition-all font-mono text-[10px] uppercase rounded">
                Initiate_Handshake
              </button>
            </div>
          </TerminalCard>
        </div>

      </div>
    </PageLayout>
  );
}
