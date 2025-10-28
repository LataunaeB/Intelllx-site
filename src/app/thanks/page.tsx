"use client";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent, trackPurchase } from "@/components/GoogleAnalytics";

export default function Thanks() {
  useEffect(() => {
    // Track purchase conversion
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      // Track purchase event
      trackPurchase(sessionId, 2500, [{
        item_id: 'leadflow_chatbot_setup',
        item_name: 'LeadFlow Chatbot Setup',
        category: 'AI Services',
        quantity: 1,
        price: 2500,
      }]);
      
      // Track conversion
      trackEvent('purchase_complete', {
        transaction_id: sessionId,
        value: 2500,
        currency: 'USD',
        service: 'LeadFlow Chatbot',
      });
    }
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Thank you!</h1>
      <p className="mt-3 text-gray-700">
        We&apos;ve received your order. We&apos;ll reach out shortly to get you onboarded.
      </p>
      <Link href="/" className="mt-6 inline-block rounded-xl border px-5 py-3 text-sm hover:bg-gray-50">
        Back to Home
      </Link>
    </section>
  );
}
  