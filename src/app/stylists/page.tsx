import Link from "next/link";

const primaryCta =
  "inline-flex items-center justify-center bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A]";

const ghostCta =
  "inline-flex items-center justify-center border border-[#D1D5DB] text-[#D1D5DB] hover:bg-white/5 font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#D1D5DB] focus:ring-offset-2 focus:ring-offset-[#0F172A]";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* 1) HERO */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.2em]">
              AI Booking Assistant for Hairstylists
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Stop Losing Clients in Your DMs.
              <br />
              <span className="text-[#06B6D4]">Get Fully Booked on Autopilot.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300">
              I build a simple Stylist Site + AI Booking Assistant that turns{" "}
              <span className="italic">&ldquo;Do you have anything Saturday?&rdquo;</span> into
              confirmed appointments — without you living on your phone.
            </p>

            <p className="text-sm text-gray-400">
              Made for hairstylists who are already good at hair, not tech.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className={primaryCta}>
                Get My Stylist AI System
              </Link>
              <a href="#demo" className={ghostCta}>
                See a 60-Second Demo
              </a>
            </div>

            <p className="text-xs text-gray-400">
              Founding Stylist Offer: <span className="font-semibold text-gray-100">$247</span>{" "}
              for the first round of stylists.
            </p>
          </div>

          {/* Simple phone mockup */}
          <div className="hidden md:block">
            <div className="bg-white rounded-3xl p-4 shadow-2xl max-w-xs mx-auto">
              <div className="bg-[#020617] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6D28D9]" />
                  <div>
                    <div className="h-3 w-20 bg-gray-700 rounded mb-1" />
                    <div className="h-2 w-14 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[85%]">
                    <p className="text-xs text-gray-200">
                      Hey, do you have anything open this Saturday?
                    </p>
                  </div>
                  <div className="bg-[#6D28D9] rounded-lg p-3 max-w-[85%] ml-auto">
                    <p className="text-xs text-white">
                      Yes! I have 10:30am or 1:00pm. Tap to book the one that works best for you.
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 pt-2">
                  Your AI assistant handles messages like this while you&apos;re behind the chair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) PAIN POINTS */}
      <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          If You&apos;re a Stylist, This Probably Feels Too Real…
        </h2>
        <div className="space-y-4 text-gray-300">
          <p>• You miss DMs while you&apos;re mid-appointment — and those clients never come back.</p>
          <p>• You repeat prices, policies, and availability all day long in your inbox.</p>
          <p>• Everything lives in your phone: IG, booking app, notes, texts — nothing feels organized.</p>
          <p>• You want a &ldquo;real&rdquo; online presence, but tech and websites feel overwhelming.</p>
        </div>
      </section>

      {/* 3) SOLUTION / BENEFITS */}
      <section className="bg-white/5 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            One Simple System: Stylist Site + AI Booking Assistant
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
            A done-for-you setup that catches your leads, answers common questions, and helps book
            clients — while you&apos;re doing hair or off the clock.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2">More Bookings</h3>
              <p className="text-sm text-gray-300">
                Your assistant responds 24/7, shares your openings, and sends people straight to your
                booking link or request form.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2">Fewer No-Shows</h3>
              <p className="text-sm text-gray-300">
                Confirmation and reminder flows help clients remember and show up on time.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2">Premium Online Presence</h3>
              <p className="text-sm text-gray-300">
                A clean, on-brand 1-page site that makes you look as professional online as you are
                in the salon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How It Works (Super Simple)
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold">Quick 15-Minute Call</h3>
            <p className="text-sm text-gray-300">
              We talk about your services, prices, policies, and how you book now.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold">I Build Your System</h3>
            <p className="text-sm text-gray-300">
              I design your Stylist Site + AI assistant to match your brand, voice, and booking flow.
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold">You Plug It In & Get Booked</h3>
            <p className="text-sm text-gray-300">
              You add your link to Instagram/TikTok/bio and let your system catch and qualify new
              clients.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link href="/contact" className={primaryCta}>
            Lock In the $247 Founding Stylist Offer
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            Limited spots while I build my first stylist case studies.
          </p>
        </div>
      </section>

      {/* 5) OFFER */}
      <section className="bg-white/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Founding Stylist Offer — $247
            </h2>
            <p className="text-center text-gray-300 mb-8">
              Done-for-you Stylist Site + AI Booking Assistant to get your chair booked without you
              chasing DMs.
            </p>
            <div className="space-y-3 text-sm text-gray-200">
              <p>• Custom 1-page Stylist Site (services, bio, policies, portfolio spots, booking button)</p>
              <p>
                • AI Booking Assistant conversation flow for your most common questions
                (&ldquo;what do you charge?&rdquo;, &ldquo;do you have anything Saturday?&rdquo;)
              </p>
              <p>
                • Connection to your existing booking app, or a simple request form for new
                clients
              </p>
              <p>• Basic reminder / follow-up recommendations for SMS or email tools</p>
              <p>• 30 days of support after launch</p>
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
              No long contracts. No hidden fees. Just a clean system that helps you stop leaking
              money in your DMs.
            </p>
            <div className="text-center mt-6">
              <Link href="/contact" className={primaryCta}>
                Apply for the Founding Stylist Spot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6) DEMO */}
      <section id="demo" className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What a &ldquo;Can I Book?&rdquo; Convo Looks Like
        </h2>
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="space-y-4 text-sm">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-gray-900">Hey, do you have anything open this Saturday?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#6D28D9] rounded-lg p-3 max-w-[80%]">
                <p className="text-white">
                  Hey love! Yes — I have 10:30am or 1:00pm available. What service are you looking
                  for?
                </p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-gray-900">Silk press + trim. 10:30 would be perfect.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#6D28D9] rounded-lg p-3 max-w-[80%]">
                <p className="text-white">
                  Got you! I&apos;ll lock you in for Saturday at 10:30am for a silk press + trim.
                  What&apos;s your name, email, and phone so I can send your confirmation + reminder?
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            The exact flow is customized to your voice, policies, and booking rules.
          </p>
        </div>
      </section>

      {/* 7) FAQ (short + tight) */}
      <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Quick Questions Stylists Ask
        </h2>
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <p className="font-semibold">Do I need to be good with tech?</p>
            <p>
              Nope. If you can use Instagram, you can use this. I handle the tech and walk you
              through everything step by step.
            </p>
          </div>
          <div>
            <p className="font-semibold">How fast can this be live?</p>
            <p>Most stylists are live within 3–5 business days once I have your info and photos.</p>
          </div>
          <div>
            <p className="font-semibold">Will this work if I already have a booking app?</p>
            <p>
              Yes. We connect your site + assistant to your existing booking app, or keep it simple
              with a request form.
            </p>
          </div>
        </div>
      </section>

      {/* 8) FINAL CTA STRIP (fixed button contrast) */}
      <section className="bg-[#020617] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-xl md:text-2xl font-bold">
            Ready for your DMs to stop feeling like a full-time job?
          </p>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            Let your Stylist Site + AI Booking Assistant catch the leads, answer the questions, and
            help book the clients — so you can focus on doing hair and building wealth.
          </p>
          <Link href="/contact" className={primaryCta}>
            Get My Stylist AI Booking System
          </Link>
        </div>
      </section>
    </div>
  );
}
