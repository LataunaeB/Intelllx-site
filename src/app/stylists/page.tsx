import Link from "next/link";

import { CheckCircle, ArrowRight } from "lucide-react";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">

      {/* LUXURY GLOW BACKGROUND */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/30 blur-[160px] rounded-full pointer-events-none" />

      {/* 1) HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">

        <p className="text-[#06B6D4] font-semibold tracking-wide uppercase text-sm">
          AI Booking Assistant for Hairstylists
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-4">
          Get Fully Booked — Without Babysitting Your DMs.
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-6">
          Your AI assistant answers instantly, shares openings, and books clients
          while you focus on the hair.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/contact"
            className="bg-[#6D28D9] hover:bg-[#5B21B6] font-semibold py-4 px-10 rounded-xl text-white transition-all"
          >
            Get My AI Stylist System
          </Link>

          <a
            href="#how"
            className="border border-white/30 hover:bg-white/10 font-semibold py-4 px-10 rounded-xl text-white transition-all"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* 2) BENEFITS — ULTRA TIGHT */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Replies Instantly</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            No more missed DMs. No more lost clients.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Shares Your Openings</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your AI shows your next available times automatically.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Sends Your Booking Link</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            No more back-and-forth. Clients book themselves.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Looks Like Your Brand</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Designed to match your vibe and salon aesthetic.
          </p>
        </div>
      </section>

      {/* 3) HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How It Works (Super Simple)
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <div className="w-16 h-16 mx-auto bg-[#6D28D9] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              1
            </div>
            <p className="text-gray-300 text-sm">
              Quick 10–15 min call.  
              You tell me your services, hours, policies.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 mx-auto bg-[#6D28D9] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              2
            </div>
            <p className="text-gray-300 text-sm">
              I build your AI assistant + stylist booking site — fully done-for-you.
            </p>
          </div>

          <div>
            <div className="w-16 h-16 mx-auto bg-[#6D28D9] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              3
            </div>
            <p className="text-gray-300 text-sm">
              Add the link to IG/TikTok.  
              Clients start booking automatically.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="mt-12 inline-block bg-[#6D28D9] hover:bg-[#5B21B6] font-semibold py-4 px-10 rounded-xl text-white transition-all"
        >
          Start With the Founding Rate ($247)
        </Link>
      </section>

      {/* 4) FINAL CTA */}
      <section className="bg-[#6D28D9] py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to stop losing clients in your DMs?
        </h2>

        <Link
          href="/contact"
          className="bg-white text-[#6D28D9] hover:bg-gray-100 font-semibold py-4 px-10 rounded-xl inline-block transition-all"
        >
          Get My Stylist AI Booking System
        </Link>

        <p className="text-white/90 text-sm mt-4">
          Limited founding spots available.
        </p>
      </section>
    </div>
  );
}
