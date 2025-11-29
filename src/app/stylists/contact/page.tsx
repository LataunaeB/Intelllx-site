"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Instagram, Phone, Mail, ArrowLeft, Scissors } from "lucide-react";

export default function StylistContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Wire this up to your form handler (Formspree, Resend, API route, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
      {/* Ambient glow - matches stylist page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/10 blur-[140px] rounded-full" />
      </div>

      {/* Back link */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/stylists"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stylist System
        </Link>
      </div>

      {/* Page container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Hero Section - Premium Continuation */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Scissors className="h-5 w-5 text-[#06B6D4]" />
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-wide">STYLIST INQUIRY</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-center mb-6">
            <span className="block">Tell Me About</span>
            <span className="block mt-2 text-[#06B6D4]">Your Chair</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-center leading-relaxed font-light">
            I'll build your Stylist AI Booking System around how you actually work. This takes about one minute to fill out.
          </p>
        </section>

        {/* Form + Trust Column */}
        <section className="grid md:grid-cols-[1.2fr,0.8fr] gap-6 md:gap-8 items-start">
          {/* Premium Form Card */}
          <div className="relative bg-gradient-to-br from-white/5 via-white/5 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#06B6D4]/20 to-[#6D28D9]/20 rounded-full blur-2xl" />
            
            <div className="relative">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                      Get Your System
                    </h2>
                    <p className="text-sm text-gray-400">
                      Share a few details so I can see if the founder offer is a good fit for you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                        Instagram Handle
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-3 py-3">
                          <Instagram className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <input
                          type="text"
                          required
                          className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="@yourstylistpage"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5">
                        Helps me see your work. I never spam.
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                        Best Email
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center rounded-xl bg-[#020617]/80 border border-white/10 px-3 py-3">
                          <Mail className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <input
                          type="email"
                          required
                          className="flex-1 rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Salon Info Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                          Salon / Business Name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="Your brand"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                          City, State
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                          placeholder="Long Beach, CA"
                        />
                      </div>
                    </div>

                    {/* What You Need */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                        What Do You Need Most Right Now
                      </label>
                      <select
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled className="bg-[#020617]">
                          Choose one
                        </option>
                        <option value="booked" className="bg-[#020617]">
                          I want to be fully booked with the right clients
                        </option>
                        <option value="dms" className="bg-[#020617]">
                          I want to stop living in my DMs
                        </option>
                        <option value="site" className="bg-[#020617]">
                          I need a clean booking site for my brand
                        </option>
                        <option value="all" className="bg-[#020617]">
                          I want the full Stylist AI system
                        </option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                        Current Booking Situation
                      </label>
                      <textarea
                        rows={4}
                        className="w-full rounded-xl bg-[#020617]/70 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all resize-none"
                        placeholder="Example: I book through IG DMs and a link in bio. I get a lot of messages and feel like I miss people."
                      />
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 disabled:opacity-50 text-[#0F172A] font-semibold px-6 py-4 rounded-full text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30 disabled:hover:scale-100"
                      >
                        {isSubmitting ? "Sending..." : "Request My Stylist AI Booking System"}
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-3">
                        No pressure. No spam. Just a conversation to see if we're a fit.
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 md:py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                    Thank You
                  </h2>
                  <p className="text-base text-gray-300 max-w-md mx-auto leading-relaxed">
                    I'll review your details and follow up with next steps for your Stylist AI Booking System.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trust Column - Compact */}
          <div className="space-y-5">
            {/* What to Expect */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-xl">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-4">
                What You Get
              </p>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>Custom system built for your chair, schedule, and brand</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>One simple link. One system. Easy for clients to understand</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                  <span>Clear communication. You always know what's next</span>
                </li>
              </ul>
            </div>

            {/* Alternative Contact */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-6 shadow-xl">
              <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-wider mb-4">
                Other Ways to Connect
              </p>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#06B6D4]" />
                  <span>@LaTaunaeb</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  <span className="text-xs break-all">lataunaebrookss@icloud.com</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                The form keeps all your details in one place, so it's the best first step.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

