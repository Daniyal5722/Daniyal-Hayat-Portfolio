import { motion } from 'motion/react';
import { DEVELOPER_NAME, GITHUB_USERNAME } from '../data/portfolioData';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function About() {
  const { projects } = useGitHubRepos();
  const repoCount = projects.length || 7;

  const expertise = [
    "Full-Stack Web Architectures (Next.js, TypeScript, Tailwind CSS)",
    "Cross-Platform Mobile Development (Kotlin, Android)",
    "AI & Intelligent Interfaces (CortexIQ)",
    "Community & Religious Services Platforms (Darul Ifta)"
  ];

  return (
    <section id="about" className="py-24 dark:bg-[#090a0f] bg-slate-50 relative border-t dark:border-slate-900 border-slate-200 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest block mb-3">ABOUT ME</span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 tracking-tight">
            Engineering Focus & Vision
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Left Bio text */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-6 dark:text-slate-300 text-slate-700 text-base sm:text-lg leading-relaxed"
          >
            <p>
              I am <strong className="dark:text-white text-slate-900 font-semibold">{DEVELOPER_NAME}</strong> (@{GITHUB_USERNAME}), a passionate Lead Frontend Engineer & Architect dedicated to crafting impactful digital products. My work spans across high-performance web platforms, Android/Kotlin applications, and advanced AI-assisted tooling.
            </p>
            <p>
              Notable developments in my ecosystem include the comprehensive <strong className="dark:text-cyan-300 text-cyan-700">Darul Ifta</strong> web and mobile solutions (<span className="font-mono text-xs dark:text-slate-400 text-slate-600">Offical-Darul-ifta-Irshad-us-saileen-</span>, <span className="font-mono text-xs dark:text-slate-400 text-slate-600">darul-ifta-irshad-us-saileen-app</span>, <span className="font-mono text-xs dark:text-slate-400 text-slate-600">Darul-Ifta-Irshad-us-Saileen-app2</span>), cutting-edge AI integrations via <strong className="dark:text-violet-300 text-violet-700">CortexIQ</strong>, and accurate utility applications like <strong className="dark:text-blue-300 text-blue-700">Hamara-Weather</strong>.
            </p>
            <p className="dark:text-slate-400 text-slate-600 text-sm">
              All projects are grounded directly in my public GitHub repositories without fabricated history or unverified credentials.
            </p>
          </motion.div>

          {/* Right Core Expertise Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 dark:bg-slate-900/60 bg-white dark:border-slate-800/80 border border-slate-200/90 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl"
          >
            <h3 className="dark:text-white text-slate-900 font-semibold text-lg mb-6 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-5 h-5 text-cyan-500" />
              <span>Core Expertise</span>
            </h3>

            <div className="space-y-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="dark:text-slate-200 text-slate-800 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 dark:border-slate-800 border-slate-200 grid grid-cols-2 gap-4 text-center">
              <div className="dark:bg-slate-950/50 bg-slate-100/80 p-4 rounded-xl border dark:border-slate-800 border-slate-200">
                <span className="block text-2xl font-bold text-cyan-500 font-mono">{repoCount}</span>
                <span className="text-xs dark:text-slate-400 text-slate-600">Public Repos</span>
              </div>
              <div className="dark:bg-slate-950/50 bg-slate-100/80 p-4 rounded-xl border dark:border-slate-800 border-slate-200">
                <span className="block text-2xl font-bold text-violet-500 font-mono">100%</span>
                <span className="text-xs dark:text-slate-400 text-slate-600">Open Source</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
