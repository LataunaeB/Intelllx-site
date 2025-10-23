// src/config/site.ts
import { pricing } from "./pricing";

export const site = {
  name: "Intelllx",
  email: "hello@intelllx.com",

  // Booking (Calendly)
  calendly: "https://calendly.com/lataunaeb-intelllx-discovery/30min",

  // Hero copy
  tagline: "Your 24/7 AI Sales Assistant",
  blurb:
    "Your intelligent, always-on sales team that captures leads, books calls, and nurtures prospects while you sleep. Never miss another opportunity.",

  // Header nav
  nav: [
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Resources" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],

  // Services
  services: [
    {
      title: "LeadFlow Chatbot",
      bullets: [
        "Speaks in your brand voice and answers questions 24/7",
        "Intelligently captures leads and sends them straight to your CRM",
        "Books discovery calls directly to your calendar with smart reminders",
        "Follows up with prospects automatically to keep them engaged",
        "Learns from every conversation to get better over time",
      ],
    },
    {
      title: "Website Development",
      bullets: [
        "Custom websites built with modern technologies",
        "Responsive design that works on all devices",
        "SEO optimization for better search rankings",
        "Fast loading speeds for better user experience",
        "Integration with LeadFlow Chatbot for lead generation",
      ],
    },
  ],

  // Pricing (Stripe)
  pricing: [
    {
      title: "LeadFlow Chatbot",
      blurb: "Everything you need to turn website visitors into paying customers with a personal touch that never sleeps",
      price: `Basic: ${pricing.products.chatbot.basic.priceDisplay} setup + ${pricing.products.chatbot.basic.monthlyService.priceDisplay} | Pro: ${pricing.products.chatbot.pro.priceDisplay} setup + ${pricing.products.chatbot.pro.monthlyService.priceDisplay}`,
      setup: {
        title: "Setup includes:",
        items: [
          "Conversation design",
          "Knowledge ingestion", 
          "Branding",
          "Embed",
          "Calendar/CRM integration",
          "Notifications",
          "QA"
        ]
      },
      monthly: {
        title: "Monthly hosting/maintenance:",
        items: [
          "Weekly optimization",
          "Monthly report",
          "Up to 7 hours support"
        ]
      },
      cta: {
        label: "Get the Chatbot",
        href: pricing.products.chatbot.pro.stripeLink,  
      },
    },
    {
      title: "Website Development",
      blurb: "Custom websites that convert visitors into customers with modern design and seamless functionality",
      price: `${pricing.products.website.launch.priceDisplay}`,
      setup: {
        title: "What's included:",
        items: [
          "Custom responsive design",
          "SEO optimization",
          "Fast loading speeds",
          "Mobile-first approach",
          "Contact forms",
          "Analytics setup",
          "2 weeks delivery"
        ]
      },
      monthly: {
        title: "Optional maintenance:",
        items: [
          "Monthly updates",
          "Security monitoring",
          "Performance optimization",
          "Content updates"
        ]
      },
      cta: {
        label: "Get Quote",
        href: "/contact",  
      },
    },
  ],

  // Footer
  footerLinks: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "mailto:hello@intelllx.com", label: "hello@intelllx.com" },
  ],
} as const;
