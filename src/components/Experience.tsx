import { EXPERIENCE_TIMELINE } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle, Sparkles, Terminal, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Development Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering Journey & Milestones
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A chronological look at how I progressed from foundational web algorithms to architecting production web platforms, native Android mobile applications, and AI integrations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-200 dark:border-slate-800 space-y-12">
          {EXPERIENCE_TIMELINE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#090a0f] border-2 border-cyan-500 flex items-center justify-center shadow-xs group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              </div>

              {/* Milestone Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/5">
                {/* Year & Role Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{item.year}</span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    {item.role}
                  </span>
                </div>

                {/* Title & Narrative */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 mb-6">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {item.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                    >
                      <Terminal className="w-3 h-3 text-cyan-500" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
