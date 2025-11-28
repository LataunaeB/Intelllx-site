import Link from "next/link";
import { CheckCircle, MessageSquare, Clock, Sparkles, Scissors } from "lucide-react";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#111827] to-[#0F172A] text-white">
      <main className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* 1) HERO */}
        <section className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            {/* Logo + label */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#6D28D9] flex items-center justify-center text-xs font-bold tracking-wide">
                INTELLLX
              </div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#06B6D4]">
                AI booking assistant for hairstylists
              </p>
            </div>

            {/* Headline with subtle animation */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="block">Get fully booked</span>
              <span className="block mt-1">
                <span className="animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] via-[#6D28D9] to-[#D1D5DB]">
                  without babysitting your DMs
                </span>
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-md">
              I build a high end booking site and AI assistant for you
              → so clients get answers fast
              → you get more appointments
              → you focus on the hair and the money.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full border border-[#06B6D4] bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06B6D4]/20 backdrop-blur-md hover:bg-white/20 hover:shadow-[#06B6D4]/40 transition"
              >
                Get My Stylist AI Booking System
              </Link>
              <a
                href="#demo"
                className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-gray-100 backdrop-blur-sm hover:bg-white/10 transition flex items-center gap-2"
              >
                <span>Watch 60 second demo</span>
              </a>
            </div>

            {/* Quick trust line */}
            <p className="text-xs text-gray-400">
              For independent stylists and small salons who want to look premium and stay booked.
            </p>
          </div>

          {/* Right: Glassmorphic mockup */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-[#6D28D9]/40 blur-[90px] rounded-full" />

            <div className="relative mx-auto max-w-sm rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-2xl">
              {/* Mock site header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#6D28D9] flex items-center justify-center text-[10px] font-bold">
                    INT
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-gray-100">
                      Stylist Booking Hub
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Powered by AI
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB]" />
                </div>
              </div>

              {/* Glass chat card */}
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-[11px] text-gray-100 backdrop-blur-md">
                    Hey girl do you have anything open Saturday afternoon for a silk press
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-[#06B6D4]/90 px-3 py-2 text-[11px] text-white shadow-lg">
                    Yes I can take you at 1:30 PM or 3:00 PM
                    → tap to confirm a time and enter your info to book
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-[11px] text-gray-100 backdrop-blur-md">
                    1:30 works. My name is Tia.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-[#06B6D4]/90 px-3 py-2 text-[11px] text-white shadow-lg">
                    Perfect Tia you are all set for Saturday at 1:30 PM.
                    You will get a confirmation with the address and policies.
                  </div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-[10px] text-gray-300 flex items-center justify-between">
                <span>DMs handled on autopilot</span>
                <span className="text-[#06B6D4] font-semibold">Stylist AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2) BENEFITS */}
        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D1D5DB]/80">
              Why stylists use this
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              One system that catches the leads and cleans up your calendar
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#06B6D4]/20 p-2">
                <Scissors className="h-4 w-4 text-[#06B6D4]" />
              </div>
              <p className="text-sm font-semibold mb-1">
                More time on the chair
              </p>
              <p className="text-xs text-gray-300">
                Your AI assistant answers basic questions so you stop living in your inbox.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#6D28D9]/20 p-2">
                <Clock className="h-4 w-4 text-[#6D28D9]" />
              </div>
              <p className="text-sm font-semibold mb-1">
                Fewer no shows
              </p>
              <p className="text-xs text-gray-300">
                Confirmation and reminder flows keep clients locked in and less likely to flake.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#D1D5DB]/15 p-2">
                <Sparkles className="h-4 w-4 text-[#D1D5DB]" />
              </div>
              <p className="text-sm font-semibold mb-1">
                Luxury online presence
              </p>
              <p className="text-xs text-gray-300">
                A clean site and smart assistant so you look like the high end stylist you already are.
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col items-center gap-2 text-[11px] text-gray-400">
            <p>Simple flow → one link in your bio → more clients on your books.</p>
          </div>
        </section>

        {/* 3) DEMO */}
        <section id="demo" className="space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D1D5DB]/80">
              Quick preview
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              What a real "Can I book" message looks like with your assistant
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
              This is the type of conversation your AI booking assistant runs for you all day and all night.
            </p>
          </div>

          <div className="mx-auto max-w-md rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#6D28D9] flex items-center justify-center text-[9px] font-bold">
                  AI
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-100">
                    Stylist AI Assistant
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Active in your DMs
                  </p>
                </div>
              </div>
              <MessageSquare className="h-4 w-4 text-[#06B6D4]" />
            </div>

            <div className="space-y-3 text-[11px]">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-gray-100">
                  Hi do you have anything open this Friday for color and a trim
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-[#06B6D4]/90 px-3 py-2 text-white shadow-lg">
                  I have 11:00 AM and 2:30 PM on Friday
                  → tap your preferred time and fill in your info to reserve your spot
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-gray-100">
                  2:30 please. My name is Bree.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-[#06B6D4]/90 px-3 py-2 text-white shadow-lg">
                  Got you Bree. You are booked for Friday at 2:30 PM.
                  You will get a confirmation with address and salon policies.
                </div>
              </div>
            </div>

            <p className="mt-4 text-[10px] text-gray-300 text-center">
              You choose the tone and rules. The assistant follows your brand and your boundaries.
            </p>
          </div>
        </section>

        {/* 4) OFFER + FINAL CTA */}
        <section className="space-y-6">
          <div className="mx-auto max-w-lg rounded-3xl border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <div className="space-y-2 text-center mb-4">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D1D5DB]/80">
                Founding stylist offer
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                Get your full Stylist AI Booking System for $247
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Limited founding spots while I build case studies and raise the price.
              </p>
            </div>

            <div className="space-y-3 mb-5 text-xs text-gray-200">
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <p>Custom one page booking site that fits your stylist brand and vibe.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <p>AI booking assistant trained on your prices policies and schedule.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <p>Connection to your existing booking app or a simple request form.</p>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-4 w-4 text-[#06B6D4] mt-0.5 flex-shrink-0" />
                <p>30 days of support after launch so you are never stuck on tech.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="w-full rounded-full border border-[#06B6D4] bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06B6D4]/30 backdrop-blur-md hover:bg-white/20 hover:shadow-[#06B6D4]/50 transition text-center"
              >
                Get My Stylist AI Booking System
              </Link>
              <p className="text-[11px] text-gray-400">
                No long contracts. One simple setup that keeps working for you every day.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
