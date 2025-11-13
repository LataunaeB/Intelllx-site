'use client';

import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { X, Minimize2, Maximize2, MessageCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatI18n } from '@/lib/i18n/useChatI18n';
import LanguageMenu from './LanguageMenu';
import CTAButton from './CTAButton';
import MessageList, { type Message } from './MessageList';
import Composer from './Composer';
import type { SupportedLanguage } from '@/lib/i18n/chat';
import { getLocalizedFallbackResponse, getTimeoutMessage } from '@/lib/ai/fallbacks';

// Business hours check removed - chatbot is available 24/7

/**
 * Sleek Chat Widget - Redesigned
 * 
 * Modern, minimal chat widget with:
 * - Single CTA: "Book a discovery call"
 * - Language selector with 6 languages
 * - Clean, professional design
 * - Responsive (full-screen on mobile)
 * - Accessible keyboard navigation
 */
export default function ChatWidget() {
  const { t, language, setLanguage } = useChatI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    return [{
      id: 1,
      text: t.welcome, // Always show welcome message - chatbot works 24/7
      isUser: false,
      timestamp: new Date()
    }];
  });

  const quickReplies = useMemo(() => t.quickReplies ?? [], [t.quickReplies]);

  const localeMap: Record<SupportedLanguage, string> = useMemo(
    () => ({
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      pt: 'pt-BR',
      it: 'it-IT'
    }),
    []
  );

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && !prev[0].isUser) {
        return [{
          ...prev[0],
          text: t.welcome
        }];
      }
      return prev;
    });
  }, [t.welcome]);

  const handleDownloadTranscript = () => {
    if (!messages.length) return;

    const locale = localeMap[language] ?? 'en-US';
    const formatter = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' });

    const lines = messages.map(message => {
      const speaker = message.isUser ? 'User' : 'LeadFlow';
      const timestamp = formatter.format(message.timestamp);
      return `[${timestamp}] ${speaker}: ${message.text}`;
    });

    const transcript = lines.join('\n');
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `intelllx-chat-${dateStamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: trimmed,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    let aiText: string = getLocalizedFallbackResponse(language, trimmed);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000);

      let res: Response | null = null;
      try {
        res = await fetch('/api/chat-smart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, language }),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (res && res.ok) {
        try {
          const data = await res.json();
          if (typeof data.response === 'string' && data.response.trim()) {
            aiText = data.response.trim();
          }
        } catch (jsonError) {
          console.warn('Failed to parse API response:', jsonError);
        }
      } else if (res) {
        console.warn('API returned error status:', res.status);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        aiText = getTimeoutMessage(language);
      } else {
        console.warn('Chat error:', error);
        aiText = getLocalizedFallbackResponse(language, trimmed);
      }
    }

    const botMessage: Message = {
      id: Date.now() + 1,
      text: aiText,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  // Handle escape key to close
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-500/50 z-50 transition-shadow duration-200"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Widget Container */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`
                fixed z-50
                ${isMinimized ? 'h-auto' : 'md:h-[75vh]'}
                md:bottom-6 md:right-6 md:w-[400px]
                inset-0 md:inset-auto
                md:rounded-2xl
                bg-white dark:bg-zinc-900
                shadow-2xl
                border border-gray-200 dark:border-zinc-800
                flex flex-col
                overflow-hidden
              `}
              onKeyDown={handleKeyDown}
              role="dialog"
              aria-label={t.title}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language Menu */}
                  <LanguageMenu
                    currentLanguage={language}
                    onLanguageChange={setLanguage}
                    label={t.language}
                  />

                  <button
                    onClick={handleDownloadTranscript}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t.downloadTranscript}
                    title={t.downloadTranscript}
                    type="button"
                  >
                    <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>

                  {/* Desktop Controls */}
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={isMinimized ? t.maximize : t.minimize}
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t.close}
                  >
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Body (only show when not minimized) */}
              {!isMinimized && (
                <>
                  {/* Messages */}
                  <MessageList messages={messages} isTyping={isTyping} />

                  {/* Quick Action Buttons - Only show on welcome message */}
                  {messages.length === 1 && (
                    <div className="px-4 py-3 space-y-2 border-t border-gray-200 dark:border-zinc-800">
                      <button
                        onClick={async () => {
                          await handleSendMessage(t.bookCall);
                        }}
                        disabled={isTyping}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                      >
                        📅 {t.bookCall}
                      </button>
                      {quickReplies.length >= 2 && (
                        <div className="grid grid-cols-2 gap-2">
                          {quickReplies.slice(0, 2).map(reply => (
                            <button
                              key={reply.label}
                              onClick={async () => {
                                await handleSendMessage(reply.message);
                              }}
                              disabled={isTyping}
                              className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              type="button"
                            >
                              {reply.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {quickReplies.length > 0 && (
                    <div
                      className={`px-4 pt-3 pb-2 ${messages.length > 1 ? 'border-t border-gray-200 dark:border-zinc-800' : ''}`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map(reply => (
                          <button
                            key={reply.label}
                            onClick={async () => {
                              await handleSendMessage(reply.message);
                            }}
                            disabled={isTyping}
                            className="px-3 py-2 rounded-full text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            type="button"
                          >
                            {reply.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Composer */}
                  <Composer
                    onSend={handleSendMessage}
                    placeholder={t.inputPlaceholder}
                    isLoading={isTyping}
                  />

                  {/* CTA Footer */}
                  <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-800">
                    <CTAButton label={t.bookCall} />
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

