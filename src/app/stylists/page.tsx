"use client";

import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight, MessageSquare, Sparkles, Zap, Shield, Star, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function StylistsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animations - optimized
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white overflow-hidden relative">
      {/* Premium Ambient Glow - More Subtle */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6D28D9]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/6 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#6D28D9]/5 blur-[120px] rounded-full" />
      </div>

      {/* 1) HERO - Premium Luxury */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Hero Copy - Refined Spacing */}
          <div className="space-y-6 md:space-y-8">
            {/* Minimal brand badge */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
                <span className="text-white text-xs font-bold">IX</span>
              </div>
              <span className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">INTELLLX</span>
            </div>

            {/* Premium Serif-Style Headline - Massive */}
            <div className="space-y-6">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                <span className="block text-white">Get Fully</span>
                <span className="block mt-2 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent">
                  Booked
                </span>
                <span className="block mt-2 text-white text-7xl sm:text-8xl md:text-9xl">Without the DMs</span>
              </h1>
            </div>

            {/* Refined Subheadline */}
            <div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed font-light">
                Your AI assistant handles every booking inquiry instantly, professionally, and automatically so you can stay behind the chair, not the phone.
              </p>
            </div>

            {/* Single Primary CTA - Premium */}
            <div className="pt-4">
              <Link
                href="/stylists/contact"
                className="group inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-10 py-5 rounded-full text-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/50"
              >
                Get My Stylist AI System
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Trust Badges - Refined */}
            <div className="flex flex-wrap items-center gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#06B6D4] text-[#06B6D4]" />
                  ))}
                </div>
                <span className="text-gray-500">Premium Setup</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-sm text-gray-500">
                <span className="text-[#A5F3FC] font-semibold">10</span> Founding Spots
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-sm text-gray-500">High-Touch Support</div>
            </div>
          </div>

          {/* Right: Premium iPhone Mockup */}
          <div className="relative">
            {/* Organic Shape Accents */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#06B6D4]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#6D28D9]/10 blur-3xl" />

            {/* Premium iPhone-Style Mockup */}
            <div className="relative mx-auto max-w-sm">
              {/* iPhone Frame */}
              <div className="relative rounded-[3rem] bg-gradient-to-b from-gray-900 to-black p-2 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" />
                
                {/* Screen */}
                <div className="relative rounded-[2.5rem] bg-[#020617] border border-white/10 overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 pt-12 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg">
                        <Scissors className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-gray-400">Live Preview</p>
                        <p className="text-xs font-semibold text-white">Stylist AI</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2.5 py-1 text-[9px] font-medium text-[#A5F3FC]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                      24/7
                    </span>
                  </div>

                  {/* Chat Messages - Animated */}
                  <div className="px-4 pb-6 space-y-3">
                    <div className="flex justify-start animate-slide-in-left" style={{ animationDelay: '1.2s' }}>
                      <div className="max-w-[75%] rounded-2xl bg-white/10 border border-white/5 px-4 py-3 backdrop-blur-sm">
                        <p className="text-sm text-gray-100 leading-relaxed">Hey, do you have anything open Saturday for a silk press?</p>
                      </div>
                    </div>

                    <div className="flex justify-end animate-slide-in-right" style={{ animationDelay: '1.5s' }}>
                      <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] px-4 py-3 shadow-lg shadow-[#06B6D4]/20">
                        <p className="text-sm text-white font-medium leading-relaxed">
                          Yes! I have <strong className="font-bold">10:30am</strong> or <strong className="font-bold">1:00pm</strong> available. Which works for you?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1 animate-fade-in" style={{ animationDelay: '1.8s' }}>
                      <button className="flex-1 rounded-full bg-white/10 hover:bg-[#06B6D4]/20 border border-white/15 hover:border-[#06B6D4]/40 px-3 py-2 text-[10px] text-white font-medium transition-all duration-200">
                        Book 10:30am
                      </button>
                      <button className="flex-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-2 text-[10px] text-white font-medium transition-all duration-200">
                        More Times
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-2 animate-fade-in" style={{ animationDelay: '2s' }}>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0s' }} />
                        <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 rounded-full bg-[#06B6D4] animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <p className="text-[9px] text-gray-400">Every message in your voice</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) BEFORE/AFTER - Soft Elegant Contrast */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 space-y-6 scroll-animate">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">The Transformation</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              You're Tired of Doing Hair<br />And Customer Service
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              You miss DMs while you're foiling. You repeat the same answers. You bounce between apps just to keep your book full.
            </p>
          </div>

          {/* Before/After - Soft Grays, No Red */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate">
            {/* Before - Soft Gray */}
            <div className="group relative rounded-3xl border border-white/5 bg-gradient-to-br from-gray-800/20 via-gray-800/10 to-transparent px-8 py-10 backdrop-blur-sm transition-all duration-700 hover:border-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gray-700/20 blur-2xl" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                Before
              </p>
              <ul className="space-y-4 text-base text-gray-300 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1.5 text-xl leading-none">✗</span>
                  <span>Missed messages turn into missed money</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1.5 text-xl leading-none">✗</span>
                  <span>Clients DM at midnight expecting fast answers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1.5 text-xl leading-none">✗</span>
                  <span>Your booking link is buried under old posts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-500 mt-1.5 text-xl leading-none">✗</span>
                  <span>No-shows and late clients drain your energy</span>
                </li>
              </ul>
            </div>

            {/* After - Elegant Solution */}
            <div className="group relative rounded-3xl border border-[#06B6D4]/20 bg-gradient-to-br from-[#06B6D4]/10 via-[#6D28D9]/5 to-transparent px-8 py-10 backdrop-blur-sm transition-all duration-700 hover:border-[#06B6D4]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#06B6D4]/20 blur-2xl" />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#A5F3FC] mb-6 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[#06B6D4]" />
                After Your System
              </p>
              <ul className="space-y-4 text-base text-white leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <span>One link that feels like a luxury online studio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <span>AI assistant answers new clients instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <span>Cleaner schedule and better quality bookings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <span>More time for what pays you most - the hair</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3) THE SYSTEM - Premium Features */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16 space-y-6 scroll-animate">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">Signature System</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            A Premium Online Home<br />And Booking Assistant
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to get fully booked without living in your DMs
          </p>
        </div>

        {/* Features Grid - Massive Spacing */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate">
          <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">AI DM Assistant</h3>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                Replies instantly, 24/7, in your voice. Handles FAQs, shares openings, and books appointments automatically.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Custom Booking Site</h3>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                One beautiful, luxury page that matches your brand. Services, portfolio, policies, and booking - all in one place.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Booking Integration</h3>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                Connects to your existing booking app or uses a clean request form. Seamless flow from inquiry to appointment.
              </p>
            </div>
          </div>

          <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">30 Days Support</h3>
              </div>
              <p className="text-base text-gray-300 leading-relaxed">
                Setup call, screen share, and ongoing support. We make sure you're confident using your new system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) THE OFFER - Split Premium Cards */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto scroll-animate">
          {/* Card 1: Price + Urgency */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.3em] mb-6">Founding Offer</p>
              <div className="space-y-2 mb-8">
                <p className="text-sm text-gray-500 line-through">$1,497</p>
                <h2 className="text-7xl md:text-8xl font-black tracking-tight text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                  $497
                </h2>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                  <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                  <p className="text-sm text-gray-300">
                    <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
                  </p>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  First 10 stylists only · Then price increases to $1,497
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Features + CTA */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#6D28D9]/20 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.3em] mb-6">What's Included</p>
                <div className="space-y-4">
                  {[
                    "Custom luxury booking site",
                    "AI DM assistant (your voice)",
                    "Booking app integration",
                    "Reminder flows setup",
                    "Setup call + screen share",
                    "30 days of support"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-200 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/stylists/contact"
                className="group w-full inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-8 py-5 rounded-full text-base transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/50"
              >
                Claim Your $497 Spot
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                No long contracts. No course. Just a done-for-you system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5) FAQ - Essential Questions */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 space-y-6 scroll-animate">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">Common Questions</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 scroll-animate">
            {[
              {
                question: "Do I need to be tech-savvy to use this?",
                answer: "Not at all. I handle all the tech setup and walk you through everything step by step. If you can use Instagram, you can use this system. I'll show you exactly how during the setup call."
              },
              {
                question: "How fast can I go live with my system?",
                answer: "Most stylists are live within 3-5 business days once I have your info, photos, and policies. The quick call helps me understand your brand and booking style so I can build it right the first time."
              },
              {
                question: "Will this work if I already have a booking app?",
                answer: "Yes. I can connect your AI assistant and booking site to your existing booking app, or we can use a simple request form that works with your current workflow. Either way, you get a seamless booking experience."
              },
              {
                question: "Is the $497 founding price really limited?",
                answer: "Yes. This is a one-time founding offer for my first 10 stylists while I build case studies. After these spots fill, the price increases to $1,497. The founding offer includes the exact same system at a fraction of the cost."
              },
              {
                question: "What if I need changes after launch?",
                answer: "You get 30 days of support included for light tweaks and questions. After that, you can request updates for things like price changes, new services, or policy updates. I make it easy to keep your system current."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/10 hover:bg-white/8 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-base text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) FINAL CTA - Single Powerful Close */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-[#06B6D4]/5 to-transparent py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 scroll-animate">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            Ready to Stop Losing<br />Clients in Your DMs?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Get your luxury booking site and AI assistant. Let your system handle inquiries while you focus on the hair.
          </p>
          <Link
            href="/stylists/contact"
            className="group inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-12 py-6 rounded-full text-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/50"
          >
            Get My Stylist AI Booking System
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
          <p className="text-sm text-gray-500 pt-4">
            INTELLLX · AI booking systems for beauty and personal care pros
          </p>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        *:focus-visible {
          outline: 2px solid #06B6D4;
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}
