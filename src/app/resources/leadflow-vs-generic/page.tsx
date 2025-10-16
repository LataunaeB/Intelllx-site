import Link from "next/link";
import { GitCompare, ArrowRight, CheckCircle, XCircle, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadFlow vs Generic Chatbots — INTELLLX Resources",
  description: "Understand the real difference between custom AI chatbots and generic tools like ChatGPT. Learn which solution makes sense for your business.",
  alternates: {
    canonical: 'https://intelllx.com/resources/leadflow-vs-generic',
  },
};

export default function LeadFlowVsGeneric() {
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
            <span>Comparison Guide</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            LeadFlow vs Generic Chatbots
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-200 leading-relaxed font-medium mb-16">
            Understanding the real difference between custom AI chatbots and generic tools. Which one actually grows your business?
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="relative section-padding pt-8 md:pt-12">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-blue-500/10 border-blue-500/30 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">The Short Answer</h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                <strong className="text-blue-300">Generic chatbots</strong> (like ChatGPT) are great for general conversation but terrible at lead capture. <strong className="text-blue-300">Custom AI chatbots</strong> (like LeadFlow) are purpose-built to capture, qualify, and convert your specific audience into paying customers.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="card p-8 overflow-hidden mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Side-by-Side Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-4 text-gray-400 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4 text-gray-400 font-semibold">Generic Chatbots</th>
                      <th className="text-center py-4 px-4 text-blue-300 font-semibold">LeadFlow (Custom AI)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Trained on your business</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Custom conversation flows</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Matches your brand</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Lead qualification</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Calendar integration</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">CRM integration</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Analytics & insights</td>
                      <td className="py-4 px-4 text-center text-sm text-gray-400">Basic</td>
                      <td className="py-4 px-4 text-center text-sm text-green-300">Advanced</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Setup required</td>
                      <td className="py-4 px-4 text-center text-sm text-gray-400">DIY</td>
                      <td className="py-4 px-4 text-center text-sm text-green-300">We handle it</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-4 font-medium text-white">Ongoing optimization</td>
                      <td className="py-4 px-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                      <td className="py-4 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-400 mx-auto" /></td>
                    </tr>
                    <tr className="border-b border-white/10 bg-blue-500/5">
                      <td className="py-4 px-4 font-bold text-white">Cost</td>
                      <td className="py-4 px-4 text-center text-sm font-semibold text-white">Free - $20/mo</td>
                      <td className="py-4 px-4 text-center text-sm font-semibold text-white">$1,497 - $4,997 setup</td>
                    </tr>
                    <tr className="bg-green-500/5">
                      <td className="py-4 px-4 font-bold text-white">Best For</td>
                      <td className="py-4 px-4 text-center text-sm text-gray-300">General questions, experimenting</td>
                      <td className="py-4 px-4 text-center text-sm text-green-300">Lead gen, sales, revenue growth</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deep Dive Sections */}
            <div className="space-y-8">
              {/* Generic Chatbots */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Generic Chatbots (ChatGPT, etc.)</h2>
                
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Generic AI tools like ChatGPT are incredibly powerful for general-purpose conversations, but they have significant limitations when it comes to lead generation.
                  </p>

                  <div>
                    <h3 className="text-xl font-bold text-green-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      What They&apos;re Good At
                    </h3>
                    <ul className="space-y-2 ml-7">
                      <li>• Answering general questions with natural language</li>
                      <li>• Low or zero cost to experiment</li>
                      <li>• Quick to set up (embed a script)</li>
                      <li>• Good for basic customer service</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Where They Fall Short
                    </h3>
                    <ul className="space-y-2 ml-7">
                      <li>• <strong className="text-white">No business-specific knowledge</strong> — Can&apos;t answer questions about YOUR pricing, services, or process</li>
                      <li>• <strong className="text-white">No lead capture</strong> — Conversations disappear, no contact info collected</li>
                      <li>• <strong className="text-white">No qualification</strong> — Can&apos;t identify serious buyers vs. tire-kickers</li>
                      <li>• <strong className="text-white">No integrations</strong> — Doesn&apos;t connect to your calendar, CRM, or email</li>
                      <li>• <strong className="text-white">Generic branding</strong> — Feels disconnected from your brand</li>
                      <li>• <strong className="text-white">You manage it</strong> — DIY setup, maintenance, and troubleshooting</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <p className="text-lg font-semibold text-gray-200">
                      <strong>Bottom line:</strong> Generic chatbots are great for answering questions, but they won&apos;t capture or convert leads into paying customers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom LeadFlow */}
              <div className="card p-8 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">Custom AI Chatbots (LeadFlow)</h2>
                
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    LeadFlow is a custom AI chatbot purpose-built for one thing: <strong className="text-blue-300">capturing and converting leads while you sleep</strong>. Every conversation is designed to move prospects toward booking a call.
                  </p>

                  <div>
                    <h3 className="text-xl font-bold text-green-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      What Makes LeadFlow Different
                    </h3>
                    <ul className="space-y-3 ml-7">
                      <li>• <strong className="text-white">Trained on YOUR business</strong> — Knows your services, pricing, process, and value prop</li>
                      <li>• <strong className="text-white">Custom conversation flows</strong> — Guides prospects toward booking a call</li>
                      <li>• <strong className="text-white">Lead capture built-in</strong> — Collects name, email, phone automatically</li>
                      <li>• <strong className="text-white">Smart qualification</strong> — Asks the right questions to identify serious buyers</li>
                      <li>• <strong className="text-white">Calendar integration</strong> — Books calls directly into your calendar</li>
                      <li>• <strong className="text-white">CRM sync</strong> — Auto-creates contacts in your CRM</li>
                      <li>• <strong className="text-white">Your branding</strong> — Matches your colors, fonts, tone, and personality</li>
                      <li>• <strong className="text-white">Professional setup</strong> — We build it, test it, and deploy it for you</li>
                      <li>• <strong className="text-white">Ongoing optimization</strong> — Monthly tuning to improve conversion rates</li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <p className="text-lg font-semibold text-green-200">
                      <strong>Bottom line:</strong> LeadFlow is an investment in revenue growth. It&apos;s not a chatbot—it&apos;s a 24/7 AI sales assistant that captures and qualifies leads while you focus on closing deals.
                    </p>
                  </div>
                </div>
              </div>

              {/* When to Choose Each */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Choose Generic If...</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You just want to experiment with AI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You have zero budget</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You don&apos;t need lead capture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You&apos;re okay managing it yourself</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You just need basic FAQs answered</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-8 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Choose LeadFlow If...
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You&apos;re serious about growing revenue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You&apos;re missing leads (evenings, weekends)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You want automatic lead capture & qualification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You want calendar/CRM integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>You want a professional solution that just works</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ROI Comparison */}
              <div className="card p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-6">The ROI Reality</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-300 mb-4">Generic Chatbot</h3>
                    <div className="space-y-3 text-gray-400">
                      <p>• Cost: $0-20/month</p>
                      <p>• Leads captured: 0-5/month (manual)</p>
                      <p>• Conversion boost: 0-1%</p>
                      <p>• Revenue impact: Minimal</p>
                      <p className="text-red-300 font-semibold pt-2">ROI: Negative (time spent managing)</p>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-green-200 mb-4">LeadFlow Custom AI</h3>
                    <div className="space-y-3 text-gray-300">
                      <p>• Investment: $1,497-4,997 setup</p>
                      <p>• Leads captured: 20-50+/month (automatic)</p>
                      <p>• Conversion boost: 2-5%</p>
                      <p>• Revenue impact: $5K-50K+/month</p>
                      <p className="text-green-300 font-semibold pt-2">ROI: 5-20x in first 6 months</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-lg text-blue-200 font-semibold">
                    Real math: If LeadFlow captures just 3 extra qualified leads per month at $1,500 average deal value, it pays for itself in the first month.
                  </p>
                </div>
              </div>

              {/* Final Recommendation */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Our Honest Recommendation</h2>
                
                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                  <p>
                    If you&apos;re <strong className="text-white">just curious about AI</strong> and want to play around, start with a generic chatbot. It&apos;s free and gives you a feel for the technology.
                  </p>

                  <p>
                    But if you&apos;re <strong className="text-white">serious about growing your business</strong> and you&apos;re currently losing leads because:
                  </p>

                  <ul className="space-y-2 ml-6">
                    <li>• No one&apos;s available 24/7</li>
                    <li>• You can&apos;t answer questions instantly</li>
                    <li>• Prospects leave without booking calls</li>
                    <li>• You&apos;re manually qualifying every inquiry</li>
                  </ul>

                  <p>
                    Then a <strong className="text-blue-300">custom AI chatbot is the right investment</strong>. It pays for itself by capturing the leads you&apos;re already missing.
                  </p>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mt-6">
                    <p className="text-blue-200 font-semibold">
                      Think of it this way: Every missed lead is money left on the table. LeadFlow picks up that money for you, 24/7.
                    </p>
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
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Capture More Leads?
            </h2>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed font-medium">
              Book a 15-minute discovery call and we&apos;ll show you exactly how LeadFlow can work for your business. No obligation, just insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
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

