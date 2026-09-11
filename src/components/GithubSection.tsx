import { motion } from 'motion/react';
import { Github } from 'lucide-react';
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function GithubSection() {
  const { projects } = useGitHubRepos();
  const repoCount = projects.length;

  return (
    <section id="github" className="py-24 bg-[#090a0f] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <motion.div variants={itemVariants} className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Github className="w-8 h-8" />
            </motion.div>

            <motion.span variants={itemVariants} className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">OPEN SOURCE PROFILE</motion.span>
            
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Daniyal's GitHub
            </motion.h2>

            <motion.p variants={itemVariants} className="text-slate-300 text-base leading-relaxed">
              Check out active repositories, contributions, and ongoing commits directly on GitHub under <strong className="text-white font-mono">@{GITHUB_USERNAME}</strong>.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="block text-xl font-bold text-cyan-400 font-mono">{repoCount > 0 ? repoCount : "5"}</span>
                <span className="text-xs text-slate-400">Public Repos</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="block text-xl font-bold text-violet-400 font-mono">TypeScript</span>
                <span className="text-xs text-slate-400">Primary Stack</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                <span className="block text-xl font-bold text-emerald-400 font-mono">Kotlin</span>
                <span className="text-xs text-slate-400">Mobile Apps</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Visit github.com/{GITHUB_USERNAME}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
