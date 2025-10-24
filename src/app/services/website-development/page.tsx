"use client";
import Link from "next/link";
import { pricing } from "@/config/pricing";
import { site } from "@/config/site";

export default function WebsiteDevelopment() {
  const tiers = [
    {
      name: pricing.products.website.launch.name,
      price: pricing.products.website.launch.priceDisplay,
      description: "Perfect for small businesses and startups",
      features: pricing.products.website.launch.features,
      popular: false,
      stripeLink: pricing.products.website.launch.stripeLink
    },
    {
      name: pricing.products.website.professional.name,
      price: pricing.products.website.professional.priceDisplay,
      description: "Ideal for growing businesses",
      features: pricing.products.website.professional.features,
      popular: true,
      stripeLink: pricing.products.website.professional.stripeLink
    },
    {
      name: pricing.products.website.advanced.name,
      price: pricing.products.website.advanced.priceDisplay,
      description: "For large businesses with complex needs",
      features: pricing.products.website.advanced.features,
      popular: false,
      stripeLink: pricing.products.website.advanced.stripeLink
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We discuss your goals, target audience, and requirements to create a detailed project plan."
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "We create wireframes and designs that align with your brand and business objectives."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build your website with modern technologies and thoroughly test all functionality."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "We launch your site and provide ongoing support to ensure everything runs smoothly."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-sm font-medium text-white/90">🌐 Custom Websites</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Website</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Development
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Custom websites built with modern technologies that convert visitors into customers
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Modern Web Development</h2>
                <p className="text-white/80 text-lg">Built with the latest technologies for optimal performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Website Package</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Professional websites tailored to your business needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-500 transform hover:scale-105 ${
                  tier.popular
                    ? 'bg-white/10 backdrop-blur-sm border-purple-500/50 shadow-2xl shadow-purple-500/25'
                    : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {tier.price}
                  </div>
                  <p className="text-white/70">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-4 rounded-2xl font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/25"
                >
                  {pricing.ctaLabels.getStarted}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Development Process */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Development Process</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A proven process that ensures your website meets your goals and exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Dream Website?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Let&apos;s discuss your project and create a website that drives results for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
