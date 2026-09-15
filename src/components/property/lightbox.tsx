"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface LightboxImage {
  src: string;
  alt: string;
}

const slide = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? 48 : -48,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 0 ? 0 : direction > 0 ? -48 : 48,
  }),
};

/**
 * Full-screen gallery viewer.
 *
 * Radix Dialog supplies the focus trap, scroll lock, Escape handling and the
 * correct ARIA wiring; everything inside is ours. Navigation is intentionally
 * generous — arrow keys, the on-screen rails, the thumbnail strip, and a
 * horizontal swipe on touch devices all move between plates, and the sequence
 * wraps so the viewer never dead-ends.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);

  const total = images.length;
  const current = images[index];

  const go = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setDirection(delta);
      onIndexChange((index + delta + total) % total);
    },
    [index, onIndexChange, total],
  );

  const jump = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : next < index ? -1 : 0);
      onIndexChange(next);
    },
    [index, onIndexChange],
  );

  /* Keyboard: arrows step, Home/End jump to the ends. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        jump(0);
      } else if (event.key === "End") {
        event.preventDefault();
        jump(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, open, total]);

  /* Warm the neighbouring plates so stepping through feels instant. */
  useEffect(() => {
    if (!open || total < 2) return;
    [index + 1, index - 1].forEach((offset) => {
      const neighbour = images[(offset + total) % total];
      if (!neighbour) return;
      const img = new window.Image();
      img.decoding = "async";
      img.src = neighbour.src;
    });
  }, [images, index, open, total]);

  /* Keep the active thumbnail in view as the sequence advances. */
  useEffect(() => {
    if (!open) return;
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index, open, reduced]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[90] bg-charcoal/97 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              aria-describedby={undefined}
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <motion.div
                className="fixed inset-0 z-[91] flex flex-col outline-none"
                initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.99 }}
                transition={{ duration: reduced ? 0.001 : 0.4, ease: EASE }}
              >
                <Dialog.Title className="sr-only">
                  {`${current?.alt ?? "Property gallery"} — image ${index + 1} of ${total}`}
                </Dialog.Title>

                {/* Top bar */}
                <div className="flex shrink-0 items-center justify-between gap-6 px-5 py-5 sm:px-8">
                  <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-ivory/55">
                    {String(index + 1).padStart(2, "0")}
                    <span className="mx-2 text-ivory/25">/</span>
                    {String(total).padStart(2, "0")}
                  </p>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close gallery"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory/80 transition-colors duration-400 hover:border-white hover:bg-white hover:text-charcoal"
                    >
                      <X className="h-4.5 w-4.5" strokeWidth={1.5} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Stage */}
                <div className="relative min-h-0 flex-1">
                  <AnimatePresence
                    initial={false}
                    mode="popLayout"
                    custom={direction}
                  >
                    <motion.div
                      key={current?.src ?? index}
                      className="absolute inset-0 flex items-center justify-center px-4 sm:px-16 lg:px-24"
                      custom={direction}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: reduced ? 0.001 : 0.45,
                        ease: EASE,
                      }}
                      drag={reduced ? false : "x"}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.16}
                      dragSnapToOrigin
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -64) go(1);
                        else if (info.offset.x > 64) go(-1);
                      }}
                    >
                      {current ? (
                        <div className="relative h-full w-full">
                          <SmartImage
                            src={current.src}
                            alt={current.alt}
                            fill
                            quality={90}
                            sizes="100vw"
                            draggable={false}
                            className="cursor-grab object-contain active:cursor-grabbing"
                          />
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  {/* Prev / next rails */}
                  {total > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal/50 text-ivory/80 backdrop-blur-sm transition-colors duration-400 hover:border-white hover:bg-white hover:text-charcoal sm:left-6"
                      >
                        <Chevron className="h-4.5 w-4.5 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-charcoal/50 text-ivory/80 backdrop-blur-sm transition-colors duration-400 hover:border-white hover:bg-white hover:text-charcoal sm:right-6"
                      >
                        <Chevron className="h-4.5 w-4.5" />
                      </button>
                    </>
                  ) : null}
                </div>

                {/* Caption + thumbnail rail */}
                <div className="shrink-0 px-5 pb-6 pt-5 sm:px-8">
                  <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-ivory/60">
                    {current?.alt}
                  </p>

                  {total > 1 ? (
                    <ul
                      ref={railRef}
                      className="mx-auto mt-5 flex max-w-5xl gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {images.map((image, i) => (
                        <li key={image.src} className="shrink-0">
                          <button
                            type="button"
                            onClick={() => jump(i)}
                            data-active={i === index}
                            aria-label={`Go to image ${i + 1}`}
                            aria-current={i === index}
                            className={cn(
                              "group relative block h-14 w-20 overflow-hidden bg-charcoal-700 transition-all duration-500 sm:h-16 sm:w-24",
                              i === index
                                ? "opacity-100 ring-1 ring-sand"
                                : "opacity-40 hover:opacity-80",
                            )}
                          >
                            <SmartImage
                              src={image.src}
                              alt=""
                              fill
                              quality={60}
                              sizes="96px"
                              className="object-cover"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
