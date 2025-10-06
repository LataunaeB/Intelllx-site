"use client";
import { site } from "@/config/site";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Zap, Code, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://intelllx.com/services',
  },
};

export default function Services() {

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

      <section className="relative container-max section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Our Premium Services</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">What We</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Offer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
            Transform your business with our AI-powered solutions and custom website development
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {site.services.map((s, index) => (
            <div key={s.title} className="card p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  {index === 0 ? (
                    <Zap className="w-8 h-8 text-white" />
                  ) : (
                    <Code className="w-8 h-8 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-white mb-4">{s.title}</h2>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {index === 0 
                      ? "AI-powered chatbot that captures leads and books calls 24/7"
                      : "Custom websites built with modern technologies for optimal performance"
                    }
                  </p>
                </div>
              </div>
                
              <div className="space-y-3 mb-8">
                {(index === 0 ? [
                  "24/7 capture & qualification (custom flows per industry)",
                  "CRM sync (HubSpot, Pipedrive, Salesforce), Google Sheets fallback",
                  "Calendar booking (Calendly or Google Calendar)",
                  "Knowledge ingestion (FAQ, PDFs, URLs) with RAG",
                  "Multi-language + analytics",
                  "Weekly optimization & reports"
                ] : [
                  "Next.js 15, Tailwind v4, shadcn/ui",
                  "Lighthouse-friendly: image optimization, route prefetch, code-splitting",
                  "SEO setup (sitemap, robots, canonical, OG)",
                  "LeadFlow embed on launch",
                  "Mobile-first responsive design",
                  "Performance monitoring & analytics"
                ]).map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href={index === 0 ? "/pricing" : "/services/website-development"}>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                  >
                    {index === 0 ? "Get Started" : "View Packages"}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">INTELLLX</span>?
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              We combine cutting-edge technology with proven business strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Fast Implementation",
                description: "Streamlined processes to get your solutions up and running quickly"
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Quality Assurance",
                description: "Thorough testing and optimization to ensure reliable performance"
              },
              {
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z",
                title: "Scalable Solutions",
                description: "Built to grow with your business and adapt to changing needs"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Get Each Week */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              What You&apos;ll Get <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Each Week</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light">
              Ongoing support and optimization to maximize your results
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Conversation review",
                "Missed-lead analysis", 
                "Prompt updates",
                "5-minute report"
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Process CTA */}
        <div className="mb-20">
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">Want to See Our Process?</h3>
              <p className="text-xl text-white/80 mb-8 leading-relaxed font-light">
                Learn exactly how we work with you from discovery to launch
              </p>
              <Link
                href="/process"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                View Our Process
              </Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-16 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-4xl font-black text-white mb-6">Ready to Get Started?</h3>
            <p className="text-xl text-white/80 mb-10 leading-relaxed font-light">
              Let&apos;s discuss how our solutions can transform your business
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Discovery Call
                </span>
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-5 bg-white/10 text-white font-bold text-xl rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
      </div>
    </section>
    </div>
  );
}