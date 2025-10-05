export const pricing = {
  // Main Products
  products: {
    chatbot: {
      basic: {
        name: "Chatbot · Basic",
        price: 500,
        priceDisplay: "from $500",
        features: [
          "Template setup, up to 5 Q/As",
          "1 website widget, basic analytics",
          "1 revision, 7-day fixes"
        ],
        stripeLink: "https://buy.stripe.com/14A9ATh1K9lp7bR3koaEE05",
        monthlyService: {
          name: "Basic Care",
          price: 99,
          priceDisplay: "$99/mo",
          description: "Light maintenance & 5 Q/A updates/mo",
          recommended: false
        }
      },
      pro: {
        name: "Chatbot · Pro",
        price: 1000,
        priceDisplay: "$1,000",
        features: [
          "Custom look & flows (up to 15 Q/As)",
          "1 integration (Calendly/Email/CRM)",
          "Lead export + event tracking",
          "2 revisions, 30-day optimization"
        ],
        stripeLink: "https://buy.stripe.com/aFacN5eTC7dh7bR2gkaEE06",
        monthlyService: {
          name: "Pro Optimize",
          price: 299,
          priceDisplay: "$299/mo",
          description: "2 tuning cycles + A/B slot/mo",
          recommended: true
        }
      }
    },
    website: {
      launch: {
        name: "Website · Launch",
        price: 500,
        priceDisplay: "from $500",
        features: [
          "1–3 pages (template)",
          "Mobile-responsive, fast load",
          "Basic SEO + analytics",
          "1 revision, 7-day fixes"
        ],
        stripeLink: "https://buy.stripe.com/9B65kDaDm4158fVbQUaEE07"
      },
      professional: {
        name: "Website · Professional/Business",
        price: 1000,
        priceDisplay: "from $1,000",
        features: [
          "4–6 pages (light customization)",
          "Brand-matched sections + micro-polish",
          "SEO basics, analytics events",
          "2 revisions, launch checklist"
        ],
        stripeLink: "https://buy.stripe.com/bJe5kD12Mbtx2VB3koaEE08"
      },
      advanced: {
        name: "Website · Advanced",
        price: 2500,
        priceDisplay: "from $2,500",
        features: [
          "7–12 pages or special features",
          "Custom sections + tasteful animations",
          "Integrations (CRM/forms/payments)",
          "Performance pass (Core Web Vitals)"
        ],
        stripeLink: "https://buy.stripe.com/bJe7sL6n61SXfIn2gkaEE09"
      }
    }
  },
  
  // Add-ons
  addOns: [
    {
      name: "+5 chatbot Q/As",
      price: 99,
      priceDisplay: "$99"
    },
    {
      name: "Extra page (template)",
      price: 150,
      priceDisplay: "$150"
    },
    {
      name: "Extra integration",
      price: 300,
      priceDisplay: "from $300"
    }
  ],
  
  // Payment tagline
  paymentTagline: "Payment: Simple, transparent pricing → invest and start building.",
  
  // CTA Labels
  ctaLabels: {
    getStarted: "Get Started",
    addMonthlyLater: "Add monthly service later",
    bookDiscovery: "Book Discovery Call",
    viewPricing: "View Pricing"
  }
} as const;

export type PricingConfig = typeof pricing;
