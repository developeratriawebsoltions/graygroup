"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Offset = { x?: number; y?: number };

/**
 * Slow, single-purpose fade-and-rise reveal. Everything on the site uses this
 * so the motion reads as one deliberate system rather than a set of effects.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.85,
  y = 26,
  x = 0,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const offset: Offset = reduced ? {} : { x, y };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduced ? 0.001 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Wraps a set of `RevealItem`s so children animate in sequence. */
export function RevealGroup({
  children,
  className,
  amount = 0.15,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Staggers each line of a heading upward from behind a mask. Used only for the
 * primary headline on each page.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const reduced = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.25em]">
          <motion.span
            className={cn("block -mb-[0.25em]", lineClassName)}
            initial={reduced ? { opacity: 0 } : { y: "108%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            transition={{
              duration: reduced ? 0.001 : 1.15,
              delay: reduced ? 0 : delay + i * 0.13,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
