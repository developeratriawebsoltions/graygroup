/** Single source of truth for brand, contact and SEO defaults. */
export const site = {
  name: "Gray Group",
  legalName: "Gray Group Realty",
  tagline: "Arizona Real Estate",
  description:
    "Gray Group is a Scottsdale-based luxury real estate team guiding buyers, sellers, investors and international clients through Arizona's most distinctive properties.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://graygroupaz.com",
  phone: "480.720.5686",
  phoneHref: "tel:+14807205686",
  email: "chris@graygrouprealty.com",
  emailHref: "mailto:chris@graygrouprealty.com",
  office: {
    building: "Camelback Towers",
    street: "6900 E Camelback Road",
    suite: "Suite 110",
    city: "Scottsdale",
    state: "AZ",
    zip: "85251",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
  ],
  /** Headline metrics. `value` drives the animated counter, `suffix` the unit. */
  stats: [
    { value: 640, prefix: "$", suffix: "M+", label: "Sales Volume" },
    { value: 480, prefix: "", suffix: "+", label: "Properties Sold" },
    { value: 22, prefix: "", suffix: "+", label: "Years of Experience" },
  ],
} as const;

export const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Sell", href: "/sell-your-home" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;
