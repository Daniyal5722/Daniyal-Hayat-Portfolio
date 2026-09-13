import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  GitBranch, 
  Layers, 
  Smartphone, 
  Code2, 
  Cpu, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { GITHUB_PROFILE_URL, DEVELOPER_NAME, DEVELOPER_EMAIL } from '../data/portfolioData';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

interface HeroProps {
  onOpenResume?: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const { activity } = useGitHubActivity();
  const { projects } = useGitHubRepos();
  const repoCount = projects.length || 7;

  const floatingBadges = [
    { name: "TypeScript", icon: Code2, color: "text-blue-500", delay: 0 },
    { name: "React / Next.js", icon: Layers, color: "text-cyan-500", delay: 0.1 },
    { name: "Kotlin Android", icon: Smartphone, color: "text-emerald-500", delay: 0.2 },
    { name: "Google Gemini AI", icon: Cpu, color: "text-purple-500", delay: 0.3 }
  ];

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full dark:bg-slate-900/80 bg-white/90 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="dark:text-slate-300 text-slate-700">Available for selected projects & engineering roles</span>
        </motion.div>

        {/* Live GitHub Status Pill */}
        <motion.a
          href={activity.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-slate-900/50 bg-slate-100/90 border dark:border-slate-800/80 border-slate-200 text-[11px] font-mono mb-8 hover:border-cyan-500/50 transition-colors shadow-xs"
        >
          <GitBranch className="w-3.5 h-3.5 text-cyan-500" />
          <span className="text-slate-500 dark:text-slate-400">Live Git Sync:</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline">
            {activity.actionText}
          </span>
          <span className="text-slate-400 dark:text-slate-500">({activity.timeAgo})</span>
        </motion.a>

        {/* Hero Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-4 max-w-4xl mb-6"
        >
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-cyan-600 dark:text-cyan-400 font-bold">
              {DEVELOPER_NAME}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
            Building Digital Experiences{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">
              That Feel Different.
            </span>
          </h1>
        </motion.div>

        {/* Introduction Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mb-10"
        >
          Software Engineer & Product Builder specializing in high-performance web platforms, native Android mobile applications with Kotlin, and AI workflows. Crafting digital products with speed, accessibility, and architectural discipline.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl dark:bg-slate-900/90 bg-white/90 hover:dark:bg-slate-800 hover:bg-slate-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all shadow-xs hover:scale-[1.02]"
          >
            <Mail className="w-4 h-4 text-cyan-500" />
            <span>Let's Connect</span>
          </a>

          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl dark:bg-slate-900/50 bg-slate-100/90 hover:dark:bg-slate-800/80 hover:bg-slate-200 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm transition-all"
          >
            <Github className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
            <span>GitHub (@Daniyal5722)</span>
          </a>
        </motion.div>

        {/* Floating Technology Badges */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl"
        >
          {floatingBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full dark:bg-slate-900/60 bg-white/80 border border-slate-200/80 dark:border-slate-800/80 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-xs hover:border-cyan-500/40 transition-colors"
              >
                <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
                <span>{badge.name}</span>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-mono"
      >
        <span className="text-[11px] tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-500" />
        </motion.div>
      </motion.div>

    </section>
  );
}
