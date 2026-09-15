"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Slow bobbing line at the foot of the hero. Purely a visual cue to scroll. */
export function ScrollIndicator({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      aria-hidden="true"
      data-testid="scroll-indicator"
    >
      <div className="relative h-14 w-px overflow-hidden bg-white/25">
        <motion.div
          className="absolute inset-x-0 top-0 h-5 bg-white/90"
          animate={reduced ? {} : { y: [-20, 56] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatDelay: 0.4,
          }}
        />
      </div>
    </div>
  );
}
