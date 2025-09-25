"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent";
  reduceMotion?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16"
};

const variantClasses = {
  primary: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
  secondary: "bg-white/10 text-white border border-white/20",
  accent: "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8"
};

export default function FeatureIcon({ 
  icon: Icon, 
  size = "md", 
  variant = "primary", 
  reduceMotion = false,
  className = ""
}: FeatureIconProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
      whileInView={reduceMotion ? {} : { scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        rounded-xl 
        flex 
        items-center 
        justify-center 
        shadow-lg
        ${className}
      `}
    >
      <Icon className={iconSizes[size]} />
    </motion.div>
  );
}
