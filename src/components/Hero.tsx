import { motion } from 'motion/react';
import { Terminal, Cpu, ArrowRight, Github, Mail, Sparkles, Database, GitBranch } from 'lucide-react';
import { GITHUB_PROFILE_URL, DEVELOPER_NAME } from '../data/portfolioData';
import { useGitHubActivity } from '../hooks/useGitHubActivity';

export function Hero() {
  const { activity } = useGitHubActivity();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Animated background glow & grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-violet-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Live GitHub Status Badge ("Currently Building") */}
          <motion.a
            href={activity.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-200 text-xs font-mono mb-8 shadow-md backdrop-blur-md transition-all hover:scale-105"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-cyan-400 font-semibold">Currently Building:</span>
            <span className="text-slate-300 group-hover:text-cyan-300 transition-colors underline decoration-cyan-500/30">
              {activity.actionText}
            </span>
            <GitBranch className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors ml-1" />
          </motion.a>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2 mb-6"
          >
            <span className="text-slate-400 text-sm sm:text-base font-mono block">Hi, I'm</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              {DEVELOPER_NAME}
            </h1>
          </motion.div>

          {/* Subtitle / Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10"
          >
            Architecting robust web & mobile applications, AI-driven tools, and immersive digital platforms with precision and performance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Live Apps & Repos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium text-sm transition-all shadow-sm"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub Profile</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium text-sm transition-all"
            >
              <Mail className="w-4 h-4 text-violet-400" />
              <span>Contact Me</span>
            </a>
          </motion.div>

          {/* Floating Feature Cards / Mini Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">5 Real Repos</h3>
                <p className="text-slate-400 text-xs">Production & Open Source</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left group hover:border-violet-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI & Mobile</h3>
                <p className="text-slate-400 text-xs">CortexIQ & Kotlin Apps</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-left group hover:border-blue-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Darul Ifta</h3>
                <p className="text-slate-400 text-xs">Web & App Ecosystem</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
