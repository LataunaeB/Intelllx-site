'use client';

import { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, MessageCircle, Calendar, Send, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatI18n } from '@/lib/i18n/useChatI18n';
import LanguageMenu from './LanguageMenu';
import MessageList, { type Message } from './MessageList';
import Composer from './Composer';
import { pricing } from '@/config/pricing';
import { isBusinessDay, getAvailableTimeSlots, getBusinessHoursMessage } from '@/lib/business-hours';

/**
 * 24/7 Chat Widget with Business Hours-Aware Booking
 * 
 * Features:
 * - Chat available 24/7 (no time gating)
 * - "Away" ribbon displayed outside business hours
 * - "Book a discovery call" CTA always visible
 * - In-widget date/time picker restricted to Mon-Fri 9-6 PT
 * - Supports external scheduler URL (NEXT_PUBLIC_MEETINGS_URL)
 * - Full keyboard navigation and ARIA labels
 * - No hydration warnings
 */
export default function ChatWidget() {
  const { t, language, setLanguage } = useChatI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAway, setIsAway] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Array<{ value: string; label: string }>>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  });
  
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: t.welcome,
    isUser: false,
    timestamp: new Date()
  }]);

  // Check business hours on mount (client-side only to avoid hydration issues)
  useEffect(() => {
    const checkBusinessHours = () => {
      const startHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_START_HOUR || '9', 10);
      const endHour = parseInt(process.env.NEXT_PUBLIC_BUSINESS_END_HOUR || '18', 10);
      
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      const isBusinessDay = day >= 1 && day <= 5;
      const isBusinessHour = hour >= startHour && hour < endHour;
      
      setIsAway(!(isBusinessDay && isBusinessHour));
    };
    
    checkBusinessHours();
    // Check every minute
    const interval = setInterval(checkBusinessHours, 60000);
    return () => clearInterval(interval);
  }, []);

  // Bot response logic
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

  // Handle external booking URL (if configured)
  const handleExternalBooking = () => {
    const meetingsUrl = process.env.NEXT_PUBLIC_MEETINGS_URL;
    if (meetingsUrl) {
      window.open(meetingsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time into ISO datetime string
      let preferredDateTime: string | undefined;
      if (formData.preferredDate && formData.preferredTime) {
        preferredDateTime = `${formData.preferredDate}T${formData.preferredTime}:00`;
      }

      // Get current conversation context
      const conversationText = messages
        .filter(m => m.isUser)
        .map(m => m.text)
        .join('\n');

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone || null,
          message: conversationText || 'Chat widget inquiry',
          source: 'chat_widget',
          pageUrl: window.location.href,
          preferredDateTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      // Success! Show confirmation message
      const confirmMessage: Message = {
        id: Date.now(),
        text: data.zoomMeetingUrl
          ? `Perfect! Your meeting has been scheduled. Check your email (${formData.email}) for the Zoom link and calendar invite. We'll see you soon!`
          : `Thank you, ${formData.name}! We've received your information and will be in touch shortly at ${formData.email}. Check your inbox!`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, confirmMessage]);
      setShowForm(false);
      setFormData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '' });
    } catch (error) {
      console.error('[Chat Widget] Submission error:', error);
      alert('Failed to submit. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get min date (today) and max date (30 days from now)
  const getDateLimits = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    return {
      min: today.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0],
    };
  };

  // Handle date selection and update available time slots
  const handleDateChange = (dateString: string) => {
    if (!dateString) {
      setFormData({ ...formData, preferredDate: '', preferredTime: '' });
      setAvailableTimeSlots([]);
      return;
    }

    const selectedDate = new Date(dateString + 'T12:00:00');
    
    if (!isBusinessDay(selectedDate)) {
      alert('Please select a weekday (Monday–Friday)');
      return;
    }

    const slots = getAvailableTimeSlots(selectedDate);
    setAvailableTimeSlots(slots);
    setFormData({ ...formData, preferredDate: dateString, preferredTime: '' });
  };

  const meetingsUrl = process.env.NEXT_PUBLIC_MEETINGS_URL;
  const businessHoursMsg = getBusinessHoursMessage();

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
              aria-modal="true"
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

              {/* Away Ribbon (Outside Business Hours) */}
              {isAway && !isMinimized && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <p className="text-xs text-amber-900 dark:text-amber-200">
                    Away now—we&apos;ll reply next business day. ({businessHoursMsg})
                  </p>
                </div>
              )}

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

                  {/* CTA Footer - ALWAYS VISIBLE */}
                  <div className="px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-800">
                    {!showForm ? (
                      <div className="space-y-2">
                        <button
                          onClick={meetingsUrl ? handleExternalBooking : () => setShowForm(true)}
                          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          aria-label={t.bookCall}
                        >
                          <Calendar className="w-5 h-5" />
                          <span>{t.bookCall}</span>
                        </button>
                        {meetingsUrl && (
                          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                            Bookings available {businessHoursMsg}
                          </p>
                        )}
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-3" noValidate>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Book Your Discovery Call
                        </h3>
                        
                        <input
                          type="text"
                          placeholder="Your name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          aria-required="true"
                          aria-label="Your name"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        />
                        
                        <input
                          type="email"
                          placeholder="Your email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          aria-required="true"
                          aria-label="Your email"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        />
                        
                        <input
                          type="tel"
                          placeholder="Your phone (optional)"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          aria-label="Your phone number"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            min={getDateLimits().min}
                            max={getDateLimits().max}
                            aria-label="Preferred date (Monday-Friday only)"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                          />
                          
                          <select
                            value={formData.preferredTime}
                            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                            disabled={!formData.preferredDate || availableTimeSlots.length === 0}
                            aria-label="Preferred time"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Time</option>
                            {availableTimeSlots.map(slot => (
                              <option key={slot.value} value={slot.value}>
                                {slot.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Available slots: {businessHoursMsg}
                        </p>
                        
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setShowForm(false);
                              setFormData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '' });
                              setAvailableTimeSlots([]);
                            }}
                            className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            aria-label="Cancel booking"
                          >
                            Cancel
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            aria-label="Submit booking"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Sending...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Submit</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
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
