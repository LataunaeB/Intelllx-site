"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Image from "next/image";
import WhyLeadFlowBand from "@/components/marketing/WhyLeadFlowBand";
import { copy } from "@/config/copy";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import HeroMockup from "@/components/ui/HeroMockup";
import ProcessDiagram from "@/components/ui/ProcessDiagram";
import WorksWithStrip from "@/components/ui/WorksWithStrip";

export default function Home() {
  const [currentValueProp, setCurrentValueProp] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  
  const valueProps = [
    "Captures leads 24/7",
    "Books calls automatically", 
    "Nurtures prospects while you sleep",
    "Converts visitors to customers",
    "Never misses an opportunity"
  ];

  // Optimized value prop rotation
  const rotateValueProp = useCallback(() => {
    setCurrentValueProp((prev) => (prev + 1) % valueProps.length);
  }, [valueProps.length]);

  useEffect(() => {
    const interval = setInterval(rotateValueProp, 3000);
    return () => clearInterval(interval);
  }, [rotateValueProp]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        
        {/* Refined floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Elegant cursor glow */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl pointer-events-none"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
          animate={reduceMotion ? {} : {
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* World-Class Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center px-6 pt-20 pb-16 md:pt-28 md:pb-12">
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
          </div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-8xl mx-auto w-full">
          <div className="min-h-[72vh] grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            {/* Left Side - Animated Text Content */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
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
              Your 24/7 AI
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
                  LeadFlow Chatbots & Web Development That Convert
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
                className="flex flex-wrap gap-4"
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
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button 
                  onClick={() => {
                    console.log('Primary button clicked - navigating to contact');
                    window.location.href = '/contact';
                  }}
                  className="group inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition duration-200 ease-out active:duration-75 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] disabled:opacity-50 bg-[--btn] text-white shadow-sm shadow-black/10 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none hover:bg-[--btn-hover] px-5 py-3 text-base cursor-pointer relative z-10"
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
                  className="inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition duration-200 ease-out active:duration-75 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--ring] disabled:opacity-50 border border-white/20 text-white/90 hover:text-white hover:border-white/40 hover:bg-white/5 active:shadow-none px-5 py-3 text-base cursor-pointer relative z-10"
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
              className="flex flex-col items-center justify-center md:self-start md:justify-self-end space-y-6 order-2 md:order-2 mt-12 md:mt-0"
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
                    width={320}
                    height={320}
                    className="w-full max-w-[320px] aspect-square object-contain drop-shadow-2xl"
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
                initial={reduceMotion ? false : { opacity: 0, y: 20, rotateX: 2 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="relative w-full max-w-[280px] mx-auto md:ml-8"
                style={{ 
                  transform: 'perspective(1000px) rotateX(1deg) rotateY(-1deg)',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
                }}
              >
                <HeroMockup reduceMotion={!!reduceMotion} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium How It Works Section */}
      <section id="how-it-works" className="relative py-24 px-6 bg-gradient-to-br from-gray-800/50 via-slate-800/30 to-gray-900/50 backdrop-blur-sm">
        {/* Visual Anchor - Diagonal Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}></div>
        </div>
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-8">
              <span className="text-sm font-semibold tracking-wide">Simple Process</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              <span className="text-white">How It</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Works</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Three simple steps to transform your business with AI-powered lead generation
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Discovery",
                body: "We learn about your business, goals, and ideal customers to create the perfect chatbot strategy.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Design & Deploy",
                body: "We build and customize your LeadFlow chatbot with your brand voice and integrate it seamlessly.",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                color: "from-blue-500 to-indigo-500"
              },
              {
                title: "Optimize & Scale",
                body: "We continuously monitor performance, optimize conversations, and help you scale your success.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 p-8"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r ${step.color}`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-medium">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Diagram */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-16"
          >
            <ProcessDiagram reduceMotion={!!reduceMotion} />
          </motion.div>
        </div>
      </section>

      {/* Why LeadFlow Works */}
      <WhyLeadFlowBand />

      {/* Premium Services Section */}
      <section id="services" className="relative py-24 px-6 bg-gradient-to-br from-slate-900/30 via-gray-900/20 to-slate-800/30">
        {/* Visual Anchor - Diagonal Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, #3b82f6 1px, transparent 1px),
                            linear-gradient(-45deg, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}></div>
        </div>
        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 mb-8">
              <span className="text-sm font-medium text-purple-300 tracking-wide">Our Services</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Two Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Solutions</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Choose the service that fits your needs, or combine both for maximum impact
            </p>
          </motion.div>
          
          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* LeadFlow Chatbot */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">LeadFlow Chatbot</h3>
                    <p className="text-purple-300 font-semibold">$1,500 setup + $400/mo</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Your 24/7 AI sales assistant that captures leads, books calls, and nurtures prospects while you sleep.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "24/7 lead capture and qualification",
                    "Automatic call booking and reminders", 
                    "CRM integration and follow-up automation",
                    "Multi-language support",
                    "Weekly optimization and reporting"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <StripeCheckoutButton className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-purple-500/25 transition-all duration-300">
                    Get Started
                  </StripeCheckoutButton>
                  <Button 
                    variant="ghost" 
                    size="md"
                    onClick={() => router.push('/contact')}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Website Development */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Website Development</h3>
                    <p className="text-blue-300 font-semibold">Starting at $2,000</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Custom websites built with modern technologies that convert visitors into customers.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "Responsive design for all devices",
                    "SEO optimization and fast loading",
                    "Modern animations and interactions",
                    "LeadFlow Chatbot integration available",
                    "Ongoing support and maintenance"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Link
                    href="/services/website-development"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-blue-500/25 transition-all duration-300 text-center"
                  >
                    View Packages
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="md"
                    onClick={() => router.push('/contact')}
                  >
                    Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Showcase */}
      <section id="features" className="relative py-24 px-6 bg-gradient-to-br from-gray-900/40 via-slate-900/20 to-gray-800/40">
        {/* Visual Anchor - Diagonal Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #10b981 1px, transparent 1px),
                            radial-gradient(circle at 80% 80%, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }}></div>
        </div>
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-500/20 mb-8">
              <span className="text-sm font-medium text-emerald-300 tracking-wide">Why Choose LeadFlow</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Advanced <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Technology</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Designed specifically for lead generation and sales conversion
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Never miss a lead again. Our AI works around the clock to capture and qualify prospects even while you sleep.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Smart Lead Capture",
                description: "Intelligently captures contact information and qualifies leads before sending them to your CRM system.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Auto Booking",
                description: "Seamlessly books discovery calls directly to your calendar with automatic reminders and follow-ups.",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color}/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors duration-300 font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Portfolio Section */}
      <section id="portfolio" className="relative py-24 px-6 bg-gradient-to-br from-slate-800/30 via-gray-900/20 to-slate-900/30">
        {/* Visual Anchor - Diagonal Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, #f59e0b 0deg, transparent 60deg, #3b82f6 120deg, transparent 180deg, #8b5cf6 240deg, transparent 300deg)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 mb-8">
              <span className="text-sm font-medium text-orange-300 tracking-wide">Our Work</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">What We</span> Build
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Examples of the types of solutions we create for businesses like yours
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Case Study 1 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">E-commerce Store</h3>
                  <p className="text-slate-400 text-sm">LeadFlow Chatbot Integration</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-3">E-commerce Solution</h4>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Challenge:</strong> E-commerce stores often miss visitors who need help with products
                </p>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Our Solution:</strong> LeadFlow Chatbot with product recommendations and cart recovery
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                  <strong className="text-white">Expected Impact:</strong> Higher conversion rates and reduced cart abandonment
                </p>
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>

            {/* Case Study 2 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Service Business</h3>
                  <p className="text-slate-400 text-sm">Complete Website Redesign</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-3">Service Business Solution</h4>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Challenge:</strong> Service businesses need fast, professional websites that convert
                </p>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Our Solution:</strong> Modern Next.js website with LeadFlow integration
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                  <strong className="text-white">Expected Impact:</strong> Faster loading, better user experience, more leads
                </p>
                <div className="flex items-center gap-2 text-blue-300 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>

            {/* Case Study 3 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">SaaS Company</h3>
                  <p className="text-slate-400 text-sm">Full Stack Solution</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-white mb-3">SaaS Solution</h4>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Challenge:</strong> SaaS companies need to convert trial users to paid customers
                </p>
                <p className="text-slate-300 mb-3 leading-relaxed text-sm">
                  <strong className="text-white">Our Solution:</strong> Website + LeadFlow for qualification & nurturing
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                  <strong className="text-white">Expected Impact:</strong> Better trial qualification and higher conversion rates
                </p>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Value Proposition */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8">
              <span className="text-sm font-medium text-purple-300 tracking-wide">Ready to Transform?</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              Transform Your Website Into a
            </h2>
            
            <div className="text-4xl md:text-6xl font-black mb-12">
              <motion.span 
                key={currentValueProp}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent inline-block"
              >
                {valueProps[currentValueProp]}
              </motion.span>
            </div>
            
            <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Experience the power of AI to automate lead generation, qualify prospects, and book more sales calls.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="secondary"
                size="lg"
                icon={<Zap className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push('/contact')}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Premium Trust Indicators */}
      <section className="relative py-24 px-6">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border border-emerald-500/20 mb-8">
              <span className="text-sm font-medium text-emerald-300 tracking-wide">Built for Success</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Why LeadFlow is the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Choice</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Professional-grade AI technology designed to deliver real business results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Secure", description: "Enterprise-grade security and privacy protection" },
              { icon: Zap, title: "Scalable", description: "Grows with your business needs and traffic" },
              { icon: CheckCircle, title: "Reliable", description: "99.9% uptime with dedicated support" },
              { icon: Clock, title: "Fast", description: "Lightning-fast responses and instant setup" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works With Integration Strip */}
      <WorksWithStrip reduceMotion={!!reduceMotion} />

      {/* Premium Trust & Credibility */}
      <section className="relative py-24 px-6">
        <div className="max-w-8xl mx-auto">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/20 mb-8">
              <span className="text-sm font-medium text-orange-300 tracking-wide">Why Choose Us</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Built on <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Integrity</span> & Excellence
            </h2>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              We&apos;re committed to honesty, transparency, and delivering real results for our clients
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Trust Factor 1 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 p-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">100% Transparent</h4>
                  <p className="text-purple-300 font-semibold text-sm">No Hidden Fees</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                Clear, upfront pricing with no surprises. What you see is what you pay, period.
              </p>
              
              <div className="text-purple-300 font-semibold text-sm">
                ✓ Honest pricing, clear contracts
              </div>
            </motion.div>

            {/* Trust Factor 2 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 p-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Proven Technology</h4>
                  <p className="text-blue-300 font-semibold text-sm">Modern Stack</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                Built with Next.js, React, and cutting-edge AI technology that actually works.
              </p>
              
              <div className="text-blue-300 font-semibold text-sm">
                ✓ Latest tech, reliable results
              </div>
            </motion.div>

            {/* Trust Factor 3 */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 p-6"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Dedicated Support</h4>
                  <p className="text-emerald-300 font-semibold text-sm">7 Hours Monthly</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6">
                Personal attention and ongoing optimization to ensure your success.
              </p>
              
              <div className="text-emerald-300 font-semibold text-sm">
                ✓ Real human support, not just software
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Final CTA */}
      <section id="cta" className="relative py-24 px-6 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-indigo-900/20">
        {/* Visual Anchor - Diagonal Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(30deg, #3b82f6 1px, transparent 1px),
                            linear-gradient(-30deg, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0, 40px 40px'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-12 border border-purple-500/20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              Ready to Transform Your Business?
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Join the growing number of businesses using AI to accelerate growth and create lasting impact.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                icon={<Sparkles className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push('/contact')}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}