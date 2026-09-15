import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const pillars = [
  {
    title: "International Buyers",
    body: "Purchasing from abroad is a coordination problem before it is a real estate one. We work across time zones and currencies, and we are clear about what we do not advise on.",
  },
  {
    title: "Investment Properties",
    body: "Underwriting, 1031 exchange sequencing and hold-period modelling for clients treating Arizona property as an allocation rather than a purchase.",
  },
  {
    title: "Relocation",
    body: "School tours, neighbourhood orientation and a sequenced itinerary so a three-day visit produces a decision rather than a shortlist.",
  },
  {
    title: "Cross-Cultural Communication",
    body: "Four languages across the team, and an understanding that expectations around negotiation, timeline and disclosure differ by market.",
  },
];

const origins = [
  "United Kingdom",
  "Canada",
  "Germany",
  "Mexico",
  "Brazil",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
];

/** Decorative globe wireframe — meridians and parallels, drawn not mapped. */
function GlobeLines() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 text-sand/[0.14] lg:-right-24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="300" cy="300" r="260" />
      {[0.18, 0.38, 0.58, 0.78, 1].map((k) => (
        <ellipse key={k} cx="300" cy="300" rx={260 * k} ry="260" />
      ))}
      {[0.28, 0.55, 0.82, 1].map((k) => (
        <ellipse key={k} cx="300" cy="300" rx="260" ry={260 * k} />
      ))}
      <line x1="40" y1="300" x2="560" y2="300" />
      <line x1="300" y1="40" x2="300" y2="560" />
    </svg>
  );
}

export function InternationalSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal-800 py-24 md:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.16]">
        <SmartImage
          src="/images/site/global-canyon.jpg"
          alt=""
          fill
          quality={60}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal-800 via-charcoal-800/92 to-charcoal-800/70"
      />
      <GlobeLines />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <p className="eyebrow text-sand">International Clients</p>
            </Reveal>

            <Reveal y={22} delay={0.06}>
              <h2 className="text-section mt-5 text-ivory">
                Arizona, With a
                <br />
                Global Perspective.
              </h2>
            </Reveal>

            <Reveal y={18} delay={0.12}>
              <p className="mt-7 max-w-md text-[0.9375rem] leading-relaxed text-ivory/55">
                A meaningful share of our clients live somewhere other than
                Arizona. Some are buying a second home, some are relocating a
                family, and some are placing capital. The common thread is that
                they need a local team that operates with the same rigour they
                would expect at home.
              </p>
            </Reveal>

            <Reveal y={18} delay={0.18}>
              <div className="mt-12 border-t border-white/12 pt-8">
                <p className="eyebrow text-ivory/35">Clients have come to us from</p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  {origins.map((origin) => (
                    <li
                      key={origin}
                      className="text-[0.8125rem] tracking-wide text-ivory/60"
                    >
                      {origin}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal y={18} delay={0.22}>
              <Link
                href="/contact?interest=relocating"
                className="group mt-11 inline-flex h-13 items-center gap-3 border border-white/35 px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-500 hover:border-sand hover:bg-sand hover:text-charcoal"
              >
                Enquire From Abroad
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-px self-start bg-white/10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {pillars.map((pillar, i) => (
              <RevealItem key={pillar.title} className="bg-charcoal-800">
                <div className="h-full p-8 lg:p-9">
                  <span className="eyebrow text-sand/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-xl text-ivory">
                    {pillar.title}
                  </h3>
                  <p className="mt-3.5 text-[0.875rem] leading-relaxed text-ivory/50">
                    {pillar.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
