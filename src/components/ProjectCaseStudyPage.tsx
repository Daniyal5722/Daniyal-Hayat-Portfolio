import React, { useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { CURATED_PROJECTS, DEVELOPER_NAME } from '../data/portfolioData';
import { ProjectVisual } from './ProjectVisual';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Code2, 
  Cpu, 
  Sparkles,
  Clock
} from 'lucide-react';

export function ProjectCaseStudyPage() {
  const [match, params] = useRoute<{ slug: string }>('/projects/:slug');
  const [, navigate] = useLocation();
  const slug = match && params ? params.slug : undefined;

  const projectIndex = CURATED_PROJECTS.findIndex((p) => p.slug === slug);
  const project = projectIndex !== -1 ? CURATED_PROJECTS[projectIndex] : null;

  // Determine Previous & Next projects for seamless navigation
  const prevProject = projectIndex > 0 ? CURATED_PROJECTS[projectIndex - 1] : CURATED_PROJECTS[CURATED_PROJECTS.length - 1];
  const nextProject = projectIndex < CURATED_PROJECTS.length - 1 ? CURATED_PROJECTS[projectIndex + 1] : CURATED_PROJECTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (project) {
      document.title = `${project.displayName} – Case Study | ${DEVELOPER_NAME}`;
    }
  }, [slug, project]);

  if (!project) {
    return (
      <main id="main-content" className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <span className="font-mono text-xs text-rose-500 font-bold uppercase tracking-wider">
            PROJECT NOT FOUND
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Case Study Unavailable
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The requested project slug "{slug}" does not exist in the verified curated catalog.
          </p>
          <div className="pt-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Selected Work</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { caseStudy } = project;

  return (
    <main id="main-content" className="py-10 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-cyan-500 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#work" className="hover:text-cyan-500 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
            Selected Work
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">
            {project.displayName}
          </span>
        </nav>

        {/* Case Study Hero Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{project.role}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            {project.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{project.readingTime}</span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {project.displayName}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {project.oneLiner}
          </p>

          {/* Action Links & Verified Credentials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live production deployment of ${project.displayName} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm shadow-sm shadow-cyan-500/20 transition-all focus-visible:ring-2 focus-visible:ring-cyan-300 min-h-[44px]"
              >
                <span>Launch Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View public source repository on GitHub for ${project.displayName} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px]"
            >
              <Github className="w-4 h-4 text-cyan-500" />
              <span>Inspect Source Repository</span>
            </a>
          </div>

          {/* Key Metric Facts Strip (Truthful & Verified Only) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Featured Visual Mockup Representation */}
        <section aria-label="Visual Overview" className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-2 sm:p-4 shadow-xl">
          <ProjectVisual project={project} />
        </section>

        {/* Executive Overview */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
            01 // PROJECT OVERVIEW
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {caseStudy.overview}
          </p>
        </section>

        {/* Problem & Solution Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
          
          {/* Problem Statement */}
          <section className="space-y-3 p-5 rounded-2xl bg-rose-500/[0.03] dark:bg-rose-500/[0.04] border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>02 // The Problem</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {caseStudy.problem}
            </p>
          </section>

          {/* Solution & Implementation */}
          <section className="space-y-3 p-5 rounded-2xl bg-cyan-500/[0.03] dark:bg-cyan-500/[0.04] border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>03 // The Solution</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {caseStudy.solution}
            </p>
          </section>

        </div>

        {/* Technical Decisions & Architecture Trade-offs */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              04 // TECHNICAL DECISIONS &amp; TRADE-OFFS
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Architectural choices made during design and engineering, balanced against real constraints.
            </p>
          </div>

          <div className="space-y-4">
            {caseStudy.technicalDecisions.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-500 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.decision}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm pl-8">
                  <div>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase font-bold block mb-1">
                      Rationale
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.rationale}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-amber-600 dark:text-amber-400 uppercase font-bold block mb-1">
                      Trade-Off Considered
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.tradeOff}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture Layers */}
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              05 // SYSTEM ARCHITECTURE &amp; STACK
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Layer-by-layer breakdown of the technologies powering the application.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {caseStudy.architecture.map((arch, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{arch.layer}</span>
                  <span className="text-slate-500">Layer {idx + 1}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {arch.stack}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {arch.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Truthful & Measurable Outcomes */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
            06 // MEASURABLE OUTCOMES
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {caseStudy.outcomes.map((outcome, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="space-y-3 p-6 rounded-2xl bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05] border border-cyan-500/20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
            07 // ENGINEERING LESSONS LEARNED
          </h2>
          <blockquote className="text-base text-slate-700 dark:text-slate-200 italic leading-relaxed">
            "{caseStudy.lessonsLearned}"
          </blockquote>
        </section>

        {/* Next / Previous Project Navigation */}
        <nav 
          aria-label="Case Study Navigation" 
          className="pt-8 border-t border-slate-200 dark:border-slate-800 grid sm:grid-cols-2 gap-4"
        >
          {/* Previous Project */}
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 bg-white dark:bg-slate-900/60 transition-colors flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Project
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm block group-hover:text-cyan-400 transition-colors">
                {prevProject.displayName}
              </span>
            </div>
          </Link>

          {/* Next Project */}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 bg-white dark:bg-slate-900/60 transition-colors flex items-center justify-between text-right group focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <div className="space-y-1 w-full">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block flex items-center justify-end gap-1">
                Next Project
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm block group-hover:text-cyan-400 transition-colors">
                {nextProject.displayName}
              </span>
            </div>
          </Link>
        </nav>

        {/* Back to Home CTA */}
        <div className="text-center pt-4">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors py-2 px-3 focus-visible:ring-2 focus-visible:ring-cyan-400 rounded min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Selected Projects</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
