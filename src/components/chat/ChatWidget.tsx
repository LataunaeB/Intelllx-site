'use client';

import { useState } from 'react';
import { X, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatI18n } from '@/lib/i18n/useChatI18n';
import LanguageMenu from './LanguageMenu';
import CTAButton from './CTAButton';
import MessageList, { type Message } from './MessageList';
import Composer from './Composer';
import { pricing } from '@/config/pricing';

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

  // Simple bot response logic (preserved as fallback)
  const getFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Pricing - check for 'pricing' first, then other variations
    if (lowerInput === 'pricing' || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
      return `LeadFlow Chatbot pricing: Essential → ${pricing.products.chatbot.essential.priceDisplay} setup + ${pricing.products.chatbot.essential.monthlyService.priceDisplay}/mo, or Pro → ${pricing.products.chatbot.pro.priceDisplay} setup + ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/mo. Most clients see ROI within 30 days!`;
    }

    // How it works
    if (lowerInput.includes('how') && (lowerInput.includes('work') || lowerInput.includes('does'))) {
      return "LeadFlow works 24/7 to capture leads and book appointments. It qualifies prospects, answers questions, collects contact info, and integrates with your CRM and calendar. We handle all the setup and optimization!";
    }

    // Features
    if (lowerInput.includes('feature') || lowerInput.includes('what can') || lowerInput.includes('capabilities')) {
      return "Key features: 24/7 availability, automatic lead qualification, appointment booking, CRM integration (HubSpot, Salesforce, etc.), calendar sync (Calendly, Google), multi-language support, and conversation analytics.";
    }

    // ROI
    if (lowerInput.includes('roi') || lowerInput.includes('return')) {
      return `Our goal is to help you see ROI within 30 days. Typical results: 3-5x more qualified leads, 25-40% increase in conversions, 40-60% reduction in missed opportunities. The ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/month pays for itself with just 1-2 additional customers!`;
    }

    // Business types
    if (lowerInput.includes('business') || lowerInput.includes('industry')) {
      return "LeadFlow works for ANY business: e-commerce, SaaS, real estate, healthcare, legal, fitness, restaurants, and more. Each chatbot is customized to your specific industry and business needs.";
    }

    // Booking/Call/Demo
    if (lowerInput.includes('book') || lowerInput.includes('call') || lowerInput.includes('demo') || lowerInput.includes('schedule')) {
      return `Great! Click the "Book a discovery call" button below to schedule a time. We'll discuss your needs and create a custom plan. Looking forward to speaking with you!`;
    }

    // Integration
    if (lowerInput.includes('integrate') || lowerInput.includes('crm') || lowerInput.includes('calendar')) {
      return "LeadFlow integrates with: Calendly, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier, and most CRM systems. We handle all technical setup for you!";
    }

    // Support
    if (lowerInput.includes('support') || lowerInput.includes('maintenance')) {
      return "We provide excellent support! You get 7 hours of expert support per month, plus we handle all maintenance, optimization, and updates. Available via email, phone, or video call.";
    }

    // Setup
    if (lowerInput.includes('setup') || lowerInput.includes('install') || lowerInput.includes('implementation')) {
      return "Setup takes 1-2 weeks: We learn your business, create conversation flows, customize to your brand, integrate with your tools, and test everything. We handle it all - you just approve!";
    }

    // Default
    const defaultResponses = [
      `I'm here to help! You can ask me about pricing (Essential → ${pricing.products.chatbot.essential.priceDisplay} or Pro → ${pricing.products.chatbot.pro.priceDisplay}), features, how it works, ROI, or click below to book a discovery call!`,
      "Great question! LeadFlow captures and converts leads 24/7. Ask me about pricing, features, integrations, or book a call to learn more!",
      "Excited to help! LeadFlow is designed to turn visitors into customers. Ask about pricing, how it works, or book a discovery call below!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    if (isTyping) return; // Prevent double-clicks

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    let aiText: string = getFallbackResponse(messageText); // Default fallback

    try {
      // Try smart AI endpoint with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000); // 10 second timeout

      let res: Response;
      try {
        res = await fetch('/api/chat-smart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageText }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          aiText = "Request timed out. Would you like to book a quick discovery call to get immediate help?";
        } else {
          throw fetchError;
        }
        res = null as any; // Will skip the res.ok check
      }

      if (res && res.ok) {
        try {
          const data = await res.json();
          aiText = data.response || aiText;
        } catch (jsonError) {
          // JSON parse error - use fallback
          console.warn('Failed to parse API response:', jsonError);
        }
      } else if (res) {
        // HTTP error - use fallback
        console.warn('API returned error status:', res.status);
      }
    } catch (error: any) {
      // Handle any other errors
      console.warn('Chat error:', error);
      aiText = getFallbackResponse(messageText);
    }

    // Always add bot message and clear typing state
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
                          await handleSendMessage('book a call');
                        }}
                        disabled={isTyping}
                        className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        📅 Book a Call
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={async () => {
                            await handleSendMessage('pricing');
                          }}
                          disabled={isTyping}
                          className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          💰 Pricing
                        </button>
                        <button
                          onClick={async () => {
                            await handleSendMessage('how it works');
                          }}
                          disabled={isTyping}
                          className="px-4 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          🔧 How It Works
                        </button>
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

