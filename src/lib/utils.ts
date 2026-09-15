import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts last-wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `2850000` → `"$2,850,000"` */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** `2850000` → `"$2.85M"` — used for compact stat displays. */
export function formatPriceCompact(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${value}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/** `"2026-01-14"` → `"January 14, 2026"` */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Turn a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "5 Beds · 6 Baths · 6,900 Sq Ft" */
export function propertySpecLine(p: {
  beds: number;
  baths: number;
  sqft: number;
}): string {
  return [
    `${p.beds} Beds`,
    `${p.baths} Baths`,
    `${formatNumber(p.sqft)} Sq Ft`,
  ].join(" · ");
}

/** 6900 → "6,900" */
export { formatNumber as comma };

export function absoluteUrl(path = ""): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://graygroupaz.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
