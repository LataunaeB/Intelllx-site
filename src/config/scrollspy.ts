// Scrollspy Configuration
// Controls which pages have scrollspy navigation enabled

export interface ScrollspyConfig {
  hasScrollspy: boolean;
  maxItems: number;
  sections: Array<{
    id: string;
    label: string;
    offset?: number;
  }>;
}

// Page-specific scrollspy configurations
export const scrollspyConfigs: Record<string, ScrollspyConfig> = {
  // Homepage - Long, sectional page with scrollspy
  '/': {
    hasScrollspy: true,
    maxItems: 6,
    sections: [
      { id: 'hero', label: 'Hero', offset: -80 },
      { id: 'how-it-works', label: 'How It Works', offset: -80 },
      { id: 'services', label: 'Services', offset: -80 },
      { id: 'features', label: 'Features', offset: -80 },
      { id: 'portfolio', label: 'Portfolio', offset: -80 },
      { id: 'cta', label: 'Get Started', offset: -80 }
    ]
  },

  // Services page - Long, sectional page with scrollspy
  '/services': {
    hasScrollspy: true,
    maxItems: 5,
    sections: [
      { id: 'hero', label: 'Services', offset: -80 },
      { id: 'leadflow', label: 'LeadFlow Chatbot', offset: -80 },
      { id: 'website', label: 'Website Development', offset: -80 },
      { id: 'process', label: 'Our Process', offset: -80 },
      { id: 'cta', label: 'Get Started', offset: -80 }
    ]
  },

  // FAQ page - Long, sectional page with scrollspy
  '/faq': {
    hasScrollspy: true,
    maxItems: 4,
    sections: [
      { id: 'hero', label: 'FAQ', offset: -80 },
      { id: 'leadflow-faq', label: 'LeadFlow Questions', offset: -80 },
      { id: 'website-faq', label: 'Website Questions', offset: -80 },
      { id: 'general-faq', label: 'General Questions', offset: -80 }
    ]
  },

  // About page - Short, single-intent page, NO scrollspy
  '/about': {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  },

  // Contact page - Short, single-intent page, NO scrollspy
  '/contact': {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  },

  // Pricing page - Short, single-intent page, NO scrollspy
  '/pricing': {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  },

  // Process page - Medium length, but single-intent, NO scrollspy
  '/process': {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  },

  // Industries page - Medium length, but single-intent, NO scrollspy
  '/industries': {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  }
};

// Helper function to get scrollspy config for current page
export function getScrollspyConfig(pathname: string): ScrollspyConfig {
  return scrollspyConfigs[pathname] || {
    hasScrollspy: false,
    maxItems: 0,
    sections: []
  };
}

// Default scrollspy settings
export const DEFAULT_SCROLLSPY_CONFIG: ScrollspyConfig = {
  hasScrollspy: false,
  maxItems: 0,
  sections: []
};
