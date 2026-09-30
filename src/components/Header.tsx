import React, { useState, useEffect, useRef } from 'react';
import { DEVELOPER_NAME, GITHUB_PROFILE_URL, NAV_LINKS } from '../data/portfolioData';
import { Github, Sun, Moon, Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume?: () => void;
}

export function Header({ isDarkMode, onToggleTheme, onOpenResume }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Trap focus or manage body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the first interactive element in the menu
      const firstLink = mobileMenuRef.current?.querySelector('a, button') as HTMLElement | null;
      firstLink?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      {/* Skip to Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-cyan-500 focus:text-slate-950 focus:font-mono focus:text-xs focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#080a0f]/90 dark:bg-[#080a0f]/90 bg-white/90 backdrop-blur-md border-slate-800/80 dark:border-slate-800/80 border-slate-200 shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Monogram */}
          <a
            href="/"
            className="flex items-center gap-3 text-slate-900 dark:text-white group focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none rounded-md py-1"
            aria-label={`${DEVELOPER_NAME} Home`}
          >
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-500 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
              DH
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                {DEVELOPER_NAME}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:inline">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-md hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-cyan-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* GitHub Profile Link */}
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Daniyal's GitHub profile (opens in a new tab)"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Resume Button */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800/50 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[40px]"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resume</span>
              </button>
            )}

            {/* Primary CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-xs shadow-cyan-500/20 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none min-h-[40px]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#080a0f]/98 backdrop-blur-xl border-b border-slate-800 p-6 overflow-y-auto animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase font-semibold">
              NAVIGATION
            </span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="py-3 px-3 rounded-lg text-lg font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Drawer Bottom Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
            {onOpenResume && (
              <button
                onClick={() => {
                  closeMenu();
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800 min-h-[44px] font-mono text-xs"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Full Resume</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={closeMenu}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-semibold min-h-[44px] text-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between pt-4 text-xs font-mono text-slate-500">
              <span>{DEVELOPER_NAME}</span>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
