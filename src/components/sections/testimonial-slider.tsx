"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTERVAL = 9000;

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduced]);

  const active = testimonials[index];

  return (
    <section
      className="bg-ivory py-24 md:py-32 lg:py-40"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="shell">
        <Reveal y={16}>
          <p className="eyebrow text-bronze">In Their Words</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Oversized quotation mark, set in the display face */}
          <div className="lg:col-span-2">
            <span
              aria-hidden="true"
              className="block font-display text-[7rem] leading-[0.6] text-sand lg:text-[9rem]"
            >
              &ldquo;
            </span>
          </div>

          <div className="lg:col-span-10">
            <div
              className="relative min-h-[13rem] sm:min-h-[12rem] lg:min-h-[13rem]"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={active.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                  transition={{ duration: reduced ? 0.001 : 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <blockquote>
                    <p className="text-quote max-w-4xl font-display text-charcoal">
                      {active.quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-9 flex items-center gap-4">
                    <span className="h-px w-10 bg-bronze" aria-hidden="true" />
                    <span className="text-[0.8125rem] tracking-wide text-charcoal">
                      {active.name}
                    </span>
                    <span className="text-[0.8125rem] text-charcoal/40">
                      {active.detail}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-12 flex flex-col gap-8 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              {/* Progress segments */}
              <div className="flex items-center gap-3" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1} of ${testimonials.length}`}
                    onClick={() => go(i)}
                    className="group py-2"
                  >
                    <span
                      className={cn(
                        "block h-px transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        i === index
                          ? "w-14 bg-bronze"
                          : "w-7 bg-charcoal/20 group-hover:bg-charcoal/45",
                      )}
                    />
                  </button>
                ))}
                <span className="ml-3 text-[0.6875rem] tabular-nums tracking-[0.14em] text-charcoal/40">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
