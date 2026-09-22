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
import { GITHUB_PROFILE_URL } from '../data/portfolioData';
import { useGitHubActivity } from '../hooks/useGitHubActivity';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onOpenResume?: () => void;
  isLoaded?: boolean;
}

function ProfilePhotoCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[4/5] group ${className}`}>
      {/* Subtle ambient glow behind the image */}
      <div 
        className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-violet-500/20 dark:from-cyan-500/20 dark:via-blue-500/15 dark:to-indigo-500/20 rounded-3xl lg:rounded-[2.25rem] blur-2xl group-hover:blur-3xl group-hover:opacity-100 opacity-70 transition-all duration-700 pointer-events-none animate-pulse-glow" 
      />
      
      {/* Premium Image Frame */}
      <div 
        className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-cyan-500/30 shadow-2xl shadow-slate-900/10 dark:shadow-cyan-950/40 transition-all duration-500 ease-out md:group-hover:scale-[1.02] md:group-hover:-translate-y-1 bg-slate-100 dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10"
      >
        <img 
          src="/profile.jpeg" 
          alt="Daniyal Hayat, Full-Stack Web Developer" 
          className="w-full h-full object-cover [object-position:50%_0%] transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        
        {/* Subtle bottom gradient to gracefully blend suit edge */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

        {/* Subtle inner border for executive polish */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none" />
      </div>
    </div>
  );
}

export function Hero({ onOpenResume, isLoaded = true }: HeroProps) {
  const { activity } = useGitHubActivity();
  const { projects } = useGitHubRepos();

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: easeCurve,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: easeCurve,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: 0.2,
        ease: easeCurve,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        
        {/* Top Status Indicators: Availability Badge, then GitHub Activity */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          {/* 1. Availability Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-mono backdrop-blur-md self-start sm:self-auto max-w-full hover:border-cyan-500/40 transition-colors"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-700 dark:text-slate-300 truncate">
              Available for high-impact engineering &amp; product roles
            </span>
          </div>

          {/* 2. Live GitHub Status Pill */}
          <a
            href={activity.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="external"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono hover:border-cyan-500/50 transition-all shadow-xs self-start sm:self-auto max-w-full hover:shadow-cyan-500/10"
          >
            <GitBranch className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span className="text-slate-500 dark:text-slate-400 shrink-0">Git Event:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:underline truncate max-w-[180px] sm:max-w-none">
              {activity.actionText}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[10px] shrink-0">({activity.timeAgo})</span>
          </a>

        </motion.div>

        {/* Hero Grid with Profile Photo */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography, CTAs, Stats */}
          <div className="md:col-span-7 space-y-6">
            
            {/* 3. Portfolio Label / Monogram & Name Heading */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest shrink-0">
                PORTFOLIO // 2026
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-cyan-500/30 shrink-0" />
              <div className="tracking-wider uppercase text-xs sm:text-sm font-sans flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-white">
                  DANIYAL
                </span>
                <span className="font-normal text-slate-500 dark:text-slate-400">
                  HAYAT
                </span>
              </div>
            </motion.div>

            {/* 4. Cinematic Main Heading with Fluid clamp() Typography */}
            <div className="space-y-3">
              <motion.h1 
                id="hero-main-heading"
                variants={headingVariants}
                className="text-[clamp(2.1rem,7.5vw,4.5rem)] md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] break-words"
              >
                <span className="block font-bold">
                  DANIYAL <span className="font-normal text-slate-400 dark:text-slate-500">HAYAT</span>
                </span>
                <span className="block text-[clamp(1.35rem,5vw,2.75rem)] md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 leading-snug">
                  Full-Stack Web Developer
                </span>
              </motion.h1>

              {/* 5. Role Line */}
              <motion.div
                variants={itemVariants}
                className="text-xs sm:text-base md:text-lg font-mono text-cyan-700 dark:text-cyan-400 font-medium flex flex-wrap items-center gap-2 pt-1"
              >
                <span>Full-Stack Web Architect</span>
                <span>•</span>
                <span>Native Android (Kotlin)</span>
                <span>•</span>
                <span>AI Systems</span>
              </motion.div>
            </div>

            {/* 6. Short Intro */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              Crafting production web applications with React &amp; TypeScript, native Android systems with Kotlin, and AI-accelerated tooling. Focused on zero-lag performance, resilient architectures, and editorial design fidelity.
            </motion.p>

            {/* 7. Primary Action CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2"
            >
              <MagneticButton
                href="#projects"
                dataCursor="view"
                className="min-h-[44px] px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] hover:shadow-cyan-500/40"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                dataCursor="pointer"
                className="min-h-[44px] px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] hover:border-cyan-500/40"
              >
                <Mail className="w-4 h-4 text-cyan-500" />
                <span>Get in Touch</span>
              </MagneticButton>

              <div className="flex items-center gap-2">
                {onOpenResume && (
                  <MagneticButton
                    onClick={onOpenResume}
                    dataCursor="pointer"
                    className="flex-1 sm:flex-none min-h-[44px] px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-mono transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] hover:border-cyan-500/40"
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
                  className="min-w-[44px] min-h-[44px] p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 hover:border-cyan-500/40"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>

            {/* 8. Quick Metrics / Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-lg border-t border-slate-200 dark:border-slate-800/80 font-mono text-xs"
            >
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">{projects.length > 0 ? projects.length : "7+"}</span>
                <span className="text-slate-500 dark:text-slate-400">Public Repos</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 dark:text-white">Active</span>
                <span className="text-slate-500 dark:text-slate-400">GitHub Presence</span>
              </div>
              <div className="hidden sm:block">
                <span className="block text-xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-slate-500 dark:text-slate-400">Commitment</span>
              </div>
            </motion.div>

            {/* 9. Mobile Profile Photo (under 768px): Centered width of ~75vw below primary CTA buttons and stats */}
            <motion.div
              variants={photoVariants}
              className="flex md:hidden justify-center items-center pt-4 pb-2 my-2"
            >
              <ProfilePhotoCard className="w-[75vw] max-w-[340px]" />
            </motion.div>

          </div>

          {/* Right Column: Professional Profile Photo for Tablet & Desktop (>= 768px) */}
          <motion.div
            variants={photoVariants}
            className="hidden md:flex md:col-span-5 items-center justify-center relative mt-8 md:mt-0"
          >
            <ProfilePhotoCard className="w-full max-w-[320px] md:max-w-[350px] lg:max-w-[390px] xl:max-w-[420px]" />
          </motion.div>

        </div>

      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
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
