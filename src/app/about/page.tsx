"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Zap, Target, Users, Lightbulb } from "lucide-react";

export default function About() {

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
      <section className="relative container-max section-padding">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Label */}
          <div className="eyebrow-label mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>About INTELLLX</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Purpose-Driven</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Innovation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium mb-16">
            We&apos;re a purpose-driven AI company dedicated to building sustainable business success through innovation, integrity, and impact.
          </p>

          {/* Additional Value Proposition */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Fast Implementation</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Get your AI chatbot running in 1-2 weeks, not months</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Proven Technology</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Built with Next.js, React, and cutting-edge AI</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Custom Solutions</h3>
              <p className="text-gray-300 text-sm leading-relaxed">Tailored specifically to your business needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed font-medium mb-8">
                At INTELLLX, we believe that artificial intelligence should serve humanity&apos;s greatest needs. 
                We&apos;re not just building chatbots and websites, we&apos;re creating tools that empower businesses 
                to thrive while maintaining the highest standards of ethical business practices.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                Our mission is to democratize AI technology, making it accessible to businesses of all sizes 
                while ensuring that every solution we create adds genuine value to our clients&apos; success.
              </p>
            </div>
            <div className="relative">
              <div className="card p-12">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: "100%", label: "Client Satisfaction" },
                    { number: "24/7", label: "AI Availability" },
                    { number: "3-5x", label: "Lead Increase" },
                    { number: "30", label: "Day ROI" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                      <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "We constantly push the boundaries of what&apos;s possible with AI technology, always seeking better ways to solve business challenges."
              },
              {
                icon: CheckCircle,
                title: "Integrity",
                description: "We operate with complete transparency and honesty, building trust through reliable solutions and ethical business practices."
              },
              {
                icon: Target,
                title: "Impact",
                description: "Every solution we create is designed to make a meaningful difference in our clients&apos; success and growth."
              }
            ].map((value, index) => (
              <div key={index} className="card p-8 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-medium text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="card p-12">
                <h3 className="text-3xl font-bold text-white mb-6">Our Story</h3>
                <p className="text-lg text-gray-200 leading-relaxed font-medium mb-6">
                  INTELLLX was born from a simple observation: too many businesses were missing out on 
                  opportunities because they couldn&apos;t be available 24/7 to capture leads and engage with prospects.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed font-medium mb-6">
                  We saw the potential of AI to solve this problem, but we also saw that most AI solutions 
                  were either too complex, too expensive, or too generic to be truly effective.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed font-medium">
                  So we set out to create something different: AI solutions that are powerful yet simple, 
                  effective yet affordable, and always designed with the specific needs of real businesses in mind.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Why We <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Exist</span>
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed font-medium mb-8">
                We believe that every business, regardless of size, should have access to the same 
                powerful AI technology that&apos;s transforming the world&apos;s largest companies.
              </p>
              <div className="space-y-4">
                {[
                  "Democratizing AI technology for businesses of all sizes",
                  "Creating solutions that actually work in the real world",
                  "Building long-term partnerships, not just transactions",
                  "Maintaining the highest standards of ethics and integrity"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg leading-relaxed font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative section-padding">
        <div className="container-max text-center">
          <div className="card p-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium">
              Join the growing number of businesses using AI to accelerate growth and create lasting impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  Get in Touch
                </span>
              </Link>
              <Link
                href="/pricing"
                className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-bold text-xl rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        </div>
    </section>
    </div>
  );
}