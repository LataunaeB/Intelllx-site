import Link from "next/link";
import Image from "next/image";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden">

      {/* LUXURY BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1B2440] to-[#0F172A] opacity-90"></div>

      {/* SOFT PURPLE GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] bg-[#6D28D9]/25 blur-[140px] rounded-full"></div>

      {/* HEADER */}
      <header className="relative z-20 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Image
          src="/logo-light.png"
          alt="Intelllx Logo"
          width={120}
          height={40}
          className="opacity-90"
        />
      </header>

      {/* =========================
          1. HERO SECTION
      ========================== */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pt-10 pb-20 md:pb-28 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-6 md:space-y-8">
          <p className="text-sm font-semibold text-[#06B6D4] tracking-wide uppercase">
            AI Booking Assistant for Hairstylists
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Get Fully Booked — <br />Without Babysitting Your DMs.
          </h1>

          <p className="text-lg text-gray-300 max-w-md">
            Your Stylist AI Assistant answers instantly, shares openings, and books clients — so you can focus on doing hair and building wealth.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-semibold text-white 
              border border-[#06B6D4] bg-white/5 backdrop-blur-md
              hover:bg-[#06B6D4]/20 transition"
            >
              Get My Stylist AI Booking System
            </Link>

            <a
              href="#demo"
              className="px-8 py-4 rounded-xl font-semibold 
              text-[#06B6D4] border border-[#06B6D4]/40 hover:bg-white/5 
              transition"
            >
              Watch Demo (60 sec)
            </a>
          </div>
        </div>

        {/* RIGHT MOCKUP */}
        <div className="hidden md:flex justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/10">
            <Image
              src="/mockups/stylist-phone.png"
              alt="Phone Demo"
              width={320}
              height={600}
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* =========================
          2. PAIN → DESIRE SECTION
      ========================== */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">
          If You're a Stylist, This Probably Sounds Familiar…
        </h2>

        <div className="space-y-4 text-lg text-gray-300">
          <p>Missed DMs = missed money</p>
          <p>Clients ask the same questions every day</p>
          <p>Bookings scattered across IG, text, apps</p>
          <p>You're doing hair AND customer service</p>
          <p>Tech feels overwhelming</p>
        </div>

        <p className="mt-8 text-xl text-[#06B6D4] font-semibold">
          Let's fix it — simply.
        </p>
      </section>

      {/* =========================
          3. THE SYSTEM (Glass Card)
      ========================== */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-xl space-y-8">

          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Meet Your 24/7 Booking System
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-200">
            <div>
              <p className="mb-4 text-xl font-semibold text-white">What It Does</p>
              <ul className="space-y-3">
                <li>✔ Replies instantly</li>
                <li>✔ Shares your openings</li>
                <li>✔ Sends your booking link</li>
                <li>✔ Reduces no-shows</li>
                <li>✔ Matches your brand aesthetic</li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xl font-semibold text-white">How You Get It</p>
              <ul className="space-y-3">
                <li>1️⃣ Quick 10–15 min call</li>
                <li>2️⃣ I build your site + AI assistant</li>
                <li>3️⃣ Add link to IG/TikTok → bookings start</li>
                <li>4️⃣ 30 days support for updates</li>
              </ul>
            </div>
          </div>

          {/* Floating CTA inside card */}
          <div className="text-center pt-4">
            <Link
              href="/contact"
              className="px-10 py-4 rounded-xl font-semibold text-white 
              border border-[#06B6D4] bg-white/5 backdrop-blur-md
              hover:bg-[#06B6D4]/20 transition inline-block"
            >
              Get My Stylist AI Booking System — $247
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          4. FINAL CTA
      ========================== */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to stop losing clients in your DMs?
        </h2>

        <p className="text-lg text-gray-300 mb-8">
          Let your Stylist AI Assistant answer instantly, share openings, and book clients — while you stay focused on the hair.
        </p>

        <Link
          href="/contact"
          className="px-10 py-4 rounded-xl font-semibold text-white 
          border border-[#06B6D4] bg-white/5 backdrop-blur-md
          hover:bg-[#06B6D4]/20 transition inline-block text-lg"
        >
          Get My Stylist AI Booking System
        </Link>

        <p className="text-sm text-gray-400 mt-4">
          Limited founding stylist spots available.
        </p>
      </section>
    </div>
  );
}
