"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { FieldLabel, Select } from "@/components/ui/field";
import { neighborhoods } from "@/lib/data/neighborhoods";
import {
  bathroomOptions,
  bedroomOptions,
  priceBands,
  propertyTypes,
} from "@/lib/data/properties";
import { buildPropertyUrl } from "@/lib/filters";
import { cn } from "@/lib/utils";

const darkField =
  "border-white/25 text-ivory placeholder:text-ivory/40 hover:border-white/50 focus:border-sand";

/**
 * The flagship search panel. Deliberately a single row of five controls rather
 * than a form — this is an invitation, not an MLS query builder.
 */
export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("any");
  const [price, setPrice] = useState("any");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    router.push(
      buildPropertyUrl({
        location: location || undefined,
        type,
        price,
        beds,
        baths,
      }),
    );
  }

  return (
    <form
      onSubmit={submit}
      className={cn("bg-charcoal p-4 sm:p-6 lg:p-12", className)}
    >
      <div className="grid gap-x-4 gap-y-3 grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:grid-cols-5">
        <div>
          <FieldLabel htmlFor="search-location" className="text-ivory/40">
            Location
          </FieldLabel>
          <Select
            id="search-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={darkField}
          >
            <option value="">All of Arizona</option>
            {neighborhoods.map((n) => (
              <option key={n.slug} value={n.name}>
                {n.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="search-type" className="text-ivory/40">
            Property Type
          </FieldLabel>
          <Select
            id="search-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={darkField}
          >
            <option value="any">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="search-price" className="text-ivory/40">
            Price Range
          </FieldLabel>
          <Select
            id="search-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={darkField}
          >
            {priceBands.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="search-beds" className="text-ivory/40">
            Bedrooms
          </FieldLabel>
          <Select
            id="search-beds"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            className={darkField}
          >
            {bedroomOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FieldLabel htmlFor="search-baths" className="text-ivory/40">
            Bathrooms
          </FieldLabel>
          <Select
            id="search-baths"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            className={darkField}
          >
            {bathroomOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/12 pt-3 sm:mt-6 sm:pt-5">
        <p className="hidden sm:block max-w-sm text-xs leading-relaxed text-ivory/40">
          Nine communities across the Valley. Every listing independently
          verified before it reaches this page.
        </p>

        <button
          type="submit"
          className="group inline-flex h-10 sm:h-13 w-full sm:w-auto items-center justify-center gap-3 bg-bronze px-6 sm:px-9 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:bg-ivory hover:text-charcoal"
        >
          Search Properties
          <Search
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </form>
  );
}
