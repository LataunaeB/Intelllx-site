import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import Link from "next/link";
import ChatWidget from "@/components/chat/ChatWidget";
import Header from "@/components/Header";
import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import ScrollspyProvider from "@/components/ui/ScrollspyProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.blurb,
  alternates: {
    canonical: 'https://intelllx.com',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://intelllx.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="shortcut icon" href="/favicon-32x32.png?v=2" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        <GoogleAnalytics measurementId="G-8J18HLB8FS" />
        
        <Header />

        <main className="flex-1">{children}</main>

        {/* Progress Indicator */}
        <ProgressIndicator />
        
        {/* Scrollspy Navigation */}
        <ScrollspyProvider />

        {/* Sleek Chat Widget */}
        <ChatWidget />

        <footer className="relative mt-20 bg-gray-50 border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="/images/logo/Intelllxherologo.png"
                    alt="INTELLLX Logo"
                    width={60}
                    height={60}
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    INTELLLX
                  </span>
                </div>
                <p className="text-gray-600 text-modern leading-relaxed mb-6">
                  Purpose-driven AI company dedicated to building sustainable business success through
                  innovation, integrity, and impact.
                </p>
                <div className="flex items-center gap-4">
                  <a 
                    href={`mailto:${site.email}`}
                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors duration-200 border border-gray-200 hover:border-blue-300"
                  >
                    <svg className="w-5 h-5 text-gray-600 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a 
                    href="/book"
                    className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors duration-200 border border-gray-200 hover:border-blue-300"
                  >
                    <svg className="w-5 h-5 text-gray-600 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/services" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      LeadFlow Chatbot
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-gray-600 text-sm">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </span>
              <div className="flex items-center gap-6 text-sm">
                {site.footerLinks.map((l) =>
                  l.href.startsWith("/") ? (
                    <Link key={l.href} href={l.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {l.label}
                    </Link>
                  ) : (
                    <a key={l.href} href={l.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                      {l.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
