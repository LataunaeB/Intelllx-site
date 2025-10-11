/**
 * HubSpot Analytics Helpers
 * 
 * Utility functions for identifying users and tracking custom events in HubSpot.
 * All functions are client-side only and no-op on the server.
 */

/**
 * Identify a user in HubSpot
 * 
 * @param email - User's email address (required for HubSpot identification)
 * @param properties - Additional contact properties (firstName, lastName, phone, etc.)
 * 
 * @example
 * ```ts
 * hsIdentify('user@example.com', {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   company: 'Acme Inc',
 *   phone: '+1234567890'
 * });
 * ```
 */
export function hsIdentify(
  email: string,
  properties?: Record<string, string | number | boolean>
): void {
  // No-op on server
  if (typeof window === 'undefined') {
    return;
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    console.warn('[HubSpot] hsIdentify requires a valid email address');
    return;
  }

  // Initialize _hsq if not present
  if (!window._hsq) {
    window._hsq = [];
  }

  // Build identification payload
  const identifyData: Record<string, string | number | boolean> = {
    email,
    ...properties,
  };

  try {
    // Push identification to HubSpot queue
    window._hsq.push(['identify', identifyData]);
    
    // Trigger a page view to ensure identification is sent
    // This is necessary if identification happens after initial page load
    window._hsq.push(['trackPageView']);
    
    console.log('[HubSpot] User identified:', email);
  } catch (error) {
    console.error('[HubSpot] Error identifying user:', error);
  }
}

/**
 * Track a custom event in HubSpot
 * 
 * @param eventId - Event identifier (e.g., "pe12345_button_clicked")
 * @param value - Optional numeric value associated with the event
 * 
 * @example
 * ```ts
 * // Track a button click
 * hsTrack('pe12345_cta_clicked');
 * 
 * // Track a purchase with value
 * hsTrack('pe12345_purchase_completed', 99.99);
 * ```
 * 
 * Note: Custom behavioral events must be created in HubSpot first:
 * Settings → Tracking Code → Custom Behavioral Events
 */
export function hsTrack(eventId: string, value?: number): void {
  // No-op on server
  if (typeof window === 'undefined') {
    return;
  }

  // Validate eventId
  if (!eventId || typeof eventId !== 'string') {
    console.warn('[HubSpot] hsTrack requires a valid event ID');
    return;
  }

  // Initialize _hsq if not present
  if (!window._hsq) {
    window._hsq = [];
  }

  try {
    // Build event payload
    const eventData: { id: string; value?: number } = { id: eventId };
    
    if (typeof value === 'number') {
      eventData.value = value;
    }

    // Push event to HubSpot queue
    window._hsq.push(['trackCustomBehavioralEvent', eventData as Record<string, unknown>]);
    
    console.log('[HubSpot] Event tracked:', eventId, value !== undefined ? `(value: ${value})` : '');
  } catch (error) {
    console.error('[HubSpot] Error tracking event:', error);
  }
}

/**
 * Set a page path for tracking (useful for SPAs)
 * 
 * @param path - The virtual page path to track
 * 
 * @example
 * ```ts
 * hsSetPath('/virtual-page');
 * ```
 */
export function hsSetPath(path: string): void {
  if (typeof window === 'undefined') return;
  if (!window._hsq) window._hsq = [];
  
  try {
    window._hsq.push(['setPath', path]);
    console.log('[HubSpot] Path set:', path);
  } catch (error) {
    console.error('[HubSpot] Error setting path:', error);
  }
}

/**
 * Manually trigger a page view (useful after identification or path changes)
 * 
 * @example
 * ```ts
 * hsTrackPageView();
 * ```
 */
export function hsTrackPageView(): void {
  if (typeof window === 'undefined') return;
  if (!window._hsq) window._hsq = [];
  
  try {
    window._hsq.push(['trackPageView']);
    console.log('[HubSpot] Page view tracked');
  } catch (error) {
    console.error('[HubSpot] Error tracking page view:', error);
  }
}

/**
 * Example usage in a logged-in route:
 * 
 * ```tsx
 * 'use client';
 * 
 * import { hsIdentify, hsTrack } from '@/lib/hubspot';
 * import { useEffect } from 'react';
 * 
 * export default function DashboardPage() {
 *   useEffect(() => {
 *     // Identify user after login
 *     const user = getCurrentUser(); // Your auth logic
 *     if (user?.email) {
 *       hsIdentify(user.email, {
 *         firstName: user.firstName,
 *         lastName: user.lastName,
 *         company: user.company
 *       });
 *     }
 *   }, []);
 * 
 *   const handleUpgrade = () => {
 *     // Track custom event
 *     hsTrack('pe12345_upgrade_clicked');
 *   };
 * 
 *   return <button onClick={handleUpgrade}>Upgrade</button>;
 * }
 * ```
 */

