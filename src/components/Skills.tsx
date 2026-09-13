import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Palette, 
  Cpu, 
  Server, 
  Globe, 
  Sparkles, 
  Terminal,
  GitBranch,
  CheckCircle2
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];

  const allSkills = SKILL_GROUPS.flatMap(group => 
    group.skills.map(skill => ({ ...skill, category: group.category }))
  );

  const displayedSkills = selectedCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'code':
        return <Code2 className="w-5 h-5 text-cyan-500" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-blue-500" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-sky-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-teal-500" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-500" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'server':
        return <Server className="w-5 h-5 text-amber-500" />;
      case 'github':
        return <GitBranch className="w-5 h-5 text-rose-500" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative border-t dark:border-slate-800/80 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Architectural Toolkit
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Hands-on technologies, libraries, and design frameworks leveraged across my production web platforms, native Android applications, and AI integrations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedSkills.map((skill, idx) => (
              <motion.div
                key={`${skill.name}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-xs hover:shadow-cyan-500/5 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {getIcon(skill.icon)}
                    </div>
                    
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                        {skill.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{skill.level}</span>
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                    Verified Stack
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
