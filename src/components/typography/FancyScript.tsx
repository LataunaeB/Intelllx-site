"use client";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = React.PropsWithChildren<{
  className?: string;
  underline?: boolean; // default true
}>;

export default function FancyScript({ className = "", underline = true, children }: Props) {
  const reduce = useReducedMotion();

  const Motion = motion.span;

  return (
    <span className="relative inline-block align-baseline">
      <Motion
        style={{ fontFamily: "var(--font-script)" }}
        className={`whitespace-nowrap leading-none ${className}`}
        initial={reduce ? false : { opacity: 0, y: 4, scale: 0.98 }}
        animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={reduce ? {} : { scale: 1.01 }}
      >
        {children}
      </Motion>
      {underline && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400/60 via-pink-400/60 to-cyan-400/60 rounded-full"
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? {} : { scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      )}
    </span>
  );
}
