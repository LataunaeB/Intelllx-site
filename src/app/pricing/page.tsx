"use client";
import { site } from "@/config/site";
import { pricing } from "@/config/pricing";
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
              <h3 className="text-xl font-bold text-white mb-2">{pricing.products.chatbot.basic.name}</h3>
              <div className="text-3xl font-black text-white">{pricing.products.chatbot.basic.priceDisplay}</div>
            </div>
            
            <div className="space-y-3 mb-4">
              {pricing.products.chatbot.basic.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Optional Monthly Service */}
            <div className="mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-blue-300 font-medium">Optional</span>
                <span className="text-sm text-blue-200 font-semibold">{pricing.products.chatbot.basic.monthlyService.name} — {pricing.products.chatbot.basic.monthlyService.priceDisplay}</span>
              </div>
              <p className="text-xs text-gray-400">{pricing.products.chatbot.basic.monthlyService.description}</p>
            </div>
            
            <div className="space-y-2">
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                {pricing.ctaLabels.getStarted}
              </a>
              <p className="text-xs text-gray-400 text-center">{pricing.ctaLabels.addMonthlyLater}</p>
            </div>
          </div>

          {/* Chatbot · Pro */}
          <div className="card p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pricing.products.chatbot.pro.name}</h3>
              <div className="text-3xl font-black text-white">{pricing.products.chatbot.pro.priceDisplay}</div>
            </div>
            
            <div className="space-y-3 mb-4">
              {pricing.products.chatbot.pro.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Optional Monthly Service */}
            <div className="mb-6 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-purple-300 font-medium">Optional</span>
                <span className="text-sm text-purple-200 font-semibold">{pricing.products.chatbot.pro.monthlyService.name} — {pricing.products.chatbot.pro.monthlyService.priceDisplay}</span>
                {pricing.products.chatbot.pro.monthlyService.recommended && (
                  <span className="text-xs bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full">Recommended</span>
                )}
              </div>
              <p className="text-xs text-gray-400">{pricing.products.chatbot.pro.monthlyService.description}</p>
            </div>
            
            <div className="space-y-2">
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 inline-flex items-center justify-center"
              >
                {pricing.ctaLabels.getStarted}
              </a>
              <p className="text-xs text-gray-400 text-center">{pricing.ctaLabels.addMonthlyLater}</p>
            </div>
          </div>

          {/* Website · Launch */}
          <div className="card p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pricing.products.website.launch.name}</h3>
              <div className="text-3xl font-black text-white">{pricing.products.website.launch.priceDisplay}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {pricing.products.website.launch.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              {pricing.ctaLabels.getStarted}
            </a>
          </div>

          {/* Website · Professional/Business */}
          <div className="card p-6 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pricing.products.website.professional.name}</h3>
              <div className="text-3xl font-black text-white">{pricing.products.website.professional.priceDisplay}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {pricing.products.website.professional.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              {pricing.ctaLabels.getStarted}
            </a>
          </div>

          {/* Website · Advanced */}
          <div className="card p-6 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">{pricing.products.website.advanced.name}</h3>
              <div className="text-3xl font-black text-white">{pricing.products.website.advanced.priceDisplay}</div>
            </div>
            
            <div className="space-y-3 mb-6">
              {pricing.products.website.advanced.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              {pricing.ctaLabels.getStarted}
            </a>
          </div>
        </div>

        {/* Simple add-ons */}
        <div className="text-center mb-6">
          <div className="card p-4 max-w-4xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-3">Simple add-ons (optional)</h4>
            <p className="text-gray-300 text-sm md:text-base">
              {pricing.addOns.map((addon, index) => (
                <span key={index}>
                  {addon.name} {addon.priceDisplay}
                  {index < pricing.addOns.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Payment tagline */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-base">
            {pricing.paymentTagline}
          </p>
        </div>

    </section>
    </div>
  );
}