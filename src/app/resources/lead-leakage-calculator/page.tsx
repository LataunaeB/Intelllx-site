"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, TrendingUp, AlertTriangle, ArrowRight, DollarSign, Users, Target } from "lucide-react";
import type { Metadata } from "next";

export default function LeadLeakageCalculator() {
  const [inputs, setInputs] = useState({
    monthlyVisitors: '',
    avgDealValue: '',
    currentConversionRate: '',
    targetConversionRate: ''
  });

  const [results, setResults] = useState<{
    currentLeads: number;
    potentialLeads: number;
    missedLeads: number;
    monthlyRevenueLoss: number;
    annualRevenueLoss: number;
  } | null>(null);

  const calculateLeakage = (e: React.FormEvent) => {
    e.preventDefault();
    
    const visitors = parseFloat(inputs.monthlyVisitors) || 0;
    const dealValue = parseFloat(inputs.avgDealValue) || 0;
    const currentRate = parseFloat(inputs.currentConversionRate) || 0;
    const targetRate = parseFloat(inputs.targetConversionRate) || 0;

    const currentLeads = (visitors * currentRate) / 100;
    const potentialLeads = (visitors * targetRate) / 100;
    const missedLeads = potentialLeads - currentLeads;
    const monthlyRevenueLoss = missedLeads * dealValue;
    const annualRevenueLoss = monthlyRevenueLoss * 12;

    setResults({
      currentLeads: Math.round(currentLeads),
      potentialLeads: Math.round(potentialLeads),
      missedLeads: Math.round(missedLeads),
      monthlyRevenueLoss: Math.round(monthlyRevenueLoss),
      annualRevenueLoss: Math.round(annualRevenueLoss)
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

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
            <span>Interactive Tool</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            Lead Leakage Calculator
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-200 leading-relaxed font-medium mb-12">
            Discover how much revenue you're losing every month from website visitors who leave without converting. Most businesses are shocked by the results.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative section-padding pt-8 md:pt-12">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Calculate Your Leakage</h2>
              </div>

              <form onSubmit={calculateLeakage} className="space-y-6">
                <div>
                  <label htmlFor="monthlyVisitors" className="block text-sm font-semibold text-white mb-2">
                    Monthly Website Visitors
                  </label>
                  <input
                    type="number"
                    id="monthlyVisitors"
                    value={inputs.monthlyVisitors}
                    onChange={(e) => setInputs({ ...inputs, monthlyVisitors: e.target.value })}
                    placeholder="e.g., 5000"
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="avgDealValue" className="block text-sm font-semibold text-white mb-2">
                    Average Deal Value ($)
                  </label>
                  <input
                    type="number"
                    id="avgDealValue"
                    value={inputs.avgDealValue}
                    onChange={(e) => setInputs({ ...inputs, avgDealValue: e.target.value })}
                    placeholder="e.g., 1500"
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="currentConversionRate" className="block text-sm font-semibold text-white mb-2">
                    Current Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    id="currentConversionRate"
                    value={inputs.currentConversionRate}
                    onChange={(e) => setInputs({ ...inputs, currentConversionRate: e.target.value })}
                    placeholder="e.g., 2"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-xs text-gray-400 mt-2">Industry average: 2-5%</p>
                </div>

                <div>
                  <label htmlFor="targetConversionRate" className="block text-sm font-semibold text-white mb-2">
                    Target Conversion Rate (%)
                  </label>
                  <input
                    type="number"
                    id="targetConversionRate"
                    value={inputs.targetConversionRate}
                    onChange={(e) => setInputs({ ...inputs, targetConversionRate: e.target.value })}
                    placeholder="e.g., 5"
                    required
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-xs text-gray-400 mt-2">With AI chatbot: 5-10%</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate My Leakage
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {!results ? (
                <div className="card p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Your Results</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Fill out the calculator on the left to see how much revenue you&apos;re losing every month from missed leads.
                  </p>
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-200">
                      <strong>Tip:</strong> Most businesses are losing 40-60% of potential leads because their website doesn&apos;t capture visitors 24/7.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Alert - Revenue Loss */}
                  <div className="card p-8 bg-red-500/10 border-red-500/30">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <h3 className="text-xl font-bold text-red-200">Revenue Leakage Detected</h3>
                    </div>
                    <p className="text-4xl font-black text-white mb-2">
                      {formatCurrency(results.monthlyRevenueLoss)}
                      <span className="text-lg font-medium text-gray-300">/month</span>
                    </p>
                    <p className="text-red-200">
                      You&apos;re losing an estimated <strong>{formatCurrency(results.annualRevenueLoss)}</strong> per year in missed opportunities.
                    </p>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="card p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Detailed Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300 font-medium">Current Leads</span>
                        </div>
                        <span className="text-2xl font-bold text-white">{results.currentLeads}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-green-400" />
                          <span className="text-green-200 font-medium">Potential Leads</span>
                        </div>
                        <span className="text-2xl font-bold text-green-300">{results.potentialLeads}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-200 font-medium">Missed Leads</span>
                        </div>
                        <span className="text-2xl font-bold text-red-300">{results.missedLeads}</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-blue-400" />
                          <span className="text-blue-200 font-medium">Annual Loss</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-300">{formatCurrency(results.annualRevenueLoss)}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="card p-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30">
                    <h3 className="text-2xl font-bold text-white mb-4">Stop the Leakage</h3>
                    <p className="text-gray-200 mb-6 leading-relaxed">
                      Our AI chatbot captures leads 24/7, answers questions instantly, and books qualified calls automatically. Typical conversion rate improvement: <strong>2-5%</strong>.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                      Book a Discovery Call
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="relative section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <div className="card p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Why You&apos;re Losing Leads</h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Every day, potential customers visit your website looking for solutions. But here&apos;s the hard truth: <strong className="text-white">most of them leave without contacting you</strong>.
                </p>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-200 mb-3">The Silent Revenue Killer</h3>
                  <p>
                    Studies show that <strong>96-98% of website visitors never convert</strong> on their first visit. They have questions, concerns, or simply aren&apos;t ready to commit. Without a way to capture them, they disappear forever.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Common Reasons for Lead Leakage:</h3>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">No one available 24/7</strong> — Visitors come outside business hours and leave</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Slow response times</strong> — By the time you reply, they&apos;ve moved on to a competitor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Unanswered questions</strong> — Simple questions go unanswered, killing interest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">Friction in booking</strong> — Too many steps to schedule a call</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white">No follow-up system</strong> — Interested visitors slip through the cracks</span>
                  </li>
                </ul>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-bold text-green-200 mb-3">The Solution: AI-Powered Lead Capture</h3>
                  <p>
                    An AI chatbot like LeadFlow works 24/7 to answer questions instantly, qualify prospects, and book calls automatically. Businesses typically see <strong className="text-green-300">conversion improvements of 2-5%</strong> within the first month.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-white mt-10 mb-4">How LeadFlow Stops the Leakage</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/15 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">Instant Responses</h4>
                    <p className="text-sm text-gray-300">
                      Answers questions in seconds, not hours. No more waiting for email replies or office hours.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/15 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">24/7 Availability</h4>
                    <p className="text-sm text-gray-300">
                      Captures leads at 2 AM, on weekends, and during holidays. Never miss another opportunity.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/15 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">Automatic Qualification</h4>
                    <p className="text-sm text-gray-300">
                      Asks the right questions to identify serious buyers and route them to your calendar.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/15 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-blue-300 mb-3">Smart Follow-Up</h4>
                    <p className="text-sm text-gray-300">
                      Nurtures prospects who aren&apos;t ready yet, keeping your business top-of-mind.
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
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-10 md:p-14 border border-purple-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Plug the Leak?
            </h2>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed font-medium">
              Book a 15-minute call to see exactly how LeadFlow can capture the leads you&apos;re currently losing. No pressure, just insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900"
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

