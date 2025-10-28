'use client';

import { Calendar } from 'lucide-react';
import Link from 'next/link';

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
}

/**
 * Single Call-to-Action Button
 * 
 * "Book a discovery call" button that links to the internal contact form.
 * Uses Next.js Link for client-side navigation.
 */
export default function CTAButton({ label }: CTAButtonProps) {
  return (
    <Link
      href="/contact"
      className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2.5"
      aria-label={label}
    >
      <Calendar className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}

