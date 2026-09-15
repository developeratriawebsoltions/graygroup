import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Footprints, GraduationCap, Home, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { CTASection } from "@/components/sections/cta-section";
import {
  getNeighborhood,
  neighborhoods,
} from "@/lib/data/neighborhoods";
import { getPropertiesByNeighborhood } from "@/lib/data/properties";
import { formatPrice, formatPriceCompact } from "@/lib/utils";

export function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({ slug: neighborhood.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);

  if (!neighborhood) return { title: "Neighborhood not found" };

  return {
    title: `${neighborhood.name} Real Estate`,
    description: `${neighborhood.summary} Median sale price ${formatPrice(neighborhood.medianPrice)}.`,
    alternates: { canonical: `/neighborhoods/${neighborhood.slug}` },
    openGraph: {
      title: `${neighborhood.name} Real Estate | Gray Group`,
      description: neighborhood.summary,
      url: `/neighborhoods/${neighborhood.slug}`,
      images: [{ url: neighborhood.image, width: 1600, height: 1067, alt: neighborhood.name }],
    },
  };
}

export default async function NeighborhoodPage({
  params,
}: PageProps<"/neighborhoods/[slug]">) {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);

  if (!neighborhood) notFound();

  const listings = getPropertiesByNeighborhood(neighborhood.slug);
  const others = neighborhoods
    .filter((n) => n.slug !== neighborhood.slug)
    .slice(0, 3);

  const stats = [
    {
      icon: TrendingUp,
      label: "Median Sale Price",
      value: formatPriceCompact(neighborhood.medianPrice),
    },
    {
      icon: Home,
      label: "Price per Sq Ft",
      value: `$${neighborhood.pricePerSqft}`,
    },
    {
      icon: Footprints,
      label: "Walk Score",
      value: String(neighborhood.walkScore),
    },
    {
      icon: GraduationCap,
      label: "Active Listings",
      value: String(neighborhood.inventory),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={neighborhood.region}
        title={[neighborhood.name]}
        subtitle={neighborhood.summary}
        image={neighborhood.image}
        imageAlt={`${neighborhood.name}, Arizona`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Neighborhoods", href: "/neighborhoods" },
          { label: neighborhood.name },
        ]}
      />

      {/* Market snapshot */}
      <section className="border-b border-line bg-ivory-200/60">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-8 py-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <stat.icon
                className="h-4 w-4 text-bronze"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="eyebrow mt-4 text-charcoal/40">{stat.label}</p>
              <p className="mt-2 font-display text-2xl text-charcoal">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial + facts */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">The Market</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-charcoal">
                {neighborhood.tagline}
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                {neighborhood.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal y={18} delay={0.1}>
              <div className="border border-line bg-ivory-200/40 p-8">
                <h3 className="eyebrow text-charcoal/40">Market Snapshot</h3>
                <dl className="mt-6 space-y-4">
                  {neighborhood.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-[0.8125rem] text-charcoal/50">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-[0.875rem] text-charcoal">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal y={18} delay={0.16}>
              <div className="mt-8">
                <h3 className="eyebrow text-charcoal/40">Why Buyers Choose It</h3>
                <ul className="mt-6 space-y-3">
                  {neighborhood.lifestyle.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[0.875rem] leading-relaxed text-charcoal/60"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-bronze"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Schools */}
      <section className="bg-charcoal py-20 md:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal y={16}>
              <p className="eyebrow text-sand">Schools</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-ivory">
                Education in
                <br />
                {neighborhood.name}.
              </h2>
            </Reveal>
            <Reveal y={16} delay={0.12}>
              <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-ivory/50">
                District boundaries shift street by street. We verify the
                assignment for any specific address before you write an offer.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px self-start bg-white/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {neighborhood.schools.map((school) => (
              <RevealItem key={school.name} className="bg-charcoal">
                <div className="flex h-full flex-col justify-between gap-6 p-7">
                  <p className="font-display text-xl text-ivory">
                    {school.name}
                  </p>
                  <p className="eyebrow text-ivory/40">{school.type}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Listings */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Available Now"
            title={`Properties in ${neighborhood.name}.`}
            subtitle={
              listings.length
                ? `${listings.length} ${
                    listings.length === 1 ? "residence" : "residences"
                  } currently represented by Gray Group in this community.`
                : "We have no public listings here at the moment — but we frequently transact off-market. Ask us what is available privately."
            }
            action={
              <Link
                href={`/properties?location=${encodeURIComponent(neighborhood.name)}`}
                className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
              >
                All {neighborhood.name} Listings
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                  strokeWidth={1.6}
                />
              </Link>
            }
          />

          {listings.length > 0 ? (
            <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((property) => (
                <PropertyCard
                  key={property.slug}
                  property={property}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                />
              ))}
            </div>
          ) : (
            <Reveal y={18} className="mt-14">
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-3 bg-charcoal px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:bg-bronze"
              >
                Ask About Off-Market Inventory
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* Nearby */}
      <section className="bg-ivory-200/50 py-20 md:py-24">
        <div className="shell">
          <SectionHeading eyebrow="Nearby" title="Adjacent Communities." />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <RevealItem key={other.slug} className="h-[20rem]">
                <Link
                  href={`/neighborhoods/${other.slug}`}
                  className="group relative block h-full overflow-hidden bg-charcoal"
                >
                  <SmartImage
                    src={other.image}
                    alt={`${other.name}, Arizona`}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-7">
                    <p className="eyebrow text-sand/80">{other.region}</p>
                    <h3 className="mt-3 font-display text-2xl text-white">
                      {other.name}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sand">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
}
