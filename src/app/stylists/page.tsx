import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A] text-white">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#6D28D9]/30 blur-[140px] rounded-full" />
      </div>

      {/* SECTION 1: HERO */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Text side */}
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#06B6D4]">
              AI Booking Assistant for Hairstylists
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">Get fully booked</span>
              <span className="block mt-1">
                <span className="inline-block animate-pulse">
                  without babysitting
                </span>{" "}
                your DMs
              </span>
            </h1>

            <p className="text-base md:text-lg text-[#D1D5DB] max-w-xl">
              Your Stylist AI Booking Assistant replies instantly, shares openings,
              sends your booking link and helps you stay consistently booked
              while you focus on the hair and your income.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-[#06B6D4] bg-white/5 px-7 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-sm hover:bg-[#06B6D4] hover:text-[#0F172A] transition-colors"
              >
                Get My Stylist AI Booking System
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-3 text-sm md:text-base font-medium text-[#D1D5DB] hover:bg-white/5 transition-colors"
              >
                Watch 60 second demo
              </a>
            </div>

            <p className="text-xs md:text-sm text-[#D1D5DB]/80">
              Limited founding stylist spots available
            </p>
          </div>

          {/* Mockup side */}
          <div className="md:pl-4">
            <div className="relative mx-auto max-w-md">
              {/* Glass card */}
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
                {/* Logo row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#06B6D4]" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide">
                        INTELLLX
                      </p>
                      <p className="text-[11px] text-[#D1D5DB]/70">
                        Stylist AI Booking System
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-[#D1D5DB]">
                    Live demo
                  </span>
                </div>

                {/* Chat preview */}
                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                      <p className="text-[#E5E7EB]">
                        Hey do you have anything Saturday for a silk press
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] px-3 py-2">
                      <p className="text-white">
                        Yes I have 10:30am or 1:00pm open
                      </p>
                      <p className="mt-1 text-[11px] text-white/80">
                        Tap to book and your confirmation will be sent
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2">
                      <p className="text-[#E5E7EB]">
                        10:30 works for me thank you
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                  <p className="text-[11px] text-[#D1D5DB]/80">
                    IG traffic → booked appointments
                  </p>
                  <p className="text-[11px] text-[#06B6D4] font-medium">
                    24/7 assistant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN + SOLUTION */}
      <section className="max-w-5xl mx-auto px-4 py-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Pain */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              If you are a stylist this probably sounds familiar
            </h2>
            <ul className="space-y-2 text-sm md:text-base text-[#D1D5DB]">
              <li>→ Missed DMs turn into missed money</li>
              <li>→ Clients repeat the same questions every day</li>
              <li>→ Bookings spread across IG text and different apps</li>
              <li>→ You are doing hair and customer service at the same time</li>
              <li>→ Tech feels overwhelming and time consuming</li>
            </ul>
            <p className="mt-4 text-sm md:text-base text-[#D1D5DB]">
              You do not need another app you need one link that handles it.
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Meet your 24/7 Booking Assistant
            </h3>
            <p className="text-sm md:text-base text-[#D1D5DB] mb-4">
              Simple automated and built for hairstylists. One link. One system. Your bookings handled.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-[#D1D5DB]">
              <li>→ Replies instantly when clients reach out</li>
              <li>→ Shares your openings and booking rules</li>
              <li>→ Sends your booking link so clients can lock in times</li>
              <li>→ Reduces no shows with clear expectations</li>
              <li>→ Matches your brand so it feels like you</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: OFFER */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-14">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-7 md:p-9 backdrop-blur-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Founding Stylist Rate - 247 dollars
            </h2>
            <p className="mt-2 text-sm md:text-base text-[#D1D5DB]">
              Limited spots while I build case studies for the Stylist AI Booking System.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <FeatureItem text="Custom 1 page booking site for your stylist brand" />
            <FeatureItem text="AI assistant script for your most common DMs" />
            <FeatureItem text="Connection to your booking app or a simple request form" />
            <FeatureItem text="Basic reminder and follow up flow outline" />
            <FeatureItem text="Set up and walkthrough in clear language" />
            <FeatureItem text="30 days of support after launch" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-[#06B6D4] bg-white/5 px-8 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-sm hover:bg-[#06B6D4] hover:text-[#0F172A] transition-colors"
            >
              Get My Stylist AI Booking System
            </Link>
            <p className="text-xs md:text-sm text-[#D1D5DB]/80">
              No long contracts. Just a clean system that helps you book more clients.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FINAL CTA + TRUST */}
      <section className="border-t border-white/10 bg-[#0F172A]/80">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg md:text-2xl font-semibold">
              Ready to stop losing clients in your DMs
            </p>
            <p className="mt-2 text-sm md:text-base text-[#D1D5DB]">
              Your system handles the questions the openings and the booking steps so you can focus on great hair and building wealth.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-[#06B6D4] bg-white/5 px-7 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-sm hover:bg-[#06B6D4] hover:text-[#0F172A] transition-colors"
            >
              Get My Stylist AI Booking System
            </Link>
            <p className="text-xs md:text-sm text-[#D1D5DB]/80">
              INTELLLX - AI booking systems for beauty and service pros.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-[3px] h-4 w-4 text-[#06B6D4]" />
      <p className="text-sm md:text-base text-[#E5E7EB]">{text}</p>
    </div>
  );
}
