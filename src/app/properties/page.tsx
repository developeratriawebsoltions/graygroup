import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { PropertyFilters } from "@/components/property/property-filters";
import { PropertyGrid } from "@/components/property/property-grid";
import { CTASection } from "@/components/sections/cta-section";
import { describeQuery, filterProperties, firstParam } from "@/lib/filters";
import { properties } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Arizona Luxury Properties",
  description:
    "Browse Gray Group's portfolio of luxury homes, estates and investment properties across Paradise Valley, Scottsdale, Arcadia, Phoenix, Gilbert and Mesa.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Arizona Luxury Properties | Gray Group",
    description:
      "A curated portfolio of distinctive Arizona homes, from Paradise Valley estates to East Valley new construction.",
    url: "/properties",
  },
};

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const params = await searchParams;

  const query = {
    location: firstParam(params.location),
    type: firstParam(params.type),
    price: firstParam(params.price),
    beds: firstParam(params.beds),
    baths: firstParam(params.baths),
    status: firstParam(params.status),
    sort: firstParam(params.sort),
    q: firstParam(params.q),
  };

  const results = filterProperties(query);
  const summary = describeQuery(query);

  return (
    <>
      <PageHero
        eyebrow="The Portfolio"
        title={["Arizona Properties", "Worth Your Time."]}
        subtitle={`${properties.length} residences currently represented across nine Valley communities. Every listing independently verified before it appears here.`}
        image="/images/site/search-panel.jpg"
        imageAlt="A contemporary Arizona residence at twilight"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Properties" }]}
      />

      <PropertyFilters resultCount={results.length} />

      <section className="bg-ivory py-16 md:py-20 lg:py-24">
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-charcoal">
                {results.length}{" "}
                {results.length === 1 ? "Residence" : "Residences"}
              </h2>
              <p className="mt-1.5 text-[0.8125rem] text-charcoal/50">
                {summary
                  ? `Filtered by ${summary}`
                  : "Showing the full portfolio, featured first"}
              </p>
            </div>
            <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-charcoal/40">
              Gray Group Realty · Scottsdale, AZ
            </p>
          </div>

          {results.length > 0 ? (
            <PropertyGrid
              properties={results}
              columns={3}
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
            />
          ) : (
            <div className="border border-line bg-ivory-200/40 px-8 py-20 text-center">
              <h3 className="font-display text-2xl text-charcoal">
                No properties match those filters.
              </h3>
              <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-charcoal/55">
                Our portfolio is deliberately small, so this happens often. Tell
                us what you are looking for and we will search off-market
                inventory on your behalf.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
