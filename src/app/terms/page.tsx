import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Gray Group website, including the accuracy of listing information and brokerage disclosures.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Accuracy of information",
    paragraphs: [
      "Property details, measurements, pricing and availability published on this site are provided for general information and are deemed reliable but not guaranteed. Square footage, lot dimensions and feature lists should be independently verified before you rely on them.",
      "All listings are subject to prior sale, change of price, or withdrawal without notice.",
    ],
  },
  {
    heading: "No offer or advice",
    paragraphs: [
      "Nothing on this site constitutes an offer to buy or sell real property, or a solicitation in any jurisdiction where Gray Group is not licensed to operate.",
      "Content published under Insights is general market commentary. It is not legal, tax, accounting or investment advice, and it should not be relied on as a substitute for advice from a qualified professional engaged for your specific circumstances.",
    ],
  },
  {
    heading: "Brokerage relationship",
    paragraphs: [
      "No agency or fiduciary relationship is created by using this website or by submitting an enquiry. A brokerage relationship is established only by a written agreement signed by both parties.",
      `${site.legalName} is a licensed real estate brokerage in the State of Arizona.`,
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The design, text, layout and original photography presentation of this site are the property of Gray Group and may not be reproduced without written permission.",
      "Photography is used under licence. Third-party trademarks referenced on this site remain the property of their respective owners.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "This site links to external services including mapping providers and social platforms. We are not responsible for the content, availability or privacy practices of those services.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Gray Group is not liable for any loss arising from reliance on information published on this site.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the State of Arizona, United States of America.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={["Terms of Use"]}
        subtitle="The basis on which this website and its content are provided."
        image="/images/site/desert-road.jpg"
        imageAlt="Arizona desert landscape"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />

      <section className="bg-ivory py-20 md:py-24 lg:py-28">
        <div className="shell max-w-3xl">
          <Reveal y={16}>
            <p className="text-[0.8125rem] tracking-wide text-charcoal/45">
              Last updated: January 2026
            </p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <Reveal key={section.heading} y={16}>
                <div>
                  <h2 className="font-display text-[1.75rem] text-charcoal">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-[1rem] leading-[1.75] text-charcoal/65">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
