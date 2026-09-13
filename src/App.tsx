import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { FeaturedProject } from './components/FeaturedProject';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { RevealOnScroll } from './components/RevealOnScroll';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('daniyal_portfolio_theme');
      return saved ? saved === 'dark' : true; // Dark by default
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('daniyal_portfolio_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      // ignore
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }
      
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.innerHeight + window.scrollY;
      if (scrollBottom >= scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sections = ['contact', 'github', 'skills', 'projects', 'about', 'home'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#090a0f] text-slate-100' : 'bg-slate-50 text-slate-900'} selection:bg-cyan-500/30 selection:text-cyan-200`}>
      <ScrollProgress />
      <Navbar activeSection={activeSection} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <About />
        </RevealOnScroll>
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <FeaturedProject />
        </RevealOnScroll>
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <Projects />
        </RevealOnScroll>
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <Skills />
        </RevealOnScroll>
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <GithubSection />
        </RevealOnScroll>
        <RevealOnScroll direction="up" distance={36} duration={800}>
          <Contact />
        </RevealOnScroll>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
