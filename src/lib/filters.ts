import { getNeighborhood } from "@/lib/data/neighborhoods";
import { properties } from "@/lib/data/properties";
import type { Property } from "@/types";

export interface PropertyQuery {
  location?: string;
  type?: string;
  price?: string;
  beds?: string;
  baths?: string;
  status?: string;
  sort?: string;
  q?: string;
}

/** Normalise a Next.js searchParam value into a single trimmed string. */
export function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseBand(price?: string): [number, number] | null {
  if (!price || price === "any") return null;
  const [min, max] = price.split("-").map((n) => Number.parseInt(n, 10));
  if (Number.isNaN(min) || Number.isNaN(max)) return null;
  return [min, max];
}

function parseThreshold(value?: string): number | null {
  if (!value || value === "Any") return null;
  const parsed = Number.parseInt(value.replace("+", ""), 10);
  return Number.isNaN(parsed) ? null : parsed;
}

/** Does this property sit in the requested location (city or neighbourhood)? */
function matchesLocation(property: Property, location: string): boolean {
  const needle = location.trim().toLowerCase();
  if (!needle) return true;

  const neighbourhood = getNeighborhood(property.neighborhoodSlug);
  const haystack = [
    property.city,
    property.neighborhoodSlug,
    neighbourhood?.name ?? "",
    neighbourhood?.region ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(needle);
}

export function filterProperties(query: PropertyQuery): Property[] {
  const band = parseBand(query.price);
  const minBeds = parseThreshold(query.beds);
  const minBaths = parseThreshold(query.baths);
  const term = query.q?.trim().toLowerCase();

  const result = properties.filter((property) => {
    if (query.location && !matchesLocation(property, query.location)) {
      return false;
    }
    if (query.type && query.type !== "any" && property.type !== query.type) {
      return false;
    }
    if (query.status && query.status !== "any" && property.status !== query.status) {
      return false;
    }
    if (band && (property.price < band[0] || property.price > band[1])) {
      return false;
    }
    if (minBeds !== null && property.beds < minBeds) return false;
    if (minBaths !== null && property.baths < minBaths) return false;

    if (term) {
      const haystack = [
        property.name,
        property.address,
        property.city,
        property.type,
        property.summary,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(term)) return false;
    }

    return true;
  });

  return sortProperties(result, query.sort);
}

export function sortProperties(
  list: Property[],
  sort?: string,
): Property[] {
  const copy = [...list];
  switch (sort) {
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "sqft-desc":
      return copy.sort((a, b) => b.sqft - a.sqft);
    case "year-desc":
      return copy.sort((a, b) => b.yearBuilt - a.yearBuilt);
    default:
      // Featured first, then by price descending — the brokerage's own order.
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.price - a.price;
      });
  }
}

/** Build a `/properties` URL from a partial query, omitting empty values. */
export function buildPropertyUrl(query: PropertyQuery): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value && value !== "any" && value !== "Any") {
      params.set(key, value);
    }
  }
  const qs = params.toString();
  return qs ? `/properties?${qs}` : "/properties";
}

/** Human-readable summary of the active filters, for the results header. */
export function describeQuery(query: PropertyQuery): string {
  const parts: string[] = [];
  if (query.location) parts.push(query.location);
  if (query.type && query.type !== "any") parts.push(query.type);
  if (query.status && query.status !== "any") parts.push(query.status);
  return parts.join(" · ");
}
