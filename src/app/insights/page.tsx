import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { InsightCard } from "@/components/insights/insight-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { insightsByDate } from "@/lib/data/insights";

export const metadata: Metadata = {
  title: "Market Insights",
  description:
    "Arizona market reports, neighbourhood analyses and practical buyer and seller guidance from the Gray Group team.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Market Insights | Gray Group",
    description:
      "Quarterly Arizona market analysis, neighbourhood studies and practical guidance.",
    url: "/insights",
  },
};

export default function InsightsPage() {
  const [lead, ...rest] = insightsByDate;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={["Reading the", "Arizona Market."]}
        subtitle="Quarterly market reports, neighbourhood studies and the practical guidance we give our own clients — written by the people doing the transactions."
        image="/images/site/contact-hero.jpg"
        imageAlt="Contemporary Arizona architecture at dusk"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      {/* Lead article */}
      <section className="bg-ivory py-16 md:py-20 lg:py-24">
        <div className="shell">
          <Reveal y={16}>
            <p className="eyebrow text-bronze">Latest</p>
          </Reveal>

          <Reveal y={20} delay={0.06} className="mt-10">
            <InsightCard
              insight={lead}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 90vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Archive */}
      <section className="bg-ivory-200/50 py-16 md:py-20 lg:py-24">
        <div className="shell">
          <Reveal y={16}>
            <h2 className="eyebrow text-charcoal/40">Archive</h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight) => (
              <RevealItem key={insight.slug}>
                <InsightCard
                  insight={insight}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
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
