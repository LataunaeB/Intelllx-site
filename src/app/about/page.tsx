import Link from "next/link";
import { CheckCircle, Zap, Target, Users, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://intelllx.com/about',
  },
};

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
      <section className="relative container-max section-padding pt-24 md:pt-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
            <span>✨ Certified AI Specialist</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-white">About</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              INTELLLX
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium">
            Bringing enterprise-level AI to businesses at accessible rates
          </p>
        </div>
      </section>

      {/* Founder Story & Credentials */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="card p-10 md:p-16">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
                  <span>✨ Certified AI Specialist</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  The Mission Behind <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">INTELLLX</span>
                </h2>
              </div>

              <div className="space-y-6 text-gray-200 leading-relaxed font-medium">
                <p className="text-lg">
                  As a 1000x AI Certified AI App Builder and Certified AI Specialist, with Google&apos;s AI Essentials certification, 
                  I&apos;ve built INTELLLX to bridge the gap between enterprise AI technology and businesses that need it at accessible rates.
                </p>
                
                <p className="text-lg">
                  Most businesses either can&apos;t afford custom AI development ($75,000+), or settle for generic tools that don&apos;t 
                  understand their specific needs.
                </p>

                <p className="text-lg">
                  That&apos;s the problem I solve: bringing the same AI technology transforming Fortune 500 companies → to businesses 
                  of all sizes at prices that make sense.
                </p>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    My Commitments
                  </h3>
                  <div className="space-y-3">
                    {[
                      "1000x AI Certified AI App Builder & AI Specialist",
                      "Google AI Essentials certified",
                      "Bring enterprise-level AI to businesses at accessible pricing",
                      "Build solutions that actually work for your specific industry",
                      "Provide honest, transparent partnership → no tech jargon"
                    ].map((commitment, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{commitment}</span>
              </div>
            ))}
          </div>
        </div>

                <p className="text-lg mt-8 font-semibold text-white">
                  Ready to be part of the new generation of AI-powered businesses? Let&apos;s build something that actually works for yours.
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
              Book a discovery call to discuss how we can bring enterprise-level AI to your business at accessible rates.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>Book Discovery Call</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}