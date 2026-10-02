import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Copy, 
  Check, 
  Printer, 
  Eye, 
  Layers, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { 
  DEVELOPER_NAME, 
  DEVELOPER_EMAIL, 
  DEVELOPER_ROLE,
  GITHUB_USERNAME, 
  GITHUB_PROFILE_URL,
  LIVE_PORTFOLIO_URL,
  PROJECTS,
  SKILL_GROUPS,
  EDUCATION_DATA,
  RESUME_PDF_PATH,
  RESUME_FILENAME
} from '../data/portfolioData';
import { soundManager } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<'pdf' | 'ats'>('pdf');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundManager.playClick();
        onClose();
      }
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
    soundManager.playClick();
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyFullTextResume = () => {
    soundManager.playClick();
    const text = `${DEVELOPER_NAME}
${DEVELOPER_ROLE}
Email: ${DEVELOPER_EMAIL}
GitHub: ${GITHUB_PROFILE_URL}
Portfolio: ${LIVE_PORTFOLIO_URL}
Resume PDF: ${LIVE_PORTFOLIO_URL}resume/${RESUME_FILENAME}

EXECUTIVE SUMMARY
Full-Stack Developer and Native Android Engineer specializing in modern web applications (React, Next.js, TypeScript), native mobile development in Kotlin, and intelligent generative AI pipelines with Google AI Studio and Gemini models. Committed to clean architecture, zero-bloat performance, accessible UX/UI craft, and resilient offline capabilities.

TECHNICAL CORE PROFICIENCIES
${SKILL_GROUPS.map(g => `${g.category.toUpperCase()}: ${g.skills.map(s => s.name).join(', ')}`).join('\n')}

SELECTED PRODUCTION PROJECTS
${PROJECTS.slice(0, 6).map(p => `• ${p.displayName} (${p.category})\n  ${p.description}\n  Tech: ${p.technologies.join(', ')}\n  GitHub: ${p.githubUrl}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ''}`).join('\n\n')}

EXPERIENCE & MILESTONES
• 2025 — Present: Full-Stack Web & Native Android Developer (Independent Software Engineer)
  Architecting production web platforms and native mobile apps with performance, type safety, and accessibility.
• 2024 — 2025: Mobile Application Developer (Native Android & Algorithmic Systems Focus)
  Mastered Kotlin Android architecture, Room database, offline synchronization routines, and touch-optimized canvas engines.
• 2023 — 2024: Frontend Developer (Modern Web Engineering & React Foundations)
  Built responsive web platforms, async REST API integrations, and component-driven design systems.

EDUCATION & CONTINUOUS LEARNING
${EDUCATION_DATA.map(e => `• ${e.program} — ${e.institution} (${e.timeline})\n  ${e.description}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md print:hidden"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[92vh] max-h-[920px] flex flex-col rounded-2xl bg-white dark:bg-[#0c0d14] border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden z-10 print:max-h-none print:h-auto print:shadow-none print:border-none print:m-0"
          >
            {/* Top Control Bar */}
            <div className="flex items-center justify-between px-3.5 py-3 sm:px-6 sm:py-3.5 border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-[#11131f]/90 backdrop-blur-md shrink-0 z-20 print:hidden gap-2">
              
              {/* Left Zone: Title & View Switcher */}
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block">
                    <h2 id="resume-dialog-title" className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                      {DEVELOPER_NAME} — Curriculum Vitae
                    </h2>
                    <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 block">
                      Verified PDF &amp; ATS Version
                    </span>
                  </div>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center p-0.5 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-300/70 dark:border-slate-800 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('pdf');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      viewMode === 'pdf'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    PDF Document
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setViewMode('ats');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      viewMode === 'ats'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    ATS Reader
                  </button>
                </div>
              </div>

              {/* Right Zone: Primary Actions (Download, Open Tab, Copy, Close) */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                
                {/* Direct Open in New Tab Button */}
                <a
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-300/80 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all shadow-xs active:scale-[0.98]"
                  title="View Daniyal Hayat Resume PDF in new browser tab"
                  aria-label="View Daniyal Hayat Resume PDF"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="hidden md:inline">Open in Tab</span>
                </a>

                {/* Direct Download PDF Button */}
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  onClick={() => soundManager.playClick()}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-xs active:scale-[0.98]"
                  title="Download Daniyal Hayat Resume PDF directly"
                  aria-label="Download Daniyal Hayat Resume PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Download</span>
                </a>

                {/* Copy Plain Text */}
                <button
                  type="button"
                  onClick={copyFullTextResume}
                  className="hidden lg:inline-flex min-h-[36px] items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-300/80 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all shadow-xs cursor-pointer"
                  title="Copy ATS formatted text to clipboard"
                  aria-label="Copy ATS plain text resume"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedText ? 'Copied' : 'Copy Text'}</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close resume viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-100/60 dark:bg-[#07090e]">
              
              {/* TAB 1: PDF Viewer */}
              {viewMode === 'pdf' && (
                <div className="w-full h-full flex flex-col relative overflow-hidden">
                  
                  {/* Mobile Helper Callout */}
                  {isMobile && (
                    <div className="p-3 bg-cyan-500/10 border-b border-cyan-500/20 text-xs flex items-center justify-between gap-2 shrink-0">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        Viewing real vector PDF document.
                      </span>
                      <a
                        href={RESUME_PDF_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px] shrink-0"
                      >
                        Full Screen ↗
                      </a>
                    </div>
                  )}

                  {/* Embedded PDF Viewer or Fallback */}
                  {!pdfLoadError ? (
                    <div className="w-full h-full relative flex-1 bg-slate-200/50 dark:bg-slate-950">
                      <object
                        data={`${RESUME_PDF_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                        type="application/pdf"
                        className="w-full h-full border-0 block"
                        title="Daniyal Hayat Official Resume PDF"
                        onError={() => setPdfLoadError(true)}
                      >
                        <iframe
                          src={`${RESUME_PDF_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                          className="w-full h-full border-0"
                          title="Daniyal Hayat Official Resume PDF Viewer"
                          onError={() => setPdfLoadError(true)}
                        />
                      </object>
                    </div>
                  ) : (
                    /* Clean Fallback if PDF fails or cannot load */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <AlertCircle className="w-7 h-7" />
                      </div>
                      <div className="space-y-1.5 max-w-md">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          Resume PDF unavailable
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          Your browser may block embedded PDF previews. You can view or download the original resume PDF directly below.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <a
                          href={RESUME_PDF_PATH}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View Daniyal Hayat Resume PDF"
                          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 active:scale-[0.98]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open Resume</span>
                        </a>
                        <a
                          href={RESUME_PDF_PATH}
                          download={RESUME_FILENAME}
                          aria-label="Download Daniyal Hayat Resume"
                          className="min-h-[44px] px-6 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all inline-flex items-center gap-2 active:scale-[0.98]"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Resume</span>
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: Structured ATS View */}
              {viewMode === 'ats' && (
                <div 
                  id="printable-resume-content"
                  className="w-full h-full overflow-y-auto p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8 text-slate-800 dark:text-slate-200 font-sans print:p-0 print:text-black bg-white dark:bg-[#0c0d14]"
                >
                  {/* Header / Contact Info */}
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black">
                        {DEVELOPER_NAME}
                      </h1>
                      <span className="text-sm font-mono text-cyan-700 dark:text-cyan-400 font-bold print:text-slate-800">
                        {DEVELOPER_ROLE}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                      Full-Stack Developer and Native Android Engineer specializing in modern web platforms (React, Next.js, TypeScript), native mobile solutions in Kotlin, and intelligent generative AI pipelines with Google AI Studio and Gemini models.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-mono text-slate-600 dark:text-slate-400 pt-2">
                      <button
                        onClick={copyEmail}
                        className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
                        title="Copy email"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>{DEVELOPER_EMAIL}</span>
                        {copiedEmail ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-60" />}
                      </button>

                      <a
                        href={GITHUB_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>github.com/{GITHUB_USERNAME}</span>
                      </a>

                      <a
                        href={LIVE_PORTFOLIO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Live Portfolio</span>
                      </a>
                    </div>
                  </div>

                  {/* Technical Core Stack */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>Technical Core Proficiencies</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      {SKILL_GROUPS.map((group, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800">
                          <span className="font-bold text-slate-900 dark:text-white block mb-1">
                            {group.category}
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">
                            {group.skills.map(s => s.name).join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Production Projects */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>Selected Production Projects &amp; Open Source</span>
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                      {PROJECTS.filter(p => p.featured || p.id.includes('darul') || p.id.includes('cortex')).slice(0, 5).map((p) => (
                        <div key={p.id} className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                              {p.displayName}
                            </h3>
                            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                              {p.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {p.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {p.technologies.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience Milestones */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Experience &amp; Engineering Milestones</span>
                    </h2>
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                          <span>Full-Stack Web &amp; Native Android Developer</span>
                          <span className="font-mono text-cyan-700 dark:text-cyan-400 font-normal">2025 — Present</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 block">Independent Software Engineer &amp; Product Builder</span>
                        <p className="text-slate-600 dark:text-slate-300 pt-1">
                          Architecting production web platforms and native mobile apps with strict emphasis on performance, type safety, accessibility, and modern UI craft.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                          <span>Mobile Application Developer</span>
                          <span className="font-mono text-cyan-700 dark:text-cyan-400 font-normal">2024 — 2025</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 block">Native Android &amp; Algorithmic Systems Focus</span>
                        <p className="text-slate-600 dark:text-slate-300 pt-1">
                          Mastered Kotlin Android architecture, Room database, offline synchronization routines, and touch-optimized canvas engines.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education & Foundations */}
                  <div className="space-y-3">
                    <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-700 dark:text-cyan-400 font-bold flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>Education &amp; Foundations</span>
                    </h2>
                    <div className="space-y-2.5">
                      {EDUCATION_DATA.map((edu) => (
                        <div key={edu.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                            <span>{edu.program}</span>
                            <span className="font-mono text-slate-500 dark:text-slate-400 font-normal">{edu.timeline}</span>
                          </div>
                          <span className="text-slate-500 dark:text-slate-400 block font-mono text-[11px]">{edu.institution}</span>
                          <p className="text-slate-600 dark:text-slate-300">
                            {edu.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Footer Bar */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-[#11131f] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 text-center sm:text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Original Vector PDF Asset: /resume/{RESUME_FILENAME}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  title="Print or Save via Browser Print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  onClick={() => soundManager.playClick()}
                  className="min-h-[40px] px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center justify-center gap-2 active:scale-[0.98]"
                  aria-label="Download Daniyal Hayat Resume PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
