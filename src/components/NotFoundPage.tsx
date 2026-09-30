import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Compass, Terminal } from 'lucide-react';
import { DEVELOPER_NAME } from '../data/portfolioData';

export function NotFoundPage() {
  useEffect(() => {
    document.title = `404: Page Not Found | ${DEVELOPER_NAME}`;
  }, []);

  return (
    <main id="main-content" className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 mx-auto">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-rose-500 font-bold uppercase tracking-wider">
            STATUS // 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The route or case study you requested does not exist or has been relocated within the architecture.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono transition-colors min-h-[44px]"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Explore Work</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
