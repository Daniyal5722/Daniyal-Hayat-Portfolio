import { motion } from 'motion/react';
import { Code, Layers, Smartphone, Palette, Cpu, Server } from 'lucide-react';
import { TECHNICAL_SKILLS } from '../data/portfolioData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Skills() {
  const getSkillIcon = (icon: string) => {
    switch (icon) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-violet-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-yellow-400" />;
      default:
        return <Code className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 dark:bg-[#090a0f] bg-slate-50 relative border-t dark:border-slate-900 border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest block mb-3">TECHNICAL PROFICIENCY</span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 tracking-tight">
            Core Engineering Stack
          </h2>
        </motion.div>

        {/* Skills Grid with Staggered Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TECHNICAL_SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="group rounded-2xl dark:bg-slate-900/60 bg-white dark:border-slate-800/80 border border-slate-200/90 hover:border-cyan-500/40 p-6 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {getSkillIcon(skill.icon)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="dark:text-white text-slate-900 font-semibold text-base">{skill.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 text-cyan-600 dark:text-cyan-400 font-medium">
                    {skill.level}
                  </span>
                </div>
                <p className="dark:text-slate-400 text-slate-500 text-xs font-mono">
                  Used in {skill.projectCount} {skill.projectCount === 1 ? 'project' : 'projects'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
