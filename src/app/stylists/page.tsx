import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function StylistsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1B2340] to-[#0F172A] text-white overflow-hidden">

      {/* LUXURY PURPLE GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6D28D9]/30 blur-[160px] rounded-full pointer-events-none" />

      {/* HEADER WITH LOGO */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-start px-6 py-6">
        <Image 
          src="/intelllx-logo.png"
          alt="Intelllx Logo"
          width={160}
          height={40}
          className="opacity-90"
        />
      </header>

      {/* SECTION 1 — HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-20 md:pt-16 md:pb-28 relative">
        
        {/* Animated Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-center mb-6 
          animate-[fadeInUp_1.2s_ease_forwards] opacity-0"
        >
          Get Fully Booked  
          <span className="block text-[#06B6D4] mt-2">
            Without Babysitting Your DMs
          </span>
        </h1>

        <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Your Stylist AI Booking Assistant replies instantly, shares openings, sends your booking link and helps you stay consistently booked while you focus on the hair.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl text-white font-semibold border border-[#06B6D4] backdrop-blur-md 
            bg-white/5 hover:bg-white/10 transition-all duration-200 
            hover:text-[#06B6D4] shadow-lg"
          >
            Get My Stylist AI Booking System
          </Link>

          <a
            href="#demo"
            className="px-8 py-4 rounded-xl font-semibold text-[#D1D5DB] hover:text-white 
            border border-white/20 backdrop-blur-xl hover:bg-white/5 transition"
          >
            Watch Demo
          </a>
        </div>
      </section>

      {/* SECTION 2 — PAIN POINTS */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          If you are a stylist this probably sounds familiar
        </h2>

        <div className="space-y-6 text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
          <p>→ Missed DMs turn into missed money</p>
          <p>→ Clients repeat the same questions every day</p>
          <p>→ Bookings spread across IG text and different apps</p>
          <p>→ You are doing hair and customer service at the same time</p>
          <p>→ Tech feels overwhelming and time consuming</p>
        </div>

        <p className="text-center text-xl text-white mt-10 font-semibold">
          Let's fix it.
        </p>
      </section>

      {/* SECTION 3 — SOLUTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative">

        {/* Floating Glass Card */}
        <div className="relative max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Meet Your 24/7 Booking Assistant
          </h2>

          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Simple automated and built for stylists. One link. One system. Your bookings handled.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-gray-200 text-lg">
            <p>→ Replies instantly</p>
            <p>→ Shares your openings</p>
            <p>→ Sends your booking link</p>
            <p>→ Reduces no shows</p>
            <p>→ Looks like your brand</p>
            <p>→ Helps you stay fully booked</p>
          </div>

          <Link
            href="/contact"
            className="block w-full text-center mt-12 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold border border-[#06B6D4] backdrop-blur-md hover:bg-white/10 transition-all"
          >
            Get My Stylist AI Booking System
          </Link>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Limited founding stylist spots available
          </p>
        </div>
      </section>

      {/* SECTION 4 — FINAL CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          Ready to stop losing clients in your DMs
        </h2>

        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
          Your system handles the questions the openings and the booking steps so you can focus on delivering great hair and building your income.
        </p>

        <Link
          href="/contact"
          className="px-10 py-5 rounded-xl text-white font-semibold border border-[#06B6D4] 
          backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all text-lg shadow-lg"
        >
          Get My Stylist AI Booking System
        </Link>

        <p className="text-gray-400 mt-6 text-sm">
          Limited founding openings available
        </p>
      </section>
    </div>
  );
}
