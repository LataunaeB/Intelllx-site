"use client";

import { motion } from "framer-motion";
import { MessageSquare, Settings, BarChart3 } from "lucide-react";

interface ProcessDiagramProps {
  reduceMotion?: boolean;
}

const steps = [
  {
    icon: MessageSquare,
    label: "Design",
    description: "Custom conversations"
  },
  {
    icon: Settings,
    label: "Setup",
    description: "Professional deployment"
  },
  {
    icon: BarChart3,
    label: "Optimize",
    description: "Track & improve"
  }
];

export default function ProcessDiagram({ reduceMotion = false }: ProcessDiagramProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Process Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
            className="flex flex-col items-center relative"
          >
            {/* Icon Circle */}
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg mb-3">
              <step.icon className="w-7 h-7 text-white" />
            </div>
            
            {/* Label */}
            <div className="text-center">
              <div className="text-sm font-semibold text-white mb-1">{step.label}</div>
              <div className="text-xs text-gray-300">{step.description}</div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-full top-8 w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent hidden sm:block"></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={reduceMotion ? {} : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="hidden sm:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 -z-10"
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
