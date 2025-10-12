'use client';

import { useState, useEffect } from 'react';
import { 
  getSavedLanguage, 
  saveLanguage, 
  getTranslations,
  type SupportedLanguage,
  type ChatTranslations 
} from './chat';

/**
 * React hook for chat widget internationalization
 * 
 * Manages language state, persists to localStorage, and provides translations.
 * 
 * @example
 * ```tsx
 * const { t, language, setLanguage } = useChatI18n();
 * 
 * return (
 *   <div>
 *     <h1>{t.title}</h1>
 *     <button onClick={() => setLanguage('es')}>Español</button>
 *   </div>
 * );
 * ```
 */
export function useChatI18n() {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [t, setT] = useState<ChatTranslations>(getTranslations('en'));

  // Load saved language on mount
  useEffect(() => {
    const saved = getSavedLanguage();
    setLanguageState(saved);
    setT(getTranslations(saved));
  }, []);

  // Update language and persist to localStorage
  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    setT(getTranslations(lang));
    saveLanguage(lang);
  };

  return {
    language,
    setLanguage,
    t,
  };
}

