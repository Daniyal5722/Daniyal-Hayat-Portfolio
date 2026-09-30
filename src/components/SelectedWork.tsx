import React, { useState } from 'react';
import { CURATED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { ExternalLink, Github, ArrowRight, Layers, Smartphone, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web Platform', label: 'Web Platforms' },
    { id: 'Mobile App', label: 'Android & Mobile' },
    { id: 'AI & Intelligence', label: 'AI Systems' },
  ];

  const filteredProjects = CURATED_PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Mobile App') return p.category === 'Mobile App' || p.category === 'Mobile Game';
    return p.category === activeFilter;
  });

  return (
    <section id="work" className="py-16 sm:py-24 relative border-t border-slate-800/60" aria-label="Selected Engineering Work">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
              <span>PORTFOLIO // SELECTED WORK</span>
              <span aria-hidden="true">·</span>
              <span>PROOF OF WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Curated Production Projects
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              A selection of public web platforms, native Android applications, and AI integrations built for real community consultation, meteorological telemetry, and deterministic logic.
            </p>
          </div>

          {/* Interactive Segmented Filter Controls */}
          <div 
            className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-xl self-start md:self-auto overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap min-h-[40px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  activeFilter === cat.id
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-cyan-400 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="flex flex-col rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-cyan-500/5 group"
            >
              {/* Visual Mockup Header */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/80">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="block focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-xl"
                  aria-label={`View case study for ${project.displayName}`}
                >
                  <ProjectVisual project={project} />
                </Link>
              </div>

              {/* Project Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  {/* Quiet Text Kicker - Zero Pill Discipline */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{project.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    {project.readingTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{project.readingTime}</span>
                      </>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="hover:underline focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded"
                    >
                      {project.displayName}
                    </Link>
                  </h3>

                  {/* One-Sentence Outcome-Focused Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.oneLiner}
                  </p>

                  {/* Stack Metadata - Clean Unboxed Text with Separators */}
                  <div className="pt-2 text-xs font-mono text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-slate-400 dark:text-slate-500 font-semibold">Stack:</span>
                    {project.technologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="text-slate-700 dark:text-slate-300">{tech}</span>
                        {idx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                  
                  {/* Case Study Route Link */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors py-2 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded min-h-[44px]"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {/* External Links */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.displayName} (opens in a new tab)`}
                        className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded min-h-[44px]"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.displayName} on GitHub (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-1 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded min-h-[44px]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  </div>

                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
