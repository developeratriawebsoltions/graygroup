"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ScrollIndicator } from "@/components/common/scroll-indicator";
import Image from "next/image";
import { SearchBar } from "@/components/property/search-bar";
import { RevealLines } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIMEO_SRC =
  "https://player.vimeo.com/video/349676920?autoplay=1&loop=1&autopause=0&muted=1&background=1&transparent=0";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const reduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setMounted(true), 900);
    return () => window.clearTimeout(id);
  }, [reduced]);

  useEffect(() => {
    if (!mounted) return;

    const onMessage = (event: MessageEvent) => {
      if (typeof event.origin !== "string") return;
      if (!event.origin.includes("player.vimeo.com")) return;
      try {
        const payload =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (payload?.event === "ready" || payload?.event === "play") {
          setVideoReady(true);
        }
      } catch {
        /* ignore */
      }
    };

    window.addEventListener("message", onMessage);
    const fallback = window.setTimeout(() => setVideoReady(true), 5000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(fallback);
    };
  }, [mounted]);

  const command = useCallback((method: "play" | "pause") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method }),
      "*",
    );
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const node = ref.current;
    if (!node) return;

    let onScreen = true;
    const sync = () => command(onScreen && !document.hidden ? "play" : "pause");

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 },
    );
    observer.observe(node);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [command, mounted]);

  const showFilm = mounted && !reduced;

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[36rem] items-center bg-charcoal"
      aria-label="Introduction"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={reduced ? undefined : { y: imageY }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduced ? 1 : 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduced ? 0.001 : 14, ease: EASE }}
        >
          <Image
            src="/images/site/hero-estate.jpg"
            alt="A white and timber modern residence in Paradise Valley, Arizona, framed by a still pool"
            fill
            preload
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {showFilm ? (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 overflow-hidden transition-opacity duration-[1400ms] ease-out",
              videoReady ? "opacity-100" : "opacity-0",
            )}
          >
            <iframe
              ref={iframeRef}
              src={VIMEO_SRC}
              title="Gray Group — Arizona luxury real estate"
              tabIndex={-1}
              allow="autoplay; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-svh w-screen min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        ) : null}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />

      <motion.div
        className="shell relative w-full"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-4xl pt-20">
          <motion.p
            className="eyebrow text-sand"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            Arizona Luxury Real Estate
          </motion.p>

          <RevealLines
            as="h1"
            lines={["Exceptional Properties.", "Extraordinary Living."]}
            delay={0.5}
            className="text-hero mt-7 text-white"
          />

          <motion.p
            className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-white/70 sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          >
            Strategic guidance for buying, selling and investing in
            Arizona&rsquo;s most distinctive properties.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            <Link
              href="/properties"
              className="group inline-flex h-13 items-center justify-center gap-3 bg-ivory px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:bg-sand"
            >
              Explore Properties
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.6}
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center gap-3 border border-white/45 px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-charcoal"
            >
              Work With Us
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/2">
        <div className="shell">
          <div className="border border-white/15 bg-black/60 backdrop-blur-md">
            <SearchBar className="bg-transparent p-6 lg:p-8" />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-[50%] hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="shell pb-6">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-4">
              <ScrollIndicator />
              <span className="eyebrow text-white/45">Scroll</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
