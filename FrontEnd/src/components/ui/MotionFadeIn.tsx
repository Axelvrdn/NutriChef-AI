"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface MotionFadeInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionFadeIn({ children, className, delay = 0, ...props }: MotionFadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
