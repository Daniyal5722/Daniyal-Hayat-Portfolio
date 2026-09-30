import React from 'react';
import { DEVELOPER_NAME, GITHUB_PROFILE_URL, LIVE_PORTFOLIO_URL, NAV_LINKS } from '../data/portfolioData';
import { ArrowUp, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 bg-[#06080d] border-t border-slate-800 text-slate-400 text-xs font-mono relative" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-500">
              DH
            </span>
            <div>
              <span className="font-bold text-slate-200 tracking-tight block">
                {DEVELOPER_NAME}
              </span>
              <span className="text-[11px] text-slate-500">
                Software Engineer &amp; Builder
              </span>
            </div>
          </div>

          {/* Accessible Back-to-Top Control */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[40px] text-xs font-mono"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>

        </div>

        {/* Middle Navigation Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-slate-500 text-xs">
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors py-1 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Daniyal Hayat on GitHub"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded min-h-[36px]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-1 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded min-h-[36px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Transmission</span>
            </a>
          </div>
        </div>

        {/* Bottom Attribution & Integrity Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-6 border-t border-slate-900 text-slate-500 text-[11px]">
          <div>
            © {currentYear} {DEVELOPER_NAME}. Built with React 19, TypeScript &amp; Tailwind CSS.
          </div>
          <div className="text-slate-600">
            Proof of work over empty templates · WCAG AA Compliant
          </div>
        </div>

      </div>
    </footer>
  );
}
