import Link from "next/link";
import { MessageSquare, Scissors, CheckCircle2, ArrowRight } from "lucide-react";

export default function StylistsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A] text-white">
      {/* 1) HERO */}
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-24">
        {/* Soft purple glow */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6D28D9]/30 blur-[120px] rounded-full" />

        {/* Top mini brand row */}
        <div className="relative mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold tracking-wide">
              <span className="text-[#06B6D4]">IX</span>
            </div>
            <span className="text-sm font-semibold tracking-wide text-[#D1D5DB]">
              INTELLLX • AI FOR STYLISTS
            </span>
          </div>
        </div>

        <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
              AI BOOKING ASSISTANT FOR HAIRSTYLISTS
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight space-y-2">
              <span className="block">
                Get fully booked without babysitting
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] animate-pulse">
                your DMs.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl">
              Your Stylist AI Booking Assistant answers new messages, shares your openings, sends your booking link and helps keep your chair filled while you focus on the hair and your income.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Main CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-7 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-xl shadow-lg shadow-black/40 hover:bg-[#06B6D4]/10 hover:border-[#06B6D4] transition-colors"
              >
                Get My Stylist AI Booking System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Demo scroll button */}
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm sm:text-base font-medium text-[#D1D5DB] hover:bg-white/5 transition-colors"
              >
                Watch 60 second demo
              </a>
            </div>

            <p className="text-xs sm:text-sm text-gray-400">
              Limited founding stylist spots → locked in at 247 dollars while I build case studies.
            </p>
          </div>

          {/* Right: Glassmorphic mockup */}
          <div className="relative">
            <div className="mx-auto max-w-sm">
              {/* Floating card */}
              <div className="relative rounded-3xl bg-white/10 border border-white/15 backdrop-blur-2xl p-5 shadow-2xl shadow-black/40">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-[#6D28D9] flex items-center justify-center">
                      <Scissors className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#D1D5DB]">Stylist AI Booking System</p>
                      <p className="text-[11px] text-gray-400">Live demo preview</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium text-gray-200">
                    24/7 online
                  </span>
                </div>

                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                      <p className="text-gray-100">
                        Hey do you have anything Saturday for a silk press
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] px-3 py-2">
                      <p className="text-white">
                        Yes I have 10:30am or 1:00pm open → which time works best for you
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                      <p className="text-gray-100">10:30 works for me thank you</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] px-3 py-2">
                      <p className="text-white">
                        Locked in → your confirmation will be sent to your email and phone
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-gray-300">
                  <span>IG traffic → booked appointments</span>
                  <span className="text-[#06B6D4] font-medium">All on autopilot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) PROBLEMS + PROMISE */}
      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Problems */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">
              If you are a stylist this probably sounds familiar
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>→ Missed DMs quietly turn into missed money</li>
              <li>→ Clients repeat the same questions every single day</li>
              <li>→ Bookings live across IG text and different apps</li>
              <li>→ You are doing hair and customer service at the same time</li>
              <li>→ Tech feels overwhelming and time consuming</li>
            </ul>
            <p className="text-sm text-gray-400">
              You do not need another app → you need one link that handles it.
            </p>
          </div>

          {/* Promise / Solution */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Meet your 24/7 Booking Assistant
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Simple automated and built for hairstylists. One link. One system. Your bookings handled.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>→ Replies instantly when clients reach out</li>
              <li>→ Shares your openings and booking rules</li>
              <li>→ Sends your booking link so clients can lock in times</li>
              <li>→ Reduces no shows with clear expectations</li>
              <li>→ Matches your brand so it feels like you</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3) OFFER + HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 pb-16 md:pb-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
          {/* Offer */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 shadow-xl shadow-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#06B6D4] mb-2">
              FOUNDING STYLIST OFFER
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Founding Stylist Rate - 247 dollars
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-5">
              Limited spots while I build case studies for the Stylist AI Booking System.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-200 mb-6">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>Custom 1 page booking site for your stylist brand</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>AI assistant script for your most common DMs</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>Connection to your booking app or a simple request form</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>Basic reminder and follow up flow outline</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>Set up and walkthrough in clear language</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
                <span>30 days of support after launch</span>
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              No long contracts. Just a clean system that helps you book more clients.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-7 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-xl hover:bg-[#06B6D4]/10 transition-colors"
            >
              Get My Stylist AI Booking System
            </Link>
          </div>

          {/* How it works */}
          <div className="space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold">
              How it works in three simple steps
            </h3>
            <ol className="space-y-4 text-sm sm:text-base text-gray-300">
              <li>
                <span className="font-semibold text-white">1 → Quick 10 to 15 minute call</span>
                <br />
                We talk through your services, prices, booking rules and the way you like to work.
              </li>
              <li>
                <span className="font-semibold text-white">2 → I build your Stylist AI Booking System</span>
                <br />
                Your booking site and AI assistant are set up to match your brand and your policies.
              </li>
              <li>
                <span className="font-semibold text-white">3 → You add your link to Instagram and TikTok</span>
                <br />
                Your link lives in your bio and stories so your traffic moves straight into booked appointments.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 4) DEMO + FINAL CTA */}
      <section id="demo" className="max-w-5xl mx-auto px-4 pb-20 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          {/* Demo card */}
          <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-black/50">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#06B6D4] to-[#6D28D9] flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#D1D5DB]">Real style of DM conversation</p>
                <p className="text-[11px] text-gray-400">Example of a booking handled for you</p>
              </div>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                  <p className="text-gray-100">
                    Hey I found you on Instagram can I book a silk press for this weekend
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] px-3 py-2">
                  <p className="text-white">
                    Yes I have Saturday at 10:30am or 1:00pm → which time do you prefer
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                  <p className="text-gray-100">
                    10:30am please and my name is Aaliyah
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#06B6D4] to-[#6D28D9] px-3 py-2">
                  <p className="text-white">
                    Locked in Aaliyah → you are booked for Saturday at 10:30am. A confirmation link will be sent to you.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-gray-300">
              Your assistant is customized to your voice and booking rules so it feels like you while it works for you.
            </p>
          </div>

          {/* Final pitch */}
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to stop losing clients in your DMs
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Your system handles the questions the openings and the booking steps so you can focus on great hair and building wealth.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-7 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-xl shadow-lg shadow-black/40 hover:bg-[#06B6D4]/10 transition-colors"
              >
                Get My Stylist AI Booking System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Limited founding spots available.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              INTELLLX → AI booking systems for beauty and service pros.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
