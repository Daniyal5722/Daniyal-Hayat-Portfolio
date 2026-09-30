import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, Layers, Smartphone, Cpu, CheckCircle } from 'lucide-react';

export function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages & Core":
        return Code2;
      case "Web & Frontend Architecture":
        return Layers;
      case "Native Android & Mobile":
        return Smartphone;
      default:
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 relative border-t border-slate-800/60" aria-label="Technical Capabilities">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
            <span>03 // CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Practical Technical Stack
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Organized by functional domains. Every tool listed represents direct hands-on production code across public repositories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.category);
            return (
              <div
                key={cat.category}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5"
              >
                {/* Category Header */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Capability Rows */}
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-xs">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:text-right pl-3.5 sm:pl-0">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-xs">
                          {skill.context}
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 shrink-0">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
