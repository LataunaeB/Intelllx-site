"use client";

import Link from "next/link";
import Image from "next/image";
import { Scissors, CheckCircle2, ArrowRight, Sparkles, MessageSquare, Star, Crown } from "lucide-react";
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
      {/* Soft Purple/Teal Gradient Background - More Visible */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] bg-gradient-to-b from-[#6D28D9]/12 via-[#06B6D4]/8 to-transparent blur-[300px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[900px] h-[900px] bg-gradient-to-t from-[#06B6D4]/10 via-[#6D28D9]/6 to-transparent blur-[280px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#6D28D9]/8 to-[#06B6D4]/6 blur-[250px] rounded-full" />
      </div>

      {/* SECTION 1: HERO - Premium Luxury Experience (60% of page) */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
        {/* Enhanced Soft Gradient Glow Behind Hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] bg-gradient-to-r from-[#06B6D4]/12 via-[#6D28D9]/12 to-[#06B6D4]/12 rounded-full blur-3xl animate-pulse-hero" />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Premium Headline - Enhanced Animation */}
          <div className="text-center mb-12 md:mb-16 space-y-8 relative">
            <div className="absolute -inset-16 bg-gradient-to-r from-[#06B6D4]/12 via-[#6D28D9]/12 to-[#06B6D4]/12 blur-3xl rounded-full -z-10 animate-pulse-glow" />
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black leading-[0.88] tracking-[-0.02em] relative animate-headline-fade" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              <span className="block text-white drop-shadow-[0_0_60px_rgba(6,182,212,0.2)]">Get Fully</span>
              <span className="block mt-4 sm:mt-6 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] bg-clip-text text-transparent animate-gradient-shift drop-shadow-[0_0_70px_rgba(109,40,217,0.3)]">
                Booked
              </span>
              <span className="block mt-4 sm:mt-6 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] drop-shadow-[0_0_60px_rgba(6,182,212,0.2)]">Without the DMs</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              The stylist lifestyle you deserve
            </p>
            {/* Trust Signal - Founder Story */}
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light mt-4">
              Built by an AI consultant helping stylists book 3x more clients without living in their DMs
            </p>
          </div>

          {/* Visual Showcase: Salon Website + Chat Card */}
          <div className="relative mb-16 md:mb-20">
            <div className="relative max-w-5xl mx-auto">
              {/* Premium Glam Salon Website Mockup */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="rounded-[2rem] bg-gradient-to-br from-white/15 via-white/12 to-white/15 backdrop-blur-3xl border border-white/30 shadow-[0_50px_150px_rgba(0,0,0,0.7)] overflow-hidden">
                  {/* Elegant Browser Bar */}
                  <div className="flex items-center gap-3 px-8 py-5 bg-white/10 border-b border-white/20">
                    <div className="flex gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-red-500/30" />
                      <div className="w-4 h-4 rounded-full bg-yellow-500/30" />
                      <div className="w-4 h-4 rounded-full bg-green-500/30" />
                    </div>
                    <div className="flex-1 mx-8">
                      <div className="h-3.5 bg-white/15 rounded-full max-w-lg mx-auto" />
                    </div>
                  </div>
                  
                  {/* Glam Salon Website Content - Using Real Mockup Image */}
                  <div className="relative bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A] overflow-hidden">
                    <Image
                      src="/images/stylists/mockup1chat.png"
                      alt="AI Booking System Mockup - Salon Website with Chat Interface"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      priority
                      quality={95}
                    />
                  </div>
                </div>
              </div>

              {/* Glass Chat Assistant Card - Visible on All Screens */}
              <div className="mt-8 lg:mt-0 lg:absolute lg:-right-8 xl:-right-16 lg:top-1/2 lg:-translate-y-1/2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="relative w-full max-w-sm lg:w-80 mx-auto lg:mx-0 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden hover:shadow-[0_40px_120px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-2">
                  {/* Glossy shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Chat Header */}
                  <div className="relative px-6 py-4 border-b border-white/15 bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center shadow-lg">
                        <MessageSquare className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">AI Assistant</p>
                        <p className="text-[10px] text-gray-300">Online 24/7</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                        <span className="text-[10px] text-[#A5F3FC] font-medium">Live</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="relative p-5 space-y-3 bg-gradient-to-b from-transparent to-[#0F172A]/50">
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl bg-white/10 border border-white/10 px-4 py-3 backdrop-blur-sm">
                        <p className="text-sm text-gray-200 leading-relaxed">Hey, do you have anything open Saturday for a silk press?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] px-4 py-3 shadow-lg">
                        <p className="text-sm text-white font-medium leading-relaxed">
                          Yes! I have <strong className="font-bold">10:30am</strong> or <strong className="font-bold">1:00pm</strong> available. Which works for you?
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 rounded-full bg-white/10 hover:bg-[#06B6D4]/20 border border-white/15 hover:border-[#06B6D4]/40 px-3 py-2 text-[11px] text-white font-medium transition-all duration-200">
                        Book 10:30am
                      </button>
                      <button className="flex-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-2 text-[11px] text-white font-medium transition-all duration-200">
                        More Times
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ONE Glowing Luxury CTA Button - Much More Prominent */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <Link
              href="/stylists/contact"
              className="group inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] hover:from-[#06B6D4]/90 hover:to-[#6D28D9]/90 text-white font-bold px-8 py-6 md:px-24 md:py-8 lg:px-32 lg:py-10 rounded-full text-lg md:text-2xl lg:text-3xl shadow-[0_0_80px_rgba(6,182,212,0.6),0_0_120px_rgba(109,40,217,0.4)] hover:shadow-[0_0_100px_rgba(6,182,212,0.8),0_0_150px_rgba(109,40,217,0.6)] border-2 border-white/40 transition-all duration-700 hover:scale-[1.05] relative overflow-hidden"
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              {/* Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Get My AI Booking System</span>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 relative z-10 group-hover:translate-x-3 transition-transform duration-300" />
            </Link>
            <div className="mt-10 space-y-3">
              <p className="text-lg md:text-xl text-gray-200 font-light">
                <span className="text-[#A5F3FC] font-semibold">$497</span> Founding Offer · <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
              </p>
              <p className="text-sm text-gray-400 font-light">First 10 stylists get personal customization</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Transformation - Emotional Benefits (15% of page) */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-6 scroll-animate">
          <div className="text-center mb-16 space-y-6">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase text-gray-400">The Transformation</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              Stop Losing Clients<br />To Slow Replies
            </h2>
          </div>

          {/* Emotional Benefits - Beauty Industry Triggers */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-xl hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/8 group-hover:to-[#6D28D9]/8 transition-all duration-700" />
              <div className="relative z-10">
                <Sparkles className="h-8 w-8 text-[#06B6D4] mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">Your Brand Instantly Feels High-End</h3>
                <p className="text-base text-gray-200 leading-relaxed font-light">
                  A luxury booking website that makes you look as professional online as your work truly is. No more embarrassing double-bookings or missed messages.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Custom branded booking site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Professional portfolio showcase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Mobile-optimized for client bookings</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-xl hover:border-[#06B6D4]/30 hover:bg-white/8 transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/8 group-hover:to-[#6D28D9]/8 transition-all duration-700" />
              <div className="relative z-10">
                <Crown className="h-8 w-8 text-[#06B6D4] mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">No More Chasing Clients</h3>
                <p className="text-base text-gray-200 leading-relaxed font-light">
                  Your AI assistant handles every inquiry while you focus on hair. Your weekends free, your book full. The freedom you deserve.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>24/7 automated DM responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Instant booking confirmations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Automated reminder system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VIP Offer (20% of page) */}
      <section className="relative max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="relative rounded-3xl border border-white/15 bg-white/8 backdrop-blur-2xl p-12 md:p-16 shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden scroll-animate">
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-[#06B6D4]/25 to-[#6D28D9]/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-[#6D28D9]/25 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 backdrop-blur-sm">
                <Crown className="w-4 h-4 text-[#06B6D4]" />
                <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.3em]">VIP Founding Stylist Program</p>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                Reserve Your<br />$497 Founding Spot
              </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
              Limited to the first 10 stylists. Get personal customization and lock in this price forever.
            </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Pricing */}
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.3em] mb-4">Founding Offer</p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <p className="text-base md:text-lg text-gray-400 line-through font-light">$1,497</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#06B6D4]/20 to-[#6D28D9]/20 border border-[#06B6D4]/40 text-sm font-semibold text-[#A5F3FC]">
                      Save $1,000
                    </span>
                  </div>
                  <h3 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
                    $497
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 backdrop-blur-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse" />
                  <p className="text-sm text-gray-200 font-light">
                    <span className="text-[#A5F3FC] font-semibold">10 spots</span> remaining
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-5">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-[0.3em] mb-6">What You Get</p>
                {[
                  "Fully booked chairs with premium clients",
                  "Your DMs quiet, your book full",
                  "A luxury online studio that elevates your brand",
                  "More time for what pays you most",
                  "Done-for-you setup with ongoing support"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-100 leading-relaxed font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ONE CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/stylists/contact"
                className="group inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] hover:from-[#06B6D4]/90 hover:to-[#6D28D9]/90 text-white font-bold px-8 py-6 md:px-20 md:py-7 lg:px-28 lg:py-8 rounded-full text-lg md:text-xl lg:text-2xl shadow-[0_0_70px_rgba(6,182,212,0.5),0_0_110px_rgba(109,40,217,0.3)] hover:shadow-[0_0_90px_rgba(6,182,212,0.7),0_0_140px_rgba(109,40,217,0.5)] border-2 border-white/40 transition-all duration-700 hover:scale-[1.03] relative overflow-hidden w-full md:w-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">Get My AI Booking System</span>
                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <p className="text-xs text-gray-400 text-center mt-6 font-light tracking-wide">
                No long contracts. No course. Just a done-for-you luxury system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Final CTA - Minimal Close (5% of page) */}
      <section className="relative border-t border-white/5 bg-gradient-to-b from-transparent via-[#06B6D4]/5 to-transparent py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 scroll-animate">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
            Ready to Look as Professional<br />Online as Your Work Truly Is?
          </h2>
          <Link
            href="/stylists/contact"
            className="group inline-flex items-center justify-center gap-4 bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] hover:from-[#06B6D4]/90 hover:to-[#6D28D9]/90 text-white font-bold px-8 py-6 md:px-20 md:py-7 lg:px-28 lg:py-8 rounded-full text-lg md:text-xl lg:text-2xl shadow-[0_0_70px_rgba(6,182,212,0.5),0_0_110px_rgba(109,40,217,0.3)] hover:shadow-[0_0_90px_rgba(6,182,212,0.7),0_0_140px_rgba(109,40,217,0.5)] border-2 border-white/40 transition-all duration-700 hover:scale-[1.03] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">Get My AI Booking System</span>
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
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
            transform: translateY(30px);
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
            transform: translate(-50%, -50%) scale(1.03);
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
