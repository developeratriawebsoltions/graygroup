import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { PropertyGrid } from "@/components/property/property-grid";
import { getFeaturedProperties } from "@/lib/data/properties";

export function FeaturedProperties() {
  const featured = getFeaturedProperties(4);

  return (
    <section className="bg-ivory pb-24 pt-24 md:pb-32 md:pt-28 lg:pb-40 lg:pt-32">
      <div className="shell">
        <SectionHeading
          eyebrow="The Portfolio"
          title="Exceptional Properties"
          subtitle="A curated collection of distinctive homes across Arizona's most sought-after communities."
          action={
            <Link
              href="/properties"
              className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
            >
              View All Properties
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.6}
              />
            </Link>
          }
        />

        <PropertyGrid
          properties={featured}
          columns={4}
          className="mt-16 md:mt-20"
          sizes="(min-width: 1280px) 23vw, (min-width: 640px) 45vw, 100vw"
        />
      </div>
    </section>
  );
}
