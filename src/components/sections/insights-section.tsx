import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { InsightCard } from "@/components/insights/insight-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { insightsByDate } from "@/lib/data/insights";

export function InsightsSection({ limit = 4 }: { limit?: number }) {
  const posts = insightsByDate.slice(0, limit);

  return (
    <section className="bg-ivory-200/50 py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          eyebrow="Market Insights"
          title="Reading the Arizona Market."
          subtitle="Quarterly analysis, neighbourhood studies and practical guidance — written by the people doing the transactions."
          action={
            <Link
              href="/insights"
              className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
            >
              All Insights
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.6}
              />
            </Link>
          }
        />

        <RevealGroup className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {posts.map((insight) => (
            <RevealItem key={insight.slug}>
              <InsightCard insight={insight} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
