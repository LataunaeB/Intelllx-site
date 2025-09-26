"use client";
import { site } from "@/config/site";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
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
        {/* Promotional Banner */}
        <div className="card p-8 mb-12 text-center">
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
            <span>LAUNCH SPECIAL - LIMITED TIME</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Founding Client Pricing
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Premium AI development at accessible pricing - limited time offer
          </p>
          <CountdownTimer endDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} />
        </div>

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

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* LeadFlow Chatbot */}
          <div className="card p-8 relative">
            {/* Promotional Badge */}
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white font-bold px-3 py-1 rounded-lg text-sm">
              40% OFF
            </div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="eyebrow-label mb-4">
                <Zap className="w-3 h-3" />
                <span>AI Chatbot</span>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-4">LeadFlow Chatbot</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">Your 24/7 AI sales assistant that captures leads and books calls</p>
              
              {/* Pricing with strike-through */}
              <div className="mb-6">
                <div className="text-lg text-gray-400 line-through mb-1">Regular: $2,500</div>
                <div className="text-5xl font-black text-white mb-2">$1,500</div>
                <p className="text-gray-400 text-base mb-4">One-time setup fee</p>
              </div>
              
              <div className="eyebrow-label">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                <span>+ $400/month after setup</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">What&apos;s included:</h3>
              {site.pricing[0].setup.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <StripeCheckoutButton className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-lg">
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Get Launch Special - $1,500
                </span>
              </StripeCheckoutButton>
              <p className="text-orange-300 text-sm mt-2 font-medium">Limited time offer - Save $1,000!</p>
            </div>
          </div>

          {/* Website Development */}
          <div className="card p-8 relative">
            {/* Promotional Badge */}
            <div className="absolute -top-3 -right-3 bg-orange-500 text-white font-bold px-3 py-1 rounded-lg text-sm">
              40% OFF
            </div>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="eyebrow-label mb-4">
                <Star className="w-3 h-3" />
                <span>Web Development</span>
              </div>
              
              <h2 className="text-3xl font-black text-white mb-4">Website Development</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">Custom websites built with modern technologies</p>
              
              {/* Pricing with strike-through */}
              <div className="mb-6">
                <div className="text-lg text-gray-400 line-through mb-1">Regular: Starting at $3,000</div>
                <div className="text-5xl font-black text-white mb-2">Starting at $2,000</div>
                <p className="text-gray-400 text-base mb-4">One-time project fee</p>
              </div>
              
              <div className="eyebrow-label">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                <span>Custom pricing available</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">What&apos;s included:</h3>
              {site.pricing[1].setup.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <a
                href="https://buy.stripe.com/5kQ7sLh1K69dbs7f36aEE02"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg"
              >
                <Star className="w-5 h-5" />
                Launch Special - $2,000
              </a>
              <p className="text-orange-300 text-sm text-center font-medium">Save $1,000 - Limited time!</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://buy.stripe.com/7sY5kD3aU4150Nt9IMaEE03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-center"
                >
                  Pro - $4,500
                </a>
                <a
                  href="https://buy.stripe.com/8x23cv26Q7dh9jZf36aEE04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-center"
                >
                  Enterprise - $8,000
                </a>
              </div>
              <Link
                href="/services/website-development"
                className="w-full bg-white/10 text-white font-bold py-4 px-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center text-lg"
              >
                View All Packages
              </Link>
            </div>
          </div>
        </div>

        {/* Combined Services CTA */}
        <div className="text-center mb-16">
          <div className="card p-12 max-w-5xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Need Both Services?</h3>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium">
              Get a custom website with integrated LeadFlow Chatbot for maximum lead generation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Get Custom Quote
              </Link>
              <Link
                href="/contact"
                className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-bold text-xl rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <div className="card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-8">Why Choose Our Pricing?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Transparent",
                  description: "No hidden fees or surprise charges. What you see is what you pay."
                },
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Fast ROI",
                  description: "Most clients see return on investment within 30 days."
                },
                {
                  icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z",
                  title: "Scalable",
                  description: "Solutions that grow with your business needs."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <div className="card p-12 max-w-4xl mx-auto">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-6">
              <p className="text-orange-200 leading-relaxed font-medium text-lg">
                <strong className="text-orange-100">Limited Time:</strong> This founding client pricing is only available for the first 3 months. After that, prices increase to regular rates: LeadFlow $2,500 setup + $600/month, Websites starting at $3,000.
              </p>
            </div>
            <p className="text-lg text-gray-200 mb-6 leading-relaxed font-medium">
              We operate with integrity and transparency. Custom plans available on request.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
              <p className="text-gray-200 leading-relaxed font-medium">
                <strong className="text-white">Note:</strong> For LeadFlow Chatbot, after your setup is complete, we&apos;ll work with you to set up the monthly $400 hosting fee. 
                This two-step process ensures all payment methods (including debit cards) work smoothly.
              </p>
            </div>
          </div>
        </div>
    </section>
    </div>
  );
}