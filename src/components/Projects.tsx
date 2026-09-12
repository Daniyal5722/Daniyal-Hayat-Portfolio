import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Github, Folder, Smartphone, Cpu, CloudSun, Layers, ArrowUpRight, Star, RefreshCw, Search, X, Clock, ExternalLink, Globe } from 'lucide-react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { Project } from '../types';
import { LIVE_DEPLOYMENTS } from '../data/portfolioData';
import { getEstimatedReadingTime } from '../utils/readingTime';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
  getIcon: (iconName: string) => React.ReactNode;
}

function ProjectCard({ project, index, getIcon }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000, transformStyle: 'preserve-3d' }} className="w-full h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl transition-colors cursor-pointer h-full"
      >
        <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="h-full flex flex-col justify-between">
          <div>
            {/* Top Row: Icon & Category & Stars */}
            <div className="flex items-center justify-between mb-6 gap-2">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                {getIcon(project.iconName)}
              </div>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 transition-all hover:scale-105"
                    title={`Open live site: ${project.liveUrl}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live App</span>
                  </a>
                )}
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-mono"
                  title="Estimated Reading Time"
                >
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{getEstimatedReadingTime(project)}</span>
                </span>
                {project.stars !== undefined && project.stars > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{project.stars}</span>
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 text-xs font-mono">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {project.displayName}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-2.5 py-1 rounded-md bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer Link Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-400">
                Language: <strong className="text-slate-200">{project.language}</strong>
              </span>
              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-sm shadow-cyan-500/20 hover:scale-105"
                    title={`Open live app for ${project.displayName}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live App</span>
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { projects, isSyncing, lastSynced, refreshRepos } = useGitHubRepos();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'live' | 'mobile' | 'web'>('all');

  const liveProjectsCount = projects.filter((p) => Boolean(p.liveUrl)).length;

  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (activeCategory === 'live' && !project.liveUrl) return false;
    if (activeCategory === 'mobile' && !project.category.toLowerCase().includes('mobile') && project.language !== 'Kotlin') return false;
    if (activeCategory === 'web' && !project.category.toLowerCase().includes('web') && project.language === 'Kotlin') return false;

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
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Github':
        return <Github className="w-5 h-5 text-cyan-400" />;
      default:
        return <Folder className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#090a0f] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Live Sync Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">PORTFOLIO WORK</span>
              <button
                onClick={refreshRepos}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                title="Sync with GitHub API"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : lastSynced ? `Synced ${lastSynced}` : 'Live GitHub Sync'}</span>
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Live Applications & Repositories
            </h2>
          </div>
          <a
            href="https://github.com/Daniyal5722?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors group"
          >
            <span>View all on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Highlighted Live Deployments Bar */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-blue-950/40 border border-cyan-500/20 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase font-mono flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Verified Live Production Websites & Apps</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LIVE_DEPLOYMENTS.map((deploy, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
                      {deploy.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {deploy.type}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                    {deploy.title}
                  </h4>
                  <p className="text-slate-400 text-xs mb-4 line-clamp-2">
                    {deploy.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
                  <a
                    href={deploy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-sm shadow-cyan-500/10 hover:scale-[1.02]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Site</span>
                  </a>
                  <a
                    href={deploy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
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
          
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Repositories ({projects.length})
            </button>
            <button
              onClick={() => setActiveCategory('live')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === 'live'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Apps & Sites ({liveProjectsCount})</span>
            </button>
            <button
              onClick={() => setActiveCategory('web')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === 'web'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Web Platforms
            </button>
            <button
              onClick={() => setActiveCategory('mobile')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeCategory === 'mobile'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Mobile Apps
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white text-xs outline-none transition-all placeholder:text-slate-500 backdrop-blur-md"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Project Grid with 3D Tilt Cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} getIcon={getIcon} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-slate-400 text-sm font-mono mb-3">No repositories found matching your selection.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
