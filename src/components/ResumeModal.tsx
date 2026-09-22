import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Github, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Code, 
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { 
  DEVELOPER_NAME, 
  DEVELOPER_EMAIL, 
  GITHUB_USERNAME, 
  GITHUB_PROFILE_URL,
  LIVE_PORTFOLIO_URL,
  PROJECTS,
  SKILL_GROUPS,
  EDUCATION_DATA
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFullTextResume = () => {
    const text = `${DEVELOPER_NAME}
Software Engineer & Product Builder
Email: ${DEVELOPER_EMAIL}
GitHub: ${GITHUB_PROFILE_URL}
Portfolio: ${LIVE_PORTFOLIO_URL}

SUMMARY
Specializing in modern full-stack web applications (React, TypeScript, Next.js), native Android mobile engineering with Kotlin, and AI integrations with Google Gemini.

TECHNICAL PROFICIENCIES
${SKILL_GROUPS.map(g => `${g.category}: ${g.skills.map(s => s.name).join(', ')}`).join('\n')}

SELECTED PROJECTS
${PROJECTS.slice(0, 6).map(p => `• ${p.displayName} (${p.category})\n  ${p.description}\n  Tech: ${p.technologies.join(', ')}\n  GitHub: ${p.githubUrl}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}`).join('\n\n')}

EDUCATION & FOUNDATIONS
${EDUCATION_DATA.map(e => `• ${e.program} - ${e.institution} (${e.timeline})\n  ${e.description}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md print:hidden"
          />

          {/* Resume Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0c0d14] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 print:max-h-none print:shadow-none print:border-none print:m-0"
          >
          {/* Header Controls */}
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20 print:hidden">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                CV Preview
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                type="button"
                onClick={copyFullTextResume}
                className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                title="Copy ATS Plain Text Version"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{copiedText ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                type="button"
                id="resume-header-download-pdf-btn"
                onClick={handlePrint}
                className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-medium transition-colors cursor-pointer"
                title="Save CV as PDF via printer dialog"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div 
            id="printable-resume-content"
            className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-6 sm:space-y-8 text-slate-800 dark:text-slate-200 font-sans print:p-0 print:text-black"
          >
            
            {/* Header / Contact Info */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black">
                  {DEVELOPER_NAME}
                </h1>
                <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-semibold print:text-slate-800">
                  Full-Stack Web Developer &amp; Systems Engineer
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Specializing in modern full-stack web applications (React, TypeScript, Next.js), native Android mobile engineering with Kotlin, and AI integrations with Google Gemini.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-400 pt-2">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{DEVELOPER_EMAIL}</span>
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
                </button>

                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-500" />
                  <span>github.com/{GITHUB_USERNAME}</span>
                </a>

                <a
                  href={LIVE_PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Live Portfolio</span>
                </a>
              </div>
            </div>

            {/* Technical Stack */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Technical Proficiencies</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                {SKILL_GROUPS.map((group, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                      {group.category}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">
                      {group.skills.map(s => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>Selected Production Projects</span>
              </h2>

              <div className="space-y-4">
                {PROJECTS.filter(p => p.featured || p.id.includes('darul') || p.id.includes('cortex')).slice(0, 4).map((p) => (
                  <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {p.displayName}
                      </h3>
                      <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Foundations */}
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Education & Foundations</span>
              </h2>
              <div className="space-y-3">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-1">
                    <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                      <span>{edu.program}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400 font-normal">{edu.timeline}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="px-5 py-4 sm:px-6 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 text-center sm:text-left">
              Verified details synchronized with Daniyal Hayat's public portfolio.
            </span>
            <div className="w-full sm:w-auto flex items-center justify-center gap-2">
              <button
                type="button"
                id="resume-footer-download-pdf-btn"
                onClick={handlePrint}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download as PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
