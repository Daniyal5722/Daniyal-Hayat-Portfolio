import { MARQUEE_TECH_STACK } from '../data/portfolioData';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Palette, 
  Cpu, 
  Server, 
  Terminal, 
  Globe, 
  Sparkles,
  GitBranch
} from 'lucide-react';

export function TechStack() {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'typescript':
      case 'html5 & css3':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'react':
      case 'next.js':
      case 'motion':
        return <Layers className="w-4 h-4 text-blue-400" />;
      case 'kotlin':
      case 'android sdk':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'tailwind css':
      case 'responsive ui':
        return <Palette className="w-4 h-4 text-sky-400" />;
      case 'google gemini ai':
        return <Cpu className="w-4 h-4 text-purple-400" />;
      case 'node.js':
      case 'restful apis':
        return <Server className="w-4 h-4 text-amber-400" />;
      case 'vite':
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'git & github':
        return <GitBranch className="w-4 h-4 text-rose-400" />;
      default:
        return <Terminal className="w-4 h-4 text-cyan-400" />;
    }
  };

  // Duplicate the list to create a seamless infinite loop
  const marqueeItems = [...MARQUEE_TECH_STACK, ...MARQUEE_TECH_STACK];

  return (
    <section className="py-10 overflow-hidden relative border-y dark:border-slate-800/60 border-slate-200/80 bg-slate-100/40 dark:bg-slate-950/40 backdrop-blur-sm">
      {/* Side gradient fades for subtle seamless blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#090a0f] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#090a0f] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Core Engineering Stack & Tooling</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
          Hover to pause marquee
        </span>
      </div>

      <div className="overflow-hidden no-scrollbar">
        <div className="animate-marquee flex items-center gap-4 py-2">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border dark:border-slate-800 border-slate-200 bg-white/70 dark:bg-slate-900/70 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-200 shadow-xs hover:shadow-cyan-500/10 cursor-default group shrink-0"
            >
              <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                {getIcon(tech.name)}
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
