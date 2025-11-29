"use client";

import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight, MessageSquare, Sparkles, Zap, Shield, Star, TrendingUp, Users } from "lucide-react";

export default function StylistsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white overflow-hidden relative">
      {/* Enhanced Ambient Glow - Premium Depth */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/10 blur-[140px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/8 blur-[120px] rounded-full" />
      </div>

      {/* 1) HERO - Maximum Impact with Enhanced Demo */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Hero Copy */}
          <div className="space-y-6 md:space-y-8">
            {/* Minimal brand badge */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
                <span className="text-white text-xs font-bold">IX</span>
              </div>
              <span className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">INTELLLX</span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium text-gray-400">
                For Hairstylists
              </span>
            </div>

            {/* Massive headline - Refined */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight">
              <span className="block text-white">Get Fully Booked</span>
              <span className="block mt-2 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
                Without the DMs
              </span>
            </h1>

            {/* Refined subheadline */}
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
              Your AI assistant handles every booking inquiry instantly, professionally, and automatically so you can stay behind the chair, not the phone.
            </p>

            {/* CTAs - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/stylists/contact"
                className="group inline-flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/40"
              >
                Get My Stylist AI System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-4 rounded-full text-sm transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            {/* Trust badges - Enhanced */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-[#06B6D4] text-[#06B6D4]" />
                  ))}
                </div>
                <span className="text-gray-500">Premium Setup</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Users className="w-3 h-3 text-[#06B6D4]" />
                <span className="text-gray-500">10 Founding Spots</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <TrendingUp className="w-3 h-3 text-[#06B6D4]" />
                <span className="text-gray-500">High-Touch Support</span>
              </div>
            </div>
          </div>

          {/* Right: Enhanced Premium Demo Card */}
          <div className="relative">
            {/* Gradient accents */}
            <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-[#06B6D4]/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-10 -left-8 w-44 h-44 rounded-full bg-[#6D28D9]/25 blur-3xl" />

            {/* Premium Glassmorphic Card */}
            <div className="relative mx-auto max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/3 px-6 py-6 shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg">
                    <Scissors className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Live Preview</p>
                    <p className="text-sm font-semibold text-white">Stylist AI Assistant</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-3 py-1.5 text-[10px] font-medium text-[#A5F3FC]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                  24/7 Online
                </span>
              </div>

              {/* Chat Messages - Enhanced with Typing Indicator */}
              <div className="space-y-3 relative z-10">
                <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="max-w-[80%] rounded-2xl bg-white/10 border border-white/5 px-4 py-3 backdrop-blur-sm hover:bg-white/15 transition-colors">
                    <p className="text-sm text-gray-100 leading-relaxed">Hey, do you have anything open Saturday for a silk press?</p>
                  </div>
                </div>

                <div className="flex justify-end animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <div className="max-w-[86%] rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] px-4 py-3 shadow-lg shadow-[#06B6D4]/20 hover:shadow-[#06B6D4]/30 transition-all">
                    <p className="text-sm text-white font-medium leading-relaxed">
                      Yes! I have <strong className="font-bold">10:30am</strong> or <strong className="font-bold">1:00pm</strong> available. Which works for you?
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <button className="group flex-1 rounded-full bg-white/10 hover:bg-[#06B6D4]/20 border border-white/15 hover:border-[#06B6D4]/40 px-3 py-2 text-[11px] text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#06B6D4]/20">
                    <span className="group-hover:text-[#A5F3FC] transition-colors">Book 10:30am</span>
                  </button>
                  <button className="group flex-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 px-3 py-2 text-[11px] text-white font-medium transition-all duration-200 hover:scale-[1.02]">
                    See More Times
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0s' }} />
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Every message in your voice. Your prices, policies, schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) BEFORE/AFTER - High Conversion Visual Contrast */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-12 space-y-4">
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-gray-400">The Transformation</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              You're Tired of Doing Hair<br />And Customer Service at the Same Time
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              You miss DMs while you're foiling. You repeat the same answers about prices and policies. You bounce between apps just to keep your book full.
            </p>
          </div>

          {/* Before/After Grid - Premium */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Before - Pain */}
            <div className="group relative rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/5 via-red-500/5 to-transparent px-6 py-8 backdrop-blur-sm transition-all duration-500 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1">
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-red-500/20 blur-xl group-hover:bg-red-500/30 transition-colors" />
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-red-500/5 blur-2xl" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400 mb-5 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                Before
              </p>
              <ul className="space-y-3.5 text-sm text-gray-300">
                <li className="flex items-start gap-3 group/item">
                  <span className="text-red-400 mt-1 text-lg leading-none">✗</span>
                  <span className="group-hover/item:text-white transition-colors">Missed messages turn into missed money</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-red-400 mt-1 text-lg leading-none">✗</span>
                  <span className="group-hover/item:text-white transition-colors">Clients DM at midnight and expect fast answers</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-red-400 mt-1 text-lg leading-none">✗</span>
                  <span className="group-hover/item:text-white transition-colors">Your booking link is buried under old posts</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <span className="text-red-400 mt-1 text-lg leading-none">✗</span>
                  <span className="group-hover/item:text-white transition-colors">No-shows and late clients drain your energy</span>
                </li>
              </ul>
            </div>

            {/* After - Solution */}
            <div className="group relative rounded-3xl border border-[#06B6D4]/40 bg-gradient-to-br from-[#06B6D4]/10 via-[#6D28D9]/5 to-transparent px-6 py-8 backdrop-blur-sm transition-all duration-500 hover:border-[#06B6D4]/60 hover:shadow-2xl hover:shadow-[#06B6D4]/30 hover:-translate-y-1">
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#06B6D4]/30 blur-xl group-hover:bg-[#06B6D4]/40 transition-colors" />
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-[#06B6D4]/10 blur-2xl" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#A5F3FC] mb-5 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#06B6D4] animate-pulse" />
                After Your System
              </p>
              <ul className="space-y-3.5 text-sm text-white">
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="group-hover/item:text-[#A5F3FC] transition-colors">One link that feels like a luxury online studio</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="group-hover/item:text-[#A5F3FC] transition-colors">AI assistant answers new clients instantly</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="group-hover/item:text-[#A5F3FC] transition-colors">Cleaner schedule and better quality bookings</span>
                </li>
                <li className="flex items-start gap-3 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <span className="group-hover/item:text-[#A5F3FC] transition-colors">More time for what pays you most - the hair</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3) THE SYSTEM - What You Get */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12 space-y-4">
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-gray-400">Signature System</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            A Premium Online Home<br />And Booking Assistant
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to get fully booked without living in your DMs
          </p>
        </div>

        {/* Features Grid - Premium with Enhanced Interactions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#06B6D4]/40 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#A5F3FC] transition-colors">AI DM Assistant</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                Replies instantly, 24/7, in your voice. Handles FAQs, shares openings, and books appointments automatically.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#06B6D4]/40 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#A5F3FC] transition-colors">Custom Booking Site</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                One beautiful, luxury page that matches your brand. Services, portfolio, policies, and booking - all in one place.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#06B6D4]/40 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#A5F3FC] transition-colors">Booking Integration</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                Connects to your existing booking app or uses a clean request form. Seamless flow from inquiry to appointment.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-[#06B6D4]/40 hover:bg-white/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#A5F3FC] transition-colors">30 Days Support</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                Setup call, screen share, and ongoing support. We make sure you're confident using your new system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) THE OFFER - Premium Close */}
      <section className="relative max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Enhanced Gradient Accents */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-[#06B6D4]/30 to-[#6D28D9]/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#6D28D9]/20 to-transparent rounded-full blur-2xl" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8 space-y-3">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.2em]">Founding Stylist Offer</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 line-through">$1,497</p>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">
                  $497
                </h2>
              </div>
              <p className="text-xs text-gray-400 tracking-wide">
                First 10 stylists only · Then price increases
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 mb-8">
              {/* Features List */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">What's Included</p>
                <div className="space-y-3">
                  {[
                    "Custom one-page stylist website (luxury, on-brand)",
                    "AI-powered booking assistant (your voice, prices, policies)",
                    "Connection to your booking app or request form",
                    "Simple reminder flows (plug into text/email tools)",
                    "Setup call + screen share (learn how to use it)",
                    "30 days of support (light tweaks & questions)"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <CheckCircle2 className="h-5 w-5 text-[#06B6D4] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <p className="text-sm text-gray-200 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works + CTA */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-3">How It Works</p>
                  <ol className="space-y-3 text-xs text-gray-300 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="text-[#06B6D4] font-bold">1.</span>
                      <span>Quick call to learn your brand & booking style</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#06B6D4] font-bold">2.</span>
                      <span>I design & build your site + AI assistant</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#06B6D4] font-bold">3.</span>
                      <span>You add link to Instagram & bio</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#06B6D4] font-bold">4.</span>
                      <span>System starts catching & booking clients</span>
                    </li>
                  </ol>
                </div>

                <Link
                  href="/stylists/contact"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-6 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/40"
                >
                  Claim Your $497 Founder Spot
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  No long contracts. No course. Just a done-for-you system that helps your books grow with you.
                </p>
              </div>
            </div>

            {/* Urgency Footer - Enhanced */}
            <div className="text-center pt-6 border-t border-white/10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                <p className="text-xs text-gray-300">
                  <span className="text-[#A5F3FC] font-semibold">10 spots remaining</span>
                  <span className="text-gray-500 mx-2">·</span>
                  <span className="text-gray-400">Limited founding offer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5) FINAL CTA - Powerful Close */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-transparent via-[#06B6D4]/5 to-transparent">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
            Ready to Stop Losing Clients<br />In Your DMs?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get your luxury booking site and AI assistant. Let your system handle inquiries while you focus on the hair.
          </p>
          <Link
            href="/stylists/contact"
            className="group inline-flex items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-10 py-5 rounded-full text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/40"
          >
            Get My Stylist AI Booking System
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-gray-500 pt-2">
            INTELLLX · AI booking systems for beauty and personal care pros
          </p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced focus states for accessibility */
        *:focus-visible {
          outline: 2px solid #06B6D4;
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}
