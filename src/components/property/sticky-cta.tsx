"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

import { formatPrice } from "@/lib/utils";

/**
 * Sticky action bar for the property detail page. Slides in once the reader
 * has passed the headline block, so the price and the primary CTA are always
 * one glance away without covering the gallery on arrival.
 */
export function StickyCta({
  price,
  name,
  phoneHref,
  phone,
}: {
  price: number;
  name: string;
  phoneHref: string;
  phone: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/98 backdrop-blur-[2px] lg:inset-x-auto lg:bottom-8 lg:right-8 lg:border lg:border-line lg:shadow-[0_18px_50px_-24px_rgba(23,23,23,0.35)]"
        >
          <div className="flex items-center justify-between gap-4 px-6 py-4 lg:w-[24rem]">
            <div className="min-w-0">
              <p className="truncate text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal/45">
                {name}
              </p>
              <p className="mt-1 font-display text-xl text-charcoal">
                {formatPrice(price)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={phoneHref}
                aria-label={`Call Gray Group on ${phone}`}
                className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal transition-colors duration-500 hover:border-charcoal hover:bg-charcoal hover:text-ivory"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <Link
                href="#schedule"
                className="inline-flex h-11 items-center gap-2.5 bg-charcoal px-5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:bg-bronze"
              >
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.6} />
                Schedule a Showing
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
