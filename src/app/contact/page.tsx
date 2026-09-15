import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { socialIcons } from "@/components/ui/brand-icons";
import { firstParam } from "@/lib/filters";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with Gray Group about buying, selling, investing or relocating in Arizona. Camelback Towers, 6900 E Camelback Road, Suite 110, Scottsdale, AZ. 480.720.5686.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Gray Group | Arizona Luxury Real Estate",
    description:
      "Let's talk real estate. Reach the Gray Group team in Scottsdale, Arizona.",
    url: "/contact",
  },
};

const interestMap: Record<string, string> = {
  buying: "buying",
  selling: "selling",
  investing: "investing",
  relocating: "relocating",
  other: "other",
};

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const params = await searchParams;
  const requested = firstParam(params.interest)?.toLowerCase() ?? "";
  const defaultInterest = interestMap[requested] ?? "buying";
  const property = firstParam(params.property);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let's Talk Real Estate."]}
        subtitle="Whether you are buying, selling, investing or relocating, the first conversation is a working session — not a pitch."
        image="/images/site/contact-hero.jpg"
        imageAlt="Contemporary Arizona architecture at dusk"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal y={16}>
              <h2 className="text-editorial font-display text-charcoal">
                Send us the brief.
              </h2>
              <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-charcoal/60">
                The more specific you are, the more useful our first reply will
                be. Budget, timeline, must-haves and anything you are
                deliberately avoiding.
              </p>
            </Reveal>

            {property ? (
              <Reveal y={14} delay={0.08}>
                <p className="mt-8 border-l-2 border-bronze bg-ivory-200/50 px-5 py-4 text-[0.8125rem] text-charcoal/70">
                  Enquiring about{" "}
                  <span className="text-charcoal">{property.replace(/-/g, " ")}</span>
                </p>
              </Reveal>
            ) : null}

            <Reveal y={18} delay={0.1} className="mt-12">
              <ContactForm defaultInterest={defaultInterest} property={property} />
            </Reveal>
          </div>

          {/* Details */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal y={18} delay={0.12}>
              <div className="border-t border-charcoal/20 pt-8">
                <h3 className="eyebrow text-charcoal/40">Direct</h3>
                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="group flex items-start gap-4 text-charcoal transition-colors duration-500 hover:text-bronze"
                    >
                      <Phone
                        className="mt-1 h-4 w-4 shrink-0 text-bronze"
                        strokeWidth={1.5}
                      />
                      <span className="font-display text-2xl">
                        {site.phone}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.emailHref}
                      className="flex items-start gap-4 text-[0.9375rem] text-charcoal/70 transition-colors duration-500 hover:text-bronze"
                    >
                      <Mail
                        className="mt-1 h-4 w-4 shrink-0 text-bronze"
                        strokeWidth={1.5}
                      />
                      {site.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-12 border-t border-charcoal/20 pt-8">
                <h3 className="eyebrow text-charcoal/40">Office</h3>
                <address className="mt-6 flex items-start gap-4 not-italic">
                  <MapPin
                    className="mt-1 h-4 w-4 shrink-0 text-bronze"
                    strokeWidth={1.5}
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-charcoal/70">
                    {site.office.building}
                    <br />
                    {site.office.street}
                    <br />
                    {site.office.suite}
                    <br />
                    {site.office.city}, {site.office.state} {site.office.zip}
                  </span>
                </address>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${site.office.building}, ${site.office.street}, ${site.office.city}, ${site.office.state}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal underline decoration-bronze decoration-1 underline-offset-8 transition-colors duration-500 hover:text-bronze"
                >
                  Get Directions
                </a>
              </div>

              <div className="mt-12 border-t border-charcoal/20 pt-8">
                <h3 className="eyebrow text-charcoal/40">Hours</h3>
                <p className="mt-6 flex items-start gap-4 text-[0.9375rem] leading-relaxed text-charcoal/70">
                  <Clock
                    className="mt-1 h-4 w-4 shrink-0 text-bronze"
                    strokeWidth={1.5}
                  />
                  <span>
                    Monday – Friday, 8:30am – 6:00pm
                    <br />
                    Weekends by appointment
                  </span>
                </p>
              </div>

              <div className="mt-12 border-t border-charcoal/20 pt-8">
                <h3 className="eyebrow text-charcoal/40">Follow</h3>
                <div className="mt-6 flex items-center gap-3">
                  {site.social.map((social) => {
                    const Icon = socialIcons[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center border border-charcoal/20 text-charcoal/70 transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
