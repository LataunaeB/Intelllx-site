"use client";

import { motion } from "framer-motion";

interface WorksWithStripProps {
  reduceMotion?: boolean;
}

const integrations = [
  { name: "Calendly", logo: "📅" },
  { name: "HubSpot", logo: "🟠" },
  { name: "Salesforce", logo: "☁️" },
  { name: "Stripe", logo: "💳" },
  { name: "Zapier", logo: "⚡" },
  { name: "Mailchimp", logo: "📧" }
];

export default function WorksWithStrip({ reduceMotion = false }: WorksWithStripProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-8"
    >
      {/* Label */}
      <div className="text-center mb-6">
        <span className="text-sm font-medium text-gray-400 tracking-wide">Works with</span>
      </div>

      {/* Logo Strip */}
      <div className="flex items-center justify-center gap-8 md:gap-12 overflow-hidden">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
            className="flex flex-col items-center group"
          >
            {/* Logo */}
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors duration-200">
              <span className="text-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-200">
                {integration.logo}
              </span>
            </div>
            
            {/* Name */}
            <span className="text-xs text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-200">
              {integration.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s linear infinite'
        }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}
