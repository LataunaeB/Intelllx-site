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

// Simple business hours check
const isWithinBusinessHours = () => {
  try {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    // Monday-Friday (1-5), 9 AM - 6 PM
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  } catch {
    return true;
  }
};

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
    const withinHours = isWithinBusinessHours();
    return [{
      id: 1,
      text: withinHours ? t.welcome : t.awayMessage,
      isUser: false,
      timestamp: new Date()
    }];
  });

  // Simple bot response logic (preserved from original)
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Pricing
    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('how much')) {
      return `LeadFlow Chatbot pricing: ${pricing.products.chatbot.pro.priceDisplay} one-time setup + ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/month for maintenance and 7 hours of expert support. Most clients see ROI within 30 days!`;
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
      `I'm here to help! You can ask me about pricing (${pricing.products.chatbot.pro.priceDisplay} setup + ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/mo), features, how it works, ROI, or click below to book a discovery call!`,
      "Great question! LeadFlow captures and converts leads 24/7. Ask me about pricing, features, integrations, or book a call to learn more!",
      "Excited to help! LeadFlow is designed to turn visitors into customers. Ask about pricing, how it works, or book a discovery call below!"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      const response = getBotResponse(messageText);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
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

