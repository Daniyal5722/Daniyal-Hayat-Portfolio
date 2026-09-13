import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code, Github, Terminal, Sun, Moon, FileText, Sparkles } from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenEasterEgg: () => void;
}

export function Navbar({ 
  activeSection, 
  isDarkMode, 
  onToggleTheme,
  onOpenResume,
  onOpenEasterEgg
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      setLogoClicks(0);
      onOpenEasterEgg();
    }
  };

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Journey', href: '#experience', id: 'experience' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'dark:bg-[#090a0f]/90 bg-white/90 backdrop-blur-md dark:border-b dark:border-slate-800/60 border-b border-slate-200/80 py-2.5 shadow-lg dark:shadow-black/20 shadow-slate-200/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with 5-click easter egg */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            className="group flex items-center gap-2 dark:text-slate-100 text-slate-900 font-mono tracking-wider font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded px-1 text-left"
            title="Click logo 5 times to reveal developer terminal"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:scale-105 transition-all">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-[10px] sm:text-xs dark:text-slate-400 text-slate-500 font-mono">
                DANIYAL
              </span>
              <span className="leading-none text-xs sm:text-sm font-bold dark:text-slate-100 text-slate-900 tracking-widest mt-0.5">
                HAYAT
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 dark:bg-slate-900/70 bg-slate-100/90 dark:border-slate-800/80 border border-slate-200/90 rounded-full px-3 py-1.5 backdrop-blur-sm shadow-xs">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-1 text-xs font-medium transition-colors rounded-full ${
                  isActive
                    ? 'dark:text-cyan-300 text-cyan-700 font-semibold'
                    : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 dark:bg-cyan-500/15 bg-cyan-500/20 border dark:border-cyan-500/30 border-cyan-500/40 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* CLI Easter Egg Button */}
          <button
            onClick={onOpenEasterEgg}
            className="p-2 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 hover:text-cyan-500 transition-colors flex items-center gap-1 text-xs font-mono"
            title="Open CLI Terminal (or press ⌘K / Ctrl+K)"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] hidden md:inline">CLI</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-xs font-medium dark:text-slate-200 text-slate-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-500" />
            <span>Resume</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 hover:text-cyan-500 transition-colors"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          {/* GitHub Link */}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 transition-all group"
          >
            <Github className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>

        {/* Mobile Actions & Hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 hover:text-cyan-500"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 hover:dark:text-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-b dark:border-slate-800 border-slate-200 dark:bg-[#090a0f]/95 bg-white/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium dark:text-slate-300 text-slate-700 hover:text-cyan-500 dark:hover:bg-slate-900/80 hover:bg-slate-100 transition-colors"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-3 border-t dark:border-slate-800 border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume / CV</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEasterEgg();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Open Developer Terminal</span>
              </button>

              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Profile (@Daniyal5722)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
