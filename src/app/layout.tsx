import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import Link from "next/link";
import LeadFlowChatbot from "@/components/LeadFlowChatbot";
import { Great_Vibes } from "next/font/google";
import Image from "next/image";
import Head from "next/head";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import ScrollspyProvider from "@/components/ui/ScrollspyProvider";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.blurb,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 transition-all duration-300">
          <div className="absolute inset-0 bg-white border-b border-gray-200 shadow-lg"></div>
          <div className="relative mx-auto max-w-7xl px-4 py-4 flex items-center justify-between min-h-[80px]">
            {/* brand link must use <Link /> for internal nav */}
            <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Image
                  src="/images/logo/Intelllxherologo.png"
                  alt="INTELLLX Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-16 md:h-16"
                  priority
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs md:text-sm text-gray-600 font-medium tracking-wide italic font-serif">
                  Always-On Growth • LeadFlow Chatbots & Web Development That Convert
              </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1 relative z-30">
              {site.nav.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="relative px-4 py-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-lg group"
                  style={{ color: '#111827' }}
                >
                  {item.label}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                </Link>
              ))}
            </nav>

            {/* Modern Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Progress Indicator */}
        <ProgressIndicator />
        
        {/* Scrollspy Navigation */}
        <ScrollspyProvider />

        {/* LeadFlow Chatbot */}
        <LeadFlowChatbot />

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
