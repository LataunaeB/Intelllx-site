"use client";

import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
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
      {/* Premium Ambient Glow - Subtle */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#6D28D9]/6 blur-[200px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#06B6D4]/4 blur-[180px] rounded-full" />
      </div>

      {/* SECTION 1: HERO - Ultra-Minimal Luxury (70% of page) */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-32 pb-32 md:pt-48 md:pb-48 overflow-hidden">
        {/* Enhanced Hero Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-[#06B6D4]/10 via-[#6D28D9]/10 to-[#06B6D4]/10 rounded-full blur-3xl animate-pulse-hero" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Minimal Brand Badge */}
          <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
              <span className="text-white text-xs font-bold">IX</span>
            </div>
            <span className="text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase">INTELLLX</span>
          </div>

          {/* Premium Headline - Massive */}
          <div className="text-center mb-12 md:mb-16 space-y-8 relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#06B6D4]/10 via-[#6D28D9]/10 to-[#06B6D4]/10 blur-3xl rounded-full -z-10 animate-pulse-glow" />
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-[0.9] tracking-tight relative" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              <span className="block text-white drop-shadow-[0_0_40px_rgba(6,182,212,0.2)]">Get Fully</span>
              <span className="block mt-4 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent animate-gradient-shift drop-shadow-[0_0_50px_rgba(109,40,217,0.3)]">
                Booked
              </span>
              <span className="block mt-4 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] drop-shadow-[0_0_40px_rgba(6,182,212,0.2)]">Without the DMs</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              The stylist lifestyle you deserve. Fully booked chairs. Premium clients.
            </p>
          </div>

          {/* Premium Salon Website Mockup - Large & Detailed */}
          <div className="relative mb-16 md:mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Desktop Browser Frame */}
            <div className="relative max-w-4xl mx-auto">
              <div className="rounded-3xl bg-gradient-to-br from-white/10 via-white/8 to-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Browser Bar */}
                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500/40" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/40" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/40" />
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="h-3 bg-white/10 rounded-full max-w-md mx-auto" />
                  </div>
                </div>
                
                {/* Salon Website Content */}
                <div className="p-8 md:p-12 space-y-8 bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A]">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-xl">
                        <Scissors className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="h-4 w-32 bg-white/30 rounded mb-2" />
                        <div className="h-2.5 w-24 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="h-10 w-28 bg-[#06B6D4]/20 rounded-full border border-[#06B6D4]/30 flex items-center justify-center">
                      <span className="text-xs text-[#A5F3FC] font-medium">Book Now</span>
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div className="relative h-48 md:h-64 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 via-[#6D28D9]/20 to-[#06B6D4]/20 border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="h-6 w-64 bg-white/30 rounded mx-auto" />
                        <div className="h-4 w-48 bg-white/20 rounded mx-auto" />
                      </div>
                    </div>
                    {/* Decorative gradient orbs */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#6D28D9]/30 rounded-full blur-3xl" />
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-24 md:h-32 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 backdrop-blur-sm hover:bg-white/8 transition-all">
                        <div className="h-3 w-20 bg-white/30 rounded mb-1" />
                        <div className="h-2 w-16 bg-white/20 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Portfolio Preview Row */}
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 border border-white/10" />
                    ))}
                  </div>

                  {/* Booking CTA */}
                  <div className="flex items-center justify-center pt-4">
                    <div className="h-12 w-48 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] border border-white/20 shadow-xl flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">Book Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ONE Luxury CTA Button */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              href="/stylists/contact"
              className="group inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] hover:from-[#06B6D4]/90 hover:to-[#6D28D9]/90 text-white font-bold px-16 py-6 md:px-20 md:py-7 rounded-full text-xl md:text-2xl border-2 border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm"
            >
              Reserve Your $497 Founding Spot
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <p className="text-sm text-gray-400 mt-6 font-light">
              10 spots remaining · Limited founding offer
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Benefits + Offer - Ultra-Compact (30% of page) */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start scroll-animate">
            {/* Left: Minimal Benefits List */}
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-8">What You Get</p>
              <ul className="space-y-5">
                {[
                  "Fully booked chairs with premium clients",
                  "Your DMs quiet, your book full",
                  "A luxury online studio that elevates your brand",
                  "More time for what pays you most - the hair",
                  "Done-for-you setup with ongoing support"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-200 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Pricing + CTA */}
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl p-10 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-8">
                <div>
                  <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.3em] mb-6">Founding Offer</p>
                  <div className="space-y-2 mb-8">
                    <p className="text-sm text-gray-500 line-through">$1,497</p>
                    <h2 className="text-7xl md:text-8xl font-black tracking-tight text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                      $497
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20">
                    <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                    <p className="text-sm text-gray-300">
                      <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
                    </p>
                  </div>
                </div>

                <Link
                  href="/stylists/contact"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] hover:from-[#06B6D4]/90 hover:to-[#6D28D9]/90 text-white font-bold px-8 py-5 rounded-full text-lg border-2 border-white/20 shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all duration-500 hover:scale-[1.02]"
                >
                  Reserve Your Spot
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                <p className="text-xs text-gray-500 text-center leading-relaxed font-light">
                  No long contracts. No course. Just a done-for-you system.
                </p>
              </div>
            </div>
          </div>
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
        
        @keyframes pulse-hero {
          0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
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
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-pulse-hero {
          animation: pulse-hero 5s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease-out, transform 1s ease-out;
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
