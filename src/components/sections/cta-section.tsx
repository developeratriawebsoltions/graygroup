import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { Reveal } from "@/components/motion/reveal";

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src="/images/site/cta-desert-dusk.jpg"
          alt=""
          fill
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/62" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/35 to-charcoal/55" />
      </div>

      <div className="shell flex min-h-[34rem] flex-col justify-center py-28 md:min-h-[40rem] md:py-36">
        <div className="max-w-3xl">
          <Reveal y={16}>
            <p className="eyebrow text-sand">Next Steps</p>
          </Reveal>

          <Reveal y={24} delay={0.06}>
            <h2 className="text-hero mt-7 text-white">
              Let&rsquo;s Find Your
              <br />
              Next Chapter.
            </h2>
          </Reveal>

          <Reveal y={18} delay={0.14}>
            <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-white/70 sm:text-base">
              Whether you&rsquo;re buying, selling or investing, let&rsquo;s
              build the right strategy together.
            </p>
          </Reveal>

          <Reveal y={18} delay={0.2}>
            <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center justify-center gap-3 bg-ivory px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:bg-sand"
              >
                Start a Conversation
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.6}
                />
              </Link>

              <Link
                href="/properties"
                className="inline-flex h-13 items-center justify-center gap-3 border border-white/45 px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-charcoal"
              >
                Explore Properties
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
