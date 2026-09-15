import { cn } from "@/lib/utils";
import type { PropertyStatus } from "@/types";

const tone: Record<PropertyStatus, string> = {
  "For Sale": "bg-ivory/95 text-charcoal",
  Pending: "bg-sand text-charcoal",
  Sold: "bg-charcoal/85 text-ivory",
  "Coming Soon": "bg-bronze text-white",
};

export function StatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-block px-4 py-2 backdrop-blur-[2px]",
        tone[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
