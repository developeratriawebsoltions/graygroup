/** Shared domain types for the Gray Group site. */

export type PropertyStatus = "For Sale" | "Pending" | "Sold" | "Coming Soon";

export type PropertyType =
  | "Estate"
  | "Contemporary"
  | "Villa"
  | "Ranch"
  | "Townhome"
  | "Courtyard Home";

/**
 * A single position inside a 360° tour. `src` must be an equirectangular or
 * cylindrical strip — horizontally seamless so the viewer can wrap around.
 */
export interface TourScene {
  id: string;
  label: string;
  /** Short line shown beneath the scene label in the tour rail. */
  caption: string;
  src: string;
  /** Starting heading in degrees, so each scene opens on its best angle. */
  initialYaw?: number;
}

export interface Property {
  slug: string;
  name: string;
  type: PropertyType;
  address: string;
  city: string;
  /** Slug of the matching entry in `neighborhoods`. */
  neighborhoodSlug: string;
  price: number;
  status: PropertyStatus;
  beds: number;
  baths: number;
  sqft: number;
  lotAcres: number;
  yearBuilt: number;
  heroImage: string;
  gallery: { src: string; alt: string }[];
  /** 360° tour scenes. Optional — a property without one simply omits the tour. */
  tour?: TourScene[];
  /** One-line summary used on cards and meta descriptions. */
  summary: string;
  /** Editorial body copy, one string per paragraph. */
  description: string[];
  features: string[];
  highlights: { label: string; value: string }[];
  location: { lat: number; lng: number; blurb: string };
  featured: boolean;
  agentSlugs: string[];
  mls: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  region: "Phoenix" | "East Valley" | "Scottsdale" | "Paradise Valley";
  image: string;
  tagline: string;
  summary: string;
  description: string[];
  medianPrice: number;
  pricePerSqft: number;
  inventory: number;
  walkScore: number;
  lifestyle: string[];
  schools: { name: string; type: string }[];
  /** Small editorial facts rendered as a definition list. */
  facts: { label: string; value: string }[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  portrait: string;
  bio: string;
  longBio: string[];
  credentials: string[];
  email: string;
  phone: string;
  linkedin: string;
  languages: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  detail: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  excerpt: string;
  authorSlug: string;
  body: { heading?: string; paragraphs: string[] }[];
}
