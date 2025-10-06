"use client";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { pricing } from "@/config/pricing";
import { Button } from "@/components/ui/Button";
import { HelpCircle, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://intelllx.com/faq',
  },
};

const faqs = [
  // LeadFlow Chatbot FAQs
  {
    category: "LeadFlow Chatbot",
    questions: [
      {
        question: "What is LeadFlow Chatbot and how does it work?",
        answer: "LeadFlow is an AI-powered chatbot that engages website visitors 24/7, answers their questions, captures lead information, and books calls directly to your calendar. It uses conversation design tailored to your business and integrates with your CRM system to automatically manage leads."
      },
      {
        question: "How much does LeadFlow Chatbot cost?",
        answer: `Basic — ${pricing.products.chatbot.basic.priceDisplay} (template, up to 5 Q/As) or Pro — ${pricing.products.chatbot.pro.priceDisplay} (custom look & flows up to 15 Q/As with one integration). Monthly is optional: Basic Care — ${pricing.products.chatbot.basic.monthlyService.priceDisplay} (light maintenance, up to 5 Q/A updates per month). Pro Optimize — ${pricing.products.chatbot.pro.monthlyService.priceDisplay} (2 tuning cycles + A/B test slot per month; recommended for Pro).`
      },
      {
        question: "How long does it take to set up LeadFlow?",
        answer: "Setup typically takes 1-2 weeks from start to finish. This includes discovery calls, conversation design, knowledge ingestion, CRM integration, testing, and deployment. We work closely with you throughout the process to ensure everything meets your needs."
      },
      {
        question: "What CRM systems does LeadFlow integrate with?",
        answer: "LeadFlow integrates with HubSpot, Pipedrive, Salesforce, and Google Sheets. We can also work with custom CRM systems through API integration. If you don't have a CRM, we can set up Google Sheets as a simple lead management system."
      },
      {
        question: "Can LeadFlow book appointments automatically?",
        answer: "Yes! LeadFlow connects directly to your calendar (Calendly or Google Calendar) and can book appointments automatically. It sends confirmation emails and reminders to both you and your prospects, reducing no-shows and manual scheduling work."
      },
      {
        question: "How does LeadFlow learn about my business?",
        answer: "We train LeadFlow on your business information through knowledge ingestion. This includes your website content, FAQs, product information, pricing, and any other relevant documents. The chatbot uses this knowledge to answer questions accurately and in your brand voice."
      },
      {
        question: "What languages does LeadFlow support?",
        answer: "LeadFlow supports multiple languages and can communicate with visitors in their preferred language. We can set up the chatbot to detect the visitor's language automatically or allow them to choose their preferred language."
      },
      {
        question: "How do I know if LeadFlow is working effectively?",
        answer: "We provide weekly optimization reports showing lead capture rates, conversation quality, booking conversions, and areas for improvement. You'll also receive real-time notifications when leads are captured and can view all conversations in your CRM system."
      },
      {
        question: "Can I customize LeadFlow's responses?",
        answer: "Absolutely! We design custom conversation flows based on your business needs, including how to handle objections, qualify leads, and guide visitors toward booking calls. You can request changes to responses at any time, and we'll update them during our weekly optimization sessions."
      },
      {
        question: "What happens if LeadFlow doesn't know an answer?",
        answer: "When LeadFlow encounters a question it can't answer, it can either transfer the conversation to a human team member, collect the visitor's contact information for follow-up, or provide a helpful response directing them to the right resource. We design these fallback scenarios based on your preferences."
      }
    ]
  },
  // Website Development FAQs
  {
    category: "Website Development",
    questions: [
      {
        question: "What technologies do you use for website development?",
        answer: "We use Next.js 15, Tailwind CSS v4, and shadcn/ui for modern, fast, and responsive websites. This tech stack ensures excellent performance, SEO optimization, and mobile-first design. We also integrate LeadFlow Chatbot into every website we build."
      },
      {
        question: "How much does website development cost?",
        answer: `Website development: Launch ${pricing.products.website.launch.priceDisplay} (basic sites), Professional ${pricing.products.website.professional.priceDisplay} (growing businesses), Advanced ${pricing.products.website.advanced.priceDisplay} (complex e-commerce or custom applications). Pricing depends on the number of pages, features, integrations, and design complexity. We provide detailed quotes after understanding your specific needs.`
      },
      {
        question: "How long does it take to build a website?",
        answer: "Basic websites typically take 2-4 weeks, while more complex sites can take 6-12 weeks. Timeline depends on the scope of work, content preparation, and revision rounds. We provide a detailed timeline during the planning phase and keep you updated throughout the development process."
      },
      {
        question: "Do you provide website hosting?",
        answer: "We recommend Vercel for hosting due to its excellent performance and easy deployment with Next.js. We can help you set up hosting and manage the technical aspects, or you can choose your own hosting provider. We'll ensure the site is optimized for whichever platform you choose."
      },
      {
        question: "Will my website be mobile-friendly?",
        answer: "Yes! All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices. We test across different screen sizes and browsers to guarantee a consistent experience for all your visitors."
      },
      {
        question: "Do you handle SEO optimization?",
        answer: "Yes, we include basic SEO optimization in every website: proper meta tags, structured data, sitemap generation, and performance optimization. For advanced SEO strategies, we can recommend specialists or provide additional SEO services as needed."
      },
      {
        question: "Can I update my website content myself?",
        answer: "We can build your website with a content management system (CMS) if you want to update content yourself. Alternatively, we offer maintenance packages where we handle all content updates for you. We'll discuss the best approach based on your needs and technical comfort level."
      },
      {
        question: "What happens after my website is launched?",
        answer: "After launch, we provide 30 days of free support for any issues or minor adjustments. We also offer ongoing maintenance packages for updates, security monitoring, and performance optimization. Plus, we can integrate LeadFlow Chatbot to start capturing leads immediately."
      },
      {
        question: "Do you redesign existing websites?",
        answer: "Yes! We can redesign existing websites to improve their look, functionality, and performance. We can work with your current content and structure, or help you plan a complete overhaul. We'll assess your current site and provide recommendations for improvements."
      },
      {
        question: "Can you integrate with my existing business tools?",
        answer: "Absolutely! We can integrate your website with CRM systems, email marketing platforms, payment processors, analytics tools, and other business applications. We'll work with your existing tech stack to ensure seamless data flow and functionality."
      }
    ]
  },
  // General Business FAQs
  {
    category: "General",
    questions: [
      {
        question: "Do you work with businesses outside the US?",
        answer: "Yes, we work with businesses globally. Our services are delivered remotely, and we can accommodate different time zones and business practices. We've worked with clients in North America, Europe, and other regions."
      },
      {
        question: "What industries do you work with?",
        answer: "We work with businesses across various industries including professional services, e-commerce, real estate, healthcare, SaaS, and more. Our solutions are designed to be adaptable to different business models and customer needs."
      },
      {
        question: "How do you ensure data security and privacy?",
        answer: "We follow industry best practices for data security, including encryption, secure hosting, and compliance with privacy regulations. We only collect necessary information and provide data export/deletion options. All data handling is transparent and follows GDPR/CCPA guidelines."
      },
      {
        question: "What if I'm not satisfied with the results?",
        answer: "We're committed to your success and will work with you to address any concerns. If you're not satisfied with our work, we'll make reasonable efforts to fix issues or adjust the solution. We believe in building long-term relationships based on trust and results."
      },
      {
        question: "Do you offer ongoing support and maintenance?",
        answer: `Monthly is optional. Basic Care — ${pricing.products.chatbot.basic.monthlyService.priceDisplay} (light maintenance, up to 5 Q/A updates per month). Pro Optimize — ${pricing.products.chatbot.pro.monthlyService.priceDisplay} (2 tuning cycles + A/B test slot per month; recommended for Pro).`
      },
      {
        question: "Can I start basic and upgrade later?",
        answer: `Yes. Start Basic — ${pricing.products.chatbot.basic.priceDisplay}, upgrade to Pro — ${pricing.products.chatbot.pro.priceDisplay}, or add a monthly service anytime.`
      },
      {
        question: "How do I get started?",
        answer: "Simply contact us through our contact form or email hello@intelllx.com. We'll schedule a discovery call to understand your needs, discuss your goals, and provide a detailed proposal. No commitment required for the initial consultation."
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (itemKey: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
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
      <section className="relative container-max section-padding">
        <div className="text-center">
          {/* Eyebrow Label */}
          <div className="eyebrow-label mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[--accent]"></span>
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
            <span className="text-white">Got</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions?
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            Find answers to the most common questions about LeadFlow Chatbot and website development services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="relative section-padding">
        <div className="container-max">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemKey = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems[itemKey];
                  
                  return (
                    <div
                      key={itemKey}
                      className="card overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemKey)}
                        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors duration-200"
                      >
                        <h3 className="text-lg md:text-xl font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUpIcon className="w-6 h-6 text-blue-400" />
                          ) : (
                            <ChevronDownIcon className="w-6 h-6 text-blue-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding">
        <div className="container-max text-center">
          <div className="card p-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Still have <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">questions?</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed font-medium">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<HelpCircle className="w-5 h-5" />}
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