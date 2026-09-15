import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { NeighborhoodCard } from "@/components/neighborhood/neighborhood-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { neighborhoods } from "@/lib/data/neighborhoods";

export const metadata: Metadata = {
  title: "Arizona Neighborhoods",
  description:
    "Nine communities across metropolitan Phoenix — Paradise Valley, Scottsdale, Arcadia, North Scottsdale, Central Scottsdale, Phoenix, Tempe, Gilbert and Mesa.",
  alternates: { canonical: "/neighborhoods" },
  openGraph: {
    title: "Arizona Neighborhoods | Gray Group",
    description:
      "Street-level guidance on the nine Arizona communities Gray Group works in most often.",
    url: "/neighborhoods",
  },
};

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where We Work"
        title={["Nine Communities.", "One Standard."]}
        subtitle="We do not cover the whole Valley. We cover nine communities properly — their pricing behaviour, their build eras, their drainage, and the streets we would avoid."
        image="/images/site/desert-road.jpg"
        imageAlt="A desert road winding through red rock country in Arizona"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Neighborhoods" }]}
      />

      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell">
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((neighborhood) => (
              <RevealItem
                key={neighborhood.slug}
                className="h-[22rem] sm:h-[24rem]"
              >
                <NeighborhoodCard
                  neighborhood={neighborhood}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
