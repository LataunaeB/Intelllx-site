"use client";
import { site } from "@/config/site";
import { Mail, MapPin, Calendar, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/15 to-purple-900/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Let&apos;s <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Ready to transform your business with AI? Book a discovery call and let&apos;s discuss your project.
          </p>
        </div>
      </section>

      {/* Calendly Booking Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Book Your Discovery Call</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Let&apos;s chat about your project! Pick a time that works for you and we&apos;ll discuss how we can help grow your business with AI.
                </p>
              </div>

              <div className="space-y-6">
                <a 
                  href="mailto:hello@intelllx.com?subject=General Question - Intelllx"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300 group-hover:text-blue-400 transition-colors">hello@intelllx.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-300">Remote & Global</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  What to Expect
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  During our call, we&apos;ll discuss:
                </p>
                <ul className="text-gray-300 text-sm space-y-2 ml-4 list-disc">
                  <li>Your business goals and challenges</li>
                  <li>How AI can help you grow</li>
                  <li>Custom solutions for your needs</li>
                  <li>Next steps to get started</li>
                </ul>
              </div>
            </div>

            {/* Embedded Calendly Widget */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div style={{ minHeight: '800px', width: '100%' }}>
                <iframe
                  src={`${site.calendly}?hide_gdpr_banner=1&embed_domain=intelllx.com&embed_type=Inline`}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="rounded-xl"
                  title="Book a discovery call with Intelllx"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

