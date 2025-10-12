'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
}

/**
 * Single Call-to-Action Button
 * 
 * "Book a discovery call" button that opens the meetings URL.
 * Shows disabled state with tooltip if NEXT_PUBLIC_MEETINGS_URL is missing.
 */
export default function CTAButton({ label }: CTAButtonProps) {
  const meetingsUrl = process.env.NEXT_PUBLIC_MEETINGS_URL;
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (!meetingsUrl) {
      console.warn('[Chat Widget] NEXT_PUBLIC_MEETINGS_URL not configured');
      return;
    }

    // Open meetings URL in new tab
    window.open(meetingsUrl, '_blank', 'noopener,noreferrer');
  };

  const isDisabled = !meetingsUrl;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        onMouseEnter={() => isDisabled && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => isDisabled && setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`
          w-full py-3.5 px-6 rounded-xl font-semibold text-sm
          flex items-center justify-center gap-2.5
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isDisabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg focus:ring-blue-500'
          }
        `}
        aria-label={label}
        aria-disabled={isDisabled}
      >
        <Calendar className="w-5 h-5" />
        <span>{label}</span>
      </button>

      {/* Tooltip for disabled state */}
      {isDisabled && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
          Add NEXT_PUBLIC_MEETINGS_URL to enable scheduling
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}

