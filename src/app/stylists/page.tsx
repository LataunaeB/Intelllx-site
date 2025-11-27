import Link from "next/link";

import {
  CheckCircle,
  MessageSquare,
  Clock,
  Calendar,
  Smartphone,
} from "lucide-react";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <p className="text-xs font-semibold text-[#06B6D4] uppercase tracking-[0.2em]">
              AI Booking Assistant for Hairstylists
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Stop Losing Clients in Your DMs.
              <span className="block text-[#06B6D4] mt-1">
                Get Fully Booked on Autopilot.
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300">
              I build a simple Stylist Site + AI Booking Assistant that turns
              "Do you have anything Saturday?" into confirmed appointments —
              without you living on your phone.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                Made for hairstylists who are already good at hair, not tech.
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
                Founding Stylist Offer: <span className="text-white font-semibold">$247</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-3.5 px-8 rounded-xl text-center text-sm md:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
              >
                Get My Stylist AI System
              </Link>
              <a
                href="#how-it-works"
                className="border border-white/20 hover:bg-white/5 text-white font-medium py-3.5 px-8 rounded-xl text-center text-sm md:text-base transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right: Simple chat mockup */}
          <div className="hidden md:block">
            <div className="bg-white rounded-3xl p-4 shadow-2xl max-w-sm ml-auto">
              <div className="bg-[#020617] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#6D28D9]" />
                  <div>
                    <div className="h-2.5 w-20 bg-gray-700 rounded mb-1" />
                    <div className="h-2 w-12 bg-gray-700 rounded" />
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[85%]">
                    <p className="text-gray-200">
                      Hey, do you have anything open Saturday?
                    </p>
                  </div>
                  <div className="bg-[#6D28D9] rounded-lg p-3 max-w-[85%] ml-auto">
                    <p className="text-white">
                      Yes! I have 10:30am or 1:00pm. Which time works best for
                      you?
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[85%]">
                    <p className="text-gray-200">10:30 works! 🖤</p>
                  </div>
                  <div className="bg-[#6D28D9] rounded-lg p-3 max-w-[85%] ml-auto">
                    <p className="text-white">
                      Perfect — you're locked in for Saturday at 10:30am.
                      You'll get a confirmation shortly. ✨
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 pt-2 border-t border-white/5 mt-2">
                  Your assistant replies like this 24/7 while you're doing hair.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="max-w-4xl mx-auto px-4 pb-12 md:pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          If You're a Stylist, This Probably Feels Too Real…
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <MessageSquare className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-300">
              You miss DMs while you're mid-appointment — and those clients
              never come back.
            </p>
          </div>
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-300">
              You're tired of repeating prices, policies, and availability all
              day long.
            </p>
          </div>
          <div className="flex gap-3">
            <Smartphone className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-300">
              Everything lives in your phone — IG, booking app, notes, text —
              and nothing feels organized.
            </p>
          </div>
          <div className="flex gap-3">
            <Calendar className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
            <p className="text-sm md:text-base text-gray-300">
              You want a "real" online presence, but tech and websites feel
              overwhelming.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION / BENEFITS */}
      <section className="bg-white/5 py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Your Stylist Site + AI Booking Assistant
            </h2>
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
              One simple system that catches your leads, answers common
              questions, and gets clients booked — while you're behind the
              chair or off the clock.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <BenefitCard
              title="More Bookings, Less Back-and-Forth"
              body="Your AI assistant responds to new inquiries 24/7, shares openings, and sends them straight to your booking link or request form."
            />
            <BenefitCard
              title="Fewer No-Shows & Last-Minute Flakes"
              body="Automated confirmation and reminder flows help your clients actually show up on time."
            />
            <BenefitCard
              title="Look Like the Premium Stylist You Are"
              body="A clean, on-brand 1-page website that shows your work, vibe, and makes you look as professional online as you are in the salon."
            />
            <BenefitCard
              title="Zero Tech Stress"
              body="You don't need to figure out tools. I build it, plug it in, and walk you through everything in plain language."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="max-w-5xl mx-auto px-4 py-16 md:py-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How It Works (Super Simple)
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <StepCard
            number="1"
            title="Quick 15-Minute Call"
            body="We talk about your services, prices, policies, and how you like to book now."
          />
          <StepCard
            number="2"
            title="I Build Your System"
            body="I design your Stylist Site + AI assistant, customized to your brand, booking link, and voice."
          />
          <StepCard
            number="3"
            title="You Plug It In & Get Booked"
            body="You add your link to Instagram / TikTok / bio — your new system starts catching and booking clients."
          />
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-3.5 px-8 rounded-xl text-sm md:text-base inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
          >
            Lock In the $247 Founding Stylist Offer
          </Link>
          <p className="text-xs md:text-sm text-gray-400 mt-3">
            Limited spots while I build my first stylist case studies.
          </p>
        </div>
      </section>

      {/* OFFER / PRICING */}
      <section className="bg-white/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-[#020617] border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Founding Stylist Offer — $247
              </h2>
              <p className="text-sm md:text-base text-gray-300">
               Done-for-you Stylist Site + AI Booking Assistant to get your
                chair booked without you chasing DMs.
              </p>
            </div>

            <div className="space-y-4 mb-8 text-sm md:text-base">
              <OfferItem>
                Custom 1-page Stylist Site (services, bio, policies, portfolio
                spots, booking button)
              </OfferItem>
              <OfferItem>
                AI Booking Assistant conversation flow for your most common
                questions ("what do you charge?", "do you have anything
                Saturday?")
              </OfferItem>
              <OfferItem>
                Connection to your existing booking app or a simple request form
                for new clients
              </OfferItem>
              <OfferItem>
                Basic reminder / follow-up flow recommendations so you can plug
                into SMS or email tools
              </OfferItem>
              <OfferItem>30 days of support after launch</OfferItem>
            </div>

            <p className="text-center text-xs md:text-sm text-gray-400 mb-6">
              No long contracts. No hidden fees. Just a clean system that helps
              you stop leaking money in your DMs.
            </p>

            <div className="text-center">
              <Link
                href="/contact"
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-semibold py-3.5 px-8 rounded-xl text-sm md:text-base inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:ring-offset-2 focus:ring-offset-[#020617]"
              >
                Apply for the Founding Stylist Spot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SNIPPET */}
      <section className="max-w-4xl mx-auto px-4 py-14 md:py-18">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            What a "Can I Book?" Convo Looks Like
          </h2>
          <p className="text-sm md:text-base text-gray-300">
            A quick example of how your assistant turns a DM into a booking.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="space-y-3 text-sm md:text-base">
            <ChatBubble from="client">
              Hey, do you have anything open this Saturday?
            </ChatBubble>
            <ChatBubble from="assistant">
              Hey love! Yes — I have 10:30am or 1:00pm available. What service
              are you looking for?
            </ChatBubble>
            <ChatBubble from="client">
              Silk press + trim. 10:30 would be perfect.
            </ChatBubble>
            <ChatBubble from="assistant">
              Got you! I'll lock you in for Saturday at 10:30am for a silk press
              + trim. What's your name, email, and phone number so I can send
              your confirmation + reminder?
            </ChatBubble>
          </div>
          <p className="text-[11px] text-gray-500 mt-4 border-t pt-3">
            The exact flow is customized to your voice, policies, and booking
            rules.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Quick Questions Stylists Ask
        </h2>

        <div className="space-y-4 text-sm md:text-base">
          <FaqItem question="Do I need to be good with tech?">
            Nope. I handle the tech and walk you through everything step by
            step. If you can use Instagram, you can use this.
          </FaqItem>
          <FaqItem question="How fast can this be live?">
            Most stylists are live within 3–5 business days once I have your
            info, photos, and policies.
          </FaqItem>
          <FaqItem question="Will this work if I already have a booking app?">
            Yes. We connect your site + assistant to your existing booking app
            or keep it simple with a request form.
          </FaqItem>
          <FaqItem question="What if my prices or services change?">
            You'll have a simple way to request updates so your system stays
            accurate.
          </FaqItem>
          <FaqItem question="Is the $247 founding price really limited?">
            Yes. This is a one-time founding price for my first round of
            stylists while I build case studies. It will go up.
          </FaqItem>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#6D28D9] py-14 md:py-18">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl font-semibold mb-6">
            Ready for your DMs to stop feeling like a full-time job?
          </p>
          <p className="text-sm md:text-base text-white/90 mb-6">
            Let your Stylist Site + AI Booking Assistant catch the leads, answer
            the questions, and help book the clients — so you can focus on
            doing hair and building wealth.
          </p>
          <Link
            href="/contact"
            className="bg-white text-[#6D28D9] hover:bg-gray-100 font-semibold py-3.5 px-8 rounded-xl text-sm md:text-base inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6D28D9]"
          >
            Get My Stylist AI Booking System
          </Link>
        </div>
      </section>
    </div>
  );
}

/* Small helper components to keep JSX clean */

function BenefitCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-300">{body}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#6D28D9] rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-lg md:text-xl font-bold">{number}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-gray-300">{body}</p>
    </div>
  );
}

function OfferItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <CheckCircle className="w-5 h-5 text-[#06B6D4] mt-1 flex-shrink-0" />
      <p className="text-gray-300">{children}</p>
    </div>
  );
}

function ChatBubble({
  from,
  children,
}: {
  from: "client" | "assistant";
  children: React.ReactNode;
}) {
  const isClient = from === "client";
  return (
    <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
      <div
        className={`rounded-lg px-4 py-3 max-w-[80%] ${
          isClient ? "bg-gray-100 text-gray-900" : "bg-[#6D28D9] text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <details className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
      <summary className="font-semibold cursor-pointer list-none text-sm md:text-base">
        {question}
      </summary>
      <p className="text-gray-300 mt-3 text-sm md:text-base">{children}</p>
    </details>
  );
}
