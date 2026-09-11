import { DEVELOPER_NAME, GITHUB_PROFILE_URL } from '../data/portfolioData';
import { Github, Code, Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#06070a] border-t border-slate-900 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2 text-slate-300">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>© {currentYear} {DEVELOPER_NAME}. Built with precision & minimalist restraint.</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </a>
          <a
            href="#projects"
            className="hover:text-cyan-400 transition-colors"
          >
            Projects
          </a>
        </div>

      </div>
    </footer>
  );
}
