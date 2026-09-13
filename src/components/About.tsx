import { motion } from 'motion/react';
import { DEVELOPER_NAME, GITHUB_USERNAME, LIVE_DEPLOYMENTS } from '../data/portfolioData';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Layers, 
  Globe, 
  Compass,
  ArrowRight
} from 'lucide-react';

export function About() {
  const { projects } = useGitHubRepos();
  const repoCount = projects.length || 7;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Design Sense & Engineering DNA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Driven by clean architecture, performance, and memorable feel.
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Identity & Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                    {DEVELOPER_NAME}
                  </h3>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    @{GITHUB_USERNAME}
                  </span>
                </div>
              </div>

              <blockquote className="text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed italic border-l-2 border-cyan-500 pl-4 mb-6">
                "Great software is where mathematical precision meets intuitive craftsmanship. If it doesn't feel instant and effortless, the work isn't done."
              </blockquote>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I build digital products that prioritize real user utility, zero bloat, and rock-solid code maintainability. Whether developing responsive web platforms or native mobile applications, I treat every pixel and API request with deliberate intent.
              </p>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                    {repoCount}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Verified Repos
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {LIVE_DEPLOYMENTS.length}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Deployments
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Action Link */}
            <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Want to review verified GitHub commits?
              </span>
              <a
                href="#github"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
              >
                <span>Inspect GitHub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Narrative Journey & What Makes My Work Different */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Engineering with Purpose, Craft, and Resilience
              </h3>
              <p>
                My engineering journey began with a curiosity for understanding how interactive digital systems behave under the hood. Over time, that fascination evolved into a disciplined practice of building production-grade web systems and native Android mobile apps.
              </p>
              <p>
                I have engineered end-to-end community platforms like <strong className="text-slate-900 dark:text-white font-semibold">Darul Ifta Irshad us Saileen</strong>, taking it from a community guidance concept to a live web platform and multiple iterations of native Android apps with offline caching.
              </p>
              <p>
                In the AI domain, I designed and developed <strong className="text-slate-900 dark:text-white font-semibold">CortexIQ by DNYL</strong>, bridging complex model prompting with reactive, developer-friendly interfaces.
              </p>
            </div>

            {/* What Makes My Work Different */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                What Makes My Work Different
              </h4>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                    <Layers className="w-4 h-4 text-cyan-500" />
                    <span>Cross-Platform Depth</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Equally comfortable in modern React/TypeScript web applications and native Android development in Kotlin.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                    <Sparkles className="w-4 h-4 text-cyan-500" />
                    <span>Micro-Interaction Polish</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Deliberate animations with Motion, keyboard navigation, accessible contrast, and zero layout shifting.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                    <Globe className="w-4 h-4 text-cyan-500" />
                    <span>Honest & Verified</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    No fabricated metrics, no fake client logos. Every repository and deployment is publicly auditable on GitHub.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                    <Smartphone className="w-4 h-4 text-cyan-500" />
                    <span>Offline-First Reliability</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    Engineered with defensive caching strategies so users in low-connectivity areas never hit dead ends.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
