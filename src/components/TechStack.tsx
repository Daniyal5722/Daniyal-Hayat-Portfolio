import { MARQUEE_TECH_STACK } from '../data/portfolioData';
import { 
  Code2, 
  Layers, 
  Smartphone, 
  Palette, 
  Cpu, 
  Server, 
  Terminal, 
  Sparkles,
  GitBranch
} from 'lucide-react';

export function TechStack() {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'typescript':
      case 'html5 & css3':
        return <Code2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'react':
      case 'next.js':
      case 'motion':
        return <Layers className="w-3.5 h-3.5 text-blue-400" />;
      case 'kotlin':
      case 'android sdk':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
      case 'tailwind css':
      case 'responsive ui':
        return <Palette className="w-3.5 h-3.5 text-sky-400" />;
      case 'google gemini ai':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'node.js':
      case 'restful apis':
        return <Server className="w-3.5 h-3.5 text-amber-400" />;
      case 'vite':
        return <Sparkles className="w-3.5 h-3.5 text-yellow-400" />;
      case 'git & github':
        return <GitBranch className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const typographicPhrases = [
    "DESIGN", "CODE", "BUILD", "CREATE", "EXPLORE", "ARCHITECT", "SCALE", "REFINE"
  ];

  return (
    <section className="py-12 overflow-hidden relative border-y dark:border-slate-800/80 border-slate-200/80 bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-sm select-none">
      
      {/* Side gradient blends */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#090a0f] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#090a0f] to-transparent" />

      {/* Row 1: High-impact editorial typographic marquee */}
      <div className="overflow-hidden mb-4 sm:mb-5">
        <div className="animate-marquee-reverse">
          {[1, 2].map((trackKey) => (
            <div key={trackKey} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
              {typographicPhrases.map((word, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-8 shrink-0">
                  <span className="text-lg sm:text-3xl md:text-4xl font-extrabold font-mono tracking-tighter text-slate-300/50 dark:text-slate-800/90 uppercase">
                    {word}
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-500/40 shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Verified Technologies & Tooling */}
      <div className="overflow-hidden">
        <div className="animate-marquee py-1">
          {[1, 2].map((trackKey) => (
            <div key={trackKey} className="flex items-center gap-4 shrink-0 pr-4">
              {MARQUEE_TECH_STACK.map((tech, idx) => (
                <div
                  key={`${tech.name}-${idx}`}
                  data-cursor="pointer"
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl border dark:border-slate-800 border-slate-200 bg-[#fdfefe] dark:bg-slate-900/80 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 transition-all duration-200 shadow-xs cursor-default shrink-0 group"
                >
                  <div className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform">
                    {getIcon(tech.name)}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
