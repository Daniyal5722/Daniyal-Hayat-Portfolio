import { DEVELOPER_NAME, GITHUB_PROFILE_URL, LIVE_DEPLOYMENTS, LIVE_PORTFOLIO_URL } from '../data/portfolioData';
import { Github, ExternalLink, Terminal, ArrowUp, Mail, Heart, Code2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Row: Brand & Quick Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span>{DEVELOPER_NAME}</span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-sm">
              Software Engineer & Product Builder crafting resilient web platforms, native Android apps, and AI workflows.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors shadow-xs cursor-pointer"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Sites Quick Bar in Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Live Production Deployments:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <a
                key={idx}
                href={deploy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>{deploy.title}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400/70" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© {currentYear} {DEVELOPER_NAME}. Built with React, TypeScript & Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#experience"
              className="hover:text-cyan-400 transition-colors"
            >
              Timeline
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
