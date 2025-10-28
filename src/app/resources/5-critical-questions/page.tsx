import Link from "next/link";
import { ArrowRight, MessageCircle, DollarSign, Clock, Eye, Rocket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Questions Your Chatbot Should Answer Instantly — INTELLLX Resources",
  description: "The critical questions every website chatbot must handle to capture and qualify leads effectively. Essential guide for AI chatbot success.",
  alternates: {
    canonical: 'https://intelllx.com/resources/5-critical-questions',
  },
};

const questions = [
  {
    number: "1",
    question: "What do you do?",
    icon: MessageCircle,
    why: "First impressions matter. If a visitor can't immediately understand your service, they bounce. Your chatbot should explain your core offering in one clear sentence.",
    example: "\"We build custom AI chatbots that capture and qualify leads 24/7, then automatically book them into your calendar. Think of it as a tireless sales assistant that never sleeps.\"",
    badExample: "\"We offer innovative solutions leveraging cutting-edge technology...\" (too vague)",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    number: "2",
    question: "How much does it cost?",
    icon: DollarSign,
    why: "Price is the elephant in the room. Address it upfront and qualify leads faster. People appreciate transparency.",
    example: "\"Our chatbot setup starts at $1,497 for a basic template (up to 5 Q&As) and $4,997 for a fully custom solution (up to 15 Q&As + integrations). Would you like to see what's included?\"",
    badExample: "\"Pricing depends on your needs. Let's schedule a call to discuss.\" (creates friction)",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    number: "3",
    question: "How long does it take?",
    icon: Clock,
    why: "Prospects want to know the timeline. Vague answers create uncertainty and kill momentum.",
    example: "\"Most clients go live in 1-2 weeks. We handle the entire setup: design, training, integration, testing, and deployment. You'll see leads coming in by week 2.\"",
    badExample: "\"It depends on the scope...\" (creates doubt)",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "4",
    question: "Can I see examples?",
    icon: Eye,
    why: "People want proof it works. Show them real examples or a demo to build confidence.",
    example: "\"Absolutely! You're actually chatting with our LeadFlow chatbot right now. We also have case studies from clients in [industry 1], [industry 2], and [industry 3]. Want me to share them?\"",
    badExample: "\"We have many successful clients...\" (no proof)",
    gradient: "from-orange-500 to-red-500"
  },
  {
    number: "5",
    question: "How do I get started?",
    icon: Rocket,
    why: "Make the next step crystal clear. Remove all friction from booking a call.",
    example: "\"Getting started is simple: (1) Book a 15-minute discovery call, (2) We'll design your custom chatbot, (3) Go live in 1-2 weeks. Want to schedule that call now? I can show you available times.\"",
    badExample: "\"Just fill out this form and we'll get back to you...\" (too passive)",
    gradient: "from-indigo-500 to-blue-500"
  }
];

export default function FiveCriticalQuestions() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, #3b82f6 1px, transparent 1px),
                            radial-gradient(circle at 80% 80%, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0, 50px 50px'
          }}></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative container-max section-padding pt-24 md:pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/resources" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium inline-flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Resources
            </Link>
          </div>

          {/* Eyebrow Label */}
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Quick Guide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            5 Questions Your Chatbot Should Answer Instantly
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-200 leading-relaxed font-medium mb-16">
            The critical questions every website chatbot must handle to capture and qualify leads effectively. Get these right, and your conversion rate will soar.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="relative section-padding pt-8 md:pt-12">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 mb-12 bg-blue-500/10 border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Why These Questions Matter</h2>
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                When a visitor lands on your website, they have immediate questions. If your chatbot can&apos;t answer them <strong className="text-blue-300">instantly and clearly</strong>, they leave. It&apos;s that simple.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed">
                These 5 questions represent 80% of what prospects want to know before booking a call. Master these, and you&apos;ll capture leads that would otherwise disappear.
              </p>
            </div>

            {/* Questions Breakdown */}
            <div className="space-y-8">
              {questions.map((q, index) => {
                const Icon = q.icon;
                return (
                  <div key={index} className="card p-8">
                    {/* Question Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${q.gradient} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-400 mb-2">Question {q.number}</div>
                        <h3 className="text-2xl font-black text-white mb-2">{q.question}</h3>
                      </div>
                    </div>

                    {/* Why It Matters */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-blue-300 mb-3">Why it matters</h4>
                      <p className="text-gray-300 leading-relaxed">{q.why}</p>
                    </div>

                    {/* Good Example */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-green-300 mb-2">✅ Good Answer</h4>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <p className="text-gray-200 italic leading-relaxed">{q.example}</p>
                      </div>
                    </div>

                    {/* Bad Example */}
                    <div>
                      <h4 className="text-sm font-semibold text-red-300 mb-2">❌ Bad Answer</h4>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-gray-200 italic leading-relaxed">{q.badExample}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bonus Tips */}
            <div className="card p-8 mt-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Bonus Tips for Chatbot Success</h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">1.</span>
                  <div>
                    <strong className="text-white">Be conversational, not robotic</strong>
                    <p className="text-sm text-gray-400 mt-1">Write like you&apos;re talking to a friend, not filing a police report</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">2.</span>
                  <div>
                    <strong className="text-white">Use names and personalization</strong>
                    <p className="text-sm text-gray-400 mt-1">Ask for their name early and use it throughout the conversation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">3.</span>
                  <div>
                    <strong className="text-white">Make booking frictionless</strong>
                    <p className="text-sm text-gray-400 mt-1">Show available times directly in the chat, not via external links</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">4.</span>
                  <div>
                    <strong className="text-white">Have a backup for edge cases</strong>
                    <p className="text-sm text-gray-400 mt-1">Always offer a way to contact a human if the AI can&apos;t help</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold mt-1">5.</span>
                  <div>
                    <strong className="text-white">Track and optimize</strong>
                    <p className="text-sm text-gray-400 mt-1">Monitor which questions get asked most and refine your answers monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-green-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Want a Chatbot That Gets It Right?
            </h2>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed font-medium">
              LeadFlow chatbots are custom-built to answer YOUR specific questions perfectly. We design every conversation flow to capture and qualify leads for your exact business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/resources/leadflow-vs-generic"
                className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                LeadFlow vs Generic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

