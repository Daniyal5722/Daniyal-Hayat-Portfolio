import { motion } from 'motion/react';
import { DEVELOPER_NAME, GITHUB_USERNAME } from '../data/portfolioData';
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
  const expertise = [
    "Full-Stack Web Architectures (Next.js, TypeScript, Tailwind CSS)",
    "Cross-Platform Mobile Development (Kotlin, Android)",
    "AI & Intelligent Interfaces (CortexIQ)",
    "Community & Religious Services Platforms (Darul Ifta)"
  ];

  return (
    <section id="about" className="py-24 bg-[#090a0f] relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-3">ABOUT ME</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
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
            className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            <p>
              I am <strong className="text-white font-semibold">{DEVELOPER_NAME}</strong> (@{GITHUB_USERNAME}), a passionate Lead Frontend Engineer & Architect dedicated to crafting impactful digital products. My work spans across high-performance web platforms, Android/Kotlin applications, and advanced AI-assisted tooling.
            </p>
            <p>
              Notable developments in my ecosystem include the comprehensive <strong className="text-cyan-300">Darul Ifta</strong> web and mobile solutions (<span className="font-mono text-xs text-slate-400">Offical-Darul-ifta-Irshad-us-saileen-</span>, <span className="font-mono text-xs text-slate-400">darul-ifta-irshad-us-saileen-app</span>, <span className="font-mono text-xs text-slate-400">Darul-Ifta-Irshad-us-Saileen-app2</span>), cutting-edge AI integrations via <strong className="text-violet-300">CortexIQ</strong>, and accurate utility applications like <strong className="text-blue-300">Hamara-Weather</strong>.
            </p>
            <p className="text-slate-400 text-sm">
              All projects are grounded directly in my public GitHub repositories without fabricated history or unverified professional credentials.
            </p>
          </motion.div>

          {/* Right Core Expertise Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl"
          >
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Core Expertise</span>
            </h3>

            <div className="space-y-4">
              {expertise.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <span className="block text-2xl font-bold text-cyan-400 font-mono">5</span>
                <span className="text-xs text-slate-400">Public Repos</span>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                <span className="block text-2xl font-bold text-violet-400 font-mono">100%</span>
                <span className="text-xs text-slate-400">Open Source</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
