"use client";
import { useState } from "react";
import { 
  CheckCircle, 
  MessageSquare, 
  Globe, 
  Sparkles, 
  Clock, 
  Calendar,
  Users,
  Zap,
  Smartphone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star
} from "lucide-react";
import Link from "next/link";

export default function StylistsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Does this work with Instagram DMs?",
      answer: "Yes! Our AI Booking Assistant integrates seamlessly with Instagram DMs, Facebook Messenger, and other messaging platforms. It replies instantly to client inquiries, even at 2am."
    },
    {
      question: "How fast does the AI reply?",
      answer: "The AI replies instantly—within seconds of receiving a message. No more waiting hours or days to respond to potential clients."
    },
    {
      question: "Do I need to know coding?",
      answer: "Not at all! We handle everything. You just share your services, policies, and booking preferences, and we build your complete system for you."
    },
    {
      question: "How long does setup take?",
      answer: "Setup typically takes 3-5 business days after our strategy call. We'll build your website, set up your AI automation, and configure all your booking flows."
    },
    {
      question: "Can this replace my booking app?",
      answer: "Yes! Our system includes a smart booking page that handles availability, service selection, and client information. It can work alongside or replace your current booking app."
    },
    {
      question: "What if I need changes after launch?",
      answer: "The Founder Offer includes 7 days of support and one free small update within 30 days. After that, we offer affordable update packages."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Independent Stylist",
      location: "Los Angeles, CA",
      text: "I went from missing 40% of my booking requests to being fully booked. The AI handles all my DMs and I actually sleep through the night now!",
      rating: 5
    },
    {
      name: "Jessica Chen",
      role: "Salon Owner",
      location: "Austin, TX",
      text: "This system transformed my business. Clients love the instant replies, and I love that I'm not glued to my phone 24/7 anymore.",
      rating: 5
    },
    {
      name: "Amanda Rodriguez",
      role: "Mobile Stylist",
      location: "Miami, FL",
      text: "The booking automation is a game-changer. I'm booking more clients than ever, and the AI handles all the repetitive questions perfectly.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Subtle Background Pattern */}
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
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>

      {/* 1️⃣ HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center px-6 pt-20 pb-16 md:pt-28 md:pb-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
            {/* Left Side - Content */}
            <div className="space-y-8 md:space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Booking System</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                <span className="text-white">AI Booking Assistant</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  for Hairstylists
                </span>
                <span className="text-white"> 💇🏽‍♀️✨</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium max-w-2xl">
                Get fully booked, automate your DMs, and stop missing clients — all with one AI system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Get My AI Stylist System
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#demo"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center text-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  See Demo
                </Link>
              </div>
            </div>

            {/* Right Side - Phone Mockup */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div className="bg-gray-900 rounded-2xl p-4 shadow-xl">
                    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        <div>
                          <div className="h-3 w-24 bg-gray-700 rounded mb-2"></div>
                          <div className="h-2 w-16 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-purple-500/20 rounded-lg p-3 max-w-[80%]">
                          <div className="h-2 w-full bg-purple-400/30 rounded mb-1"></div>
                          <div className="h-2 w-3/4 bg-purple-400/30 rounded"></div>
                        </div>
                        <div className="bg-blue-500/20 rounded-lg p-3 max-w-[80%] ml-auto">
                          <div className="h-2 w-full bg-blue-400/30 rounded mb-1"></div>
                          <div className="h-2 w-2/3 bg-blue-400/30 rounded"></div>
                        </div>
                        <div className="bg-purple-500/20 rounded-lg p-3 max-w-[80%]">
                          <div className="h-2 w-full bg-purple-400/30 rounded mb-1"></div>
                          <div className="h-2 w-4/5 bg-purple-400/30 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ PROBLEM SECTION */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Stylists lose</span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                30–50% of bookings
              </span>
              <br />
              <span className="text-white">because of slow replies, missed DMs, and no-shows.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, text: "Missed DMs = lost clients", colorClass: "text-red-400" },
              { icon: Users, text: "No show clients = wasted time", colorClass: "text-orange-400" },
              { icon: Calendar, text: "Overbooked or double-booked", colorClass: "text-yellow-400" },
              { icon: Clock, text: "Clients DM at 2am", colorClass: "text-purple-400" },
              { icon: Smartphone, text: "Booking apps that don't answer questions", colorClass: "text-blue-400" },
              { icon: Zap, text: "Manual reminders drain time", colorClass: "text-pink-400" }
            ].map((pain, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <pain.icon className={`w-8 h-8 ${pain.colorClass} mb-4`} />
                <p className="text-lg font-semibold text-white">{pain.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ SOLUTION SECTION */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Meet Your</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AI Booking Assistant
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              One complete system that handles everything from first DM to rebooking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AI DM Automation */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI DM Automation</h3>
              <ul className="space-y-3">
                {[
                  "Replies instantly",
                  "Handles FAQs",
                  "Shares your policies",
                  "Sends booking link",
                  "Follows up",
                  "Rebooks clients"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Website + Smart Booking */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Website + Smart Booking Page</h3>
              <ul className="space-y-3">
                {[
                  "Beautiful stylist site",
                  "Mobile-optimized",
                  "Integrated availability",
                  "Services page",
                  "Branding included"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Client Nurture Flows */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Client Nurture Flows</h3>
              <ul className="space-y-3">
                {[
                  "New client welcome",
                  "Rebooking reminders",
                  "No-show recovery",
                  "Promo pushes"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ DEMO SECTION */}
      <section id="demo" className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">See It In</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Action
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="aspect-[9/16] bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center text-gray-400">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">DM Conversation Screenshot</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center">AI DM Automation</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="aspect-[9/16] bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center text-gray-400">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Mobile Booking Flow</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center">Smart Booking</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center text-gray-400">
                  <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Website Before → After</p>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center">Website Transformation</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ HOW IT WORKS */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">How It</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Strategy Call",
                description: "We map your services, policies, and booking style."
              },
              {
                step: "2",
                title: "Build Your System",
                description: "We build your site + DM automation + flows."
              },
              {
                step: "3",
                title: "Go Live",
                description: "Clients DM you → AI handles the rest."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-8xl font-black text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-lg text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6️⃣ FOUNDER OFFER */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-semibold mb-6">
                <span>⚡ Limited Time</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
                <span className="text-white">Founder Offer:</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  $247
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-4">
                Limited to the first 10 stylists
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Full AI Booking Assistant",
                "1-page stylist website",
                "AI DM automation setup",
                "FAQ library",
                "Rebooking flows",
                "Photo gallery",
                "Policy setup",
                "7-day support",
                "Free small update for 30 days"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 text-white font-bold py-5 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Claim My $247 Founder Spot
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ PRICING TIERS */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-gray-900/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Pricing</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tiers
              </span>
            </h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
              <div className="text-4xl font-black text-white mb-6">$397</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Website + AI DM bot",
                  "Basic booking flows",
                  "FAQ setup",
                  "Email support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-8 hover:bg-purple-600/30 transition-all duration-300 hover:-translate-y-2 relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
              <div className="text-4xl font-black text-white mb-6">$897</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Full system + reminders",
                  "Rebooking automation",
                  "Advanced flows",
                  "Priority support",
                  "30-day updates"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>

            {/* Empire */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-2">Empire</h3>
              <div className="text-4xl font-black text-white mb-6">$1,497</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything + content",
                  "CRM integration",
                  "Analytics dashboard",
                  "Custom features",
                  "90-day support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8️⃣ TESTIMONIALS */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">What Stylists</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-200 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9️⃣ FAQ */}
      <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Frequently Asked</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔟 FINAL CTA */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-12 md:p-16 shadow-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-white">Ready to get</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                fully booked automatically?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Join the stylists who are already using AI to grow their business
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-5 px-10 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 text-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Get My AI Booking System
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

