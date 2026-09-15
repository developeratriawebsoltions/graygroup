import type { Testimonial } from "@/types";

/**
 * Client testimonials. Names are abbreviated to first name and initial to
 * respect client privacy, which is standard practice for luxury brokerages.
 */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Professional, persistent and perceptive throughout the entire process. Chris understood what we were looking for before we could articulate it ourselves.",
    name: "Margaret L.",
    detail: "Purchased in Paradise Valley",
  },
  {
    id: "t2",
    quote:
      "We were buying from London and had four days in Arizona. Gray Group had a shortlist ready that was genuinely worth our time — not twenty houses, five.",
    name: "James & Priya R.",
    detail: "Purchased in North Scottsdale",
  },
  {
    id: "t3",
    quote:
      "The pricing analysis was more rigorous than anything we received from two other brokerages. We listed at the number they recommended and closed above it.",
    name: "David K.",
    detail: "Sold in Arcadia",
  },
  {
    id: "t4",
    quote:
      "Jan caught a drainage issue during the inspection period that would have cost us six figures within two years. That single conversation justified the entire relationship.",
    name: "Sandra M.",
    detail: "Purchased in Central Scottsdale",
  },
  {
    id: "t5",
    quote:
      "Marcus modelled three hold scenarios before we made an offer. It is the first time a real estate professional has shown me a downside case unprompted.",
    name: "Anthony B.",
    detail: "Investment purchase, Tempe",
  },
];
