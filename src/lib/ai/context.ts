import { pricing } from '@/config/pricing';
import { site } from '@/config/site';
import { copy } from '@/config/copy';
import type { SupportedLanguage } from '@/lib/i18n/chat';

/**
 * Builds comprehensive business context for AI models
 * Contains all Intelllx information: pricing, services, features, process, etc.
 */
export function buildBusinessContext(): string {
  // CHATBOT PRICING
  const chatbotPricing = `
CHATBOT PRICING (LeadFlow):
- Essential: ${pricing.products.chatbot.essential.priceDisplay} one-time setup + ${pricing.products.chatbot.essential.monthlyService.priceDisplay}/month (optional monthly service)
  Features: Custom setup with up to 10 Q/As, 1 website widget + basic analytics, Calendly or email integration, lead capture & export, 2 revisions + 30-day support
  
- Pro: ${pricing.products.chatbot.pro.priceDisplay} one-time setup + ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/month (recommended monthly service)
  Features: Custom look & flows (up to 25 Q/As), 2 integrations (Calendly, CRM, Email), advanced lead tracking & analytics, 3 revisions + 60-day optimization, priority support
`;

  // WEBSITE PRICING
  const websitePricing = `
WEBSITE DEVELOPMENT PRICING:
- Launch: ${pricing.products.website.launch.priceDisplay} (1–3 pages template, mobile-responsive, fast load, basic SEO + analytics, 1 revision, 7-day fixes)
- Professional/Business: ${pricing.products.website.professional.priceDisplay} (4–6 pages with light customization, brand-matched sections, SEO basics, analytics events, 2 revisions, launch checklist)
- Advanced: ${pricing.products.website.advanced.priceDisplay} (7–12 pages or special features, custom sections + animations, integrations CRM/forms/payments, performance pass Core Web Vitals)
`;

  // ADD-ONS
  const addOns = `
ADD-ONS:
- +5 chatbot Q/As: ${pricing.addOns[0].priceDisplay}
- Extra page (template): ${pricing.addOns[1].priceDisplay}
- Extra integration: ${pricing.addOns[2].priceDisplay}
`;

  // BRAND & POSITIONING
  const brandInfo = `
BRAND: ${site.name}
Tagline: ${site.tagline}
Brand Tagline: ${copy.brandTagline}
Blurb: ${site.blurb}
Email: ${site.email}
Calendly: ${site.calendly}
`;

  // SERVICES DETAIL
  const services = `
SERVICES OFFERED:

1. LeadFlow Custom AI Chatbot:
   - Custom conversation flows tailored to your business
   - Professional setup and deployment included
   - ROI-focused design for maximum conversion
   - Modern, branded interface with custom styling
   - Real AI understanding with contextual responses
   - Weekly optimization with performance insights
   - Speaks in your brand voice and answers questions 24/7
   - Intelligently captures leads and sends them straight to your CRM
   - Books discovery calls directly to your calendar with smart reminders
   - Follows up with prospects automatically to keep them engaged
   - Learns from every conversation to get better over time

2. Website Development:
   - Custom websites built with modern technologies (Next.js, Tailwind, shadcn/ui)
   - Responsive design that works on all devices
   - SEO optimization for better search rankings
   - Fast loading speeds for better user experience
   - Integration with LeadFlow Chatbot for lead generation
   - Lighthouse-friendly images and code-splitting
   - SEO basics done right: sitemap, robots, metadata
   - Mobile-first responsive design
   - Performance monitoring and analytics
`;

  // HOW IT WORKS / PROCESS
  const process = `
HOW IT WORKS (3 Steps):
1. Conversation Design: We design custom conversation flows tailored to your industry, including happy paths and objection handling
2. CRM + Calendar Integration: Connect your CRM (HubSpot, Pipedrive, Salesforce) and calendar (Calendly, Google) for seamless lead management
3. Launch & Optimize: Deploy your chatbot and receive weekly optimization reports to continuously improve performance

SETUP PROCESS (4 Steps):
1. Discovery (1-2 days): Goals, ICP, Calendar/CRM audit
2. Conversation Design (3-5 days): Happy Paths + Objection Handling
3. Integrations & Launch (2-3 days): Widget Embed, Stripe/Call Booking
4. Optimize (Ongoing): Weekly Review, A/B Prompts

SETUP TIMELINE: Chatbot setup takes 1-2 weeks from start to finish. Website development: Basic 2-4 weeks, complex 6-12 weeks.
`;

  // FEATURES & CAPABILITIES
  const features = `
KEY FEATURES:
- 24/7 availability and lead capture
- Automatic lead qualification
- Appointment booking (Calendly, Google Calendar)
- CRM integration (HubSpot, Salesforce, Pipedrive, Google Sheets)
- Multi-language support
- Conversation analytics and reporting
- Custom conversation flows
- Professional setup included
- Weekly optimization reports
- Real AI with contextual understanding
- Email integration
- Zapier support
`;

  // INTEGRATIONS
  const integrations = `
INTEGRATIONS SUPPORTED:
CRM: HubSpot, Salesforce, Pipedrive, Google Sheets, Mailchimp
Calendar: Calendly, Google Calendar, Outlook
Other: Zapier, Email, Custom APIs
`;

  // ROI & RESULTS
  const roi = `
ROI & RESULTS:
- Most clients see ROI within 30 days
- Typical results: 3-5x more qualified leads
- 25-40% increase in conversions
- 40-60% reduction in missed opportunities
- The ${pricing.products.chatbot.pro.monthlyService.priceDisplay}/month pays for itself with just 1-2 additional customers
`;

  // TECHNOLOGIES
  const technologies = `
TECHNOLOGIES USED FOR WEBSITES:
- Next.js 15
- Tailwind CSS v4
- shadcn/ui
- Lighthouse-optimized
- Mobile-first responsive
`;

  // SUPPORT & MAINTENANCE
  const support = `
SUPPORT & MAINTENANCE:
- 7 hours of expert support per month (included in monthly plans)
- Weekly optimization sessions
- Monthly performance reports
- All maintenance, optimization, and updates handled
- Available via email, phone, or video call
- 30-day support included with setup
`;

  // INDUSTRIES
  const industries = `
INDUSTRIES WE SERVE:
LeadFlow works for ANY business: e-commerce, SaaS, real estate, healthcare, legal, fitness, restaurants, professional services, and more. Each chatbot is customized to your specific industry and business needs.
`;

  // CTA
  const cta = `
PRIMARY CTA: Book a discovery call → ${site.calendly}
Contact Email: ${site.email}
Website: intelllx.com
`;

  // GUARDRAILS
  const guardrails = `
CRITICAL INSTRUCTIONS:
- ALWAYS answer questions about Intelllx using ONLY the information provided in this context
- When asked about pricing (chatbot, website, cost, how much), IMMEDIATELY provide the exact pricing from above
- Be specific: mention both setup costs and monthly fees when relevant
- When asked "website pricing" or "website cost", provide the website development pricing (Launch $500, Professional $1,000, Advanced $2,500)
- When asked "chatbot pricing" or "chatbot cost", provide the LeadFlow chatbot pricing (Essential $500, Pro $1,000)
- If asked about both, provide pricing for both services
- Only answer using this context. If unknown or not in context, say: "I don't have that info yet. Would you like to book a quick discovery call?" and include the CTA link
- Do not invent prices, features, or information
- Be concise (2-4 sentences), professional, and on-brand
- Always mention ROI within 30 days when discussing pricing
- Use Intelllx brand voice: helpful, professional, ROI-focused
`;

  return [
    brandInfo.trim(),
    chatbotPricing.trim(),
    websitePricing.trim(),
    addOns.trim(),
    services.trim(),
    process.trim(),
    features.trim(),
    integrations.trim(),
    roi.trim(),
    technologies.trim(),
    support.trim(),
    industries.trim(),
    cta.trim(),
    guardrails.trim()
  ].join('\n\n');
}

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  pt: 'Portuguese',
  it: 'Italian'
};

/**
 * Builds the system prompt for AI models
 */
export function buildSystemPrompt(language: SupportedLanguage = 'en'): string {
  const languageRule =
    language !== 'en'
      ? `\nADDITIONAL RULE:\n- Respond entirely in ${LANGUAGE_NAMES[language]} (mirror the user's language) while keeping the tone professional, helpful, and on-brand.`
      : '';

  return `You are LeadFlow, the AI assistant for ${site.name} (Intelllx). 

CRITICAL RULES:
1. When users ask about pricing (chatbot, website, cost, "how much"), you MUST provide the exact pricing from the business context immediately
2. "Website pricing" means website development pricing (Launch $500, Professional $1,000, Advanced $2,500)
3. "Chatbot pricing" means LeadFlow chatbot pricing (Essential $500 setup + $149/mo, Pro $1,000 setup + $299/mo)
4. If asked generally about "pricing", mention both chatbot and website options
5. Do not give generic responses - always include specific setup costs and monthly fees when relevant
6. Only use information from the provided business context
7. Be concise (2-4 sentences), professional, helpful, and ROI-focused
8. Always offer to book a discovery call at the end when relevant${languageRule}

Use the provided business context to answer questions about Intelllx's services, pricing, features, ROI, process, integrations, setup, and booking.`;
}

