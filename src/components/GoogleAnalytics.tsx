"use client";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

// GA4 Event Helper Functions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackConversion = (conversionType: string, value?: number, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionType,
      value: value,
      currency: currency,
    });
  }
};

export const trackPurchase = (transactionId: string, value: number, items: unknown[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'USD',
      items: items,
    });
  }
};

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Only load GA4 in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            respect_dnt: true,
            page_title: document.title,
            page_location: window.location.href,
            // Enhanced measurement
            enhanced_measurements: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true,
              file_downloads: true,
            },
            // Custom parameters
            custom_map: {
              'custom_parameter_1': 'service_type',
              'custom_parameter_2': 'lead_source',
            }
          });
        `}
      </Script>
    </>
  );
}
