import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Github, 
  Mail, 
  ChevronDown, 
  GitBranch, 
  FileText,
  Sparkles,
  Layers,
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { GITHUB_PROFILE_URL, DEVELOPER_NAME, DEVELOPER_EMAIL } from '../data/portfolioData';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Hero3DObject } from './Hero3DObject';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onOpenResume?: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const { activity } = useGitHubActivity();
  const { projects } = useGitHubRepos();

  const titleWords = ["BUILD.", "CREATE.", "EXPLORE."];
  const headlineWords = "Architecting resilient digital systems with precision, creative motion, and craftsmanship.".split(" ");

  return (
    <section id="home" className="relative min-h-[95vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Status Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-mono backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-700 dark:text-slate-300">
              Available for high-impact engineering & product roles
            </span>
          </motion.div>

          {/* Live GitHub Status Pill */}
          <motion.a
            href={activity.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            data-cursor="external"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono hover:border-cyan-500/50 transition-colors shadow-xs"
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400">Git Event:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline truncate max-w-[200px] sm:max-w-none">
              {activity.actionText}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[10px]">({activity.timeAgo})</span>
          </motion.a>

        </div>

        {/* Hero Grid with 3D Object */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tagline / Monogram */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
                PORTFOLIO // 2026
              </span>
              <div className="h-[1px] w-12 bg-cyan-500/30" />
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase">
                {DEVELOPER_NAME}
              </span>
            </motion.div>

            {/* Cinematic Main Heading */}
            <div className="space-y-1">
              <motion.h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                {titleWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.15 + idx * 0.12, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className={`inline-block mr-3 sm:mr-5 ${
                      idx === 1 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400' 
                        : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-base sm:text-xl font-mono text-cyan-600 dark:text-cyan-400 font-medium pt-2"
              >
                Software Engineer • Web Architect • Mobile Builder
              </motion.div>
            </div>

            {/* Description with Staggered Word Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              Crafting production web applications with React & TypeScript, native Android systems with Kotlin, and AI-accelerated tooling. Focused on zero-lag performance, resilient architectures, and editorial design fidelity.
            </motion.p>

            {/* Magnetic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                href="#projects"
                dataCursor="view"
                className="px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                dataCursor="pointer"
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>Get in Touch</span>
              </MagneticButton>

              {onOpenResume && (
                <MagneticButton
                  onClick={onOpenResume}
                  dataCursor="pointer"
                  className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-mono transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span>Curriculum Vitae</span>
                </MagneticButton>
              )}

              <MagneticButton
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                dataCursor="external"
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors cursor-pointer"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </MagneticButton>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="grid grid-cols-3 gap-4 pt-4 max-w-lg border-t border-slate-200 dark:border-slate-800/80 font-mono text-xs"
            >
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">7+</span>
                <span className="text-slate-500 dark:text-slate-400">Public Repos</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-slate-500 dark:text-slate-400">Verified Code</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">&lt;100ms</span>
                <span className="text-slate-500 dark:text-slate-400">Target Latency</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive 3D Polyhedron Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-4 flex items-center justify-center relative"
          >
            <Hero3DObject />
          </motion.div>

        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-14 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 text-xs font-mono"
      >
        <span className="text-[10px] tracking-widest uppercase">Explore Works</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-cyan-500" />
        </motion.div>
      </motion.div>

    </section>
  );
}
