import { PropertyCard } from "@/components/property/property-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

/**
 * Responsive editorial grid with staggered card reveals.
 */
export function PropertyGrid({
  properties,
  className,
  columns = 3,
  sizes,
}: {
  properties: Property[];
  className?: string;
  columns?: 2 | 3 | 4;
  sizes?: string;
}) {
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 xl:grid-cols-4"
        : "sm:grid-cols-2 xl:grid-cols-3";

  return (
    <RevealGroup className={cn("grid gap-x-8 gap-y-14", gridClass, className)}>
      {properties.map((property) => (
        <RevealItem key={property.slug}>
          <PropertyCard property={property} sizes={sizes} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
