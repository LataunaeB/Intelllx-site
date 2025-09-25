"use client";

import { motion } from "framer-motion";
import { MessageCircle, BarChart3, Users } from "lucide-react";

interface HeroMockupProps {
  reduceMotion?: boolean;
}

export default function HeroMockup({ reduceMotion = false }: HeroMockupProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Device Frame */}
      <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
        {/* Screen */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">LeadFlow AI</div>
                <div className="text-xs text-gray-500">Online now</div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="p-4 space-y-3 h-48">
            {/* Bot Message */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm text-gray-800">Hi! I&apos;m here to help you book a consultation. What&apos;s your business about?</p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-2 justify-end">
              <div className="bg-blue-600 rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm text-white">We&apos;re a digital marketing agency looking to scale our lead generation.</p>
              </div>
            </div>

            {/* Bot Response */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm text-gray-800">Perfect! I can help you book a strategy call. What&apos;s your preferred time?</p>
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          <div className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-gray-900">127</span>
                </div>
                <div className="text-xs text-gray-500">Leads Today</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900">23%</span>
                </div>
                <div className="text-xs text-gray-500">Conversion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 -z-10 blur-xl"></div>
      </div>
    </motion.div>
  );
}
