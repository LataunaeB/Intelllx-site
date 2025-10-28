"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store original overflow and padding
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock scroll and compensate for scrollbar
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isMobileMenuOpen]);

  // Focus management: focus first link when menu opens
  useEffect(() => {
    if (isMobileMenuOpen && firstLinkRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
    } else if (!isMobileMenuOpen && hamburgerButtonRef.current) {
      // Return focus to hamburger button when menu closes
      hamburgerButtonRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // If shift+tab on first element, go to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // If tab on last element, go to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay itself, not the menu content
    if (e.target === e.currentTarget) {
      closeMobileMenu();
    }
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="absolute inset-0 backdrop-blur-md border-b border-white/10 shadow-lg"></div>
      <div className="relative mx-auto max-w-7xl px-4 py-4 flex items-center justify-between min-h-[80px]">
        {/* Brand/Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 z-10"
        >
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
            <span className="text-xs md:text-sm text-gray-300 font-medium tracking-wide italic font-serif">
              Always-On Growth • LeadFlow Chatbots & Web Development That Convert
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 relative z-30">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-white/10 rounded-lg group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isActiveRoute(item.href)
                  ? "text-blue-400 bg-white/10"
                  : "text-white hover:text-blue-400"
              }`}
            >
              {item.label}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          ref={hamburgerButtonRef}
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 z-10"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu Overlay & Drawer */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-[100] md:hidden"
            onClick={handleOverlayClick}
            aria-hidden={!isMobileMenuOpen}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
              style={{
                animation: "fadeIn 0.3s ease-out",
              }}
            />

            {/* Mobile Menu Drawer */}
            <div
              ref={menuRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out"
              style={{
                animation: "slideInRight 0.3s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo/Intelllxherologo.png"
                    alt="INTELLLX Logo"
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <span className="text-xl font-bold text-gray-900">INTELLLX</span>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="px-6 py-6">
                <ul className="space-y-2">
                  {site.nav.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : null}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isActiveRoute(item.href)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-6 border-t border-gray-200 bg-gray-50">
                <a
                  href={`mailto:${site.email}`}
                  className="block text-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline animations (reduce-motion friendly) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes fadeIn {
            from {
              opacity: 1;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(0);
            }
          }
        }
      `}</style>
    </header>
  );
}

