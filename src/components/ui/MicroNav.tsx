"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getScrollspyConfig } from '@/config/scrollspy';

export default function MicroNav() {
  const pathname = usePathname();
  const config = getScrollspyConfig(pathname);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id || '');
  const [isVisible, setIsVisible] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    const newObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px', // Account for sticky header
        threshold: 0.1
      }
    );

    setObserver(newObserver);

    // Observe all sections
    config.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        newObserver.observe(element);
      }
    });

    // Show scrollspy after scrolling past hero
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setIsVisible(window.scrollY > heroBottom - 100);
      } else {
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      newObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [config.sections]);

  // Don't render if scrollspy is disabled
  if (!config.hasScrollspy || config.sections.length === 0) {
    return null;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const section = config.sections.find(s => s.id === sectionId);
      const offset = section?.offset || -80;
      
      const elementPosition = element.offsetTop + offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-40 hidden md:block"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 shadow-xl">
        <div className="flex flex-col gap-1">
          {config.sections.slice(0, config.maxItems).map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection(section.id);
                }
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
              aria-label={`Go to ${section.label} section`}
            >
              {section.label}
            </button>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-white/10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
