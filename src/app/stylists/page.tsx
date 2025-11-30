"use client";

import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight, Sparkles, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function StylistsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animations
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
      {/* Ultra-Soft Premium Gradient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-gradient-to-b from-[#6D28D9]/8 via-[#06B6D4]/5 to-transparent blur-[250px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#06B6D4]/6 to-transparent blur-[220px] rounded-full" />
      </div>

      {/* SECTION 1: HERO - Luxury Boutique Experience */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-40 pb-40 md:pt-56 md:pb-56 overflow-hidden">
        {/* Soft Hero Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-gradient-to-r from-[#06B6D4]/8 via-[#6D28D9]/8 to-[#06B6D4]/8 rounded-full blur-3xl animate-pulse-hero" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Minimal Brand Badge */}
          <div className="flex items-center justify-center gap-3 mb-16 md:mb-20">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-[#06B6D4]/20">
              <span className="text-white text-xs font-bold">IX</span>
            </div>
            <span className="text-xs font-semibold text-gray-400 tracking-[0.3em] uppercase">INTELLLX</span>
          </div>

          {/* Premium Headline - Elegant & Magnetic */}
          <div className="text-center mb-16 md:mb-24 space-y-10 relative">
            <div className="absolute -inset-12 bg-gradient-to-r from-[#06B6D4]/8 via-[#6D28D9]/8 to-[#06B6D4]/8 blur-3xl rounded-full -z-10 animate-pulse-glow" />
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black leading-[0.88] tracking-[-0.02em] relative animate-headline-fade" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              <span className="block text-white drop-shadow-[0_0_50px_rgba(6,182,212,0.15)]">Get Fully</span>
              <span className="block mt-6 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent animate-gradient-shift drop-shadow-[0_0_60px_rgba(109,40,217,0.25)]">
                Booked
              </span>
              <span className="block mt-6 text-white text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] drop-shadow-[0_0_50px_rgba(6,182,212,0.15)]">Without the DMs</span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              The stylist lifestyle you deserve
            </p>
          </div>

          {/* Premium Glam Salon Website Mockup - Aspirational */}
          <div className="relative mb-20 md:mb-28 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="relative max-w-5xl mx-auto">
              {/* Desktop Browser Frame - Luxury */}
              <div className="rounded-[2rem] bg-gradient-to-br from-white/12 via-white/10 to-white/12 backdrop-blur-3xl border border-white/25 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Elegant Browser Bar */}
                <div className="flex items-center gap-3 px-8 py-5 bg-white/8 border-b border-white/15">
                  <div className="flex gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-500/30" />
                    <div className="w-4 h-4 rounded-full bg-yellow-500/30" />
                    <div className="w-4 h-4 rounded-full bg-green-500/30" />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="h-3.5 bg-white/12 rounded-full max-w-lg mx-auto" />
                  </div>
                </div>
                
                {/* Glam Salon Website Content */}
                <div className="p-10 md:p-16 space-y-10 bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A]">
                  {/* Elegant Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] flex items-center justify-center shadow-2xl shadow-[#06B6D4]/30">
                        <Scissors className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <div className="h-5 w-40 bg-white/35 rounded mb-2.5" />
                        <div className="h-3 w-32 bg-white/25 rounded" />
                      </div>
                    </div>
                    <div className="h-12 w-32 rounded-full bg-gradient-to-r from-[#06B6D4]/25 to-[#6D28D9]/25 border border-[#06B6D4]/40 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-xs text-[#A5F3FC] font-semibold tracking-wide">Book Now</span>
                    </div>
                  </div>

                  {/* Glam Hero Section - Beauty-Focused */}
                  <div className="relative h-56 md:h-72 rounded-3xl bg-gradient-to-br from-[#06B6D4]/25 via-[#6D28D9]/25 to-[#06B6D4]/25 border border-white/15 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="h-8 w-80 bg-white/40 rounded mx-auto shadow-lg" />
                        <div className="h-5 w-60 bg-white/30 rounded mx-auto" />
                      </div>
                    </div>
                    {/* Elegant Gradient Orbs */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#06B6D4]/40 rounded-full blur-3xl opacity-60" />
                    <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6D28D9]/40 rounded-full blur-3xl opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  </div>

                  {/* Premium Services Grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 md:h-40 rounded-2xl bg-white/8 border border-white/15 flex flex-col items-center justify-center gap-3 backdrop-blur-sm hover:bg-white/12 hover:border-white/25 transition-all duration-500">
                        <div className="h-4 w-28 bg-white/40 rounded mb-1" />
                        <div className="h-2.5 w-20 bg-white/30 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Glam Portfolio Gallery */}
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-[#06B6D4]/30 via-[#6D28D9]/30 to-[#06B6D4]/30 border border-white/15 shadow-lg" />
                    ))}
                  </div>

                  {/* Premium Booking CTA */}
                  <div className="flex items-center justify-center pt-6">
                    <div className="h-14 w-56 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] border-2 border-white/30 shadow-2xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-sm font-bold text-white tracking-wide">Book Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Luxury Glassmorphic CTA Button */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <Link
              href="/stylists/contact"
              className="group inline-flex items-center justify-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-2xl border-2 border-white/30 hover:border-white/40 text-white font-bold px-20 py-7 md:px-24 md:py-8 rounded-full text-xl md:text-2xl shadow-[0_0_60px_rgba(6,182,212,0.4),inset_0_0_60px_rgba(109,40,217,0.2)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6),inset_0_0_80px_rgba(109,40,217,0.3)] transition-all duration-700 hover:scale-[1.03] relative overflow-hidden"
            >
              {/* Glassmorphic shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Reserve Your Luxury System</span>
              <ArrowRight className="w-7 h-7 md:w-8 md:h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <div className="mt-8 space-y-2">
              <p className="text-lg text-gray-400 font-light">
                <span className="text-[#A5F3FC] font-semibold">$497</span> founding offer · <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
              </p>
              <p className="text-sm text-gray-500 font-light">Limited time · Premium setup included</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Benefits + Offer - Ultra-Compact Luxury */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-40 md:py-56">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start scroll-animate">
            {/* Left: Minimal Luxury Benefits */}
            <div className="space-y-8">
              <p className="text-xs font-semibold tracking-[0.4em] uppercase text-gray-500 mb-10">What You Get</p>
              <ul className="space-y-6">
                {[
                  "Fully booked chairs with premium clients",
                  "Your DMs quiet, your book full",
                  "A luxury online studio that elevates your brand",
                  "More time for what pays you most",
                  "Done-for-you setup with ongoing support"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-5">
                    <CheckCircle2 className="h-7 w-7 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                    <span className="text-xl text-gray-200 leading-relaxed font-light tracking-wide">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Pricing + Luxury CTA */}
            <div className="relative rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-12 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-10">
                <div>
                  <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.4em] mb-8">Founding Offer</p>
                  <div className="space-y-3 mb-10">
                    <p className="text-sm text-gray-500 line-through font-light">$1,497</p>
                    <h2 className="text-8xl md:text-9xl font-black tracking-tight text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                      $497
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 backdrop-blur-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse" />
                    <p className="text-sm text-gray-300 font-light">
                      <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
                    </p>
                  </div>
                </div>

                <Link
                  href="/stylists/contact"
                  className="group w-full inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-2xl border-2 border-white/30 hover:border-white/40 text-white font-bold px-10 py-6 rounded-full text-lg shadow-[0_0_50px_rgba(6,182,212,0.4),inset_0_0_50px_rgba(109,40,217,0.2)] hover:shadow-[0_0_70px_rgba(6,182,212,0.6),inset_0_0_70px_rgba(109,40,217,0.3)] transition-all duration-700 hover:scale-[1.02] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10">Reserve Your Spot</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                <p className="text-xs text-gray-500 text-center leading-relaxed font-light tracking-wide">
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes headline-fade {
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
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.03);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.3;
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
          animation: fade-in 1.2s ease-out forwards;
        }
        
        .animate-headline-fade {
          animation: headline-fade 1.5s ease-out forwards;
        }
        
        .animate-pulse-hero {
          animation: pulse-hero 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 5s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 5s ease infinite;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s ease-out, transform 1.2s ease-out;
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
