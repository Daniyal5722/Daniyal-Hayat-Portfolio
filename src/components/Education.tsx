import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, BookOpen, CheckCircle, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function Education() {
  return (
    <section id="education" className="py-14 sm:py-20 relative bg-transparent dark:bg-slate-900/40 backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-3 sm:space-y-4 max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Continuous Learning</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Education & Core Foundations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Rigorous foundations in computer science theory, algorithms, and practical software design combined with self-directed masteries in full-stack web and mobile development.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {item.timeline}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                {item.program}
              </h3>
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4">
                {item.institution}
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                {item.description}
              </p>

              <div className="space-y-2 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  Key Skills & Knowledge Gained:
                </span>
                {item.skillsGained.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
