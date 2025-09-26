"use client";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Building2, ArrowRight } from "lucide-react";

export default function Industries() {
  const industries = [
    {
      title: "Professional Services",
      description: "Law firms, consulting, accounting, and other service-based businesses",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      color: "from-purple-500 to-pink-500",
      flows: [
        "Initial consultation booking",
        "Service qualification questions",
        "Case/project assessment",
        "Follow-up scheduling"
      ],
      benefits: [
        "Reduce no-shows by 60%",
        "Qualify leads before meetings",
        "24/7 availability for inquiries",
        "Automated follow-up sequences"
      ]
    },
    {
      title: "E-commerce",
      description: "Online stores, marketplaces, and retail businesses",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      color: "from-blue-500 to-indigo-500",
      flows: [
        "Product recommendations",
        "Cart abandonment recovery",
        "Size/fit assistance",
        "Order status inquiries"
      ],
      benefits: [
        "Increase conversion rates",
        "Reduce cart abandonment",
        "Provide instant support",
        "Upsell and cross-sell"
      ]
    },
    {
      title: "Real Estate",
      description: "Agents, brokers, and property management companies",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      color: "from-emerald-500 to-teal-500",
      flows: [
        "Property inquiry handling",
        "Viewing appointment booking",
        "Buyer qualification",
        "Market information requests"
      ],
      benefits: [
        "Capture leads 24/7",
        "Qualify serious buyers",
        "Schedule property viewings",
        "Provide market insights"
      ]
    },
    {
      title: "Healthcare",
      description: "Medical practices, clinics, and healthcare providers",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      color: "from-red-500 to-pink-500",
      flows: [
        "Appointment scheduling",
        "Insurance verification",
        "Symptom assessment",
        "Prescription refills"
      ],
      benefits: [
        "Reduce phone call volume",
        "Improve patient experience",
        "Streamline scheduling",
        "HIPAA-compliant handling"
      ]
    },
    {
      title: "SaaS",
      description: "Software companies, tech startups, and digital platforms",
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "from-cyan-500 to-blue-500",
      flows: [
        "Lead qualification",
        "Feature demonstrations",
        "Pricing inquiries",
        "Technical support"
      ],
      benefits: [
        "Qualify prospects",
        "Reduce sales cycle",
        "Provide instant demos",
        "Handle technical questions"
      ]
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
            <span>Industry Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Built for</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Industry
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium">
            Custom conversation flows designed for your specific industry and business needs
          </p>
        </div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => (
            <div key={index} className="card p-8 group">
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={industry.icon} />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {industry.title}
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed font-medium">
                {industry.description}
              </p>

              {/* Starter Flows */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Starter Flows:</h4>
                <ul className="space-y-3">
                  {industry.flows.map((flow, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{flow}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Key Benefits:</h4>
                <ul className="space-y-3">
                  {industry.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant="ghost"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => window.location.href = '/contact'}
                className="w-full"
              >
                Get Custom Quote
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="text-center">
          <div className="card p-16 max-w-4xl mx-auto">
            <h3 className="text-4xl font-black text-white mb-6">Don&apos;t See Your Industry?</h3>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed font-medium">
              We create custom solutions for any industry. Let&apos;s discuss your specific needs and design a chatbot that works perfectly for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                variant="primary"
                size="lg"
                icon={<Building2 className="w-6 h-6" />}
                onClick={() => window.location.href = '/contact'}
              >
                Discuss Custom Solution
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-6 h-6" />}
                onClick={() => window.location.href = '/process'}
              >
                View Our Process
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
