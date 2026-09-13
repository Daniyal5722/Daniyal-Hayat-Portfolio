import { useState, useEffect } from 'react';
import { DEVELOPER_NAME, GITHUB_PROFILE_URL, LIVE_DEPLOYMENTS } from '../data/portfolioData';
import { Github, ExternalLink, ArrowUp, Clock, Globe } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 bg-[#06070a] border-t border-slate-800/80 text-slate-400 text-xs font-mono relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Status & Local Time Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-200 font-medium tracking-wider uppercase text-[11px]">
                Available For Work
              </span>
            </div>

            {/* Live Local Clock */}
            <div className="inline-flex items-center gap-2 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>LOCAL TIME: <strong className="text-slate-200 font-semibold">{timeString || 'SYNCING...'}</strong></span>
            </div>
          </div>

          {/* Scroll to Top */}
          <MagneticButton
            onClick={scrollToTop}
            dataCursor="pointer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Return to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </MagneticButton>

        </div>

        {/* Giant Typographic Editorial Signoff */}
        <div className="select-none py-6">
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-slate-800/40 hover:text-slate-700/60 transition-colors uppercase leading-none">
            {DEVELOPER_NAME}
          </h2>
          <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-mono text-slate-500">
            <span className="text-cyan-500">BUILD</span> • <span>CREATE</span> • <span>EXPLORE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">ENGINEERED FOR PRODUCTION SPEED &amp; RIGOR</span>
          </div>
        </div>

        {/* Live Deployments Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-900">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Direct Deployments:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <a
                key={idx}
                href={deploy.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="external"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors text-xs"
              >
                <span>{deploy.title}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400/60" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 pt-6 border-t border-slate-900/60 text-[11px]">
          <div>
            © {currentYear} {DEVELOPER_NAME}. Built with React 18, TypeScript &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="external"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              Matrix
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Transmission
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
