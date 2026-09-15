"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveals imagery by scaling down from a slight overshoot while fading in —
 * the "curtain" effect used throughout the editorial sections.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 1.3,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: reduced ? 1 : 1.12 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once, amount }}
        transition={{
          duration: reduced ? 0.001 : duration,
          delay: reduced ? 0 : delay,
          ease: EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Subtle vertical parallax. The child should be slightly taller than its
 * frame so the drift never exposes an edge.
 */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full w-full", className)}
      initial={{ y: reduced ? 0 : -distance / 2 }}
      whileInView={{ y: reduced ? 0 : distance / 2 }}
      viewport={{ once: false, amount: 0.05 }}
      transition={{ duration: 1.6, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}
