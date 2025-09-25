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
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Device Frame - Matching site tokens */}
      <div className="relative bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Header - Site-consistent styling */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900 tracking-tight">LeadFlow AI</div>
              <div className="text-sm text-gray-500 font-medium">Online now</div>
            </div>
          </div>
        </div>

        {/* Chat Interface - 8px grid alignment */}
        <div className="p-6 space-y-4 bg-white">
          {/* Bot Message 1 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 max-w-[240px] shadow-sm">
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                Hi! I&apos;m here to help you book a consultation. What&apos;s your business about?
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-4 py-3 max-w-[240px] shadow-sm">
              <p className="text-sm text-white leading-relaxed font-medium">
                We&apos;re a digital marketing agency looking to scale our lead generation.
              </p>
            </div>
          </div>

          {/* Bot Message 2 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 max-w-[240px] shadow-sm">
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                Perfect! I can help you book a strategy call. What&apos;s your preferred time?
              </p>
            </div>
          </div>

          {/* Typing Indicator */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Panel - Site-consistent design */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-xl font-bold text-gray-900">127</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">Leads Today</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">23%</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">Conversion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle depth effect - matching site shadows */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 -z-10 blur-2xl scale-105"></div>
    </motion.div>
  );
}
