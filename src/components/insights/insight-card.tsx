import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { cn, formatDate } from "@/lib/utils";
import type { Insight } from "@/types";

export function InsightCard({
  insight,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  aspect = "aspect-[4/3]",
}: {
  insight: Insight;
  className?: string;
  sizes?: string;
  aspect?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link
        href={`/insights/${insight.slug}`}
        className="block focus-visible:outline-offset-4"
        aria-label={`Read ${insight.title}`}
      >
        <div className={cn("relative overflow-hidden bg-ivory-200", aspect)}>
          <SmartImage
            src={insight.image}
            alt={insight.title}
            fill
            quality={82}
            sizes={sizes}
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/20" />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-3 text-[0.6875rem] tracking-[0.14em] text-charcoal/45">
            <span className="uppercase text-bronze">{insight.category}</span>
            <span aria-hidden="true" className="h-px w-4 bg-charcoal/25" />
            <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          </div>

          <h3 className="mt-4 font-display text-[1.5rem] leading-snug text-charcoal transition-colors duration-500 group-hover:text-bronze">
            {insight.title}
          </h3>

          <p className="mt-3 text-[0.875rem] leading-relaxed text-charcoal/55">
            {insight.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal">
            Read Article
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
              strokeWidth={1.6}
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
