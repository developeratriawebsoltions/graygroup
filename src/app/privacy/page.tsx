import type { Metadata } from "next";

import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gray Group collects, uses and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect only the information you choose to provide through the enquiry form on this site: your first and last name, email address, telephone number, the nature of your interest, and the content of your message.",
      "We also collect aggregate, non-identifying analytics about how visitors use the site — pages viewed, approximate region, device type and referral source.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "Enquiry information is used solely to respond to your request, to prepare for a consultation, and to keep you informed about properties or market information relevant to what you asked about.",
      "We do not sell, rent or trade personal information. We do not share it with third parties except where required to complete a transaction you have asked us to undertake, or where required by law.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "This site uses essential cookies required for it to function. Where analytics are enabled, they are configured to collect aggregate data without identifying individual visitors.",
      "You can block or delete cookies through your browser settings; the site will continue to function.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "Enquiry records are retained for as long as necessary to serve the relationship, and in the case of completed transactions, for the period required by Arizona real estate regulation and federal tax law.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it. Requests are actioned within thirty days.",
      "To make a request, write to us at the address below.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `${site.legalName}, ${site.office.building}, ${site.office.street}, ${site.office.suite}, ${site.office.city}, ${site.office.state} ${site.office.zip}. Telephone ${site.phone}. Email ${site.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={["Privacy Policy"]}
        subtitle="How we handle the information you share with us."
        image="/images/site/desert-road.jpg"
        imageAlt="Arizona desert landscape"
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
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
