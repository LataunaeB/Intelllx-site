"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Image from "next/image";

export default function Home() {
  const [currentValueProp, setCurrentValueProp] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
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

  // Intersection Observer for performance
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-20">
        {/* Enhanced Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 mb-8 animate-fade-in-scale">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">✨ AI-Powered Lead Generation</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              <span className="text-white animate-fade-in-up block leading-tight">Your 24/7 AI</span>
              <span 
                className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in-up block leading-tight" 
                style={{animationDelay: '0.2s'}}
                aria-live="polite"
                aria-label={`Current feature: ${valueProps[currentValueProp]}`}
              >
                <span className="inline-block transition-all duration-500 ease-out" key={currentValueProp}>
                  {valueProps[currentValueProp]}
                </span>
              </span>
        </h1>
            
            {/* Enhanced Description */}
            <p className="mt-8 text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed animate-slide-in-up font-medium" style={{animationDelay: '0.4s'}}>
              Meet LeadFlow Chatbot—your intelligent, always-on sales team that captures leads, books calls, and nurtures prospects while you sleep.
            </p>
            
            {/* Key Benefits */}
            <div className="mt-8 space-y-3 animate-slide-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <span className="text-lg font-medium">Never miss another opportunity</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                <span className="text-lg font-medium">Turn visitors into customers automatically</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                <span className="text-lg font-medium">Works 24/7 while you focus on closing deals</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative" ref={heroRef}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 animate-pulse rounded-3xl flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-purple-400 rounded-full animate-spin"></div>
                </div>
              )}
              
              <Image
                src="/images/hero/chatbot-hero.jpg"
                alt="Modern AI Chatbot Interface - LeadFlow Chatbot for intelligent lead generation and sales automation"
                width={800}
                height={550}
                className={`w-full h-auto max-w-2xl mx-auto transition-all duration-700 ${
                  imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                } group-hover:scale-105 shadow-2xl`}
                priority={true}
                onLoad={() => setImageLoading(false)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Enhanced floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
          
          {/* Enhanced CTAs */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/demo"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-500 overflow-hidden border border-purple-500/20 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              aria-label="Request a personalized demo of LeadFlow Chatbot"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3 z-10">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Request a Demo
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

          <Link
            href="/book"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/30"
              aria-label="Book a discovery call with our team"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3 z-10">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Call
              </span>
          </Link>

          <Link
            href="/pricing"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/30"
              aria-label="View pricing plans and get started"
          >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-3 z-10">
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            View Pricing
              </span>
          </Link>
        </div>

        {/* Services Overview */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">🚀 Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Two Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
              Choose the service that fits your needs, or combine both for maximum impact
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {/* LeadFlow Chatbot */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">LeadFlow Chatbot</h3>
                    <p className="text-purple-300 font-semibold">$1,500 setup + $400/mo</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Your 24/7 AI sales assistant that captures leads, books calls, and nurtures prospects while you sleep.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">24/7 lead capture and qualification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">Automatic call booking and reminders</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">CRM integration and follow-up automation</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <StripeCheckoutButton className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-purple-500/25 transition-all duration-300">
                    Get Started
                  </StripeCheckoutButton>
                  <Link
                    href="/demo"
                    className="px-6 py-3 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Demo
                  </Link>
                </div>
              </div>
            </div>

            {/* Website Development */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Website Development</h3>
                    <p className="text-blue-300 font-semibold">Starting at $2,000</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Custom websites built with modern technologies that convert visitors into customers.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">Responsive design for all devices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">SEO optimization and fast loading</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">LeadFlow Chatbot integration available</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link
                    href="/services/website-development"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-blue-500/25 transition-all duration-300 text-center"
                  >
                    View Packages
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">🚀 Core Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LeadFlow</span>?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
              The most advanced AI chatbot designed specifically for lead generation and sales conversion
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-6 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/features/24-7-support.jpg"
                    alt="24/7 AI Support - Always available chatbot"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300 leading-tight">24/7 Availability</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-300 font-medium">
                  Never miss a lead again. Our AI works around the clock to capture and qualify prospects even while you sleep.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-6 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/features/lead-generation.jpg"
                    alt="Smart Lead Generation - AI capturing leads"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 leading-tight">Smart Lead Capture</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-300 font-medium">
                  Intelligently captures contact information and qualifies leads before sending them to your CRM system.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-6 rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/features/ai-conversation.jpg"
                    alt="AI Conversation - Smart chatbot interaction"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300 leading-tight">Auto Booking</h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-300 font-medium">
                  Seamlessly books discovery calls directly to your calendar with automatic reminders and follow-ups.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-32 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
              <span className="text-sm font-medium text-white/90">✨ Ready to Transform?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Website Into a
            </h2>
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent inline-block transition-all duration-500 ease-out" key={currentValueProp}>
                {valueProps[currentValueProp]}
              </span>
            </div>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed font-medium max-w-2xl mx-auto">
              Experience the power of AI to automate lead generation, qualify prospects, and book more sales calls.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <StripeCheckoutButton className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-500 overflow-hidden border border-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative flex items-center gap-3 z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Started Now
                </span>
              </StripeCheckoutButton>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
              >
                Request Demo
              </Link>
            </div>
          </div>
      </div>

        {/* Trust Indicators */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-medium text-white/90">🏆 Built for Success</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Why LeadFlow is the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Smart Choice</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
              Professional-grade AI technology designed to deliver real business results
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Secure</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">Enterprise-grade security and privacy protection</p>
            </div>
            
            <div className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Scalable</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">Grows with your business needs and traffic</p>
      </div>

            <div className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Reliable</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">99.9% uptime with dedicated support</p>
            </div>
            
            <div className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Fast</h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed">Lightning-fast responses and instant setup</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/20 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join the growing number of businesses using AI to accelerate growth and create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <StripeCheckoutButton>
              Get Started Now
            </StripeCheckoutButton>
              <Link
                href="/demo"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                See a Demo
              </Link>
            </div>
          </div>
      </div>
    </section>
    </div>
  );
}
