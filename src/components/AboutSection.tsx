import React from 'react';
import { DEVELOPER_NAME, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { Terminal, ShieldCheck, Layers, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const coreStrengths = [
    {
      title: "Full-Stack Web Architecture",
      desc: "Component-driven design systems in React 19 and Next.js with strict TypeScript typings, zero layout shift (CLS: 0.00), and accessible DOM semantics.",
      icon: Layers
    },
    {
      title: "Native Android & Offline-First Systems",
      desc: "Robust native mobile apps written in Kotlin, leveraging Android SDK, Room/SQLite local databases, and deterministic background sync workflows.",
      icon: Cpu
    },
    {
      title: "AI Integration & Telemetry Pipelines",
      desc: "Pairing Google Gemini AI models with streaming token monitors, secure server-side API proxies, and structured output formatting.",
      icon: Terminal
    },
    {
      title: "Verified Code Hygiene & Craft",
      desc: "No fabricated metrics or placeholder claims. All featured applications are deployed live and publicly verifiable on GitHub.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative border-t border-slate-800/60" aria-label="About Daniyal Hayat">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
              <span>02 // ARCHITECTURAL INTENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Engineering with discipline, purpose, and proof.
            </h2>

            <blockquote className="text-base sm:text-lg text-slate-700 dark:text-slate-300 italic border-l-2 border-cyan-500 pl-4 py-1 leading-relaxed">
              "Great software is where mathematical rigor meets intuitive craftsmanship. If it does not feel instant, accessible, and resilient under poor network conditions, the work is not complete."
            </blockquote>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              My engineering discipline centers on building reliable user-facing platforms. Whether developing community consultation platforms like <strong className="text-slate-800 dark:text-slate-200">Darul Ifta</strong>, real-time telemetry apps like <strong className="text-slate-800 dark:text-slate-200">Hamara Weather</strong>, or native Android utilities in Kotlin, I prioritize clean architecture and verifiable output over superficial flair.
            </p>

            <div className="pt-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inspect Daniyal's GitHub profile for verified code"
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors py-2 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded min-h-[44px]"
              >
                <span>Inspect Verified GitHub Repositories</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Core Strengths Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {coreStrengths.map((strength) => {
              const Icon = strength.icon;
              return (
                <div
                  key={strength.title}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {strength.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {strength.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
