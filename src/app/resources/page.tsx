import Link from "next/link";
import { Calculator, GitCompare, HelpCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — INTELLLX",
  description: "Free guides, tools, and resources to help you understand AI chatbots and make informed decisions about your lead generation strategy.",
  alternates: {
    canonical: 'https://intelllx.com/resources',
  },
};

const resources = [
  {
    title: "Lead Leakage Calculator",
    description: "Calculate how much revenue you're losing every month from missed leads and website visitors who leave without booking.",
    icon: Calculator,
    href: "/resources/lead-leakage-calculator",
    gradient: "from-blue-600 to-indigo-600",
    badge: "Interactive Tool",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  {
    title: "LeadFlow vs Generic Chatbots",
    description: "Understand the real difference between custom AI chatbots and generic tools like ChatGPT. See which one makes sense for your business.",
    icon: GitCompare,
    href: "/resources/leadflow-vs-generic",
    gradient: "from-purple-600 to-pink-600",
    badge: "Comparison Guide",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30"
  },
  {
    title: "5 Questions Your Chatbot Should Answer",
    description: "The critical questions every website chatbot must handle instantly to capture and qualify leads effectively.",
    icon: HelpCircle,
    href: "/resources/5-critical-questions",
    gradient: "from-emerald-600 to-teal-600",
    badge: "Quick Guide",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  }
];

export default function Resources() {
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
          {/* Eyebrow Label */}
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Free Resources</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Tools & Guides</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              For Smarter Decisions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium mb-16">
            Free guides and tools to help you understand AI chatbots, calculate ROI, and make informed decisions about your lead generation strategy.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative section-padding pt-8 md:pt-12">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={index}
                  href={resource.href}
                  className="group card p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  {/* Badge */}
                  <div className="mb-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${resource.badgeColor}`}>
                      {resource.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${resource.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6 font-medium">
                    {resource.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Transform Your Lead Generation?
            </h2>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed font-medium">
              These resources are just the beginning. Book a 15-minute discovery call to see how LeadFlow can capture and convert leads for your business 24/7.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

