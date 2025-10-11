'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * HubSpotTracking Component
 * 
 * Loads HubSpot's tracking script and chat widget sitewide.
 * Requires NEXT_PUBLIC_HUBSPOT_PORTAL_ID env var.
 * 
 * Features:
 * - Tracking code for analytics
 * - Chat widget (appears after activating a Chatflow in HubSpot)
 * - Prevents duplicate script injection
 * - Configurable chat loading behavior
 */
export default function HubSpotTracking() {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const chatImmediate = process.env.NEXT_PUBLIC_HUBSPOT_CHAT_IMMEDIATE !== 'false';

  useEffect(() => {
    // Warn if portal ID is missing
    if (!portalId) {
      console.warn(
        '[HubSpot] NEXT_PUBLIC_HUBSPOT_PORTAL_ID not set. HubSpot tracking and chat disabled.'
      );
      return;
    }

    // Initialize HubSpot queue if not already present
    if (typeof window !== 'undefined') {
      window._hsq = window._hsq || [];
      
      // Configure chat widget settings
      window.hsConversationsSettings = {
        loadImmediately: chatImmediate,
      };
    }
  }, [portalId, chatImmediate]);

  // Don't render anything if portal ID is missing
  if (!portalId) {
    return null;
  }

  return (
    <>
      {/* HubSpot Tracking Code */}
      <Script
        id="hs-script-loader"
        strategy="afterInteractive"
        src={`https://js.hs-scripts.com/${portalId}.js`}
        onLoad={() => {
          console.log('[HubSpot] Tracking script loaded successfully');
        }}
        onError={() => {
          console.error('[HubSpot] Failed to load tracking script');
        }}
      />
    </>
  );
}

