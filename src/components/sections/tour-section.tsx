"use client";

import { Move3d } from "lucide-react";

import { VirtualTour } from "@/components/property/virtual-tour";
import { Reveal } from "@/components/motion/reveal";
import { tourScenes } from "@/lib/data/properties";

export function TourSection() {
  return (
    <section className="bg-charcoal py-20 md:py-24 lg:py-28">
      <div className="shell">
        <Reveal y={16}>
          <p className="eyebrow flex items-center gap-2 text-sand">
            <Move3d className="h-4 w-4" strokeWidth={1.5} />
            360° Virtual Tour
          </p>
        </Reveal>
        <Reveal y={20} delay={0.06}>
          <h2 className="text-editorial mt-5 font-display text-ivory">
            Walk It Before You Fly In.
          </h2>
        </Reveal>
        <Reveal y={18} delay={0.1}>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ivory/55">
            Four connected viewpoints through the residence, captured as seamless
            panoramas. Drag to look around, or expand to full screen.
          </p>
        </Reveal>
        <Reveal y={20} delay={0.14} className="mt-12">
          <VirtualTour
            scenes={tourScenes}
            propertyName="Gray Group — Arizona Luxury Real Estate"
          />
        </Reveal>
      </div>
    </section>
  );
}
