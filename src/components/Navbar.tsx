import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code, Github, Terminal, Sun, Moon } from 'lucide-react';
import { GITHUB_PROFILE_URL } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ activeSection, isDarkMode, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'dark:bg-[#090a0f]/90 bg-white/90 backdrop-blur-md dark:border-b dark:border-slate-800/60 border-b border-slate-200/80 py-3 shadow-lg dark:shadow-black/20 shadow-slate-200/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2 dark:text-slate-100 text-slate-900 font-mono tracking-wider font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded px-1"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-xs dark:text-slate-400 text-slate-500 font-mono">DANIYAL</span>
              <span className="leading-none text-sm font-bold dark:text-slate-100 text-slate-900 tracking-widest mt-0.5">HAYAT</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 dark:bg-slate-900/60 bg-slate-100/80 dark:border-slate-800/80 border border-slate-200/90 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.name.toLowerCase();
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-medium transition-colors rounded-full ${
                    isActive
                      ? 'dark:text-cyan-300 text-cyan-700 font-semibold'
                      : 'dark:text-slate-400 text-slate-600 hover:dark:text-slate-200 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 dark:bg-cyan-500/10 bg-cyan-500/15 border dark:border-cyan-500/30 border-cyan-500/40 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 dark:text-slate-300 text-slate-700 hover:text-cyan-500 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
            </button>

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg dark:bg-slate-900/80 bg-slate-100 hover:dark:bg-slate-800 hover:bg-slate-200 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 transition-all shadow-sm hover:shadow-cyan-500/10 group"
            >
              <Code className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>code</span>
            </a>
          </div>

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
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
              className="md:hidden border-b dark:border-slate-800 border-slate-200 dark:bg-[#090a0f]/95 bg-white/95 backdrop-blur-xl px-4 pt-4 pb-6 space-y-2"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium dark:text-slate-300 text-slate-700 hover:text-cyan-500 dark:hover:bg-slate-900/80 hover:bg-slate-100 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t dark:border-slate-800 border-slate-200 flex items-center justify-between">
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-200 text-xs font-mono dark:text-slate-300 text-slate-700 w-full justify-center"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Profile (@Daniyal5722)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
