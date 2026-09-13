import { useEffect, useState, useRef } from 'react';
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
  const [scrollVelocity, setScrollVelocity] = useState(1);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Subtle acceleration on rapid scrolling (max 2.2x)
      const factor = Math.min(1 + delta * 0.02, 2.2);
      setScrollVelocity(factor);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setScrollVelocity(1);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
  const repeatedTypography = [...typographicPhrases, ...typographicPhrases, ...typographicPhrases];
  const repeatedTech = [...MARQUEE_TECH_STACK, ...MARQUEE_TECH_STACK];

  return (
    <section className="py-12 overflow-hidden relative border-y dark:border-slate-800/80 border-slate-200/80 bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-sm select-none">
      
      {/* Side gradient blends */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#090a0f] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#090a0f] to-transparent" />

      {/* Row 1: High-impact editorial typographic marquee (Left to Right) */}
      <div className="overflow-hidden mb-5">
        <div 
          className="flex items-center gap-8 whitespace-nowrap animate-marquee"
          style={{ 
            animationDuration: `${32 / scrollVelocity}s`,
            animationDirection: 'reverse'
          }}
        >
          {repeatedTypography.map((word, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tighter text-slate-300/40 dark:text-slate-800/80 uppercase">
                {word}
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-500/40 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Verified Technologies & Tooling (Right to Left, pauses on hover) */}
      <div className="overflow-hidden">
        <div 
          className="flex items-center gap-4 py-1 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: `${28 / scrollVelocity}s` }}
        >
          {repeatedTech.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              data-cursor="pointer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl border dark:border-slate-800 border-slate-200 bg-white dark:bg-slate-900/80 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 transition-all duration-200 shadow-xs cursor-default shrink-0 group"
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
      </div>

    </section>
  );
}
