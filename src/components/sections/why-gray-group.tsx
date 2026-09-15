import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SmartImage } from "@/components/common/smart-image";
import { StatCounter } from "@/components/motion/stat-counter";
import { site } from "@/lib/site";

export function WhyGrayGroup() {
  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <ImageReveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-[4/5]">
              <SmartImage
                src="/images/site/why-architecture.jpg"
                alt="Faceted glass and steel architecture against a clear Arizona sky"
                fill
                quality={82}
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </ImageReveal>

          {/* Copy */}
          <div className="lg:col-span-6 lg:pl-8">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">Why Gray Group</p>
            </Reveal>

            <Reveal y={22} delay={0.06}>
              <h2 className="text-section mt-5 text-charcoal">
                Local Knowledge.
                <br />
                Global Perspective.
              </h2>
            </Reveal>

            <Reveal y={18} delay={0.12}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-charcoal/60">
                <p>
                  Twenty-two years in the Valley have taught us that Arizona
                  property is not one market but a dozen, each moving on its own
                  logic. We work in nine of them, and we will tell you plainly
                  when the right answer is not the one you expected.
                </p>
                <p>
                  That local fluency is paired with a genuinely international
                  practice. A meaningful share of our clients buy from abroad —
                  from London, Vancouver, Seoul, Mexico City, São Paulo — and
                  they need a team that can operate across time zones,
                  currencies, entity structures and expectations without
                  friction.
                </p>
                <p>
                  The result is a practice built on preparation rather than
                  pressure: fewer clients, deeper work, and advice you can act
                  on.
                </p>
              </div>
            </Reveal>

            {/* Stats */}
            <RevealGroup className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
              {site.stats.map((stat) => (
                <RevealItem key={stat.label}>
                  <p className="font-display text-[2.5rem] leading-none text-charcoal sm:text-[2.75rem]">
                    <StatCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="eyebrow mt-4 text-charcoal/45">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
