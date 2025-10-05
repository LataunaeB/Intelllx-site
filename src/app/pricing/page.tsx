"use client";
import { site } from "@/config/site";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Link from "next/link";
import { CheckCircle, Star, Zap } from "lucide-react";

export default function Pricing() {

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
            <span>Transparent Pricing</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Simple</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
            Choose the service that fits your business needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
          {/* Chatbot · Basic */}
          <div className="card p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Chatbot · Basic</h3>
              <div className="text-3xl font-black text-white">$500</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Template setup, up to 5 Q/As</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">1 website widget, basic analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">1 revision, 7-day fixes</span>
              </div>
            </div>
            
            <a
              href="https://buy.stripe.com/14A9ATh1K9lp7bR3koaEE05"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>

          {/* Chatbot · Pro */}
          <div className="card p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Chatbot · Pro</h3>
              <div className="text-3xl font-black text-white">$1,000</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Custom look & flows (up to 15 Q/As)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">1 integration (Calendly/Email/CRM)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Lead export + event tracking</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">2 revisions, 30-day optimization</span>
              </div>
            </div>
            
            <a
              href="https://buy.stripe.com/aFacN5eTC7dh7bR2gkaEE06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>

          {/* Website · Launch */}
          <div className="card p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Website · Launch</h3>
              <div className="text-3xl font-black text-white">$500</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">1–3 pages (template)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Mobile-responsive, fast load</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Basic SEO + analytics</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">1 revision, 7-day fixes</span>
              </div>
            </div>
            
            <a
              href="https://buy.stripe.com/9B65kDaDm4158fVbQUaEE07"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>

          {/* Website · Professional/Business */}
          <div className="card p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Website · Professional/Business</h3>
              <div className="text-3xl font-black text-white">$1,000</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">4–6 pages (light customization)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Brand-matched sections + micro-polish</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">SEO basics, analytics events</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">2 revisions, launch checklist</span>
              </div>
            </div>
            
            <a
              href="https://buy.stripe.com/bJe5kD12Mbtx2VB3koaEE08"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>

          {/* Website · Advanced */}
          <div className="card p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Website · Advanced</h3>
              <div className="text-3xl font-black text-white">$2,500</div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">7–12 pages or special features</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Custom sections + tasteful animations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Integrations (CRM/forms/payments)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">Performance pass (Core Web Vitals)</span>
              </div>
            </div>
            
            <a
              href="https://buy.stripe.com/bJe7sL6n61SXfIn2gkaEE09"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Simple add-ons */}
        <div className="text-center mb-6">
          <div className="card p-4 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-3">Simple add-ons (optional)</h4>
            <p className="text-gray-300 text-sm md:text-base">
              +5 chatbot Q/As $99 · Extra page (template) $150 · Extra integration from $300
            </p>
          </div>
        </div>

        {/* Payment tagline */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-base">
            Payment: Simple, transparent pricing → invest and start building.
          </p>
        </div>

    </section>
    </div>
  );
}