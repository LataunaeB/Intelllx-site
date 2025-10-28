export const pricing = {
  // Main Products
  products: {
    chatbot: {
      essential: {
        name: "Chatbot · Essential",
        price: 500,
        priceDisplay: "$500",
        features: [
          "Custom setup with up to 10 Q/As",
          "1 website widget + basic analytics",
          "Calendly or email integration",
          "Lead capture & export",
          "2 revisions + 30-day support"
        ],
        stripeLink: "https://buy.stripe.com/14A9ATh1K9lp7bR3koaEE05",
        monthlyService: {
          name: "Essential Care",
          price: 149,
          priceDisplay: "$149/mo",
          description: "Monthly optimization + 10 Q/A updates",
          recommended: false
        }
      },
      pro: {
        name: "Chatbot · Pro",
        price: 1000,
        priceDisplay: "$1,000",
        features: [
          "Custom look & flows (up to 25 Q/As)",
          "2 integrations (Calendly, CRM, Email)",
          "Advanced lead tracking & analytics",
          "3 revisions, 60-day optimization",
          "Priority support"
        ],
        stripeLink: "https://buy.stripe.com/aFacN5eTC7dh7bR2gkaEE06",
        monthlyService: {
          name: "Pro Optimize",
          price: 299,
          priceDisplay: "$299/mo",
          description: "Advanced optimization + unlimited Q/A updates",
          recommended: true
        }
      }
    },
    website: {
      launch: {
        name: "Website · Launch",
        price: 500,
        priceDisplay: "$500",
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
        priceDisplay: "$1,000",
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
        priceDisplay: "$2,500",
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
      priceDisplay: "$300"
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
