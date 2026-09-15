import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "We start with a brief, not a listing feed. Budget, timeline, how you actually live, and what you are unwilling to compromise on.",
  },
  {
    number: "02",
    title: "Evaluate",
    body: "A vetted shortlist, then the diligence that matters — orientation, drainage, permit history, and the true cost of any work required.",
  },
  {
    number: "03",
    title: "Negotiate",
    body: "We build the case for our number from the data, and we hold it. Most of the value in a purchase is created before signatures.",
  },
  {
    number: "04",
    title: "Close",
    body: "Inspections, appraisal, title and financing managed to a timeline. You are informed at every stage and surprised at none.",
  },
];

export function BuyerSection() {
  return (
    <section className="bg-ivory py-24 md:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={16}>
              <p className="eyebrow text-bronze">For Buyers</p>
            </Reveal>
            <Reveal y={22} delay={0.06}>
              <h2 className="text-section mt-5 text-charcoal">
                More Than a Search.
                <br />
                A Strategy.
              </h2>
            </Reveal>
          </div>

          <Reveal y={18} delay={0.12} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="text-[0.9375rem] leading-relaxed text-charcoal/60">
              Arizona has roughly forty thousand active listings at any moment.
              Almost none of them are right for you, and the ones that are will
              not wait. Our job is to compress the search into a small number of
              genuinely considered decisions — and to make sure the diligence
              behind each one holds up years later.
            </p>
            <Link
              href="/contact?interest=buying"
              className="group mt-8 inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
            >
              Start a Buyer Consultation
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                strokeWidth={1.6}
              />
            </Link>
          </Reveal>
        </div>

        {/* Steps — hairline rail, no cards */}
        <RevealGroup className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {steps.map((step) => (
            <RevealItem key={step.number}>
              <div className="group border-t border-charcoal/25 pt-7 transition-colors duration-700 hover:border-bronze">
                <p className="font-display text-[2.75rem] leading-none text-charcoal/25 transition-colors duration-700 group-hover:text-bronze">
                  {step.number}
                </p>
                <h3 className="mt-6 font-display text-2xl text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-charcoal/55">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
