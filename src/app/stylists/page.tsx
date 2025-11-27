import Link from "next/link";

export default function StylistsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1B2A45] to-[#0F172A] text-white">
      {/* Glow blob */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#6D28D9]/30 blur-[120px]" />

      {/* 1) HERO */}
      <section className="relative max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-20">
        {/* Top bar with logo */}
        <div className="flex items-center justify-between mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 backdrop-blur border border-white/10">
            <div className="h-2 w-2 rounded-full bg-[#06B6D4]" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#D1D5DB]">
              INTELLLX
            </span>
          </div>
          <span className="hidden text-xs text-gray-400 sm:inline">
            AI Booking Assistant for Hairstylists
          </span>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">
                Get{" "}
                <span className="text-[#06B6D4] motion-safe:animate-pulse">
                  Fully Booked
                </span>
              </span>
              <span className="block mt-1">without babysitting your DMs</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 max-w-xl">
              Your Stylist AI Booking Assistant answers questions, shares openings
              and helps clients book on autopilot. You focus on the hair. Your
              system handles the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-8 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-[#06B6D4]/15 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
              >
                Get My Stylist AI Booking System
              </Link>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-[#D1D5DB] hover:text-white inline-flex items-center gap-2"
              >
                See how it works
                <span className="inline-block h-[1px] w-6 bg-[#D1D5DB]" />
              </a>
            </div>

            <p className="text-xs text-gray-400">
              Founding stylist rate - limited spots while I build case studies.
            </p>
          </div>

          {/* Right: mockup card */}
          <div className="md:justify-self-end w-full max-w-sm">
            <div className="relative rounded-3xl bg-white/5 border border-white/15 p-5 backdrop-blur shadow-[0_22px_60px_rgba(15,23,42,0.8)]">
              {/* Mock header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#6D28D9] flex items-center justify-center text-xs font-bold">
                    IX
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Stylist Site
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Powered by Intelllx AI
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D1D5DB]/40" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D1D5DB]/70" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                </div>
              </div>

              {/* Mock content */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1F2937] to-[#0F172A] p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-[#D1D5DB]">
                      Online Booking View
                    </p>
                    <span className="rounded-full bg-[#06B6D4]/15 px-2 py-1 text-[10px] text-[#06B6D4]">
                      Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-200">
                    <div>
                      <p className="font-semibold">Saturday</p>
                      <p className="text-[11px] text-gray-400">
                        10:30 am - 1:00 pm
                      </p>
                    </div>
                    <button className="rounded-full bg-[#6D28D9] px-3 py-1 text-[11px] font-semibold">
                      Reserve spot
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex gap-2">
                    <div className="rounded-xl bg-white/10 px-3 py-2 max-w-[70%]">
                      <p className="text-gray-100">
                        Hey do you have anything open this Saturday for a silk press
                        and trim
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <div className="rounded-xl bg-[#6D28D9] px-3 py-2 max-w-[75%]">
                      <p className="text-white">
                        Yes I have 10:30 am and 1:00 pm open → tap Book Now on my
                        site to lock in your time
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-black/20 border border-white/10 px-3 py-2 text-[10px] text-gray-300 flex items-center justify-between">
                  <span>One link → site plus AI chat → more bookings</span>
                  <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-[9px] text-[#06B6D4]">
                    24/7
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-gray-400 text-center">
              Example layout - your colors and brand stay front and center.
            </p>
          </div>
        </div>
      </section>

      {/* 2) PAIN + BENEFIT SNAPSHOT */}
      <section className="max-w-5xl mx-auto px-4 pb-12 md:pb-16">
        <div className="rounded-3xl border border-white/10 bg-black/10 px-6 py-8 md:px-8 md:py-10 backdrop-blur">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            If you are a stylist this probably sounds familiar
          </h2>
          <div className="grid gap-4 md:grid-cols-2 text-sm md:text-base">
            <div className="space-y-3">
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Missed DMs → missed money</span>
              </p>
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Clients ask the same questions all day</span>
              </p>
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Bookings live in text IG and a booking app</span>
              </p>
            </div>
            <div className="space-y-3">
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>You are doing hair and customer service at the same time</span>
              </p>
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>Tech feels overwhelming so you put it off</span>
              </p>
              <p className="flex gap-2 text-gray-200">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                <span>You know you could be fully booked if your system worked better</span>
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3 text-xs md:text-sm text-gray-200">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="font-semibold mb-1 text-white">Your assistant</p>
              <p>Replies instantly and shares openings</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="font-semibold mb-1 text-white">Your site</p>
              <p>Looks premium and sends them to book</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
              <p className="font-semibold mb-1 text-white">Your result</p>
              <p>More bookings less stress more time behind the chair</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) HOW IT WORKS + OFFER */}
      <section
        id="how-it-works"
        className="max-w-5xl mx-auto px-4 pb-12 md:pb-16"
      >
        <div className="grid gap-8 md:grid-cols-[1.1fr,1fr]">
          {/* How it works */}
          <div className="rounded-3xl bg-white/5 border border-white/10 px-6 py-8 md:px-8 md:py-10 backdrop-blur">
            <h2 className="text-2xl md:text-3xl font-semibold mb-5">
              How your Stylist AI System works
            </h2>
            <ol className="space-y-4 text-sm md:text-base text-gray-200">
              <li>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#06B6D4]/20 text-xs font-semibold text-[#06B6D4] mr-2">
                  1
                </span>
                Quick 10 to 15 minute call → we map your services prices and policies
              </li>
              <li>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#06B6D4]/20 text-xs font-semibold text-[#06B6D4] mr-2">
                  2
                </span>
                I build your one page site plus AI assistant → styled to your brand
              </li>
              <li>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#06B6D4]/20 text-xs font-semibold text-[#06B6D4] mr-2">
                  3
                </span>
                You add one link to Instagram and TikTok → your system starts catching
                and warming leads
              </li>
              <li>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#06B6D4]/20 text-xs font-semibold text-[#06B6D4] mr-2">
                  4
                </span>
                You stay focused on hair while bookings and replies run in the
                background
              </li>
            </ol>
          </div>

          {/* Offer card */}
          <div className="rounded-3xl bg-black/20 border border-white/10 px-6 py-8 md:px-7 md:py-10 backdrop-blur flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D1D5DB] mb-2">
                Founding Stylist Offer
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                Stylist AI Booking System → $247
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                Limited founding rate while I build early case studies and results.
              </p>
              <ul className="space-y-3 text-sm text-gray-200">
                <li>→ Custom one page booking site for your stylist brand</li>
                <li>→ AI assistant script for your most common DMs</li>
                <li>→ Connection to your booking app or a simple request form</li>
                <li>→ 30 days support after launch for tweaks and questions</li>
              </ul>
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-6 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-[#06B6D4]/20 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
              >
                Get My Stylist AI Booking System
              </Link>
              <p className="text-[11px] text-gray-400 text-center">
                No long contract. No tech headaches. Just a clean system that helps
                you stay booked out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) FINAL CTA + MINI FOOTER */}
      <section className="bg-[#0B1220]/80 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg md:text-2xl font-semibold mb-1">
              Ready to stop losing clients in your DMs
            </p>
            <p className="text-sm text-gray-300">
              Your link works 24/7 → so you do not have to.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#06B6D4] bg-white/5 px-7 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-[#06B6D4]/25 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0B1220]"
            >
              Get My Stylist AI Booking System
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 text-[9px] font-bold">
                IX
              </span>
              <span>INTELLLX · AI Booking Assistant for Stylists</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
