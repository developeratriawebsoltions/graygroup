import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  Check,
  MapPin,
  Move3d,
  Ruler,
  Trees,
} from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SmartImage } from "@/components/common/smart-image";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyGallery } from "@/components/property/property-gallery";
import { VirtualTour } from "@/components/property/virtual-tour";
import { StickyCta } from "@/components/property/sticky-cta";
import { StatusBadge } from "@/components/property/status-badge";
import { CTASection } from "@/components/sections/cta-section";
import { getNeighborhood } from "@/lib/data/neighborhoods";
import {
  getProperty,
  getRelatedProperties,
  properties,
} from "@/lib/data/properties";
import { getTeamMembers } from "@/lib/data/team";
import { site } from "@/lib/site";
import { formatNumber, formatPrice, propertySpecLine } from "@/lib/utils";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) {
    return { title: "Property not found" };
  }

  const title = `${property.name}, ${property.city}`;
  const description = `${property.summary} ${propertySpecLine(property)} · ${formatPrice(property.price)}.`;

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: `${title} | Gray Group`,
      description,
      url: `/properties/${property.slug}`,
      images: [{ url: property.heroImage, width: 1800, height: 1200, alt: title }],
    },
  };
}

export default async function PropertyPage({
  params,
}: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getProperty(slug);

  if (!property) notFound();

  const neighborhood = getNeighborhood(property.neighborhoodSlug);
  const agents = getTeamMembers(property.agentSlugs);
  const related = getRelatedProperties(property.slug, 3);

  const specs = [
    { icon: BedDouble, label: "Bedrooms", value: String(property.beds) },
    { icon: Bath, label: "Bathrooms", value: String(property.baths) },
    { icon: Ruler, label: "Interior", value: `${formatNumber(property.sqft)} sq ft` },
    { icon: Trees, label: "Lot", value: `${property.lotAcres} acres` },
    { icon: Calendar, label: "Built", value: String(property.yearBuilt) },
    { icon: MapPin, label: "MLS", value: property.mls },
  ];

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    property.location.lng - 0.02
  }%2C${property.location.lat - 0.012}%2C${property.location.lng + 0.02}%2C${
    property.location.lat + 0.012
  }&layer=mapnik&marker=${property.location.lat}%2C${property.location.lng}`;

  return (
    <>
      <PageHero
        eyebrow={property.city}
        title={[property.name]}
        subtitle={property.address}
        image={property.heroImage}
        imageAlt={`${property.name} in ${property.city}, Arizona`}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: property.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="font-display text-[2.25rem] leading-none text-white">
            {formatPrice(property.price)}
          </p>
          <StatusBadge status={property.status} />
          <p className="text-[0.8125rem] tracking-wide text-white/60">
            {propertySpecLine(property)}
          </p>
        </div>
      </PageHero>

      {/* Spec strip */}
      <section className="border-b border-line bg-ivory-200/60">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {specs.map((spec) => (
            <div key={spec.label}>
              <spec.icon
                className="h-4 w-4 text-bronze"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="eyebrow mt-4 text-charcoal/40">{spec.label}</p>
              <p className="mt-2 text-[0.9375rem] text-charcoal">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Overview</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-charcoal">
                {property.summary}
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                {property.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal y={18} delay={0.1}>
              <div className="border border-line bg-ivory-200/40 p-8">
                <h3 className="eyebrow text-charcoal/40">At a Glance</h3>
                <dl className="mt-6 space-y-4">
                  {property.highlights.map((highlight) => (
                    <div
                      key={highlight.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-[0.8125rem] text-charcoal/50">
                        {highlight.label}
                      </dt>
                      <dd className="text-[0.875rem] text-charcoal">
                        {highlight.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${property.address}, ${property.city}, AZ`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
                >
                  Open in Maps
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1.6}
                  />
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Features */}
      <section className="bg-charcoal py-20 md:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Property Features"
            tone="light"
            title="What This Home Offers."
          />

          <RevealGroup className="mt-14 grid gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {property.features.map((feature) => (
              <RevealItem key={feature}>
                <div className="flex gap-3.5 border-b border-white/10 pb-5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-sand"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span className="text-[0.875rem] leading-relaxed text-ivory/70">
                    {feature}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Gallery"
            title="Inside the Residence."
            subtitle="Photographed on site. Select any plate — or the thumbnail beneath it — to open the full-screen gallery."
          />
          <Reveal y={20} className="mt-14">
            <PropertyGallery images={property.gallery} />
          </Reveal>
        </div>
      </section>

      {/* 360° virtual tour */}
      {property.tour?.length ? (
        <section
          id="tour"
          className="scroll-mt-28 bg-ivory-200/50 py-20 md:py-24 lg:py-28"
        >
          <div className="shell">
            <SectionHeading
              eyebrow="360° Virtual Tour"
              title="Walk It Before You Fly In."
              subtitle="Four connected viewpoints through the residence, captured as seamless panoramas. Drag to look around, or expand to full screen."
            />
            <Reveal y={20} className="mt-14">
              <VirtualTour
                scenes={property.tour}
                propertyName={`${property.name}, ${property.city}`}
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Location + neighbourhood */}
      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Location</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-editorial mt-5 font-display text-charcoal">
                {property.address}
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.1}>
              <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-charcoal/60">
                {property.location.blurb}
              </p>
            </Reveal>

            <Reveal y={18} delay={0.14}>
              <div className="mt-8 border border-line">
                <iframe
                  title={`Map showing ${property.address}, ${property.city}, Arizona`}
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full grayscale-[35%]"
                />
              </div>
            </Reveal>
          </div>

          {neighborhood ? (
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal y={18} delay={0.12}>
                <p className="eyebrow text-bronze">Neighborhood</p>
                <h3 className="mt-5 font-display text-3xl text-charcoal">
                  {neighborhood.name}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-charcoal/60">
                  {neighborhood.summary}
                </p>

                <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-ivory-200">
                  <SmartImage
                    src={neighborhood.image}
                    alt={`${neighborhood.name}, Arizona`}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <Link
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="group mt-6 inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
                >
                  Explore {neighborhood.name}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1.6}
                  />
                </Link>
              </Reveal>
            </div>
          ) : null}
        </div>
      </section>

      {/* Agent contact */}
      <section id="schedule" className="scroll-mt-28 bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Schedule a Showing"
            title="Speak With the Listing Team."
            subtitle="Private viewings are arranged directly with the agent — including evening and weekend appointments."
          />

          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <RevealItem key={agent.slug}>
                <div className="flex gap-6 border border-line p-6">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-ivory-200">
                    <SmartImage
                      src={agent.portrait}
                      alt={agent.name}
                      fill
                      quality={75}
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-charcoal">
                      {agent.name}
                    </h3>
                    <p className="eyebrow mt-2 text-bronze">{agent.role}</p>
                    <a
                      href={`tel:${agent.phone.replace(/\./g, "")}`}
                      className="mt-4 block text-[0.8125rem] text-charcoal/60 transition-colors duration-400 hover:text-bronze"
                    >
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}?subject=${encodeURIComponent(
                        `Enquiry: ${property.name}, ${property.city}`,
                      )}`}
                      className="mt-1 block truncate text-[0.8125rem] text-charcoal/60 transition-colors duration-400 hover:text-bronze"
                    >
                      {agent.email}
                    </a>
                  </div>
                </div>
              </RevealItem>
            ))}

            <RevealItem>
              <div className="flex h-full flex-col justify-between border border-charcoal bg-charcoal p-6">
                <div>
                  <h3 className="font-display text-xl text-ivory">
                    Request a private viewing
                  </h3>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-ivory/55">
                    Send the team a note and we will confirm a time within one
                    business day.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/contact?interest=buying&property=${property.slug}`}
                    className="inline-flex h-11 items-center justify-center gap-2.5 bg-ivory px-6 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:bg-sand"
                  >
                    Send Inquiry
                  </Link>
                  <a
                    href={site.phoneHref}
                    className="inline-flex h-11 items-center justify-center border border-white/35 px-6 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:border-white hover:bg-white hover:text-charcoal"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Related */}
      <section className="bg-ivory-200/50 py-20 md:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="Also Consider"
            title="Comparable Residences."
          />
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PropertyCard
                key={item.slug}
                property={item}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <StickyCta
        price={property.price}
        name={property.name}
        phoneHref={site.phoneHref}
        phone={site.phone}
      />
    </>
  );
}
