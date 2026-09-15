/**
 * Content for the seller landing page.
 *
 * Kept in its own module rather than inline in the page so that the rendered
 * FAQ and the `FAQPage` structured-data block can read from one source — they
 * can never drift apart.
 */

export interface SellingStep {
  number: string;
  title: string;
  body: string;
}

/** The six stages every Gray Group listing moves through, in order. */
export const sellingProcess: SellingStep[] = [
  {
    number: "01",
    title: "Prepare",
    body: "Repairs, staging and disclosure review settled before the photographer arrives. The work that raises the ceiling on your price happens here, not during escrow.",
  },
  {
    number: "02",
    title: "Price",
    body: "A written analysis built from closed comparables, current absorption and the buyer pool most likely to transact — delivered with the downside case, not only the optimistic one.",
  },
  {
    number: "03",
    title: "Position",
    body: "Architectural photography, film, floor plans and an editorial narrative that explains what makes the property worth its number to a buyer who has never seen Arizona.",
  },
  {
    number: "04",
    title: "Launch",
    body: "A private release to our qualified buyer register and the brokerage network first. The property reaches the public portals once the right buyers have already seen it.",
  },
  {
    number: "05",
    title: "Negotiate",
    body: "We build the case for your number from the data and we hold it. Terms, timelines, repairs and contingencies are negotiated as carefully as the headline price.",
  },
  {
    number: "06",
    title: "Close",
    body: "Inspection, appraisal, title and financing managed to a schedule. You are informed at every stage and surprised at none of them.",
  },
];

/** What the marketing programme actually includes — one property at a time. */
export const marketingPillars: { title: string; body: string }[] = [
  {
    title: "Architectural Photography & Film",
    body: "A commissioned shoot at the hour the light is best for your property, plus a short film and measured floor plans.",
  },
  {
    title: "Private Buyer Register",
    body: "Several hundred qualified buyers, agents and advisors who hear about a listing before it is public.",
  },
  {
    title: "Print & Editorial",
    body: "Placement in the brokerage's luxury publications and direct mail to the streets that compete with yours.",
  },
  {
    title: "Global Distribution",
    body: "Syndication through the international network, with translated collateral for overseas purchasers.",
  },
  {
    title: "Staging & Preparation",
    body: "Room-by-room guidance, trade scheduling and a costed list of the work that returns more than it costs.",
  },
];

/** Three honest statements about pricing, used in the editorial section. */
export const pricingPrinciples: { label: string; body: string }[] = [
  {
    label: "The first three weeks",
    body: "A listing receives more than half of its qualified attention in the first twenty-one days. Price it wrong and the market has already moved on.",
  },
  {
    label: "Overpricing is a cost",
    body: "Every month a property sits unsold costs carrying costs, staging and a widening gap between your asking price and what buyers will pay.",
  },
  {
    label: "The right buyer, not every buyer",
    body: "We price to the specific pool of purchasers who would genuinely want your home — which is rarely the same as the average of the street.",
  },
];

/** Seller questions, mirrored into FAQPage structured data. */
export const sellerFaqs: { question: string; answer: string }[] = [
  {
    question: "How do you determine what my home is worth?",
    answer:
      "From closed comparables adjusted for condition, lot quality and view corridor, read against current absorption in your price band. We also run the downside case: what the property sells for if the pool of buyers is smaller than expected. You receive the analysis in writing before you commit to a number.",
  },
  {
    question: "What does it cost to sell with Gray Group?",
    answer:
      "Our commission is set out in full at the listing presentation, before you sign anything. Photography, film, floor plans, print placement and staging guidance are funded by the brokerage — there is no upfront cost to you and no marketing fee deducted at close.",
  },
  {
    question: "Should I renovate before listing?",
    answer:
      "Usually only in part. We walk the property and give you a costed list: the items that reliably return more than they cost, the items that are neutral, and the items you should leave alone. Most sellers spend less than they expect after that conversation.",
  },
  {
    question: "How long will my home take to sell?",
    answer:
      "It depends on your price band and community. We quote a realistic days-on-market range derived from current absorption rather than a best-case figure, and we review the position against live data every week once the listing is live.",
  },
  {
    question: "Can we sell privately, without a public listing?",
    answer:
      "Yes. A private release to our qualified buyer register and the brokerage network is often the right approach for a distinctive property or a seller who values discretion. If the private phase does not produce the right buyer, we move to the public market on a date you agree in advance.",
  },
  {
    question: "What happens if the market moves while I am listed?",
    answer:
      "We revisit the pricing strategy at fourteen and thirty days against real showing feedback, portal traffic and competing inventory — and we tell you plainly whether the position is holding or whether it needs to change.",
  },
];
