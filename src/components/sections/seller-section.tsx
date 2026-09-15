import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const pillars = [
  {
    title: "Strategic Pricing",
    body: "Built from closed comparables, absorption rates and the buyer profile most likely to transact — not from the number you hoped to see.",
  },
  {
    title: "Sophisticated Marketing",
    body: "Architectural photography, film, print and a private launch to our qualified buyer register before the property reaches the portals.",
  },
  {
    title: "Thoughtful Negotiation",
    body: "Preparation is what wins terms. Inspection reports, disclosures and title work are resolved before an offer arrives, not after.",
  },
];

export function SellerSection() {
  return (
    <section className="bg-charcoal">
      <div className="grid lg:grid-cols-2">
        {/* Copy */}
        <div className="flex items-center px-6 py-24 sm:px-10 md:py-32 lg:order-1 lg:px-16 lg:py-40 xl:px-24">
          <div className="w-full max-w-xl">
            <Reveal y={16}>
              <p className="eyebrow text-sand">For Sellers</p>
            </Reveal>

            <Reveal y={22} delay={0.06}>
              <h2 className="text-section mt-5 text-ivory">
                Position Your Property
                <br />
                for Its Next Chapter.
              </h2>
            </Reveal>

            <Reveal y={18} delay={0.12}>
              <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-ivory/55">
                Strategic pricing, sophisticated marketing and thoughtful
                negotiation designed to maximize your property&rsquo;s
                potential.
              </p>
            </Reveal>

            <RevealGroup className="mt-12 space-y-8 border-t border-white/12 pt-10">
              {pillars.map((pillar, i) => (
                <RevealItem key={pillar.title}>
                  <div className="flex gap-6">
                    <span className="eyebrow shrink-0 pt-1 text-sand/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ivory">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ivory/50">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal y={18} delay={0.1}>
              <Link
                href="/contact?interest=selling"
                className="group mt-12 inline-flex h-13 items-center gap-3 bg-ivory px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:bg-sand"
              >
                Sell With Gray Group
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Image */}
        <ImageReveal className="lg:order-2" amount={0.15}>
          <div className="relative h-[24rem] w-full sm:h-[32rem] lg:h-full lg:min-h-[44rem]">
            <SmartImage
              src="/images/site/seller-estate-dusk.jpg"
              alt="A contemporary Arizona residence lit from within at dusk"
              fill
              quality={82}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent lg:bg-gradient-to-r lg:from-charcoal/55 lg:to-transparent"
            />
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
