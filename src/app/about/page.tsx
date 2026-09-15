import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { SmartImage } from "@/components/common/smart-image";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatCounter } from "@/components/motion/stat-counter";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { TeamSection } from "@/components/sections/team-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Gray Group",
  description:
    "A Scottsdale-based luxury real estate practice built on preparation rather than pressure — serving buyers, sellers, investors and international clients across Arizona.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Gray Group | Arizona Luxury Real Estate",
    description:
      "Twenty-two years in the Arizona market, a deliberately small client list, and advice you can act on.",
    url: "/about",
  },
};

const principles = [
  {
    number: "01",
    title: "Advice Before Enthusiasm",
    body: "If a property is wrong for you, we will say so in the first conversation rather than the fifth. The fastest way to lose a client is to tell them what they want to hear.",
  },
  {
    number: "02",
    title: "Fewer Clients, Deeper Work",
    body: "We take a deliberately limited number of engagements each year. The principal who pitches your listing is the principal who negotiates it.",
  },
  {
    number: "03",
    title: "Local Data, Honestly Read",
    body: "Comparables, absorption and days-on-market — reported without the selective framing that makes a weak position look strong.",
  },
  {
    number: "04",
    title: "Preparation Wins Terms",
    body: "Inspections, disclosures and title work resolved before an offer arrives. Most of the value in a transaction is created before signatures.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={["Built on Preparation,", "Not Pressure."]}
        subtitle="Gray Group is a small, deliberately focused Arizona practice. We work in nine communities, we know them properly, and we tell our clients the truth about what the data says."
        image="/images/site/about-hero.jpg"
        imageAlt="Minimal white architecture against a clear sky"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Our Story</p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-section mt-5 text-charcoal">
                A Practice, Not
                <br />
                a Pipeline.
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.12}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                <p>
                  Gray Group began with a straightforward frustration: the
                  Arizona luxury market was being served by volume operations
                  that treated a $3M purchase with the same process as a
                  $300,000 one. The paperwork was the same. The attention was
                  not.
                </p>
                <p>
                  We built the opposite. A small team, a defined territory of
                  nine communities, and a process designed around the questions
                  that actually determine whether a property is a good decision
                  — orientation, drainage, permit history, absorption, and the
                  true cost of the work a house will need.
                </p>
                <p>
                  Two decades later the practice looks much the same. We still
                  take fewer clients than we could. We still write the pricing
                  analysis ourselves. And we still tell people when the right
                  answer is to wait.
                </p>
              </div>
            </Reveal>
          </div>

          <ImageReveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full">
              <SmartImage
                src="/images/site/story-interior.jpg"
                alt="A warm, open-plan Arizona living space in timber and plaster"
                fill
                quality={82}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="shell grid gap-10 sm:grid-cols-3 sm:gap-6">
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
      </section>

      {/* Principles */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="shell">
          <SectionHeading
            eyebrow="How We Work"
            title="Four Things We Do Differently."
            subtitle="None of these are novel. They are simply expensive to do at volume, which is why so few brokerages do them."
          />

          <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-20">
            {principles.map((principle) => (
              <RevealItem key={principle.number}>
                <div className="group border-t border-charcoal/20 pt-7 transition-colors duration-700 hover:border-bronze">
                  <p className="font-display text-[2.5rem] leading-none text-charcoal/20 transition-colors duration-700 group-hover:text-bronze">
                    {principle.number}
                  </p>
                  <h3 className="mt-6 font-display text-2xl text-charcoal">
                    {principle.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-charcoal/55">
                    {principle.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal y={18} delay={0.1}>
            <Link
              href="/team"
              className="group mt-16 inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
            >
              Meet the Team
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.6}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      <TeamSection />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}
