"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import WhyLeadFlowBand from "@/components/marketing/WhyLeadFlowBand";
import { copy } from "@/config/copy";
import { pricing } from "@/config/pricing";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, CheckCircle } from "lucide-react";
import HeroMockup from "@/components/ui/HeroMockup";

export default function Home() {
  const [currentValueProp, setCurrentValueProp] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  
  const valueProps = [
    "Captures leads 24/7",
    "Books calls automatically", 
    "Converts visitors to customers"
  ];

  // Optimized value prop rotation
  const rotateValueProp = useCallback(() => {
    setCurrentValueProp((prev) => (prev + 1) % valueProps.length);
  }, [valueProps.length]);

  useEffect(() => {
    const interval = setInterval(rotateValueProp, 3000);
    return () => clearInterval(interval);
  }, [rotateValueProp]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/15 to-purple-900/20"></div>
        
        {/* Subtle animated mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-indigo-500/3 to-purple-500/3">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/10 to-transparent animate-pulse"></div>
        </div>
        
        {/* Refined floating elements - Reduced for cleaner look */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={reduceMotion ? {} : {
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

      </div>

      {/* World-Class Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-center px-6 pt-20 pb-16 md:pt-28 md:pb-12">
        {/* Unifying Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, #3b82f6 1px, transparent 1px),
                              radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
              backgroundPosition: '0 0, 50px 50px'
            }}></div>
            {/* Subtle texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
          {/* Floating Elements - Slowed for premium feel */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-8xl mx-auto w-full">
          <div className="min-h-[72vh] grid grid-cols-1 md:grid-cols-2 items-center md:items-start gap-8 md:gap-12 pt-8 md:pt-16">
            {/* Left Side - Animated Text Content */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 md:space-y-10 md:-translate-y-6"
            >
              {/* Minimalist Eyebrow Label */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 backdrop-blur-sm px-2.5 py-1 text-[11px] uppercase tracking-wide text-white/80 hover:bg-white/[0.08] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 mb-3 md:mb-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
                <span>AI-Powered Business Solutions</span>
              </motion.div>

              {/* Animated Headline */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                  <span className="text-white block">
                    Your AI Sales Team
                  </span>
                  <div className="text-6xl md:text-7xl lg:text-8xl font-black">
                    <motion.span 
                      key={currentValueProp}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block"
                    >
                      {valueProps[currentValueProp]}
                    </motion.span>
                  </div>
                </h1>

                <motion.div 
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-300 font-medium tracking-wide"
                >
                  Intelligent chatbots + conversion-optimized websites for modern businesses
                </motion.div>
              </motion.div>

              {/* Refined Subtitle */}
              <motion.p 
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium"
              >
                {copy.hero.subhead_A}
              </motion.p>

              {/* Trust Indicators */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="flex flex-wrap gap-3 pt-4"
              >
                {copy.microcopy.trustRow.split(' • ').map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">{item}</span>
                    </div>
                  ))}
              </motion.div>

              {/* Premium CTA Buttons */}
              <motion.div 
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button 
                  onClick={() => {
                    console.log('Primary button clicked - navigating to contact');
                    window.location.href = '/contact';
                  }}
                  className="group inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition duration-200 ease-out active:duration-75 select-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 bg-[--btn] text-white shadow-sm shadow-black/10 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none hover:bg-[--btn-hover] px-5 py-3 text-base cursor-pointer relative z-10"
                  aria-label="Get started with LeadFlow chatbot and website development"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {copy.hero.ctas.primary}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button 
                  onClick={() => {
                    console.log('Secondary button clicked - navigating to pricing');
                    window.location.href = '/pricing';
                  }}
                  className="inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition duration-200 ease-out active:duration-75 select-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 border border-white/20 text-white/90 hover:text-white hover:border-white/40 hover:bg-white/5 active:shadow-none px-5 py-3 text-base cursor-pointer relative z-10"
                  aria-label="View pricing plans and packages"
                >
                  <Zap className="w-5 h-5 text-blue-400 mr-2" />
                  {copy.hero.ctas.secondary}
                </button>
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Cluster (Logo + Mockup) */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, x: 50, scale: 0.9 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col items-center justify-center md:self-start md:justify-self-end space-y-6 order-2 md:order-2 mt-12 md:mt-0 md:-translate-y-3"
            >
              {/* Logo Section */}
              <div className="relative">
                {/* Logo Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-110"></div>
                
                {/* Main Logo */}
                <motion.div
                  animate={reduceMotion ? {} : { 
                    y: [0, -8, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  <Image
                    src="/images/logo/Intelllxherologo.png"
                    alt="INTELLLX Logo"
                    width={360}
                    height={360}
                    className="w-full max-w-[360px] md:max-w-[380px] aspect-square object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Floating Elements Around Logo */}
                <motion.div
                  className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500/20 rounded-full"
                  animate={reduceMotion ? {} : { 
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-5 h-5 bg-purple-500/20 rounded-full"
                  animate={reduceMotion ? {} : { 
                    y: [0, 15, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -left-6 w-3 h-3 bg-indigo-500/20 rounded-full"
                  animate={reduceMotion ? {} : { 
                    x: [0, -10, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
              </div>

              {/* UI Mockup - Positioned to "speak" to headline */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.95 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
                className="relative w-full max-w-[320px] md:max-w-[340px] mx-auto md:ml-8"
                whileHover={reduceMotion ? {} : { 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={{ 
                  transform: 'perspective(1000px) rotateX(1deg) rotateY(-1deg)',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'
                }}
              >
                <HeroMockup reduceMotion={!!reduceMotion} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simplified How It Works Section */}
      <section id="how-it-works" className="relative py-24 px-6 bg-gradient-to-br from-gray-800/50 via-slate-800/30 to-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              <span className="text-white">How It</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Works</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Three simple steps to get your AI sales assistant running
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "We Learn",
                body: "Tell us about your business and goals in a 15-minute call.",
                number: "1"
              },
              {
                title: "We Build",
                body: "We create your custom AI chatbot and integrate it with your systems.",
                number: "2"
              },
              {
                title: "You Convert",
                body: "Your AI captures leads 24/7 while you focus on closing deals.",
                number: "3"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-white">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LeadFlow Works - Simplified */}
      <WhyLeadFlowBand />

      {/* Single CTA Section - Simplified */}
      <section className="relative py-32 md:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Get Started?
            </h2>
            
            <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
              Book a 15-minute discovery call. We&apos;ll learn about your business and show you exactly how LeadFlow will transform your lead generation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                aria-label="Book a discovery call"
              >
                {pricing.ctaLabels.bookDiscovery}
              </button>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="View pricing options"
              >
                {pricing.ctaLabels.viewPricing}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}