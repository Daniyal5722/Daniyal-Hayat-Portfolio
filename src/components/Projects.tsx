import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Folder, 
  Smartphone, 
  Cpu, 
  CloudSun, 
  Layers, 
  ArrowUpRight, 
  Star, 
  RefreshCw, 
  Search, 
  X, 
  Clock, 
  ExternalLink, 
  Globe, 
  BookOpen,
  Sparkles,
  CheckCircle2,
  Code
} from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Project } from '../types';
import { LIVE_DEPLOYMENTS } from '../data/portfolioData';
import { getEstimatedReadingTime } from '../utils/readingTime';

interface ProjectsProps {
  onOpenCaseStudy: (project: Project) => void;
}

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  index: number;
  getIcon: (iconName: string) => React.ReactNode;
  onOpenCaseStudy: (project: Project) => void;
}

function ProjectShowcase({ project, index, onOpenCaseStudy }: { project: Project, index: number, onOpenCaseStudy: (project: Project) => void, key?: React.Key }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* Visual / Image Side */}
      <div 
        className="w-full lg:w-3/5 group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-video border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer"
        onClick={() => onOpenCaseStudy(project)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Placeholder for project screenshot/graphic */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-slate-800 dark:text-slate-200 transform group-hover:scale-105 transition-transform duration-700 ease-out">
          <div className="text-4xl sm:text-6xl font-bold font-mono opacity-20 tracking-tighter">
            {project.displayName.split(' ')[0]}
          </div>
          <div className="mt-4 flex gap-2 opacity-50">
            <Code className="w-8 h-8" />
            <Layers className="w-8 h-8" />
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div>
            <div className="text-white font-bold text-lg mb-1">{project.displayName}</div>
            <div className="flex gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white backdrop-blur-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950">
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">PROJECT {(index + 1).toString().padStart(2, '0')}</span>
            <div className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{project.category}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {project.displayName}
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-3 pt-2">
          <button
            onClick={() => onOpenCaseStudy(project)}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm transition-transform hover:scale-105"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
          
          <div className="flex items-center gap-2 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="GitHub Repository">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects({ onOpenCaseStudy }: ProjectsProps) {
  const { projects, isSyncing, lastSynced, refreshRepos } = useGitHubRepos();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'live', label: 'Live Deployments' },
    { id: 'web', label: 'Web Platforms' },
    { id: 'mobile', label: 'Mobile (Kotlin)' },
    { id: 'ai', label: 'AI & Tools' }
  ];

  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (activeCategory === 'live' && !project.liveUrl) return false;
    if (activeCategory === 'mobile' && !project.category.toLowerCase().includes('mobile') && project.language !== 'Kotlin') return false;
    if (activeCategory === 'web' && (!project.category.toLowerCase().includes('web') || project.language === 'Kotlin')) return false;
    if (activeCategory === 'ai' && !project.category.toLowerCase().includes('ai') && !project.technologies.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'))) return false;

    // Search filter
    const term = searchTerm.toLowerCase();
    const matchName = project.displayName.toLowerCase().includes(term) || project.name.toLowerCase().includes(term);
    const matchDesc = project.description.toLowerCase().includes(term);
    const matchLang = project.language.toLowerCase().includes(term);
    const matchTech = project.technologies.some((tech) => tech.toLowerCase().includes(term));
    return matchName || matchDesc || matchLang || matchTech;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-blue-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'Github':
        return <Github className="w-5 h-5 text-cyan-500" />;
      default:
        return <Folder className="w-5 h-5 text-cyan-500" />;
    }
  };

  return (
    <section id="projects" className="py-24 relative border-t dark:border-slate-800/80 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Live Sync Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <Folder className="w-3.5 h-3.5" />
                <span>Selected Portfolio Work</span>
              </span>

              <button
                onClick={refreshRepos}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors shadow-xs"
                title="Sync with GitHub API"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-500' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : lastSynced ? `Synced ${lastSynced}` : 'Sync with GitHub'}</span>
              </button>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Production Work & Case Studies
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Each project is accompanied by architectural breakdowns, real GitHub source links, and live production endpoints.
            </p>
          </div>

          <a
            href="https://github.com/Daniyal5722?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors group shadow-xs shrink-0 self-start md:self-auto"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Highlighted Live Deployments Bar */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r dark:from-cyan-950/30 dark:via-slate-900/60 dark:to-blue-950/30 from-cyan-50 via-white to-blue-50 border border-cyan-500/20 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-slate-900 dark:text-white font-bold text-sm tracking-wide uppercase font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-500" />
              <span>Direct Live Deployments</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
                      {deploy.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {deploy.type}
                    </span>
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1 group-hover:text-cyan-500 transition-colors">
                    {deploy.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 line-clamp-2">
                    {deploy.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={deploy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-xs hover:scale-[1.02]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Site</span>
                  </a>
                  <a
                    href={deploy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors"
                    title="View Source Code"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="flex flex-col gap-24 lg:gap-32 pb-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectShowcase
                key={project.id}
                project={project}
                index={index}
                onOpenCaseStudy={onOpenCaseStudy}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No projects found matching "<span className="text-cyan-500">{searchTerm}</span>" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
