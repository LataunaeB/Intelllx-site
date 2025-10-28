"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/components/GoogleAnalytics";

interface BehavioralCTAProps {
  type: 'scroll' | 'time' | 'exit-intent';
  trigger?: number; // scroll percentage, time in seconds, or scroll speed
}

export default function BehavioralCTA({ type, trigger = 50 }: BehavioralCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    const handleScroll = () => {
      if (type === 'scroll') {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= trigger && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
          trackEvent('behavioral_cta_triggered', {
            cta_type: 'scroll',
            trigger_percentage: trigger,
            page_location: window.location.pathname,
          });
        }
      }
    };

    const handleTime = () => {
      if (type === 'time') {
        setTimeout(() => {
          if (!hasTriggered) {
            setIsVisible(true);
            setHasTriggered(true);
            trackEvent('behavioral_cta_triggered', {
              cta_type: 'time',
              trigger_seconds: trigger,
              page_location: window.location.pathname,
            });
          }
        }, trigger * 1000);
      }
    };

    const handleExitIntent = (e: MouseEvent) => {
      if (type === 'exit-intent') {
        if (e.clientY <= 0 && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
          trackEvent('behavioral_cta_triggered', {
            cta_type: 'exit_intent',
            page_location: window.location.pathname,
          });
        }
      }
    };

    // Add event listeners based on type
    if (type === 'scroll') {
      window.addEventListener('scroll', handleScroll);
    } else if (type === 'time') {
      handleTime();
    } else if (type === 'exit-intent') {
      document.addEventListener('mouseleave', handleExitIntent);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [type, trigger, hasTriggered]);

  const handleCTAClick = (ctaType: string) => {
    trackEvent('behavioral_cta_clicked', {
      cta_type: ctaType,
      trigger_type: type,
      page_location: window.location.pathname,
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    trackEvent('behavioral_cta_closed', {
      trigger_type: type,
      page_location: window.location.pathname,
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content based on trigger type */}
            {type === 'scroll' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Ready to get started?</h3>
                    <p className="text-sm text-gray-600">You&apos;ve been exploring our content...</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Since you&apos;re interested in our services, let&apos;s discuss how we can help your business grow with AI.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleCTAClick('calendar')}
                    className="w-full"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Book Free Consultation
                  </Button>
                  <Button
                    onClick={() => handleCTAClick('chat')}
                    variant="secondary"
                    className="w-full"
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    Chat with AI Assistant
                  </Button>
                </div>
              </div>
            )}

            {type === 'time' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Still exploring?</h3>
                    <p className="text-sm text-gray-600">Let&apos;s talk about your needs</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  I can see you&apos;re taking time to research our services. I&apos;d love to answer any questions you have.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleCTAClick('calendar')}
                    className="w-full"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Schedule a Call
                  </Button>
                  <Button
                    onClick={() => handleCTAClick('resources')}
                    variant="secondary"
                    className="w-full"
                  >
                    View Resources
                  </Button>
                </div>
              </div>
            )}

            {type === 'exit-intent' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Wait! Don&apos;t miss out</h3>
                    <p className="text-sm text-gray-600">Get a free consultation</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Before you go, let me offer you a free 15-minute consultation to discuss your AI chatbot needs.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleCTAClick('calendar')}
                    className="w-full"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Get Free Consultation
                  </Button>
                  <Button
                    onClick={() => handleCTAClick('contact')}
                    variant="secondary"
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
