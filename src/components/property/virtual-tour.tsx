"use client";

import { useCallback, useEffect, useState } from "react";
import { Maximize2, Minimize2, Move3d } from "lucide-react";

import { PanoramaViewer } from "@/components/property/panorama-viewer";
import type { TourScene } from "@/types";
import { cn } from "@/lib/utils";

/**
 * The 360° tour plate.
 *
 * One viewer instance is reused for both the inline and the expanded state —
 * expanding simply promotes the wrapper to a fixed, full-viewport layer. That
 * keeps a single canvas (and a single render loop) alive, so switching between
 * the two modes is instant and never reloads the panorama.
 */
export function VirtualTour({
  scenes,
  propertyName,
  className,
}: {
  scenes: TourScene[];
  propertyName: string;
  className?: string;
}) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const scene = scenes[sceneIndex];

  const close = useCallback(() => setExpanded(false), []);

  /* Lock the page behind the expanded viewer and allow Escape to dismiss it. */
  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [close, expanded]);

  if (!scene) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        expanded && "fixed inset-0 z-[95] gap-0 bg-charcoal",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-charcoal",
          expanded ? "min-h-0 flex-1" : "aspect-[16/10] md:aspect-[16/9]",
        )}
      >
        <PanoramaViewer
          key={scene.id}
          src={scene.src}
          alt={`360 degree view of the ${scene.label.toLowerCase()} at ${propertyName}`}
          initialYaw={scene.initialYaw}
          className="h-full w-full"
        />

        {/* Top overlay: what this is, and where you are inside it. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-5">
          <div className="flex flex-col gap-2.5">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-charcoal/60 px-4 py-2 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
              <Move3d className="h-3.5 w-3.5" strokeWidth={1.6} />
              360&deg; Virtual Tour
            </span>
            <span className="self-start rounded-full bg-charcoal/60 px-4 py-2 text-[0.6875rem] tracking-[0.1em] text-white/75 backdrop-blur-sm">
              {scene.label}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label={
              expanded ? "Exit full screen tour" : "Expand tour to full screen"
            }
            className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-charcoal/55 text-white/85 backdrop-blur-sm transition-colors duration-400 hover:border-white hover:bg-white hover:text-charcoal"
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4" strokeWidth={1.6} />
            ) : (
              <Maximize2 className="h-4 w-4" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {/* Scene rail */}
      <div
        className={cn(
          expanded && "shrink-0 bg-charcoal px-4 pb-5 pt-4 sm:px-8",
        )}
      >
        <ul
          className={cn(
            "grid gap-2.5",
            expanded ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-4",
          )}
        >
          {scenes.map((item, i) => {
            const active = i === sceneIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSceneIndex(i)}
                  aria-current={active}
                  className={cn(
                    "group/scene relative flex h-full w-full flex-col items-start gap-1.5 border p-4 text-left transition-colors duration-500",
                    expanded
                      ? active
                        ? "border-white/70 bg-white/10"
                        : "border-white/15 hover:border-white/40"
                      : active
                        ? "border-charcoal bg-charcoal"
                        : "border-line bg-ivory-200/40 hover:border-bronze/60",
                  )}
                >
                  <span
                    className={cn(
                      "text-[0.625rem] tabular-nums tracking-[0.18em]",
                      expanded || active
                        ? "text-sand"
                        : "text-charcoal/35",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-lg leading-tight",
                      expanded || active ? "text-ivory" : "text-charcoal",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "text-[0.75rem] leading-snug",
                      expanded || active ? "text-ivory/55" : "text-charcoal/45",
                    )}
                  >
                    {item.caption}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-bronze transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <p
          className={cn(
            "mt-4 text-[0.75rem] leading-relaxed",
            expanded ? "text-ivory/45" : "text-charcoal/45",
          )}
        >
          Drag to look around, scroll to zoom, or use the arrow keys. Select a
          scene above to move through the residence.
        </p>
      </div>
    </div>
  );
}
