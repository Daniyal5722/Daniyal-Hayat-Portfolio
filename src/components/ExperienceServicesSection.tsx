import React from 'react';
import { EXPERIENCE_TIMELINE, SERVICES_DATA } from '../data/portfolioData';
import { Calendar, CheckCircle2, Layers, Smartphone, Cpu, ShieldCheck } from 'lucide-react';

export function ExperienceServicesSection() {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return Layers;
      case 'Smartphone':
        return Smartphone;
      case 'Cpu':
        return Cpu;
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="experience" className="py-16 sm:py-24 relative border-t border-slate-800/60" aria-label="Experience and Services">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Experience Progression */}
        <div className="space-y-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
              <span>04 // TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Progression
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Chronological milestones reflecting sustained focus on web algorithms, native Android mobile software, and production deployments.
            </p>
          </div>

          <div className="space-y-6">
            {EXPERIENCE_TIMELINE.map((item, idx) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 transition-colors space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      {item.role}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono self-start sm:self-auto shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights List */}
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Metadata - Zero Pill Discipline */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-500">
                  <span className="font-semibold text-slate-400">Focus:</span>
                  {item.technologies.map((tech, tIdx) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                      {tIdx < item.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services & Offerings */}
        <div id="services" className="space-y-8 pt-8 border-t border-slate-800/60">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
              <span>05 // SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Deliverables
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Specialized services provided for technical contract engagements and product teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES_DATA.map((srv) => {
              const Icon = getServiceIcon(srv.icon);
              return (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                        {srv.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                      Deliverables:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {srv.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
