"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { sellerFaqs } from "@/lib/data/sellers";

/**
 * Seller FAQ. Radix handles the keyboard model and aria wiring; the panel
 * animation lives in globals.css so it matches the site's easing curve.
 */
export function SellerFaq() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="faq-0"
      className="border-t border-charcoal/20"
    >
      {sellerFaqs.map((faq, index) => (
        <Accordion.Item
          key={faq.question}
          value={`faq-${index}`}
          className="border-b border-charcoal/20"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-7 text-left">
              <span className="font-display text-xl text-charcoal transition-colors duration-500 group-hover:text-bronze md:text-2xl">
                {faq.question}
              </span>
              <Plus
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-1 h-4 w-4 shrink-0 text-bronze transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
              />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="accordion-panel">
            <p className="max-w-2xl pb-8 pr-6 text-[0.9375rem] leading-relaxed text-charcoal/60">
              {faq.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
