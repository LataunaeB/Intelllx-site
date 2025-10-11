'use client';

import { useEffect, useRef, useState } from 'react';

interface HubSpotFormProps {
  /** HubSpot Form ID (GUID) - find in HubSpot Marketing → Lead Capture → Forms */
  formId: string;
  /** HubSpot region (default: "na1") */
  region?: string;
  /** Custom target element ID (auto-generated if not provided) */
  targetId?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Callback when form is ready */
  onReady?: () => void;
  /** Callback when form is submitted */
  onSubmit?: () => void;
}

/**
 * HubSpotForm Component
 * 
 * Dynamically embeds a HubSpot form using the Forms API.
 * Requires NEXT_PUBLIC_HUBSPOT_PORTAL_ID env var.
 * 
 * Usage:
 * ```tsx
 * <HubSpotForm 
 *   formId="your-form-guid"
 *   region="na1"
 *   onSubmit={() => console.log('Form submitted!')}
 * />
 * ```
 */
export default function HubSpotForm({
  formId,
  region = 'na1',
  targetId,
  className = '',
  onReady,
  onSubmit,
}: HubSpotFormProps) {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formTargetId = targetId || `hubspot-form-${formId}`;

  // Load HubSpot Forms script
  useEffect(() => {
    if (!portalId) {
      setError('NEXT_PUBLIC_HUBSPOT_PORTAL_ID not configured');
      console.error('[HubSpot Form] Portal ID is required');
      return;
    }

    if (!formId) {
      setError('Form ID is required');
      return;
    }

    // Check if script is already loaded
    if (window.hbspt?.forms) {
      setIsScriptLoaded(true);
      return;
    }

    // Load the script if not present
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      console.log('[HubSpot Form] Forms script loaded');
    };
    
    script.onerror = () => {
      setError('Failed to load HubSpot Forms script');
      console.error('[HubSpot Form] Failed to load script');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId]);

  // Create form when script is loaded
  useEffect(() => {
    if (!isScriptLoaded || !window.hbspt?.forms) return;
    if (!portalId || !formId) return;

    try {
      // Create the form
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#${formTargetId}`,
        onFormReady: () => {
          console.log('[HubSpot Form] Form ready:', formId);
          onReady?.();
        },
        onFormSubmit: () => {
          console.log('[HubSpot Form] Form submitted:', formId);
          onSubmit?.();
        },
      });
    } catch (err) {
      console.error('[HubSpot Form] Error creating form:', err);
      setError('Failed to create form');
    }
  }, [isScriptLoaded, portalId, formId, region, formTargetId, onReady, onSubmit]);

  // Display error state
  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <h3 className="text-red-800 font-semibold mb-2">HubSpot Form Error</h3>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  // Display loading state
  if (!isScriptLoaded) {
    return (
      <div className={`p-8 bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading form...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      id={formTargetId} 
      className={className}
      data-testid="hubspot-form-container"
    />
  );
}

