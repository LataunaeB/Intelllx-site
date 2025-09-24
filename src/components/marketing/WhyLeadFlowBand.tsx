"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, CalendarCheck, RefreshCcw, LineChart } from "lucide-react";
import { copy } from "@/config/copy";

type Step = {
  num: string;
  title: string;
  body: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const STEPS: Step[] = [
  { num: "01", title: copy.whyLeadFlow.cards[0].title, body: copy.whyLeadFlow.cards[0].body, Icon: Sparkles },
  { num: "02", title: copy.whyLeadFlow.cards[1].title, body: copy.whyLeadFlow.cards[1].body, Icon: CalendarCheck },
  { num: "03", title: copy.whyLeadFlow.cards[2].title, body: copy.whyLeadFlow.cards[2].body, Icon: RefreshCcw },
  { num: "04", title: copy.whyLeadFlow.cards[3].title, body: copy.whyLeadFlow.cards[3].body, Icon: LineChart },
];

export default function WhyLeadFlowBand() {
  const reduce = useReducedMotion();

  const container = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const } },
  };

  return (
    <section
      aria-labelledby="why-leadflow-title"
      className="relative mt-8 md:mt-10"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Band */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="px-5 md:px-8 pt-6 md:pt-8">
            <h2 id="why-leadflow-title" className="text-xl md:text-2xl font-semibold tracking-tight text-white">
              {copy.whyLeadFlow.heading}
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70">
              {copy.whyLeadFlow.subhead_A}
            </p>
          </div>

          {/* Mobile: accordion */}
          <div className="px-5 md:px-8 pb-4 md:hidden">
            <div className="mt-4 space-y-2">
              {STEPS.map(({ num, title, body, Icon }) => (
                <details key={num} className="group">
                  <summary className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                    <span className="text-xs font-mono opacity-70 text-white/60">{num}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <Icon className="h-4 w-4 text-white/80" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-white">{title}</span>
                    <svg className="w-4 h-4 ml-auto text-white/60 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pl-12 pr-2 pb-3 text-sm text-white/70">
                    {body}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet: process strip */}
          <div className="hidden md:block relative px-6 md:px-8 py-6 md:py-8">
            {/* Connector line */}
            <div
              aria-hidden="true"
              className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
            >
              {!reduce && (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 6s linear infinite",
                  }}
                />
              )}
            </div>

            <style>{`
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6"
            >
              {STEPS.map(({ num, title, body, Icon }) => (
                <motion.div key={num} variants={item}>
                  <article className="relative z-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/10 transition-all duration-200 hover:shadow-lg">
                    <header className="flex items-center gap-3">
                      <span className="text-xs font-mono opacity-70 text-white/60">{num}</span>
                      <IconChip Icon={Icon} reduce={!!reduce} />
                      <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
                    </header>
                    <p className="mt-2 text-sm text-white/70">{body}</p>
                  </article>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IconChip({ Icon, reduce }: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; reduce: boolean }) {
  const Motion = motion.span;
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
      {reduce ? (
        <Icon className="h-5 w-5 text-white/80" aria-hidden="true" />
      ) : (
        <Motion
          aria-hidden="true"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Icon className="h-5 w-5 text-white/80" />
        </Motion>
      )}
    </span>
  );
}
