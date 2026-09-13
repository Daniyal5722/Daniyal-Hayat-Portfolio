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
  Network,
  LayoutGrid,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  icon: string;
  badge: string;
  connections: string[];
}

export function Skills() {
  const [viewMode, setViewMode] = useState<'ecosystem' | 'grid'>('ecosystem');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ['All', ...SKILL_GROUPS.map(g => g.category)];

  const allSkills: SkillNode[] = SKILL_GROUPS.flatMap((group) =>
    group.skills.map((skill) => {
      // Connect logically related technologies
      let related: string[] = [];
      if (skill.name.includes('React') || skill.name.includes('Next.js')) {
        related = ['TypeScript', 'Tailwind CSS', 'Responsive UI Design', 'Motion Animations'];
      } else if (skill.name.includes('TypeScript')) {
        related = ['React & Next.js', 'Node.js & Express', 'RESTful API Design'];
      } else if (skill.name.includes('Kotlin') || skill.name.includes('Android')) {
        related = ['Kotlin & Java', 'Android SDK & Jetpack', 'RESTful API Design'];
      } else if (skill.name.includes('Gemini') || skill.name.includes('AI')) {
        related = ['Google Gemini API', 'TypeScript', 'Full-Stack Architecture'];
      } else if (skill.name.includes('Tailwind')) {
        related = ['React & Next.js', 'Responsive UI Design', 'Motion Animations'];
      } else {
        related = ['TypeScript', 'Git & GitHub'];
      }

      return {
        id: skill.name,
        name: skill.name,
        category: group.category,
        level: skill.level,
        description: skill.description,
        icon: skill.icon,
        badge: skill.badge,
        connections: related,
      };
    })
  );

  const displayedSkills = selectedCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === selectedCategory);

  const activeSkillObj = allSkills.find(s => s.id === hoveredSkill);

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
        
        {/* Section Heading & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Skills & Technology Matrix
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore my technical architecture as an interconnected ecosystem. Hover any node to trace relationships and view implementation depth.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs self-start md:self-auto">
            <button
              onClick={() => {
                setViewMode('ecosystem');
                soundManager.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                viewMode === 'ecosystem'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Ecosystem Nodes</span>
            </button>
            <button
              onClick={() => {
                setViewMode('grid');
                soundManager.playClick();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  soundManager.playClick();
                }}
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

        {/* Interactive Ecosystem Mode */}
        {viewMode === 'ecosystem' ? (
          <div className="rounded-3xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
            
            {/* Active Node Detail Banner */}
            <div className="mb-8 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 block">
                  {activeSkillObj ? 'INSPECTING NODE' : 'INTERACTIVE TIP'}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {activeSkillObj ? (
                    <>
                      <span>{activeSkillObj.name}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-normal">
                        {activeSkillObj.level}
                      </span>
                    </>
                  ) : (
                    <span>Hover or click any node to trace relationships</span>
                  )}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  {activeSkillObj ? activeSkillObj.description : 'Technologies connect across frontend rendering, state layers, mobile native bridges, and AI inference engines.'}
                </p>
              </div>

              {activeSkillObj && (
                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  <span className="text-[11px] font-mono text-slate-400">Interlinked with:</span>
                  {activeSkillObj.connections.map((conn) => (
                    <span
                      key={conn}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
                    >
                      {conn}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Nodes Ecosystem Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {displayedSkills.map((node) => {
                const isHovered = hoveredSkill === node.id;
                const isConnected = hoveredSkill 
                  ? (activeSkillObj?.connections.includes(node.name) || activeSkillObj?.name === node.name)
                  : false;

                return (
                  <motion.div
                    key={node.id}
                    onMouseEnter={() => {
                      setHoveredSkill(node.id);
                      soundManager.playHover();
                    }}
                    onClick={() => {
                      setHoveredSkill(node.id);
                      soundManager.playClick();
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                      isHovered
                        ? 'bg-cyan-500/15 border-cyan-500 dark:border-cyan-400 shadow-lg shadow-cyan-500/10'
                        : isConnected
                          ? 'bg-blue-500/10 border-blue-400/80 dark:border-blue-500/80 shadow-xs'
                          : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                          {getIcon(node.icon)}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isHovered || isConnected
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {node.badge}
                        </span>
                      </div>

                      <h4 className={`text-xs sm:text-sm font-bold transition-colors ${
                        isHovered ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'
                      }`}>
                        {node.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{node.category.split(' ')[0]}</span>
                      {isConnected && (
                        <span className="text-cyan-500 font-semibold">LINKED</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        ) : (
          /* Grid View Mode */
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
        )}

      </div>
    </section>
  );
}
