"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { SmartImage } from "@/components/common/smart-image";
import { StatusBadge } from "@/components/property/status-badge";
import { cn, formatPrice, propertySpecLine } from "@/lib/utils";
import type { Property } from "@/types";

/**
 * Editorial property card: full-bleed imagery, restrained meta, and a hover
 * state that zooms the photograph and lifts the arrow.
 */
export function PropertyCard({
  property,
  className,
  sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw",
  aspect = "aspect-[4/5]",
  preload = false,
}: {
  property: Property;
  className?: string;
  sizes?: string;
  aspect?: string;
  preload?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={`/properties/${property.slug}`}
      aria-label={`${property.name}, ${property.city} — ${formatPrice(property.price)}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={cn("group block focus-visible:outline-offset-4", className)}
    >
      <div className={cn("relative overflow-hidden bg-ivory-200", aspect)}>
        <SmartImage
          src={property.heroImage}
          alt={`${property.name} in ${property.city}, Arizona`}
          fill
          sizes={sizes}
          preload={preload}
          quality={82}
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />

        {/* Progressive darkening on hover for text legibility. */}
        <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/25" />

        <StatusBadge status={property.status} className="absolute left-0 top-6" />

        <span
          aria-hidden="true"
          className="absolute bottom-6 right-6 flex h-12 w-12 translate-y-3 items-center justify-center bg-ivory text-charcoal opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-6">
        <p className="eyebrow text-bronze">{property.city}</p>

        <h3 className="mt-3 font-display text-[1.625rem] leading-tight text-charcoal transition-colors duration-500 group-hover:text-bronze">
          {property.name}
        </h3>

        <p className="mt-1.5 text-[0.8125rem] text-charcoal/45">
          {property.address}
        </p>

        <div className="mt-5 border-t border-line pt-4">
          <p className="font-display text-[1.375rem] text-charcoal">
            {formatPrice(property.price)}
          </p>
          <p className="mt-1.5 text-[0.75rem] tracking-wide text-charcoal/50">
            {propertySpecLine(property)}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
