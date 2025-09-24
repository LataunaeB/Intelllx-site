"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollspyConfig } from '@/config/scrollspy';

interface MobileScrollspyProps {
  config: ScrollspyConfig;
  className?: string;
}

export default function MobileScrollspy({ config, className = "" }: MobileScrollspyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
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

    // Observe all sections
    config.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Show scrollspy after scrolling past hero
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setIsVisible(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [config.sections]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(sectionId);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const activeSectionLabel = config.sections.find(s => s.id === activeSection)?.label || 'On this page';

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={dropdownRef}
      className={`fixed top-20 left-4 right-4 z-40 md:hidden ${className}`}
    >
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className="w-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-900 shadow-lg hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Navigate to section"
        >
          <div className="flex items-center justify-between">
            <span>{activeSectionLabel}</span>
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
            <ul
              role="listbox"
              className="py-1"
              aria-label="Page sections"
            >
              {config.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    onKeyDown={(e) => handleKeyDown(e, section.id)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors duration-200 focus:outline-none focus:bg-blue-50 focus:text-blue-700 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    role="option"
                    aria-selected={activeSection === section.id}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
