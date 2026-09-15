import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

import { PageHero } from "@/components/common/page-hero";
import { SmartImage } from "@/components/common/smart-image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CTASection } from "@/components/sections/cta-section";
import { LinkedinIcon } from "@/components/ui/brand-icons";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Gray Group team — Chris Gray, Jan Gray, Marcus Hale and Elena Ruiz. A small Arizona practice working with buyers, sellers, investors and international clients.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | Gray Group",
    description:
      "The people behind the properties: a deliberately small Arizona real estate practice.",
    url: "/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The Team"
        title={["People Behind", "the Properties."]}
        subtitle="Four people, four disciplines, one client list. The person you meet at the first consultation is the person who attends your closing."
        image="/images/site/phoenix-skyline.jpg"
        imageAlt="Downtown Phoenix high-rise architecture"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]}
      />

      {team.map((member, index) => (
        <section
          key={member.slug}
          id={member.slug}
          className={
            index % 2 === 0
              ? "scroll-mt-28 bg-ivory py-20 md:py-24 lg:py-28"
              : "scroll-mt-28 bg-ivory-200/50 py-20 md:py-24 lg:py-28"
          }
        >
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div
              className={`lg:col-span-4 ${index % 2 === 1 ? "lg:order-2 lg:col-start-9" : ""}`}
            >
              <Reveal y={20}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200">
                  <SmartImage
                    src={member.portrait}
                    alt={`${member.name}, ${member.role} at Gray Group`}
                    fill
                    quality={82}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal y={16} delay={0.1}>
                <ul className="mt-6 space-y-3">
                  <li>
                    <a
                      href={`tel:${member.phone.replace(/\./g, "")}`}
                      className="inline-flex items-center gap-3 text-[0.8125rem] text-charcoal/60 transition-colors duration-400 hover:text-bronze"
                    >
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {member.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-3 text-[0.8125rem] text-charcoal/60 transition-colors duration-400 hover:text-bronze"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                      {member.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[0.8125rem] text-charcoal/60 transition-colors duration-400 hover:text-bronze"
                    >
                      <LinkedinIcon className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </Reveal>
            </div>

            <div
              className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"}`}
            >
              <Reveal y={16}>
                <p className="eyebrow text-bronze">{member.role}</p>
              </Reveal>
              <Reveal y={20} delay={0.06}>
                <h2 className="text-section mt-5 text-charcoal">
                  {member.name}
                </h2>
              </Reveal>

              <Reveal y={18} delay={0.12}>
                <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                  {member.longBio.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              <RevealGroup className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                <RevealItem>
                  <h3 className="eyebrow text-charcoal/40">Credentials</h3>
                  <ul className="mt-5 space-y-2.5">
                    {member.credentials.map((credential) => (
                      <li
                        key={credential}
                        className="text-[0.8125rem] leading-relaxed text-charcoal/60"
                      >
                        {credential}
                      </li>
                    ))}
                  </ul>
                </RevealItem>

                <RevealItem>
                  <h3 className="eyebrow text-charcoal/40">Languages</h3>
                  <ul className="mt-5 space-y-2.5">
                    {member.languages.map((language) => (
                      <li
                        key={language}
                        className="text-[0.8125rem] leading-relaxed text-charcoal/60"
                      >
                        {language}
                      </li>
                    ))}
                  </ul>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </section>
      ))}

      <CTASection />
    </>
  );
}
