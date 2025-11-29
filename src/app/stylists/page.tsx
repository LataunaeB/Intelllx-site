import Link from "next/link";
import { Scissors, CheckCircle2, ArrowRight } from "lucide-react";

export default function StylistsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white overflow-hidden">
      {/* Ambient glow - subtle luxury */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6D28D9]/10 blur-[140px] rounded-full" />
      </div>

      {/* 1) HERO - Maximum Impact */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Minimal brand */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[#06B6D4] text-sm font-bold">IX</span>
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-wide">INTELLLX</span>
          </div>

          {/* Massive headline - Apple/Dyson style */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight">
            <span className="block">Get Fully Booked</span>
            <span className="block mt-3 text-[#06B6D4]">Without the DMs</span>
          </h1>

          {/* Single powerful subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Your AI assistant handles every booking inquiry instantly, professionally, and automatically so you can stay behind the chair, not the phone.
          </p>

          {/* One CTA - luxury style */}
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-10 py-5 rounded-full text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2) THE PROBLEM - Build Urgency */}
      <section className="relative max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center space-y-10 md:space-y-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            Every Missed DM<br />Is Missed Money
          </h2>

          {/* Tight pain points - 4 max */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-left space-y-2">
              <p className="text-xl font-semibold text-white">Lost Revenue</p>
              <p className="text-gray-400">You miss messages while working and those clients book elsewhere.</p>
            </div>
            <div className="text-left space-y-2">
              <p className="text-xl font-semibold text-white">Constant Interruptions</p>
              <p className="text-gray-400">Repeating the same answers breaks your flow and drains your energy.</p>
            </div>
            <div className="text-left space-y-2">
              <p className="text-xl font-semibold text-white">Scattered Systems</p>
              <p className="text-gray-400">Bookings live in DMs, texts, and apps with nothing feeling organized.</p>
            </div>
            <div className="text-left space-y-2">
              <p className="text-xl font-semibold text-white">Tech Overwhelm</p>
              <p className="text-gray-400">You know you need automation but don't know where to start.</p>
            </div>
          </div>

          {/* Urgency line */}
          <p className="text-xl md:text-2xl text-[#06B6D4] font-medium">
            Stop losing clients. Start booking automatically.
          </p>
        </div>
      </section>

      {/* 3) THE SOLUTION - Visual First */}
      <section className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Demo - The Best One */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#6D28D9] flex items-center justify-center">
                    <Scissors className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Your AI Assistant</p>
                    <p className="text-xs text-gray-400">24/7 Active</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="max-w-[75%] bg-white/10 rounded-2xl px-4 py-3">
                    <p className="text-sm text-gray-100">Hey, do you have anything Saturday for a silk press?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-[#06B6D4] rounded-2xl px-4 py-3">
                    <p className="text-sm text-white font-medium">Yes! I have 10:30am or 1:00pm available. Which works for you?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[75%] bg-white/10 rounded-2xl px-4 py-3">
                    <p className="text-sm text-gray-100">10:30 works!</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-[75%] bg-[#06B6D4] rounded-2xl px-4 py-3">
                    <p className="text-sm text-white font-medium">Perfect. You're booked for Saturday at 10:30am. Confirmation sent.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimal Copy */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <h3 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
              One Link.<br />Zero Stress.
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your AI assistant replies instantly, shares openings, sends booking links, and confirms appointments all while you focus on the work that pays.
            </p>
          </div>
        </div>
      </section>

      {/* 4) THE OFFER - Close With Urgency */}
      <section className="relative max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center space-y-8 md:space-y-10">
            {/* Urgency header */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-[#06B6D4] uppercase tracking-widest">Founder Price</p>
              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                  $497
                </h2>
                <p className="text-base text-gray-400">
                  Save $1,000 off regular price
                </p>
              </div>
              <p className="text-lg text-gray-300">
                Limited to first 10 stylists. Regular price: $1,497 after spots fill.
              </p>
            </div>

            {/* 4 Features Only */}
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Custom booking site</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">AI DM assistant</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Booking app integration</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-[#06B6D4] flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">30 days support</p>
              </div>
            </div>

            {/* Single CTA - Final */}
            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#0F172A] font-semibold px-12 py-6 rounded-full text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#06B6D4]/30"
              >
                Claim Your $497 Founder Spot
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-6 text-sm text-gray-400">
                10 spots remaining
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
