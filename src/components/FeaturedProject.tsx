import { motion } from 'motion/react';
import { Cpu, Github, ExternalLink, Sparkles, Check, Clock } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { getEstimatedReadingTime } from '../utils/readingTime';

export function FeaturedProject() {
  const featured = PROJECTS.find((p) => p.id === 'cortexiq-by-dnyl') || PROJECTS[2];

  return (
    <section className="py-16 dark:bg-[#090a0f] bg-slate-50 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-violet-500 font-mono text-xs uppercase tracking-widest block mb-2">FEATURED ARCHITECTURE</span>
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 tracking-tight">
            Spotlight: CortexIQ by DNYL
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 from-white via-slate-50 to-slate-100 dark:border-slate-800 border border-slate-200/90 p-8 sm:p-12 shadow-2xl backdrop-blur-xl overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-violet-600/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-500 dark:text-violet-300 text-xs font-mono font-medium">
                  {featured.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono font-medium">
                  {featured.language}
                </span>
                {featured.liveUrl && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>Live Online</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full dark:bg-slate-900/90 bg-white border dark:border-slate-700/80 border-slate-200 dark:text-slate-300 text-slate-700 text-xs font-mono shadow-sm" title="Estimated Reading Time">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{getEstimatedReadingTime(featured)}</span>
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold dark:text-white text-slate-900 tracking-tight">
                {featured.displayName}
              </h3>

              <p className="dark:text-slate-300 text-slate-600 text-base sm:text-lg leading-relaxed">
                {featured.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {featured.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm dark:text-slate-300 text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-500 dark:text-violet-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live App</span>
                  </a>
                )}
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl dark:bg-slate-900 bg-white hover:dark:bg-slate-800 hover:bg-slate-100 border dark:border-slate-700 border-slate-300 dark:text-white text-slate-800 font-medium text-sm transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>

            {/* Right side visual code card */}
            <div className="lg:col-span-5 bg-slate-950/90 dark:bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-300 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span>cortexiq-engine.ts</span>
              </div>
              <div className="text-slate-400 space-y-1.5 overflow-x-auto">
                <p><span className="text-violet-400">import</span> &#123; GoogleGenAI &#125; <span className="text-violet-400">from</span> <span className="text-cyan-300">'@google/genai'</span>;</p>
                <p className="text-slate-500">// CortexIQ Intelligence Suite by Daniyal Hayat</p>
                <p><span className="text-violet-400">export class</span> <span className="text-yellow-300">CortexEngine</span> &#123;</p>
                <p className="pl-4"><span className="text-blue-400">constructor</span>() &#123;</p>
                <p className="pl-8"><span className="text-violet-400">this</span>.version = <span className="text-cyan-300">'2.4.0'</span>;</p>
                <p className="pl-8"><span className="text-violet-400">this</span>.author = <span className="text-cyan-300">'Daniyal5722'</span>;</p>
                <p className="pl-4">&#125;</p>
                <p className="pl-4"><span className="text-blue-400">parsePrompt</span>(query: <span className="text-yellow-300">string</span>) &#123;</p>
                <p className="pl-8"><span className="text-violet-400">return</span> <span className="text-cyan-300">`Processing: $&#123;query&#125;`</span>;</p>
                <p className="pl-4">&#125;</p>
                <p>&#125;</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
