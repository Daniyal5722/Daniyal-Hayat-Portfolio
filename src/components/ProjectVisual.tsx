import React from 'react';
import { Project } from '../types';
import { ExternalLink, Terminal, Cpu, CloudSun, Smartphone, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectVisualProps {
  project: Project;
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  const { visualType, displayName, oneLiner } = project;

  if (visualType === 'browser-portal') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0c0e14] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="bg-slate-900 px-3 py-0.5 rounded text-slate-400 truncate max-w-[200px]">
            darulifta.manus.space
          </span>
          <span className="text-emerald-400 font-semibold">200 OK</span>
        </div>

        {/* Portal Body Mockup */}
        <div className="py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-[11px] block">Official Portal</span>
              <span className="text-slate-200 font-sans font-bold text-sm">دار الإفتاء إرشاد السائلين</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              Live Production
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/60 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Guidance Archive</span>
              <span className="text-cyan-400">Searchable</span>
            </div>
            <div className="h-1.5 w-3/4 bg-slate-800 rounded-full" />
            <div className="h-1.5 w-1/2 bg-slate-800 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded bg-slate-900/50 border border-slate-800/60">
              <span className="text-slate-500 block">Performance</span>
              <span className="text-emerald-400 font-bold">LCP &lt; 0.6s</span>
            </div>
            <div className="p-2 rounded bg-slate-900/50 border border-slate-800/60">
              <span className="text-slate-500 block">Layout Shift</span>
              <span className="text-cyan-400 font-bold">CLS 0.00</span>
            </div>
          </div>
        </div>

        {/* Subtle Watermark Tag */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>Responsive Web Platform</span>
          <span className="text-slate-400">Tailwind CSS + ES6</span>
        </div>
      </div>
    );
  }

  if (visualType === 'ai-dashboard') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#090b10] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-semibold">CortexIQ Telemetry Engine</span>
          </div>
          <span className="text-cyan-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            READY
          </span>
        </div>

        {/* AI Stream Simulation */}
        <div className="py-3 space-y-2.5">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>Prompt Ingestion</span>
            </span>
            <p className="text-[11px] text-slate-300 truncate">
              Analyze AST token budget for React 19 concurrent hydration
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-900/40 text-[10px] space-y-1">
            <div className="flex items-center justify-between text-cyan-400">
              <span>Gemini Flash Stream</span>
              <span>120ms latency</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Tokens parsed: 428 · Zero secret leaks · Strict TypeScript
            </p>
          </div>
        </div>

        {/* Telemetry Footer */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>Model: Google GenAI</span>
          <span className="text-cyan-400 font-bold">100% Type-Safe</span>
        </div>
      </div>
    );
  }

  if (visualType === 'weather-telemetry') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0a0d14] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-semibold">Hamara Meteorological</span>
          </div>
          <span className="text-emerald-400 font-semibold">SYNCED</span>
        </div>

        <div className="py-3 flex items-center justify-between gap-4">
          <div>
            <span className="text-3xl sm:text-4xl font-sans font-extrabold text-white block">
              28°C
            </span>
            <span className="text-xs text-slate-400 font-sans">Scattered Clear Sky</span>
          </div>
          <div className="space-y-1 text-right text-[11px]">
            <div className="text-slate-400">
              Humidity: <strong className="text-slate-200">54%</strong>
            </div>
            <div className="text-slate-400">
              Pressure: <strong className="text-slate-200">1013 hPa</strong>
            </div>
            <div className="text-slate-400">
              Wind: <strong className="text-cyan-400">12 km/h</strong>
            </div>
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>Ad-Free Clean Footprint</span>
          <span className="text-emerald-400 font-bold">0 Trackers</span>
        </div>
      </div>
    );
  }

  if (visualType === 'matrix-grid') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0b0c12] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 text-[10px] text-slate-500">
          <span className="text-slate-300 font-semibold">Mystic Match 2D Grid</span>
          <span className="text-cyan-400 font-bold">60 FPS DETERMINISTIC</span>
        </div>

        {/* 6x4 Mini Gem Matrix Graphic */}
        <div className="py-2 grid grid-cols-6 gap-1.5 my-auto">
          {['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899',
            '#8b5cf6', '#06b6d4', '#06b6d4', '#06b6d4', '#3b82f6', '#10b981',
            '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899',
            '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'].map((color, i) => (
            <div
              key={i}
              className="aspect-square rounded-md border border-slate-700/50 flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: `${color}18`, borderColor: `${color}40` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>Kotlin + State Machine</span>
          <span className="text-cyan-400">Match-3 Cascade</span>
        </div>
      </div>
    );
  }

  if (visualType === 'mobile-mockup') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0c0d14] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-semibold">Android Client v2</span>
          </div>
          <span className="text-cyan-400 font-bold">OFFLINE-FIRST</span>
        </div>

        <div className="py-2.5 space-y-2">
          <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>SQLite Room DB</span>
              <span className="text-emerald-400">Cached Locally</span>
            </div>
            <p className="text-slate-300 font-sans text-xs font-medium">
              Fatwa Reference #1042 — Available Without Internet
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-500 block">Memory Footprint</span>
              <span className="text-cyan-400 font-bold">&lt; 38 MB RAM</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
              <span className="text-slate-500 block">Background Sync</span>
              <span className="text-emerald-400 font-bold">WorkManager</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
          <span>Native Kotlin Architecture</span>
          <span className="text-slate-400">MVVM Pattern</span>
        </div>
      </div>
    );
  }

  // Default Editorial Code Visual
  return (
    <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#090b10] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between font-mono text-xs select-none overflow-hidden relative group-hover:border-cyan-500/30 transition-colors">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-[10px] text-slate-500">
        <span className="text-slate-300 font-semibold">Verified Architecture</span>
        <span className="text-cyan-400 font-bold">LIGHTHOUSE 95+</span>
      </div>

      <div className="py-2 space-y-1.5 text-[11px] text-slate-400 font-mono">
        <p><span className="text-cyan-400">const</span> stack = [<span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"React 19"</span>, <span className="text-emerald-400">"Tailwind"</span>];</p>
        <p><span className="text-cyan-400">export default</span> function {displayName.replace(/[^a-zA-Z]/g, '')}() &#123;</p>
        <p className="pl-4 text-slate-500">&#47;&#47; Zero-pill discipline &amp; keyboard access</p>
        <p className="pl-4"><span className="text-cyan-400">return</span> &lt;<span className="text-purple-400">ProofOfWork</span> verified=&#123;<span className="text-cyan-400">true</span>&#125; /&gt;;</p>
        <p>&#125;</p>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
        <span>WCAG AA Accessible</span>
        <span className="text-emerald-400">Production Ready</span>
      </div>
    </div>
  );
}
