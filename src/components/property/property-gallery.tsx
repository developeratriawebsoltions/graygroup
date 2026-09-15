"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2 } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { Lightbox, type LightboxImage } from "@/components/property/lightbox";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Immersive gallery: one large plate with a thumbnail rail beneath it. The plate
 * and every thumbnail open the full-screen lightbox, which then owns the
 * sequence — so selecting a thumbnail and expanding it land on the same plate.
 */
export function PropertyGallery({
  images,
  className,
}: {
  images: LightboxImage[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const current = images[active];

  if (!current) return null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="group relative aspect-[16/10] w-full overflow-hidden bg-ivory-200 md:aspect-[16/9]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.7, ease: EASE }}
          >
            <SmartImage
              src={current.src}
              alt={current.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* The whole plate is the affordance — a button that opens the viewer. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open gallery in full screen, starting at image ${active + 1} of ${images.length}`}
          className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-4"
        >
          <span className="sr-only">Open full-screen gallery</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-700 group-hover:bg-charcoal/15"
          />
        </button>

        <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2.5 bg-charcoal/70 px-4 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.6} />
          View full screen
        </div>

        <div className="pointer-events-none absolute bottom-5 right-5 bg-charcoal/70 px-4 py-2 text-[0.6875rem] tabular-nums tracking-[0.14em] text-ivory">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </div>
      </div>

      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => {
                setActive(i);
                setOpen(true);
              }}
              onFocus={() => setActive(i)}
              aria-label={`Open image ${i + 1}: ${image.alt}`}
              aria-current={i === active}
              className={cn(
                "group/thumb relative block aspect-[4/3] w-full overflow-hidden bg-ivory-200 transition-opacity duration-500 focus-visible:outline-offset-4",
                i === active ? "opacity-100" : "opacity-55 hover:opacity-90",
              )}
            >
              <SmartImage
                src={image.src}
                alt=""
                fill
                quality={60}
                sizes="16vw"
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-105"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-bronze transition-transform duration-500",
                  i === active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        index={active}
        onIndexChange={setActive}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
