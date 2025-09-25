"use client";

import { useState, useEffect, useRef } from 'react';
import { site } from '@/config/site';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Minimize2, Maximize2, Bot, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function LeadFlowChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome—I'm the INTELLLX assistant for LeadFlow Chatbots & Web Development. Ask about pricing, features, or how it works.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load voices when component mounts
  useEffect(() => {
    // Load voices immediately
    if (window.speechSynthesis.getVoices().length === 0) {
      // Some browsers need this event to load voices
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      
      if ('onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Trigger voice loading
      loadVoices();
    }
  }, []);


  // Function to detect language with improved accuracy
  const detectLanguage = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Check for specific Spanish words and patterns
    const spanishWords = ['hola', 'gracias', 'por favor', 'que', 'como', 'donde', 'cuando', 'porque', 'si', 'no', 'muy', 'bien', 'mal', 'bueno', 'malo', 'grande', 'pequeño', 'nuevo', 'viejo', 'buenos', 'dias', 'tardes', 'noches', 'adios', 'hasta', 'luego', 'mucho', 'poco', 'todo', 'nada', 'algo', 'alguien', 'nadie', 'siempre', 'nunca', 'aqui', 'alli', 'donde', 'cuando', 'como', 'porque', 'para', 'con', 'sin', 'sobre', 'bajo', 'entre', 'durante', 'despues', 'antes', 'ahora', 'entonces', 'tambien', 'tampoco', 'pero', 'aunque', 'porque', 'si', 'cuando', 'mientras', 'hasta', 'desde', 'hacia', 'sobre', 'bajo', 'entre', 'durante', 'despues', 'antes', 'ahora', 'entonces', 'tambien', 'tampoco', 'pero', 'aunque', 'porque', 'si', 'cuando', 'mientras', 'hasta', 'desde', 'hacia'];
    const spanishPattern = /[ñáéíóúü]/i;
    
    // Check for French words and patterns
    const frenchWords = ['bonjour', 'merci', 's\'il vous plaît', 'oui', 'non', 'bon', 'mauvais', 'grand', 'petit', 'nouveau', 'vieux', 'très', 'bien', 'mal', 'toujours', 'jamais', 'ici', 'là', 'où', 'quand', 'comment', 'pourquoi', 'pour', 'avec', 'sans', 'sur', 'sous', 'entre', 'pendant', 'après', 'avant', 'maintenant', 'alors', 'aussi', 'non plus', 'mais', 'bien que', 'parce que', 'si', 'quand', 'pendant que', 'jusqu\'à', 'depuis', 'vers'];
    const frenchPattern = /[àâäéèêëïîôöùûüÿç]/i;
    
    // Check for German words and patterns
    const germanWords = ['hallo', 'danke', 'bitte', 'ja', 'nein', 'gut', 'schlecht', 'groß', 'klein', 'neu', 'alt', 'sehr', 'immer', 'nie', 'hier', 'dort', 'wo', 'wann', 'wie', 'warum', 'für', 'mit', 'ohne', 'über', 'unter', 'zwischen', 'während', 'nach', 'vor', 'jetzt', 'dann', 'auch', 'auch nicht', 'aber', 'obwohl', 'weil', 'wenn', 'während', 'bis', 'seit', 'zu'];
    const germanPattern = /[äöüß]/i;
    
    // Check for Italian words and patterns
    const italianWords = ['ciao', 'grazie', 'per favore', 'sì', 'no', 'buono', 'cattivo', 'grande', 'piccolo', 'nuovo', 'vecchio', 'molto', 'bene', 'male', 'sempre', 'mai', 'qui', 'lì', 'dove', 'quando', 'come', 'perché', 'per', 'con', 'senza', 'sopra', 'sotto', 'tra', 'durante', 'dopo', 'prima', 'ora', 'allora', 'anche', 'neanche', 'ma', 'anche se', 'perché', 'se', 'quando', 'mentre', 'fino a', 'da', 'verso'];
    const italianPattern = /[àèéìíîòóù]/i;
    
    // Check for Portuguese words and patterns
    const portugueseWords = ['olá', 'obrigado', 'por favor', 'sim', 'não', 'bom', 'ruim', 'grande', 'pequeno', 'novo', 'velho', 'muito', 'bem', 'mal', 'sempre', 'nunca', 'aqui', 'ali', 'onde', 'quando', 'como', 'porque', 'para', 'com', 'sem', 'sobre', 'sob', 'entre', 'durante', 'depois', 'antes', 'agora', 'então', 'também', 'tampouco', 'mas', 'embora', 'porque', 'se', 'quando', 'enquanto', 'até', 'desde', 'para'];
    const portuguesePattern = /[ãõç]/i;
    
    // Check for Chinese characters
    const chinesePattern = /[\u4e00-\u9fff]/;
    
    // Check for Arabic characters
    const arabicPattern = /[\u0600-\u06ff]/;
    
    // Check for Cyrillic characters (Russian)
    const cyrillicPattern = /[\u0400-\u04ff]/;
    
    // Check for Japanese characters
    const japanesePattern = /[\u3040-\u309f\u30a0-\u30ff]/;
    
    // Check for Korean characters
    const koreanPattern = /[\uac00-\ud7af]/;
    
    // Check for specific language patterns
    if (chinesePattern.test(text)) return 'zh';
    if (arabicPattern.test(text)) return 'ar';
    if (cyrillicPattern.test(text)) return 'ru';
    if (japanesePattern.test(text)) return 'ja';
    if (koreanPattern.test(text)) return 'ko';
    
    // Check for Spanish
    if (spanishPattern.test(text) || spanishWords.some(word => lowerText.includes(word))) return 'es';
    
    // Check for French
    if (frenchPattern.test(text) || frenchWords.some(word => lowerText.includes(word))) return 'fr';
    
    // Check for German
    if (germanPattern.test(text) || germanWords.some(word => lowerText.includes(word))) return 'de';
    
    // Check for Italian
    if (italianPattern.test(text) || italianWords.some(word => lowerText.includes(word))) return 'it';
    
    // Check for Portuguese
    if (portuguesePattern.test(text) || portugueseWords.some(word => lowerText.includes(word))) return 'pt';
    
    return 'en'; // Default to English
  };

  // Function to translate text using a simple translation service
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (targetLang === 'en') return text;
    
    try {
      // Using a free translation API (you can replace with Google Translate API or other services)
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        return data.responseData.translatedText;
      }
    } catch (error) {
      console.log('Translation failed, using original text:', error);
    }
    
    return text; // Fallback to original text
  };

  const faqResponses: { [key: string]: string } = {
    // Pricing - Concise and clear
    'price': 'LeadFlow Chatbot is $1,500 setup + $400/month. Setup includes custom conversation design, knowledge training, branding, and CRM integration. Monthly covers optimization, reports, and 7 hours support. Most clients see ROI within 30 days!',
    'cost': 'Our pricing is $1,500 setup + $400/month. The setup covers everything needed to get started, and monthly includes ongoing optimization and support. Most businesses see 3-5x more qualified leads, so the $400/month pays for itself with just 1-2 additional customers.',
    'pricing': 'LeadFlow Chatbot costs $1,500 setup + $400/month. Setup includes custom design, knowledge training, branding, and integrations. Monthly covers optimization, reporting, and support. Most clients see ROI within 30 days.',
    'expensive': 'I understand cost concerns! Our $1,500 setup + $400/month typically pays for itself within 30 days. Most clients see 3-5x more qualified leads, so just 1-2 additional customers per month covers the cost. It\'s like having a sales team member for a fraction of the cost.',
    'cheap': 'You\'re right - it\'s very affordable! For $1,500 setup + $400/month, you get a complete 24/7 lead generation system. Compare that to hiring a salesperson ($3,000-5,000/month) or missing leads. Most clients see ROI within 30 days.',
    'budget': 'Our $1,500 setup + $400/month is a fraction of what most businesses spend on lead generation. Most clients see 3-5x more qualified leads, so the $400/month pays for itself with just 1-2 additional customers.',
    
    // Website Development Pricing
    'website price': 'Website development starts at $2,000 for a Starter package (5-7 pages, responsive design, SEO). Professional websites are $4,500 (10-15 pages, advanced features). Enterprise websites start at $8,000+ (unlimited pages, custom functionality). All include modern design, mobile optimization, and fast loading.',
    'website cost': 'Website development pricing: Starter $2,000 (5-7 pages), Professional $4,500 (10-15 pages), Enterprise $8,000+ (unlimited pages). All include responsive design, SEO optimization, fast loading, and mobile-first approach.',
    'website pricing': 'We offer 3 website packages: Starter ($2,000) - 5-7 pages, Professional ($4,500) - 10-15 pages, Enterprise ($8,000+) - unlimited pages. All include responsive design, SEO, fast loading, and modern technologies.',
    'website budget': 'Website development starts at $2,000 for a complete Starter website. Professional websites are $4,500 with advanced features. Enterprise websites start at $8,000+ for complex needs. All include responsive design, SEO, and fast loading.',
    'website expensive': 'Our website pricing is very competitive! Starter websites start at $2,000 (complete with 5-7 pages, responsive design, SEO). Compare to agencies charging $5,000-15,000+ for similar work. We deliver professional results at a fraction of the cost.',
    'website cheap': 'You\'re right - our website pricing is very affordable! Starter websites start at $2,000 with everything included. Professional websites are $4,500 with advanced features. We use modern technologies and deliver professional results at competitive prices.',
    
    // What it is - Concise and clear
    'what': 'LeadFlow Chatbot is your 24/7 AI sales assistant. It answers customer questions, captures leads (name, email, phone) to your CRM, and books appointments to your calendar. Like having a salesperson who never sleeps!',
    'service': 'LeadFlow Chatbot is your 24/7 AI sales assistant. It answers customer questions, captures leads (name, email, phone) to your CRM, and books appointments to your calendar. Like having a salesperson who never sleeps!',
    'product': 'LeadFlow Chatbot is your 24/7 AI sales assistant. It answers customer questions, captures leads (name, email, phone) to your CRM, and books appointments to your calendar. Like having a salesperson who never sleeps!',
    
    // Website Development - What it is
    'website': 'We build custom websites using modern technologies like Next.js, React, and Tailwind CSS. Our websites are fast, mobile-responsive, SEO-optimized, and designed to convert visitors into customers. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'website development': 'We build custom websites using modern technologies like Next.js, React, and Tailwind CSS. Our websites are fast, mobile-responsive, SEO-optimized, and designed to convert visitors into customers. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'web development': 'We build custom websites using modern technologies like Next.js, React, and Tailwind CSS. Our websites are fast, mobile-responsive, SEO-optimized, and designed to convert visitors into customers. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'website design': 'We create beautiful, modern website designs that are mobile-responsive and optimized for conversions. Our designs are custom-built for your brand and business goals. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'custom website': 'We build custom websites tailored to your business needs. Our websites are fast, mobile-responsive, SEO-optimized, and designed to convert visitors into customers. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'new website': 'We can build you a brand new website from scratch! Our websites are modern, fast, mobile-responsive, and SEO-optimized. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    'website redesign': 'We can redesign your existing website to make it modern, fast, and mobile-responsive. Our redesigns improve user experience, SEO, and conversions. We offer 3 packages: Starter ($2,000), Professional ($4,500), and Enterprise ($8,000+).',
    
    // How it works - Concise and clear
    'how': 'Here\'s how it works: We learn about your business and create custom conversation flows. When visitors come to your website, our chatbot greets them, answers questions, qualifies interest, captures contact info, and books appointments. Like having a sales expert who never sleeps!',
    'works': 'Here\'s how it works: We learn about your business and create custom conversation flows. When visitors come to your website, our chatbot greets them, answers questions, qualifies interest, captures contact info, and books appointments. Like having a sales expert who never sleeps!',
    'process': 'Here\'s how it works: We learn about your business and create custom conversation flows. When visitors come to your website, our chatbot greets them, answers questions, qualifies interest, captures contact info, and books appointments. Like having a sales expert who never sleeps!',
    'step': 'Here\'s how it works: We learn about your business and create custom conversation flows. When visitors come to your website, our chatbot greets them, answers questions, qualifies interest, captures contact info, and books appointments. Like having a sales expert who never sleeps!',
    
    // Features - Concise and clear
    'features': 'Key features: 24/7 FAQ responses, intelligent lead capture to CRM, calendar booking integration, brand voice customization, weekly optimization, monthly reports, multi-language support, and 50+ tool integrations.',
    'capabilities': 'Key features: 24/7 FAQ responses, intelligent lead capture to CRM, calendar booking integration, brand voice customization, weekly optimization, monthly reports, multi-language support, and 50+ tool integrations.',
    'include': 'Key features: 24/7 FAQ responses, intelligent lead capture to CRM, calendar booking integration, brand voice customization, weekly optimization, monthly reports, multi-language support, and 50+ tool integrations.',
    'offer': 'Key features: 24/7 FAQ responses, intelligent lead capture to CRM, calendar booking integration, brand voice customization, weekly optimization, monthly reports, multi-language support, and 50+ tool integrations.',
    
    // Lead conversion - Honest and specific
    'leads': 'Here\'s how LeadFlow turns leads into customers: 1) Qualifies visitors with targeted questions, 2) Captures contact info automatically, 3) Books qualified prospects to your calendar, 4) Sends automated follow-ups, 5) Nurtures leads until they\'re ready to buy. Our goal is to help you see 3-5x more qualified leads within 30 days.',
    'convert': 'Here\'s how LeadFlow turns leads into customers: 1) Qualifies visitors with targeted questions, 2) Captures contact info automatically, 3) Books qualified prospects to your calendar, 4) Sends automated follow-ups, 5) Nurtures leads until they\'re ready to buy. Our goal is to help you see 3-5x more qualified leads within 30 days.',
    'customers': 'Here\'s how LeadFlow turns leads into customers: 1) Qualifies visitors with targeted questions, 2) Captures contact info automatically, 3) Books qualified prospects to your calendar, 4) Sends automated follow-ups, 5) Nurtures leads until they\'re ready to buy. Our goal is to help you see 3-5x more qualified leads within 30 days.',
    'conversion': 'Here\'s how LeadFlow turns leads into customers: 1) Qualifies visitors with targeted questions, 2) Captures contact info automatically, 3) Books qualified prospects to your calendar, 4) Sends automated follow-ups, 5) Nurtures leads until they\'re ready to buy. Our goal is to help you see 3-5x more qualified leads within 30 days.',
    
    // Business types - Honest and clear
    'business': 'LeadFlow is designed to work for ANY business type: E-commerce (capture abandoned carts), Service businesses (book consultations), SaaS (qualify trials), Real estate (capture inquiries), Healthcare (schedule appointments), Legal (book consultations), Fitness (sign up members), Restaurants (take reservations), and more. We customize each chatbot to your specific industry needs.',
    'ecommerce': 'E-commerce businesses can use LeadFlow to: Capture abandoned cart visitors, answer product questions 24/7, qualify customers, book consultations, and recover lost sales. The chatbot is designed to help increase conversions.',
    'service business': 'Service businesses can use LeadFlow to: Qualify prospects, book consultations automatically, answer questions, capture leads, and nurture prospects. The chatbot is designed to help generate more qualified leads.',
    'saas': 'SaaS companies can use LeadFlow to: Qualify trial users, answer technical questions, book consultations, capture enterprise leads, and guide onboarding. The chatbot is designed to help improve trial-to-paid conversions.',
    'real estate': 'Real estate agents can use LeadFlow to: Capture property inquiries 24/7, qualify buyers/sellers, book showings, answer market questions, and nurture leads. The chatbot is designed to help generate more qualified leads.',
    'healthcare': 'Healthcare practices can use LeadFlow to: Schedule appointments 24/7, answer medical questions, capture patient inquiries, qualify insurance, and reduce no-shows. The chatbot is designed to help increase appointments.',
    'legal': 'Law firms can use LeadFlow to: Qualify potential clients, book consultations, answer legal questions, capture case inquiries, and nurture leads. The chatbot is designed to help generate more qualified consultations.',
    'fitness': 'Fitness businesses can use LeadFlow to: Sign up members, book training sessions, answer class questions, capture leads, and nurture prospects. The chatbot is designed to help increase memberships.',
    'restaurant': 'Restaurants can use LeadFlow to: Take reservations 24/7, answer menu questions, capture catering inquiries, book events, and reduce phone calls. The chatbot is designed to help increase reservations.',
    
    // Benefits - Honest and clear
    'benefits': 'Key benefits: Never miss a lead (24/7), Qualifies prospects automatically, Captures contact info instantly, Books appointments without human intervention, Reduces team workload, Provides consistent experience, Tracks all conversations, Integrates with existing tools.',
    'why': 'Why choose LeadFlow: We\'re lead generation experts, not just another chatbot. We handle everything: setup, optimization, maintenance, and reporting. Our goal is to help you see ROI within 30 days.',
    'roi': 'Our goal is to help you see ROI within 30 days. Typical expected results: 3-5x more qualified leads, 25-40% increase in conversions, 40-60% reduction in missed opportunities, 2-3x more appointments booked. The $400/month is designed to pay for itself with just 1-2 additional customers.',
    
    // Technical - Concise and clear
    'integrate': 'LeadFlow integrates with: Calendly, Acuity, Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, Mailchimp, Zapier, and most CRM systems. We handle all technical setup.',
    'setup': 'Setup takes 1-2 weeks: We learn your business, create conversation flows, customize to your brand voice, integrate with calendar/CRM, test and optimize. We handle everything - you just approve.',
    'maintenance': 'We handle all maintenance: Weekly optimization, monthly reports, 7 hours support per month, regular updates, and 24/7 monitoring. You focus on your business.',
    
    // Booking - Concise
    'book': 'Great! I can help you book a discovery call. Let me get your information first.',
    'call': 'Great! I can help you book a discovery call. Let me get your information first.',
    'demo': 'I\'d love to tell you more about LeadFlow! Let me get your information to connect you with our team.',
    'schedule': 'Perfect! Let me get your information to schedule a discovery call.',
    
    // Help - Concise
    'help': 'I\'m here to help! Ask me about: Pricing, How it works, Lead conversion, Business types, Benefits, ROI, Integration, Setup process, or book a discovery call.',
    'questions': 'I\'m here to help! Ask me about: Pricing, How it works, Lead conversion, Business types, Benefits, ROI, Integration, Setup process, or book a discovery call.',
    
    // Common concerns and objections - Concise
    'scam': 'I understand your concern! LeadFlow is a legitimate, proven service. We\'re transparent about pricing ($1,500 setup + $400/month), provide detailed contracts, and have real clients who can vouch for our results. We deliver what we promise - a working chatbot that generates leads.',
    'trust': 'I understand your concern! LeadFlow is a legitimate, proven service. We\'re transparent about pricing ($1,500 setup + $400/month), provide detailed contracts, and have real clients who can vouch for our results. We deliver what we promise - a working chatbot that generates leads.',
    'legitimate': 'I understand your concern! LeadFlow is a legitimate, proven service. We\'re transparent about pricing ($1,500 setup + $400/month), provide detailed contracts, and have real clients who can vouch for our results. We deliver what we promise - a working chatbot that generates leads.',
    'testimonials': 'We focus on delivering results rather than collecting testimonials. Our goal is to help you see ROI through our custom AI solutions and professional setup.',
    'references': 'We focus on delivering results rather than collecting testimonials. Our goal is to help you see ROI through our custom AI solutions and professional setup.',
    
    // Technical questions - Concise
    'technical': 'We handle all technical aspects for you. Our team integrates the chatbot with your website, sets up calendar/CRM connections, configures notifications, and ensures everything works perfectly. You don\'t need any technical knowledge - we take care of everything!',
    'difficult': 'Not at all! We make it incredibly easy. Our team handles all technical setup, integration, and configuration. You just provide business information and preferences, and we do the rest. Most clients are amazed at how simple it is.',
    'easy': 'Absolutely! We make it incredibly easy. Our team handles all technical setup, integration, and configuration. You just provide business information and preferences, and we do the rest. Most clients are amazed at how simple it is.',
    'complicated': 'Not at all! We make it incredibly easy. Our team handles all technical setup, integration, and configuration. You just provide business information and preferences, and we do the rest. Most clients are amazed at how simple it is.',
    'time': 'Setup takes 1-2 weeks, and we handle everything. You just provide business information and preferences, and we do all the technical work. After that, it runs automatically 24/7. Most clients spend less than 2 hours total on setup.',
    'long': 'Setup takes 1-2 weeks, and we handle everything. You just provide business information and preferences, and we do all the technical work. After that, it runs automatically 24/7. Most clients spend less than 2 hours total on setup.',
    'quick': 'Setup takes 1-2 weeks, and we handle everything. You just provide business information and preferences, and we do all the technical work. After that, it runs automatically 24/7. Most clients spend less than 2 hours total on setup.',
    
    // Results and expectations - Honest
    'results': 'Our goal is to help you see 3-5x more qualified leads within 30 days, 25-40% increase in conversions, and 40-60% reduction in missed opportunities. The chatbot works 24/7 and gets smarter over time. We aim to help you see ROI within 30 days!',
    'expect': 'Our goal is to help you see 3-5x more qualified leads within 30 days, 25-40% increase in conversions, and 40-60% reduction in missed opportunities. The chatbot works 24/7 and gets smarter over time. We aim to help you see ROI within 30 days!',
    'guarantee': 'Our goal is to help you see 3-5x more qualified leads within 30 days, 25-40% increase in conversions, and 40-60% reduction in missed opportunities. The chatbot works 24/7 and gets smarter over time. We aim to help you see ROI within 30 days!',
    'success': 'Our goal is to help you see 3-5x more qualified leads within 30 days, 25-40% increase in conversions, and 40-60% reduction in missed opportunities. The chatbot works 24/7 and gets smarter over time. We aim to help you see ROI within 30 days!',
    
    // Support and maintenance - Honest
    'support': 'We provide excellent support! You get 7 hours of expert support per month, plus we handle all maintenance, optimization, and updates. We\'re available via email, phone, or video call. Our goal is to make our support one of the best parts of working with us.',
    'maintenance details': 'We handle all maintenance: Weekly optimization based on conversations, monthly performance reports, regular updates, and 24/7 monitoring. You focus on your business while we optimize your chatbot. Plus, you get 7 hours of expert support per month.',
    'updates': 'We handle all updates and improvements: Weekly optimization based on conversations, monthly performance reports, regular updates, and 24/7 monitoring. You focus on your business while we optimize your chatbot. Plus, you get 7 hours of expert support per month.',
    
    // Industry-specific questions - Honest
    'industry': 'LeadFlow is designed to work for ANY industry! We can help e-commerce stores, service businesses, SaaS companies, real estate agents, healthcare practices, law firms, fitness businesses, restaurants, and more. Each chatbot is customized to your specific industry and business needs.',
    'niche': 'LeadFlow is designed to work for ANY industry! We can help e-commerce stores, service businesses, SaaS companies, real estate agents, healthcare practices, law firms, fitness businesses, restaurants, and more. Each chatbot is customized to your specific industry and business needs.',
    'specific': 'LeadFlow is designed to work for ANY industry! We can help e-commerce stores, service businesses, SaaS companies, real estate agents, healthcare practices, law firms, fitness businesses, restaurants, and more. Each chatbot is customized to your specific industry and business needs.',
    
    // Comparison questions - Honest
    'better': 'LeadFlow is different because we\'re lead generation experts, not just another chatbot. Our chatbots are designed specifically to turn website visitors into paying customers. We handle everything: setup, optimization, maintenance, and reporting. Our goal is to help you see ROI within 30 days.',
    'different': 'LeadFlow is different because we\'re lead generation experts, not just another chatbot. Our chatbots are designed specifically to turn website visitors into paying customers. We handle everything: setup, optimization, maintenance, and reporting. Our goal is to help you see ROI within 30 days.',
    'unique': 'LeadFlow is different because we\'re lead generation experts, not just another chatbot. Our chatbots are designed specifically to turn website visitors into paying customers. We handle everything: setup, optimization, maintenance, and reporting. Our goal is to help you see ROI within 30 days.',
    'competitor': 'LeadFlow is different because we\'re lead generation experts, not just another chatbot. Our chatbots are designed specifically to turn website visitors into paying customers. We handle everything: setup, optimization, maintenance, and reporting. Our goal is to help you see ROI within 30 days.',
    
    // Urgency and next steps - Honest
    'start': 'Great! The first step is booking a discovery call where we\'ll learn about your business and create a custom plan. Our goal is to help you see results within 30 days, so the sooner we start, the sooner you\'ll see more leads! Would you like me to help you book a call?',
    'begin': 'Great! The first step is booking a discovery call where we\'ll learn about your business and create a custom plan. Our goal is to help you see results within 30 days, so the sooner we start, the sooner you\'ll see more leads! Would you like me to help you book a call?',
    'ready': 'Great! The first step is booking a discovery call where we\'ll learn about your business and create a custom plan. Our goal is to help you see results within 30 days, so the sooner we start, the sooner you\'ll see more leads! Would you like me to help you book a call?',
    'now': 'Great! The first step is booking a discovery call where we\'ll learn about your business and create a custom plan. Our goal is to help you see results within 30 days, so the sooner we start, the sooner you\'ll see more leads! Would you like me to help you book a call?',
    'today': 'Great! The first step is booking a discovery call where we\'ll learn about your business and create a custom plan. Our goal is to help you see results within 30 days, so the sooner we start, the sooner you\'ll see more leads! Would you like me to help you book a call?',
    
    // General positive responses - Honest
    'amazing': 'Thank you! LeadFlow really is amazing - it\'s designed to help businesses transform their lead generation. Our goal is to help you see 3-5x more qualified leads within 30 days. Would you like to learn more about how it could help your business?',
    'awesome': 'Thank you! LeadFlow really is awesome - it\'s designed to help businesses transform their lead generation. Our goal is to help you see 3-5x more qualified leads within 30 days. Would you like to learn more about how it could help your business?',
    
    // Website Development - How it works
    'website how': 'Here\'s how website development works: 1) We discuss your goals and requirements, 2) Create wireframes and designs, 3) Build with modern technologies (Next.js, React, Tailwind), 4) Test and optimize, 5) Launch and provide support. Most websites are completed in 2-4 weeks.',
    'website process': 'Our website development process: 1) Discovery call to understand your needs, 2) Design wireframes and mockups, 3) Build with modern technologies, 4) Test on all devices, 5) Launch and provide training. Most websites are completed in 2-4 weeks.',
    'website timeline': 'Website development typically takes 2-4 weeks: Starter websites (2 weeks), Professional websites (3-4 weeks), Enterprise websites (6-8 weeks). We keep you updated throughout the process and deliver on time.',
    'website steps': 'Our website development steps: 1) Discovery and planning, 2) Design and prototyping, 3) Development and testing, 4) Launch and support. We handle everything and keep you informed throughout the process.',
    
    // Website Development - Features and capabilities
    'website features': 'Our websites include: Responsive design (works on all devices), SEO optimization, fast loading speeds, modern animations, contact forms, analytics setup, mobile-first approach, and LeadFlow Chatbot integration available.',
    'website include': 'All websites include: Responsive design, SEO optimization, fast loading, mobile optimization, contact forms, analytics setup, and modern technologies. Professional and Enterprise packages include additional features like custom integrations and advanced functionality.',
    'website capabilities': 'Our websites can handle: E-commerce functionality, user accounts, payment processing, booking systems, content management, multi-language support, custom integrations, and LeadFlow Chatbot integration for lead generation.',
    'website functionality': 'Our websites support: Contact forms, online booking, e-commerce, user accounts, payment processing, content management, multi-language support, custom integrations, and LeadFlow Chatbot integration for lead generation.',
    
    // Website Development - Technical questions
    'website technical': 'We handle all technical aspects: Modern technologies (Next.js, React, Tailwind CSS), responsive design, SEO optimization, fast loading, mobile optimization, and hosting setup. You don\'t need any technical knowledge - we do everything!',
    'website technologies': 'We use modern technologies: Next.js for fast performance, React for interactive features, Tailwind CSS for beautiful design, and optimized hosting for speed. All websites are built with the latest web standards and best practices.',
    'website hosting': 'We handle all hosting setup and can recommend the best hosting solutions for your needs. We ensure fast loading speeds, security, and reliability. All websites are optimized for performance and SEO.',
    'website maintenance': 'We provide optional maintenance services: Monthly updates, security monitoring, performance optimization, content updates, and technical support. You can choose to handle maintenance yourself or let us take care of everything.',
    
    // Website Development - Business types
    'website business': 'We build websites for ANY business type: E-commerce stores, service businesses, SaaS companies, real estate, healthcare, legal firms, fitness businesses, restaurants, and more. Each website is customized to your specific industry and needs.',
    'website industry': 'We build websites for all industries: E-commerce, services, SaaS, real estate, healthcare, legal, fitness, restaurants, and more. Each website is tailored to your specific industry requirements and business goals.',
    'website ecommerce': 'We build e-commerce websites with: Product catalogs, shopping cart, payment processing, user accounts, order management, inventory tracking, and LeadFlow Chatbot integration available for customer support and lead generation.',
    'website service': 'We build service business websites with: Service pages, booking systems, contact forms, testimonials, portfolio galleries, and LeadFlow Chatbot integration available for lead capture and appointment booking.',
    
    // Website Development - Results and benefits
    'website benefits': 'Website benefits: Professional online presence, increased credibility, better user experience, improved SEO rankings, mobile optimization, fast loading speeds, and LeadFlow Chatbot integration available for lead generation.',
    'website results': 'Our websites are designed to deliver: 40-60% faster loading speeds, 25-40% increase in conversions, improved SEO rankings, better mobile experience, and professional appearance that builds trust with customers.',
    'website roi': 'Our websites are designed to pay for themselves quickly: Professional appearance increases credibility, better user experience improves conversions, SEO optimization brings more organic traffic, and LeadFlow Chatbot integration available for lead generation.',
    'website success': 'Our websites help businesses succeed by: Building professional online presence, improving user experience, increasing conversions, better SEO rankings, mobile optimization, and LeadFlow Chatbot integration available for lead generation.',
    
    // Website Development - Comparison and competition
    'website better': 'Our websites are different because: We use modern technologies, focus on conversions, provide ongoing support, offer LeadFlow Chatbot integration, and deliver professional results at competitive prices. We aim to provide better value than most agencies.',
    'website different': 'Our websites stand out because: Modern technologies (Next.js, React, Tailwind), conversion-focused design, ongoing support, LeadFlow Chatbot integration, and competitive pricing. We deliver professional results at competitive prices.',
    'website unique': 'What makes our websites unique: Modern technologies, conversion optimization, ongoing support, LeadFlow Chatbot integration, and competitive pricing. We focus on results, not just pretty designs.',
    'website competitor': 'Our websites are different because: We use modern technologies, focus on conversions, provide ongoing support, offer LeadFlow Chatbot integration, and deliver professional results at competitive prices. We aim to provide better value than most agencies.',
    
    // Website Development - Packages and options
    'website packages': 'We offer 3 website packages: Starter ($2,000) - 5-7 pages, Professional ($4,500) - 10-15 pages, Enterprise ($8,000+) - unlimited pages. All include responsive design, SEO, fast loading, and modern technologies.',
    'website options': 'We offer 3 website options: Starter ($2,000) - perfect for small businesses, Professional ($4,500) - ideal for growing businesses, Enterprise ($8,000+) - for large businesses with complex needs. All include responsive design and SEO.',
    'website starter': 'Starter website ($2,000): 5-7 pages, responsive design, SEO optimization, fast loading, contact forms, analytics setup, and 2 weeks delivery. Perfect for small businesses and startups.',
    'website professional': 'Professional website ($4,500): 10-15 pages, advanced features, custom integrations, advanced SEO, content management, and 3-4 weeks delivery. Ideal for growing businesses.',
    'website enterprise': 'Enterprise website ($8,000+): Unlimited pages, custom functionality, e-commerce integration, advanced features, and 6-8 weeks delivery. For large businesses with complex needs.',
    
    // Website Development - Support and maintenance
    'website support': 'We provide excellent website support: Technical assistance, content updates, performance optimization, security monitoring, and ongoing maintenance. We\'re here to help your website succeed long-term.',
    'website updates': 'We handle website updates: Content changes, feature additions, security updates, performance optimization, and technical improvements. You can choose to handle updates yourself or let us take care of everything.',
    'website changes': 'We can make website changes: Content updates, design modifications, feature additions, and technical improvements. We provide ongoing support to keep your website current and effective.',
    
    // Website Development - Integration with LeadFlow
    'website chatbot': 'Yes! We can integrate LeadFlow Chatbot with your website for lead generation. This combination gives you a professional website AND 24/7 lead capture. Both services work together for maximum impact.',
    'website leadflow': 'Absolutely! We can integrate LeadFlow Chatbot with your website. This gives you a professional website AND 24/7 lead generation. Both services work together for maximum business growth.',
    'website both': 'Yes! We offer both website development and LeadFlow Chatbot. This combination gives you a professional website AND 24/7 lead capture. Both services work together for maximum business growth and lead generation.',
    'website combo': 'Yes! We offer both website development and LeadFlow Chatbot. This combination gives you a professional website AND 24/7 lead capture. Both services work together for maximum business growth and lead generation.',
    'great': 'Thank you! LeadFlow really is great - it\'s designed to help businesses transform their lead generation. Our goal is to help you see 3-5x more qualified leads within 30 days. Would you like to learn more about how it could help your business?',
    'love': 'Thank you! LeadFlow really is amazing - it\'s designed to help businesses transform their lead generation. Our goal is to help you see 3-5x more qualified leads within 30 days. Would you like to learn more about how it could help your business?',
    'perfect': 'Thank you! LeadFlow really is amazing - it\'s designed to help businesses transform their lead generation. Our goal is to help you see 3-5x more qualified leads within 30 days. Would you like to learn more about how it could help your business?',
    
    // Availability and scheduling - Concise
    'availability': 'I\'m available for discovery calls Monday-Friday, 9 AM-4 PM Pacific Time. You can book a 45-minute discovery call through our Calendly link. I respond to emails within 2-4 hours during business hours. Would you like me to help you book a discovery call?',
    
    // Contact information - Concise
    'contact': 'Here\'s how you can reach me: Email: hello@intelllx.com, Website: intelllx.com. You can book a discovery call Monday-Friday, 9 AM-4 PM Pacific Time. I respond to emails within 2-4 hours during business hours. What\'s the best way for me to help you today?',
    
    // Company information - Concise
    'company': 'I\'m the founder of IntellLX, a lead generation company specializing in AI-powered chatbots. We help businesses turn website visitors into paying customers through our LeadFlow Chatbot service. Our mission is to make lead generation simple and effective for businesses of all sizes.',
    
    // Website information - Concise
    'website info': 'Our website intelllx.com has everything you need: Homepage with service overview, Services page with detailed LeadFlow information, Pricing page with $1,500 setup + $400/month pricing, About page with company information, Contact page to reach us directly, and this chatbot for instant answers. What would you like to know more about?'
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Use selected language, only detect if auto-detect is selected
    const userLanguage = selectedLanguage === 'auto' ? detectLanguage(inputValue) : selectedLanguage;
    setDetectedLanguage(userLanguage);

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(async () => {
      const response = getBotResponse(inputValue.toLowerCase());
      
      // Translate response to user's language
      const translatedResponse = await translateText(response, userLanguage);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: translatedResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Show lead form if they want to book
      if (translatedResponse.includes('get your information') || translatedResponse.includes('información')) {
        setShowLeadForm(true);
      }
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    // Check for keywords (case insensitive)
    const lowerInput = input.toLowerCase();
    
    // Check for specific question types FIRST (before general keyword matching)
    if (lowerInput.includes('what kind of business') || lowerInput.includes('what type of business') || lowerInput.includes('what businesses') || lowerInput.includes('which businesses') || lowerInput.includes('good for') || lowerInput.includes('work for') || lowerInput.includes('suitable for') || lowerInput.includes('right for') || lowerInput.includes('perfect for') || lowerInput.includes('ideal for')) {
      return faqResponses['business'];
    }
    
    if (lowerInput.includes('roi') || lowerInput.includes('return on investment') || lowerInput.includes('pay for itself') || lowerInput.includes('what are the rois') || lowerInput.includes('what is the roi')) {
      return faqResponses['roi'];
    }
    
    if (lowerInput.includes('turn leads') || lowerInput.includes('convert leads') || lowerInput.includes('leads into customers')) {
      return faqResponses['leads'];
    }
    
    if (lowerInput.includes('scam') || lowerInput.includes('trust') || lowerInput.includes('legitimate') || lowerInput.includes('real')) {
      return faqResponses['scam'];
    }
    
    if (lowerInput.includes('testimonials') || lowerInput.includes('references')) {
      return faqResponses['testimonials'];
    }
    
    if (lowerInput.includes('technical') || lowerInput.includes('difficult') || lowerInput.includes('easy') || lowerInput.includes('complicated')) {
      return faqResponses['technical'];
    }
    
    if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('quick') || lowerInput.includes('fast')) {
      return faqResponses['time'];
    }
    
    if (lowerInput.includes('results') || lowerInput.includes('expect') || lowerInput.includes('guarantee') || lowerInput.includes('success')) {
      return faqResponses['results'];
    }
    
    if (lowerInput.includes('support') || lowerInput.includes('maintenance') || lowerInput.includes('updates') || lowerInput.includes('help')) {
      return faqResponses['support'];
    }
    
    if (lowerInput.includes('industry') || lowerInput.includes('niche') || lowerInput.includes('specific') || lowerInput.includes('type')) {
      return faqResponses['industry'];
    }
    
    if (lowerInput.includes('better') || lowerInput.includes('different') || lowerInput.includes('unique') || lowerInput.includes('competitor')) {
      return faqResponses['better'];
    }
    
    if (lowerInput.includes('start') || lowerInput.includes('begin') || lowerInput.includes('ready') || lowerInput.includes('now') || lowerInput.includes('today')) {
      return faqResponses['start'];
    }
    
    if (lowerInput.includes('amazing') || lowerInput.includes('awesome') || lowerInput.includes('great') || lowerInput.includes('love') || lowerInput.includes('perfect')) {
      return faqResponses['amazing'];
    }
    
    // Check for availability and scheduling questions
    if (lowerInput.includes('hours') || lowerInput.includes('available') || lowerInput.includes('schedule') || lowerInput.includes('when') || lowerInput.includes('time') || lowerInput.includes('discovery call') || lowerInput.includes('call') || lowerInput.includes('meeting')) {
      return faqResponses['availability'];
    }
    
    // Check for contact information
    if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('address') || lowerInput.includes('location')) {
      return faqResponses['contact'];
    }
    
    // Check for company information
    if (lowerInput.includes('company') || lowerInput.includes('about us') || lowerInput.includes('who are you') || lowerInput.includes('team') || lowerInput.includes('founder')) {
      return faqResponses['company'];
    }
    
    // Check for website information
    if (lowerInput.includes('website') || lowerInput.includes('site') || lowerInput.includes('pages') || lowerInput.includes('navigation') || lowerInput.includes('menu')) {
      return faqResponses['website'];
    }
    
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerInput.includes(keyword)) {
        return response;
      }
    }
    
    // Check for specific business type keywords
    if (lowerInput.includes('restaurant') || lowerInput.includes('food') || lowerInput.includes('dining')) {
      return faqResponses['restaurant'];
    }
    if (lowerInput.includes('lawyer') || lowerInput.includes('attorney') || lowerInput.includes('legal')) {
      return faqResponses['legal'];
    }
    if (lowerInput.includes('doctor') || lowerInput.includes('medical') || lowerInput.includes('healthcare') || lowerInput.includes('clinic')) {
      return faqResponses['healthcare'];
    }
    if (lowerInput.includes('gym') || lowerInput.includes('fitness') || lowerInput.includes('workout') || lowerInput.includes('personal trainer')) {
      return faqResponses['fitness'];
    }
    if (lowerInput.includes('real estate') || lowerInput.includes('realtor') || lowerInput.includes('property') || lowerInput.includes('house')) {
      return faqResponses['real estate'];
    }
    if (lowerInput.includes('software') || lowerInput.includes('saas') || lowerInput.includes('app') || lowerInput.includes('platform')) {
      return faqResponses['saas'];
    }
    if (lowerInput.includes('shop') || lowerInput.includes('store') || lowerInput.includes('ecommerce') || lowerInput.includes('selling')) {
      return faqResponses['ecommerce'];
    }

    // Check for integration questions
    if (lowerInput.includes('integrate') || lowerInput.includes('connect') || lowerInput.includes('crm') || lowerInput.includes('calendar')) {
      return faqResponses['integrate'];
    }

    // Default responses based on context - Concise
    const defaultResponses = [
      "That's a great question! I'm here to help you learn about LeadFlow. You can ask me about pricing ($1,500 setup + $400/month), how it works, lead conversion, ROI, features, or book a discovery call. What interests you most?",
      "I'm excited to help! LeadFlow is your 24/7 digital sales assistant that captures leads and books appointments automatically. You can ask me about pricing, how it works, lead conversion, business types, or book a discovery call. What would you like to know?",
      "Great question! LeadFlow works for any business that wants more leads. Most clients see 3-5x more qualified leads within 30 days. You can ask me about pricing, features, lead conversion, how it works for your industry, or book a discovery call. What interests you most?",
      "I'm thrilled you're interested! LeadFlow is designed to turn website visitors into paying customers. You can ask me about pricing, how it works, lead conversion, ROI, features, setup process, or book a discovery call. What would you like to explore first?",
      "That's a wonderful question! LeadFlow is your complete lead generation solution. You can ask me about pricing, how it works, lead conversion, business types, benefits, ROI, or book a discovery call. What would you like to know?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the lead data to your CRM or email
    console.log('Lead captured:', leadData);
    
    // Redirect to Calendly
    window.open(site.calendly, '_blank');
    
    // Reset form
    setLeadData({ name: '', email: '', phone: '' });
    setShowLeadForm(false);
    
    // Add confirmation message
    const confirmMessage: Message = {
      id: Date.now(),
      text: "Perfect! I've opened your calendar booking link. You should see a new tab with available times. Thanks for your interest!",
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, confirmMessage]);
  };

  const speakText = (text: string, messageId: number) => {
    // Stop any currently speaking message
    if (speakingMessageId) {
      window.speechSynthesis.cancel();
    }

    // Fix pronunciation of INTELLLX
    const processedText = text.replace(/INTELLLX/g, 'Intellix');

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(processedText);
    
    // Configure voice settings for natural, professional speech
    utterance.rate = 0.9; // Slower, more natural pace (was 1.2)
    utterance.pitch = 1.0; // Normal pitch for professional tone (was 1.1)
    utterance.volume = 0.95; // High volume for clarity
    
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for best quality voices (in order of preference)
    const voicePriority = [
      // Premium Google voices
      'Google US English',
      'Google UK English Female',
      'Google UK English Male',
      'Google Australian English Female',
      'Google Australian English Male',
      
      // Microsoft voices
      'Microsoft Zira Desktop',
      'Microsoft David Desktop',
      'Microsoft Mark Desktop',
      'Microsoft Susan Desktop',
      
      // Apple voices (if on Mac)
      'Samantha',
      'Alex',
      'Victoria',
      'Daniel',
      'Moira',
      'Tessa',
      
      // Other high-quality voices
      'Karen',
      'Fiona',
      'Veena',
      'Rishi',
      'Amara',
      'Aria',
      'Eva',
      'Ivy',
      'Joanna',
      'Kendra',
      'Kimberly',
      'Salli',
      'Zoe'
    ];
    
    // Find the best available voice
    let selectedVoice = null;
    
    // First, try to find exact matches from priority list
    for (const voiceName of voicePriority) {
      selectedVoice = voices.find(voice => 
        voice.name === voiceName || 
        voice.name.includes(voiceName)
      );
      if (selectedVoice) break;
    }
    
    // If no exact match, try to find voices with quality indicators
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') || 
        voice.name.includes('Neural') ||
        voice.name.includes('Premium') ||
        voice.name.includes('Enhanced')
      );
    }
    
    // Fallback to any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        voice.name.toLowerCase().includes('english')
      );
    }
    
    // Apply the selected voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Set speaking state
    setSpeakingMessageId(messageId);

    // Handle speech events
    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);
  };

  return (
    <>
      {/* Modern 2025 Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open INTELLLX AI Assistant"
          >
            <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Bot Avatar */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 border border-white/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${25 + i * 12}%`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.7,
                    }}
                  />
                ))}
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-400/20 via-purple-500/20 to-pink-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern 2025 Chat Window */}
      <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden"
          >
            {/* Modern Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white p-6 flex justify-between items-center relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
              
              <div className="flex items-center space-x-4 relative z-10">
                {/* Bot Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
                
              <div>
                  <h3 className="font-bold text-xl">INTELLLX AI</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm opacity-90">Your AI Assistant</p>
                  {detectedLanguage !== 'en' && (
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {detectedLanguage.toUpperCase()}
                    </span>
                  )}
              </div>
            </div>
              </div>
              
              <div className="flex items-center space-x-2 relative z-10">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                title="Change Language"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
              <button
                onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                  <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          {showLanguageSelector && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-center mb-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Choose Your Language</h4>
                <p className="text-xs text-gray-500">Select your preferred language for the conversation</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: 'en', name: 'English', flag: '🇺🇸' },
                  { code: 'es', name: 'Español', flag: '🇪🇸' },
                  { code: 'fr', name: 'Français', flag: '🇫🇷' },
                  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
                  { code: 'pt', name: 'Português', flag: '🇵🇹' },
                  { code: 'zh', name: '中文', flag: '🇨🇳' },
                  { code: 'ja', name: '日本語', flag: '🇯🇵' },
                  { code: 'ko', name: '한국어', flag: '🇰🇷' },
                  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
                  { code: 'auto', name: 'Auto Detect', flag: '🔍' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      if (lang.code === 'auto') {
                        setSelectedLanguage('auto');
                        setDetectedLanguage('en');
                      } else {
                        setSelectedLanguage(lang.code);
                        setDetectedLanguage(lang.code);
                      }
                      setShowLanguageSelector(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Modern Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[75%] ${message.isUser ? 'flex-row-reverse gap-reverse' : ''}`}>
                  {/* Bot Avatar for AI messages */}
                  {!message.isUser && (
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`px-4 py-3 rounded-xl shadow-sm ${
                    message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-900 border border-gray-200'
                  }`}
                >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm leading-relaxed flex-1">{message.text}</p>
                    {!message.isUser && (
                      <button
                        onClick={() => {
                          if (speakingMessageId === message.id) {
                            stopSpeaking();
                          } else {
                            speakText(message.text, message.id);
                          }
                        }}
                        className={`flex-shrink-0 p-2 rounded-full transition-all duration-200 ${
                          speakingMessageId === message.id
                            ? 'bg-red-100 text-red-600 hover:bg-red-200 shadow-sm'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-indigo-600 shadow-sm'
                        }`}
                        title={speakingMessageId === message.id ? 'Stop speaking' : 'Listen to response'}
                      >
                        {speakingMessageId === message.id ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-50 text-gray-900 px-4 py-3 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Lead Form */}
          {showLeadForm && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your phone"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[44px]"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] transition-colors duration-200"
                >
                  Book Discovery Call
                </button>
              </form>
            </div>
          )}

          {/* Modern Input Area */}
          {!showLeadForm && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <div className="flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your question…"
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 placeholder-gray-400 min-h-[44px]"
                />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Quick suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Pricing', 'How it works', 'Book a call', 'Features'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
