import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { InsightCard } from "@/components/insights/insight-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { getInsight, getRelatedInsights, insightsByDate } from "@/lib/data/insights";
import { getTeamMember } from "@/lib/data/team";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return insightsByDate.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) return { title: "Article not found" };

  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: `${insight.title} | Gray Group`,
      description: insight.excerpt,
      url: `/insights/${insight.slug}`,
      publishedTime: insight.date,
      images: [{ url: insight.image, width: 1600, height: 1200, alt: insight.title }],
    },
  };
}

export default async function InsightPage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) notFound();

  const author = getTeamMember(insight.authorSlug);
  const related = getRelatedInsights(insight.slug, 3);

  return (
    <>
      <PageHero
        eyebrow={insight.category}
        title={[insight.title]}
        image={insight.image}
        imageAlt={insight.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: insight.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem] text-white/60">
          <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          <span aria-hidden="true" className="h-px w-6 bg-white/30" />
          <span className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
            {insight.readMinutes} min read
          </span>
          {author ? (
            <>
              <span aria-hidden="true" className="h-px w-6 bg-white/30" />
              <span>By {author.name}</span>
            </>
          ) : null}
        </div>
      </PageHero>

      {/* Article */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <Reveal y={18}>
              <p className="text-editorial font-display text-charcoal/80">
                {insight.excerpt}
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              {insight.body.map((block, i) => (
                <Reveal key={block.heading ?? `block-${i}`} y={18} delay={0.04}>
                  <div>
                    {block.heading ? (
                      <h2 className="font-display text-[1.75rem] leading-snug text-charcoal">
                        {block.heading}
                      </h2>
                    ) : null}
                    <div
                      className={`space-y-5 text-[1rem] leading-[1.75] text-charcoal/65 ${
                        block.heading ? "mt-6" : ""
                      }`}
                    >
                      {block.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <Link
                href="/insights"
                className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
                  strokeWidth={1.6}
                />
                All Insights
              </Link>
            </div>
          </article>

          {/* Author */}
          {author ? (
            <aside className="lg:col-span-3 lg:col-start-10">
              <Reveal y={18} delay={0.1}>
                <div className="border border-line bg-ivory-200/40 p-7">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200">
                    <SmartImage
                      src={author.portrait}
                      alt={author.name}
                      fill
                      quality={75}
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-charcoal">
                    {author.name}
                  </h3>
                  <p className="eyebrow mt-2 text-bronze">{author.role}</p>
                  <p className="mt-4 text-[0.8125rem] leading-relaxed text-charcoal/55">
                    {author.bio}
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-6 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:text-bronze"
                  >
                    Get in Touch
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      strokeWidth={1.6}
                    />
                  </Link>
                </div>
              </Reveal>
            </aside>
          ) : null}
        </div>
      </section>

      {/* Related */}
      <section className="bg-ivory-200/50 py-20 md:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Keep Reading" title="Related Insights." />
          <RevealGroup className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RevealItem key={item.slug}>
                <InsightCard
                  insight={item}
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
