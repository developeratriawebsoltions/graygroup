"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

import { Select } from "@/components/ui/field";
import { neighborhoods } from "@/lib/data/neighborhoods";
import {
  bathroomOptions,
  bedroomOptions,
  priceBands,
  propertyTypes,
  sortOptions,
  statusOptions,
} from "@/lib/data/properties";
import { cn } from "@/lib/utils";

const filterKeys = [
  "location",
  "type",
  "price",
  "beds",
  "baths",
  "status",
] as const;

/**
 * Listing-page filter rail. Writes to the URL so every filtered view is
 * shareable and crawlable rather than held in component state.
 */
export function PropertyFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "any" || value === "Any") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const activeCount = filterKeys.filter((key) => searchParams.has(key)).length;

  const controls = (
    <>
      <Select
        aria-label="Location"
        value={searchParams.get("location") ?? ""}
        onChange={(e) => setParam("location", e.target.value)}
      >
        <option value="">All locations</option>
        {neighborhoods.map((n) => (
          <option key={n.slug} value={n.name}>
            {n.name}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Property type"
        value={searchParams.get("type") ?? "any"}
        onChange={(e) => setParam("type", e.target.value)}
      >
        <option value="any">Any type</option>
        {propertyTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Price range"
        value={searchParams.get("price") ?? "any"}
        onChange={(e) => setParam("price", e.target.value)}
      >
        {priceBands.map((band) => (
          <option key={band.value} value={band.value}>
            {band.label}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Bedrooms"
        value={searchParams.get("beds") ?? "Any"}
        onChange={(e) => setParam("beds", e.target.value)}
      >
        {bedroomOptions.map((option) => (
          <option key={option} value={option}>
            {option === "Any" ? "Any beds" : `${option} beds`}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Bathrooms"
        value={searchParams.get("baths") ?? "Any"}
        onChange={(e) => setParam("baths", e.target.value)}
      >
        {bathroomOptions.map((option) => (
          <option key={option} value={option}>
            {option === "Any" ? "Any baths" : `${option} baths`}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Status"
        value={searchParams.get("status") ?? "any"}
        onChange={(e) => setParam("status", e.target.value)}
      >
        <option value="any">Any status</option>
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </>
  );

  return (
    <div className="border-y border-line bg-ivory-200/60">
      <div className="shell py-6">
        {/* Mobile toggle */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            className="inline-flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
            Filters
            {activeCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center bg-bronze text-[0.625rem] text-white">
                {activeCount}
              </span>
            ) : null}
          </button>
          <p className="text-xs text-charcoal/50">{resultCount} results</p>
        </div>

        <div
          className={cn(
            "grid gap-x-8 gap-y-6 pt-6 lg:grid-cols-7 lg:items-end lg:pt-0",
            mobileOpen ? "grid" : "hidden lg:grid",
          )}
        >
          {controls}

          <div className="flex items-end justify-between gap-4 lg:flex-col lg:items-stretch lg:gap-3">
            <Select
              aria-label="Sort by"
              value={searchParams.get("sort") ?? "featured"}
              onChange={(e) => setParam("sort", e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            {activeCount > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex shrink-0 items-center gap-2 pb-3 text-[0.6875rem] uppercase tracking-[0.14em] text-charcoal/50 transition-colors duration-400 hover:text-bronze"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.6} />
                Clear
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
