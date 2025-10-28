"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, MessageSquare, Bot, Zap, Calendar, TrendingUp, Target, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    subtitle: "Understand your business",
    description: "We learn about your practice, your ideal clients, and your current lead generation challenges.",
    deliverables: [
      "Your business goals",
      "Client profile analysis",
      "Current system review",
      "Customization requirements"
    ],
    icon: MessageSquare
  },
  {
    number: "02",
    title: "Conversation Design",
    subtitle: "Custom AI that sounds like you",
    description: "We design personalized conversation flows that match your brand voice and handle every client question.",
    deliverables: [
      "Brand voice training",
      "25 custom Q/A responses",
      "Objection handling",
      "Booking flow optimization"
    ],
    icon: Bot
  },
  {
    number: "03",
    title: "Integration Setup",
    subtitle: "Connect your existing tools",
    description: "We connect your chatbot to your calendar (Zoom/Calendly), CRM, and email notifications.",
    deliverables: [
      "Google Calendar or Calendly sync",
      "Zoom meeting automation",
      "CRM lead capture",
      "Email notifications"
    ],
    icon: Calendar
  },
  {
    number: "04",
    title: "Launch & Training",
    subtitle: "Go live with confidence",
    description: "We deploy your chatbot, train your team, and ensure everything works perfectly.",
    deliverables: [
      "Website widget deployment",
      "Team training session",
      "QA testing complete",
      "30-day support included"
    ],
    icon: Zap
  }
];

const industryExamples = [
  {
    industry: "Law Firms",
    useCase: "Capture consultations for personal injury, family law, and estate planning",
    example: "Prospect asks: 'Do you handle divorce cases?' → Bot qualifies → Books consultation → Sends Zoom link",
    result: "Never miss a consultation again, even after hours"
  },
  {
    industry: "Consulting Firms",
    useCase: "Book strategy calls and qualify enterprise prospects",
    example: "Prospect asks: 'Can you help with digital transformation?' → Bot schedules → Follows up automatically",
    result: "Book more qualified calls without manual outreach"
  },
  {
    industry: "Medical Practices",
    useCase: "Schedule appointments and answer common questions",
    example: "Patient asks: 'What insurance do you accept?' → Bot answers → Books appointment → Sends confirmation",
    result: "Reduce front desk calls by 70% while booking more appointments"
  }
];

export default function HowWeBuild() {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

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
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white/90 mb-6">
            <Target className="w-4 h-4" />
            <span>Transparent Process</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-white">How We'll Build</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Custom Chatbot
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium mb-8">
            See exactly how we transform your business with a custom AI chatbot. We work with you every step of the way to ensure you get exactly what you need.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  {/* Number Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-black text-white">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-gray-400">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed font-medium mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-3 mb-6">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Examples */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Real Examples for Your Industry
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-medium">
              See exactly how your chatbot will work for your specific business
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {industryExamples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedIndustry === idx
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {example.industry}
                </button>
              ))}
            </div>

            {/* Selected Example */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {industryExamples[selectedIndustry].industry}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-medium mb-6">
                    {industryExamples[selectedIndustry].useCase}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-semibold mb-1">Example Flow</h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-medium">
                          {industryExamples[selectedIndustry].example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <h4 className="text-xl font-bold text-white">The Result</h4>
                  </div>
                  <p className="text-white leading-relaxed font-medium">
                    {industryExamples[selectedIndustry].result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Why LeadFlow is Different
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                We don't just build a chatbot → we build your AI sales assistant
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Actually Custom</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Not another ChatGPT clone. Your conversation flows, your brand voice, your business logic.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zoom + Calendar Integration</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Every conversation can book a call with automatic Zoom link generation and CRM sync.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ROI-Focused</h3>
                <p className="text-gray-300 leading-relaxed font-medium">
                  We optimize for conversions, not just pretty interfaces. Built to capture and qualify real leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed font-medium">
              Book a 15-minute discovery call. We work with you every step of the way to build exactly what you need → no technical knowledge required on your end.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <span>Book Discovery Call</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span>View Pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

