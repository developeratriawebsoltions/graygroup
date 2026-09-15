import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { cn, formatPriceCompact } from "@/lib/utils";
import type { Neighborhood } from "@/types";

/**
 * Immersive neighbourhood tile. The name sits low and quiet at rest; on hover
 * the photograph pushes in, the overlay deepens and the call to action rises.
 */
export function NeighborhoodCard({
  neighborhood,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  neighborhood: Neighborhood;
  className?: string;
  sizes?: string;
}) {
  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className={cn(
        "group relative block h-full min-h-[18rem] w-full overflow-hidden bg-charcoal",
        className,
      )}
      aria-label={`Explore ${neighborhood.name}`}
    >
      <SmartImage
        src={neighborhood.image}
        alt={`${neighborhood.name}, Arizona`}
        fill
        quality={82}
        sizes={sizes}
        className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />

      {/* Base scrim keeps the name legible on any photograph. */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
      <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/35" />

      <div className="relative flex h-full flex-col justify-end p-7 lg:p-8">
        <p className="eyebrow text-sand/80">{neighborhood.region}</p>

        <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-white lg:text-[2rem]">
          {neighborhood.name}
        </h3>

        {/* Revealed on hover / focus */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 text-[0.8125rem] leading-relaxed text-white/65">
              {neighborhood.tagline}
            </p>
            <span className="mt-4 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sand">
              Explore Neighborhood
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
            </span>
          </div>
        </div>

        <p className="mt-5 border-t border-white/15 pt-4 text-[0.6875rem] tracking-wide text-white/45">
          Median {formatPriceCompact(neighborhood.medianPrice)} ·{" "}
          {neighborhood.inventory} listings
        </p>
      </div>
    </Link>
  );
}
