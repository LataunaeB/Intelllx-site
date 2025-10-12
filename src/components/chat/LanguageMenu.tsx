'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/lib/i18n/chat';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageMenuProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  label?: string;
}

/**
 * Language Selector Dropdown
 * 
 * Accessible dropdown menu for switching chat widget language.
 * Persists selection to localStorage via parent hook.
 */
export default function LanguageMenu({ 
  currentLanguage, 
  onLanguageChange,
  label = 'Language'
}: LanguageMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <div className="relative" ref={menuRef} onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLang?.flag}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 py-2 z-50"
            role="menu"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-150 focus:outline-none focus:bg-gray-50 dark:focus:bg-zinc-700 ${
                  currentLanguage === lang.code
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : ''
                }`}
                role="menuitem"
              >
                <span className="text-lg">{lang.flag}</span>
                <span className={`text-sm font-medium ${
                  currentLanguage === lang.code
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {lang.name}
                </span>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

