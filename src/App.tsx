import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceServicesSection } from './components/ExperienceServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectCaseStudyPage } from './components/ProjectCaseStudyPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ResumeModal } from './components/ResumeModal';
import { DEVELOPER_NAME, DEVELOPER_ROLE } from './data/portfolioData';

function HomePage({ onOpenResume }: { onOpenResume: () => void }) {
  useEffect(() => {
    document.title = `${DEVELOPER_NAME} – ${DEVELOPER_ROLE}`;
  }, []);

  return (
    <main id="main-content" className="focus:outline-none">
      <Hero onOpenResume={onOpenResume} />
      <SelectedWork />
      <AboutSection />
      <SkillsSection />
      <ExperienceServicesSection />
      <ContactSection />
    </main>
  );
}

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Theme management: default to dark, respect localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('daniyal_portfolio_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daniyal_portfolio_theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080a0f] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-cyan-500/20 selection:text-cyan-600 dark:selection:text-cyan-300">
      
      {/* Sticky Header with navigation, theme toggle, and CTA */}
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={toggleTheme} 
        onOpenResume={() => setIsResumeOpen(true)} 
      />

      {/* Dynamic Route Switcher */}
      <Switch>
        <Route path="/">
          <HomePage onOpenResume={() => setIsResumeOpen(true)} />
        </Route>
        <Route path="/projects/:slug">
          <ProjectCaseStudyPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {/* Minimalist Editorial Footer */}
      <Footer />

      {/* Accessible Resume Dialog */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

    </div>
  );
}
