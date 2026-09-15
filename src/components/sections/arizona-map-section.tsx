"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { properties } from "@/lib/data/properties";

// Arizona bounding box matching the SVG viewBox (0 0 512 566)
// lat: 31.33 (bottom) → 37.0 (top), lng: -114.82 (left) → -109.05 (right)
const AZ_LAT_MIN = 31.33;
const AZ_LAT_MAX = 37.0;
const AZ_LNG_MIN = -114.82;
const AZ_LNG_MAX = -109.05;
const SVG_W = 512;
const SVG_H = 566;

function toSVG(lat: number, lng: number) {
  const x = ((lng - AZ_LNG_MIN) / (AZ_LNG_MAX - AZ_LNG_MIN)) * SVG_W;
  const y = ((AZ_LAT_MAX - lat) / (AZ_LAT_MAX - AZ_LAT_MIN)) * SVG_H;
  return { x, y };
}

const PINS = properties
  .filter((p) => p.location?.lat && p.location?.lng)
  .map((p) => ({ ...p, ...toSVG(p.location.lat, p.location.lng) }));

const STATUS_COLOR: Record<string, string> = {
  "For Sale": "#9b8060",
  Pending: "#a65d43",
  "Coming Soon": "#c8b89a",
  Sold: "#4a4a4a",
};

export function ArizonaMapSection() {
  const [active, setActive] = useState<string | null>(null);
  const activePin = PINS.find((p) => p.slug === active);

  return (
    <section className="bg-ivory py-20 md:py-24 lg:py-28 mt-20">
      <div className="shell">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Left: content ── */}
          <div className="lg:w-1/2">
            <Reveal y={16}>
              <p className="eyebrow flex items-center gap-2 text-bronze text-base">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
                Arizona 
              </p>
            </Reveal>
            <Reveal y={20} delay={0.06}>
              <h2 className="text-section mt-5 font-display text-charcoal">
                Where We Work.
              </h2>
            </Reveal>
            <Reveal y={18} delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-charcoal/55">
                From Paradise Valley to Gilbert, our listings span the finest
                addresses across the Valley of the Sun.
              </p>
            </Reveal>

            {/* Legend */}
            <Reveal y={12} delay={0.16} className="mt-8 flex flex-wrap gap-4">
              {Object.entries(STATUS_COLOR).map(([label, color]) => (
                <span key={label} className="flex items-center gap-2 text-sm text-charcoal/60">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </Reveal>

            {/* Active pin detail card */}
            <AnimatePresence mode="wait">
              {activePin ? (
                <motion.div
                  key={activePin.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 rounded-xl border border-line bg-white p-5 shadow-sm"
                >
                  <p className="font-display text-lg leading-tight text-charcoal">{activePin.name}</p>
                  <p className="mt-0.5 text-sm text-charcoal/50">{activePin.city}</p>
                  <p className="mt-3 text-xl font-medium text-bronze">
                    ${activePin.price.toLocaleString()}
                  </p>
                  <span
                    className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-widest text-white"
                    style={{ backgroundColor: STATUS_COLOR[activePin.status] ?? "#9b8060" }}
                  >
                    {activePin.status}
                  </span>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 text-xs text-charcoal/35"
                >
                  Click a pin to see property details.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: map ── */}
          <Reveal y={24} delay={0.14} className="lg:w-1/2">
          <div className="relative mx-auto max-w-md lg:max-w-lg">
            <svg
              viewBox="0 0 512 566"
              className="w-full"
              aria-label="Arizona property map"
            >
              {/* ── Arizona county fills ── */}
              <g fill="none" stroke="#1a1a1a" strokeWidth="1.2" strokeLinejoin="round">
                <path d="M82 15 L84 73 L72 102 L69 157 L57 191 L58 246 L39 275 L37 333 L19 331 L20 397 L48 397 L51 360 L82 361 L83 302 L119 303 L119 238 L137 220 L137 170 L129 151 L136 112 L136 68 L146 49 L143 15 Z"/>
                <path d="M143 15 L472 15 L472 82 L399 82 L399 143 L340 143 L340 157 L275 157 L275 176 L238 176 L238 198 L195 198 L195 183 L166 183 L166 158 L136 158 L136 112 L136 68 Z"/>
                <path d="M340 143 L399 143 L399 83 L472 83 L472 155 L454 155 L454 230 L437 230 L437 298 L399 298 L399 334 L341 334 L341 277 L340 277 Z"/>
                <path d="M399 83 L472 83 L472 15 L475 15 L479 330 L438 330 L438 298 L399 298 L399 230 L454 230 L454 155 L399 155 Z"/>
                <path d="M119 238 L137 220 L137 170 L166 183 L195 183 L195 198 L238 198 L238 176 L275 176 L275 157 L340 157 L340 277 L319 277 L319 306 L289 306 L289 329 L248 329 L248 317 L194 317 L194 302 L119 302 Z"/>
                <path d="M20 331 L51 331 L51 360 L82 360 L82 397 L50 397 L48 430 L6 418 L8 365 Z"/>
                <path d="M6 418 L48 430 L49 455 L83 466 L83 503 L128 503 L128 566 L7 522 Z"/>
                <path d="M83 302 L119 302 L194 302 L194 317 L248 317 L248 329 L289 329 L289 366 L271 366 L271 397 L224 397 L224 428 L166 428 L166 410 L128 410 L128 397 L83 397 L82 360 L51 360 L51 331 L83 331 Z"/>
                <path d="M289 329 L319 306 L341 277 L341 334 L399 334 L399 367 L378 367 L378 400 L349 400 L349 430 L300 430 L271 397 L271 366 L289 366 Z"/>
                <path d="M128 397 L166 410 L166 428 L224 428 L224 397 L271 397 L300 430 L300 469 L276 469 L276 503 L224 503 L224 531 L128 531 Z"/>
                <path d="M399 334 L438 330 L479 330 L480 463 L468 463 L452 445 L431 445 L431 425 L399 425 L378 400 L378 367 L399 367 Z"/>
                <path d="M128 531 L224 531 L224 503 L276 503 L276 566 L128 566 Z"/>
                <path d="M399 425 L431 425 L431 445 L452 445 L468 463 L480 463 L481 566 L368 566 L368 503 L349 503 L349 469 L300 469 L300 430 L349 430 L378 400 Z"/>
                <path d="M276 503 L349 503 L368 503 L368 566 L276 566 Z"/>
                <path d="M480 330 L479 330 L479 463 L481 566 L505 566 L505 349 Z"/>
              </g>

              {/* ── County labels ── */}
              <g fill="#000000" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="600"
                 textAnchor="middle" dominantBaseline="middle" opacity="1">
                <text x="92" y="176">Mohave</text>
                <text x="259" y="126">Coconino</text>
                <text x="372" y="204" transform="rotate(-90 372 204)">Navajo</text>
                <text x="462" y="107" transform="rotate(-90 462 107)">Apache</text>
                <text x="184" y="253">Yavapai</text>
                <text x="73" y="329">La Paz</text>
                <text x="77" y="431">Yuma</text>
                <text x="188" y="355">Maricopa</text>
                <text x="345" y="356">Gila</text>
                <text x="302" y="424">Pinal</text>
                <text x="424" y="414">Graham</text>
                <text x="258" y="510">Pima</text>
                <text x="444" y="540">Cochise</text>
                <text x="323" y="555" fontSize="8">Santa Cruz</text>
                <text x="493" y="414" transform="rotate(-90 493 414)" fontSize="8">Greenlee</text>
              </g>

              {/* ── Outer border ── */}
              <path
                d="M84 15 L472 15 L479 330 L481 566 L368 566 L276 566 L128 566 L7 522 L6 418 L19 397 L20 331 L39 275 L57 246 L58 191 L69 157 L72 102 Z"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
              />

              {/* ── Animated property pins ── */}
              {PINS.map((pin, i) => {
                const color = STATUS_COLOR[pin.status] ?? "#9b8060";
                const isActive = active === pin.slug;
                return (
                  <g
                    key={pin.slug}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(isActive ? null : pin.slug)}
                    role="button"
                    aria-label={pin.name}
                  >
                    {/* Pulse ring */}
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      r={8}
                      fill={color}
                      opacity={0.3}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: i * 0.28,
                        ease: "easeInOut",
                      }}
                      style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                    />
                    {/* Pin dot — entrance animation */}
                    <motion.circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isActive ? 7 : 5}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={1.5}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.35 + i * 0.07,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ filter: isActive ? "drop-shadow(0 0 4px rgba(155,128,96,0.6))" : undefined }}
                    />
                  </g>
                );
              })}


            </svg>
          </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
