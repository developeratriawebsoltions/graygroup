import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { SellerFaq } from "@/components/seller/seller-faq";
import { SellerValuationForm } from "@/components/seller/seller-valuation-form";
import { CTASection } from "@/components/sections/cta-section";
import { neighborhoods } from "@/lib/data/neighborhoods";
import {
  marketingPillars,
  pricingPrinciples,
  sellerFaqs,
  sellingProcess,
} from "@/lib/data/sellers";
import { site } from "@/lib/site";
import { formatPriceCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Selling a home in Arizona with Gray Group: a written pricing analysis, an editorial marketing programme and negotiation built on preparation. Request a no-obligation valuation.",
  alternates: { canonical: "/sell-your-home" },
  openGraph: {
    title: "Sell Your Home | Gray Group Arizona",
    description:
      "Strategic pricing, sophisticated marketing and thoughtful negotiation — designed to position your property for its next chapter.",
    url: "/sell-your-home",
  },
};

export default function SellYourHomePage() {
  return (
    <>
      <PageHero
        eyebrow="For Sellers"
        title={["Sell Your Home", "On Your Terms."]}
        subtitle="A pricing analysis written by the principal who will negotiate your sale, a marketing programme built for one property at a time, and the difficult questions settled before an offer arrives."
        image="/images/site/seller-estate-dusk.jpg"
        imageAlt="A contemporary Arizona residence lit from within at dusk"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Sell Your Home" },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="#valuation"
            className="group inline-flex h-13 items-center justify-center gap-3 bg-ivory px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:bg-sand"
          >
            Request a Valuation
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </Link>

          <a
            href={site.phoneHref}
            className="inline-flex h-13 items-center justify-center gap-3 border border-white/45 px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-charcoal"
          >
            Call {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Track record */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="shell">
          <Reveal y={16}>
            <p className="eyebrow text-sand">Track Record</p>
          </Reveal>
          <Reveal y={18} delay={0.06}>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory/55">
              Twenty-two years of listings across nine Valley communities. The
              figures below are the whole brokerage, not a best quarter.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {site.stats.map((stat) => (
              <Reveal key={stat.label} y={18}>
                <div className="border-t border-white/15 pt-8">
                  <p className="font-display text-[3rem] leading-none text-ivory sm:text-[3.5rem]">
                    <StatCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="eyebrow mt-5 text-ivory/45">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing editorial */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Pricing</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-section mt-5 text-charcoal">
                Pricing Is Strategy,
                <br />
                Not Optimism.
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                <p>
                  Most sellers are told what their home is worth by someone
                  hoping to win the listing. We do it the other way around: you
                  receive the analysis in writing, including the number the
                  property would achieve if the pool of buyers is smaller than
                  expected, and then you decide.
                </p>
                <p>
                  A listing is not a lottery ticket. It is a position in a
                  market with a fixed number of buyers in your price band at any
                  moment — and the first three weeks tell you almost everything
                  about whether the position is right.
                </p>
              </div>
            </Reveal>

            <RevealGroup className="mt-12 space-y-8 border-t border-charcoal/20 pt-10">
              {pricingPrinciples.map((principle) => (
                <RevealItem key={principle.label}>
                  <h3 className="eyebrow text-bronze">{principle.label}</h3>
                  <p className="mt-3 max-w-lg text-[0.875rem] leading-relaxed text-charcoal/55">
                    {principle.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <ImageReveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full">
              <SmartImage
                src="/images/site/why-architecture.jpg"
                alt="Clean-lined Arizona architecture in afternoon light"
                fill
                quality={82}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ivory-200/50 py-20 md:py-28 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="The Process"
            title="Six Stages, No Surprises."
            subtitle="The same sequence for a courtyard home in Gilbert and a hillside estate in Paradise Valley. The scale changes; the preparation does not."
          />

          <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {sellingProcess.map((step) => (
              <RevealItem key={step.number}>
                <div className="group border-t border-charcoal/25 pt-7 transition-colors duration-700 hover:border-bronze">
                  <p className="font-display text-[2.75rem] leading-none text-charcoal/25 transition-colors duration-700 group-hover:text-bronze">
                    {step.number}
                  </p>
                  <h3 className="mt-6 font-display text-2xl text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-charcoal/55">
                    {step.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Marketing programme */}
      <section className="bg-charcoal">
        <div className="grid lg:grid-cols-2">
          <ImageReveal className="lg:order-1" amount={0.15}>
            <div className="relative h-[24rem] w-full sm:h-[32rem] lg:h-full lg:min-h-[44rem]">
              <SmartImage
                src="/images/site/hero-estate.jpg"
                alt="A contemporary Arizona estate photographed in the late afternoon"
                fill
                quality={82}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent lg:bg-gradient-to-l lg:from-charcoal/55 lg:to-transparent"
              />
            </div>
          </ImageReveal>

          <div className="flex items-center px-6 py-24 sm:px-10 md:py-32 lg:order-2 lg:px-16 lg:py-40 xl:px-24">
            <div className="w-full max-w-xl">
              <Reveal y={16}>
                <p className="eyebrow text-sand">The Programme</p>
              </Reveal>

              <Reveal y={22} delay={0.06}>
                <h2 className="text-section mt-5 text-ivory">
                  Marketing Built for
                  <br />
                  One Property.
                </h2>
              </Reveal>

              <Reveal y={18} delay={0.12}>
                <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-ivory/55">
                  Everything below is funded by the brokerage. Nothing is
                  deducted from your proceeds, and nothing is templated from
                  another listing.
                </p>
              </Reveal>

              <RevealGroup className="mt-12 space-y-8 border-t border-white/12 pt-10">
                {marketingPillars.map((pillar, index) => (
                  <RevealItem key={pillar.title}>
                    <div className="flex gap-6">
                      <span className="eyebrow shrink-0 pt-1 text-sand/60">
                        {String(index + 1).padStart(2, "0")}
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
            </div>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="Where We Sell"
            title="Nine Communities, Read Honestly."
            subtitle="Current median sale price, price per square foot and active inventory for the areas we work in most often. Figures are indicative and reviewed monthly."
            action={
              <Link
                href="/neighborhoods"
                className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
              >
                All Neighborhoods
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                  strokeWidth={1.6}
                />
              </Link>
            }
          />

          <div className="mt-14 border-t border-charcoal/20">
            <div className="hidden grid-cols-12 gap-6 border-b border-charcoal/15 py-4 md:grid">
              <span className="eyebrow col-span-5 text-charcoal/40">
                Community
              </span>
              <span className="eyebrow col-span-2 text-charcoal/40">
                Median Sale
              </span>
              <span className="eyebrow col-span-2 text-charcoal/40">
                Per Sq Ft
              </span>
              <span className="eyebrow col-span-2 text-charcoal/40">
                Active
              </span>
              <span className="col-span-1" />
            </div>

            {neighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.slug}
                href={`/neighborhoods/${neighborhood.slug}`}
                className="group flex flex-col gap-3 border-b border-charcoal/15 py-6 transition-colors duration-500 hover:border-bronze md:grid md:grid-cols-12 md:items-center md:gap-6 md:py-5"
              >
                <div className="md:col-span-5">
                  <span className="font-display text-xl text-charcoal transition-colors duration-500 group-hover:text-bronze">
                    {neighborhood.name}
                  </span>
                  <span className="mt-1 block text-[0.6875rem] uppercase tracking-[0.14em] text-charcoal/40">
                    {neighborhood.region}
                  </span>
                </div>

                <span className="font-display text-lg text-charcoal/85 md:col-span-2">
                  <span className="eyebrow mr-2 text-charcoal/35 md:hidden">
                    Median
                  </span>
                  {formatPriceCompact(neighborhood.medianPrice)}
                </span>

                <span className="text-[0.9375rem] text-charcoal/60 md:col-span-2">
                  <span className="eyebrow mr-2 text-charcoal/35 md:hidden">
                    Per Sq Ft
                  </span>
                  ${neighborhood.pricePerSqft}
                </span>

                <span className="text-[0.9375rem] text-charcoal/60 md:col-span-2">
                  <span className="eyebrow mr-2 text-charcoal/35 md:hidden">
                    Active
                  </span>
                  {neighborhood.inventory} homes
                </span>

                <span className="md:col-span-1 md:justify-self-end">
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 text-charcoal/30 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                    strokeWidth={1.5}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation */}
      <section
        id="valuation"
        className="scroll-mt-28 bg-ivory-200/50 py-20 md:py-28 lg:py-32"
      >
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Valuation</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-charcoal">
                What Is Your Home Worth?
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <div className="mt-7 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                <p>
                  Send us the address and a little context. You will receive a
                  written opinion of value — comparables, absorption and the
                  reasoning behind the number — usually within one business day.
                </p>
                <p>
                  There is no obligation and no cost. If the right answer is to
                  wait, we will tell you that instead.
                </p>
              </div>
            </Reveal>

            <Reveal y={18} delay={0.18}>
              <div className="mt-10 border-t border-charcoal/20 pt-8">
                <p className="eyebrow text-charcoal/40">Prefer to talk</p>
                <a
                  href={site.phoneHref}
                  className="mt-5 block font-display text-3xl text-charcoal transition-colors duration-500 hover:text-bronze"
                >
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="mt-3 block text-[0.9375rem] text-charcoal/60 transition-colors duration-500 hover:text-bronze"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.1} className="lg:col-span-7">
            <SellerValuationForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Questions</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-charcoal">
                What Sellers Ask Us.
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-charcoal/60">
                The six questions that come up in almost every listing
                conversation, answered the same way we answer them in person.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal y={20} delay={0.1}>
              <SellerFaq />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: sellerFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </>
  );
}
