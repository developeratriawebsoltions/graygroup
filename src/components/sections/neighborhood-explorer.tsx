import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { NeighborhoodCard } from "@/components/neighborhood/neighborhood-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { neighborhoods } from "@/lib/data/neighborhoods";

/**
 * Masonry-style explorer. Spans are hand-set rather than computed so the
 * rhythm stays deliberate across breakpoints.
 */
const layout = [
  { span: "lg:col-span-4 lg:h-[30rem]", sizes: "(min-width:1024px) 33vw, 100vw" },
  { span: "lg:col-span-2 lg:h-[30rem]", sizes: "(min-width:1024px) 17vw, 100vw" },
  { span: "lg:col-span-2 lg:h-[24rem]", sizes: "(min-width:1024px) 17vw, 100vw" },
  { span: "lg:col-span-4 lg:h-[24rem]", sizes: "(min-width:1024px) 33vw, 100vw" },
  { span: "lg:col-span-2 lg:h-[22rem]", sizes: "(min-width:1024px) 17vw, 100vw" },
  { span: "lg:col-span-2 lg:h-[22rem]", sizes: "(min-width:1024px) 17vw, 100vw" },
  { span: "lg:col-span-2 lg:h-[22rem]", sizes: "(min-width:1024px) 17vw, 100vw" },
  { span: "lg:col-span-3 lg:h-[22rem]", sizes: "(min-width:1024px) 25vw, 100vw" },
  { span: "lg:col-span-3 lg:h-[22rem]", sizes: "(min-width:1024px) 25vw, 100vw" },
];

export function NeighborhoodExplorer() {
  const ordered = layout
    .map((slot, index) => ({ slot, neighborhood: neighborhoods[index] }))
    .filter((entry) => Boolean(entry.neighborhood));

  return (
    <section className="bg-charcoal py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow="Where We Work"
          tone="light"
          title="Nine Communities. One Standard."
          subtitle="From the one-acre estates of Paradise Valley to the foothill terrain of northeast Mesa — the neighbourhoods we know street by street."
          action={
            <Link
              href="/neighborhoods"
              className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sand transition-colors duration-500 hover:text-ivory"
            >
              All Neighborhoods
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.6}
              />
            </Link>
          }
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-6">
          {ordered.map(({ slot, neighborhood }) => (
            <RevealItem
              key={neighborhood.slug}
              className={`h-[20rem] sm:h-[22rem] ${slot.span}`}
            >
              <NeighborhoodCard
                neighborhood={neighborhood}
                sizes={slot.sizes}
                className="h-full"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
