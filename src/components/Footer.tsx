import { DEVELOPER_NAME, GITHUB_PROFILE_URL, LIVE_DEPLOYMENTS } from '../data/portfolioData';
import { Github, ExternalLink, Terminal } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-[#06070a] border-t border-slate-900 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Live Sites Quick Bar in Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-900/80">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Live Deployments:</span>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>© {currentYear} {DEVELOPER_NAME}. Synchronized with GitHub API.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub Profile
            </a>
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              All Projects
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

