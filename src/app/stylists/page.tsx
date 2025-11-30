"use client";

import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight, Sparkles, Star, Calendar, Heart, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

export default function StylistsPage() {
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
      {/* Premium Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6D28D9]/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/6 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#6D28D9]/5 blur-[120px] rounded-full" />
      </div>

      {/* SECTION 1: HERO - Premium Luxury with Salon Website Mockup */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        {/* Enhanced Hero Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#06B6D4]/15 via-[#6D28D9]/15 to-[#06B6D4]/15 rounded-full blur-3xl animate-pulse-hero" />
        </div>
        
        <div className="relative grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Hero Copy - Aspirational */}
          <div className="space-y-6 md:space-y-8">
            {/* Minimal brand badge */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
                <span className="text-white text-xs font-bold">IX</span>
              </div>
              <span className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">INTELLLX</span>
            </div>

            {/* Premium Headline - Enhanced */}
            <div className="space-y-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#06B6D4]/20 via-[#6D28D9]/20 to-[#06B6D4]/20 blur-2xl rounded-3xl -z-10 animate-pulse-glow" />
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight relative" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                <span className="block text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">Get Fully</span>
                <span className="block mt-2 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent animate-gradient-shift drop-shadow-[0_0_40px_rgba(109,40,217,0.4)]">
                  Booked
                </span>
                <span className="block mt-2 text-white text-7xl sm:text-8xl md:text-9xl drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">Without the DMs</span>
              </h1>
            </div>

            {/* Aspirational Subheadline */}
            <div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed font-light">
                The stylist lifestyle you deserve. Fully booked chairs. Premium clients who value quality, not price shoppers.
              </p>
              <p className="text-lg md:text-xl text-[#A5F3FC] max-w-xl leading-relaxed font-light mt-4">
                Your weekends free, your book full. Experience the freedom of a fully booked chair and quiet DMs.
              </p>
            </div>

            {/* Single Primary CTA - Enhanced */}
            <div className="pt-4">
              <Link
                href="/stylists/contact"
                className="group inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-bold px-10 py-5 rounded-full text-lg border-2 border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 hover:scale-[1.02] md:text-base text-base w-full sm:w-auto justify-center"
              >
                Get My Stylist AI System
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Trust Badges */}
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

          {/* Right: Premium Salon Website Mockup + Chat Preview */}
          <div className="relative">
            {/* Organic Shape Accents */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#06B6D4]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#6D28D9]/10 blur-3xl" />

            {/* Desktop Salon Website Mockup */}
            <div className="relative mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Browser Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-white/10 rounded-full max-w-xs" />
                  </div>
                </div>
                
                {/* Salon Website Content */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center">
                        <Scissors className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                        <div className="h-2 w-16 bg-white/10 rounded" />
                      </div>
                    </div>
                    <div className="h-8 w-20 bg-[#06B6D4]/20 rounded-full border border-[#06B6D4]/30" />
                  </div>

                  {/* Hero Section */}
                  <div className="relative h-32 rounded-xl bg-gradient-to-br from-[#06B6D4]/20 via-[#6D28D9]/20 to-[#06B6D4]/20 border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-4 w-48 bg-white/30 rounded mx-auto mb-2" />
                        <div className="h-3 w-32 bg-white/20 rounded mx-auto" />
                      </div>
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
                        <div className="h-2 w-16 bg-white/20 rounded" />
                        <div className="h-1.5 w-12 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Booking CTA */}
                  <div className="flex items-center justify-center pt-2">
                    <div className="h-10 w-40 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] border border-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Chat Mockup - Compact */}
            <div className="relative mx-auto max-w-xs animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="relative rounded-[2rem] bg-gradient-to-b from-gray-900 to-black p-1.5 shadow-2xl">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20" />
                <div className="relative rounded-[1.75rem] bg-[#020617] border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 pt-10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center">
                        <Scissors className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-[8px] uppercase tracking-wider text-gray-400">AI Assistant</p>
                        <p className="text-[10px] font-semibold text-white">24/7 Active</p>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                  </div>
                  <div className="px-3 pb-4 space-y-2">
                    <div className="flex justify-start animate-slide-in-left" style={{ animationDelay: '1.2s' }}>
                      <div className="max-w-[80%] rounded-xl bg-white/10 px-3 py-2">
                        <p className="text-[10px] text-gray-100">Available Saturday?</p>
                      </div>
                    </div>
                    <div className="flex justify-end animate-slide-in-right" style={{ animationDelay: '1.5s' }}>
                      <div className="max-w-[85%] rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] px-3 py-2">
                        <p className="text-[10px] text-white font-medium">Yes! 10:30am or 1pm works</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN → DESIRE → BENEFITS (Merged, Benefit-Focused) */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20 space-y-6 scroll-animate">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500">The Transformation</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              You're Tired of Doing Hair<br />And Customer Service
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              You miss DMs while you're foiling. You repeat the same answers. You bounce between apps just to keep your book full.
            </p>
          </div>

          {/* Before/After Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 scroll-animate">
            {/* Before - Pain */}
            <div className="group relative rounded-3xl border border-white/5 bg-gradient-to-br from-gray-800/20 via-gray-800/10 to-transparent px-8 py-10 backdrop-blur-sm transition-all duration-700 hover:border-white/10 hover:-translate-y-2">
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

            {/* After - Desire */}
            <div className="group relative rounded-3xl border border-[#06B6D4]/20 bg-gradient-to-br from-[#06B6D4]/10 via-[#6D28D9]/5 to-transparent px-8 py-10 backdrop-blur-sm transition-all duration-700 hover:border-[#06B6D4]/30 hover:-translate-y-2">
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
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
                  <span>Experience that feeling when your book is full and your DMs are quiet</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Benefits Grid - Result-Focused (Not Features) */}
          <div className="max-w-5xl mx-auto scroll-animate">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 text-center mb-8">What You Get</p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefit 1: Fully Booked Chairs */}
              <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                      <Calendar className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Fully Booked Chairs</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Your AI handles every inquiry while you focus on hair. No missed clients, no late-night DMs. Clients who value quality, not price shoppers.
                  </p>
                </div>
              </div>

              {/* Benefit 2: Premium Brand Presence */}
              <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Premium Brand Presence</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed">
                    A luxury online studio that attracts clients who pay premium prices. Your brand, elevated. The stylist lifestyle you deserve.
                  </p>
                </div>
              </div>

              {/* Benefit 3: Your Time Back */}
              <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                      <Clock className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Your Time Back</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Seamless booking that works with your flow. More time for what pays you most. Your weekends free, your book full.
                  </p>
                </div>
              </div>

              {/* Benefit 4: Zero Tech Headaches */}
              <div className="group relative rounded-3xl border border-white/5 bg-white/5 p-10 backdrop-blur-sm hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#06B6D4]/20">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/5 group-hover:to-[#6D28D9]/5 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20 group-hover:scale-110 transition-transform duration-500">
                      <Heart className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Zero Tech Headaches</h3>
                  </div>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Done-for-you setup. You focus on hair, we handle the tech. Always. Experience the freedom of a fully booked chair and quiet DMs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE OFFER - Result-Focused Benefits */}
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

          {/* Card 2: Result-Focused Benefits + CTA */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#6D28D9]/20 to-transparent rounded-full blur-2xl" />
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.3em] mb-6">What You'll Achieve</p>
                <div className="space-y-4">
                  {[
                    "Fully booked chairs with premium clients",
                    "Your DMs quiet, your book full",
                    "A luxury online studio that elevates your brand",
                    "More time for what pays you most - the hair",
                    "Seamless booking that works with your flow",
                    "Done-for-you setup with ongoing support"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-200 leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/stylists/contact"
                className="group w-full inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-bold px-8 py-5 rounded-full text-base border-2 border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 hover:scale-[1.02]"
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

      {/* SECTION 4: FINAL CTA - Single Powerful Close */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-[#06B6D4]/5 to-transparent py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 scroll-animate">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            Ready to Experience<br />The Stylist Lifestyle You Deserve?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Get your luxury booking site and AI assistant. Fully booked chairs. Premium clients. Your time back.
          </p>
          <Link
            href="/stylists/contact"
            className="group inline-flex items-center justify-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-bold px-12 py-6 rounded-full text-lg border-2 border-[#06B6D4] shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 hover:scale-[1.02] w-full sm:w-auto justify-center"
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
        
        @keyframes pulse-hero {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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
        
        .animate-pulse-hero {
          animation: pulse-hero 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
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
