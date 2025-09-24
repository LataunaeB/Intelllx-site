"use client";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Zap, Target } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "Goals, ICP, Calendar/CRM",
      description: "We start by understanding your business goals, ideal customer profile, and existing systems.",
      deliverables: [
        "Business goals & KPIs",
        "Target audience analysis", 
        "Current system audit",
        "Success metrics definition"
      ],
      timeline: "1-2 days",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      number: "02", 
      title: "Conversation Design",
      subtitle: "Happy Paths + Objection Handling",
      description: "We design custom conversation flows tailored to your industry and customer journey.",
      deliverables: [
        "Conversation flow mapping",
        "Objection handling scripts",
        "Qualification questions",
        "Booking flow optimization"
      ],
      timeline: "3-5 days",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    },
    {
      number: "03",
      title: "Integrations & Launch", 
      subtitle: "Widget Embed, Stripe/Call Booking",
      description: "We integrate your chatbot with your CRM, calendar, and payment systems, then deploy to your website.",
      deliverables: [
        "CRM integration setup",
        "Calendar booking configuration",
        "Payment processing setup",
        "Website widget deployment"
      ],
      timeline: "2-3 days",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      number: "04",
      title: "Optimize",
      subtitle: "Weekly Review, A/B Prompts", 
      description: "We continuously monitor performance and optimize based on real user interactions and feedback.",
      deliverables: [
        "Weekly performance reports",
        "A/B testing of prompts",
        "Conversion optimization",
        "Ongoing strategy refinement"
      ],
      timeline: "Ongoing",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    }
  ];

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
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Our Process</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">How We</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Work
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
            A proven 4-step process to get your AI sales assistant up and running
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={index} className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Step Content */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                    <p className="text-blue-300 font-semibold text-lg">{step.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-200 text-xl leading-relaxed mb-8 font-medium">
                  {step.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-xl font-bold text-white mb-4">Deliverables:</h4>
                  <ul className="space-y-3">
                    {step.deliverables.map((deliverable, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-lg">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <div className="eyebrow-label">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                    <span>Timeline: {step.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Step Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  <div className="card p-12">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-8">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                      <p className="text-gray-300 text-lg">{step.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Overview */}
        <div className="mt-16">
          <div className="card p-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">Complete Timeline</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-gray-300 text-sm">{step.timeline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card p-16 max-w-4xl mx-auto">
            <h3 className="text-4xl font-black text-white mb-6">Ready to Get Started?</h3>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed font-medium">
              Let&apos;s begin with a discovery call to understand your specific needs
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                icon={<Zap className="w-6 h-6" />}
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Target className="w-6 h-6" />}
                onClick={() => window.location.href = '/pricing'}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
