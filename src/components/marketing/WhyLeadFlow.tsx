"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Calendar, RefreshCcw, TrendingUp } from "lucide-react";
import React from "react";
import { copy } from "@/config/copy";

// TODO: To test subhead_B, replace copy.whyLeadFlow.subhead_A with copy.whyLeadFlow.subhead_B
const subhead = copy.whyLeadFlow.subhead_A;

const items = copy.whyLeadFlow.cards.map((card, index) => {
  const icons = [MessageSquare, Calendar, RefreshCcw, TrendingUp];
  return {
    title: card.title,
    body: card.body,
    Icon: icons[index]
  };
});

export default function WhyLeadFlow() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.35, 
        ease: [0.4, 0, 0.2, 1] as const
      } 
    }
  };

  return (
    <section id="why-leadflow" aria-labelledby="why-leadflow-title" className="relative">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="why-leadflow-title" className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            {copy.whyLeadFlow.heading}
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/70">
            {subhead}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {items.map(({ title, body, Icon }) => (
            <motion.div key={title} variants={item}>
              <div
                tabIndex={0}
                className="h-full p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                    {!reduceMotion ? (
                      <motion.span
                        aria-hidden="true"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex"
                      >
                        <Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                      </motion.span>
                    ) : (
                      <Icon className="h-6 w-6 text-purple-400" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
                    <p className="mt-2 text-sm text-white/70">{body}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
