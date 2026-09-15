import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { RevealLines, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Compact cinematic header for interior routes. Shares the hero's overlay
 * treatment so the transparent header reads consistently across the site.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  breadcrumb,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: string[];
  subtitle?: string;
  image: string;
  imageAlt: string;
  breadcrumb?: { label: string; href?: string }[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const centered = align === "center";

  return (
    <section className="relative isolate flex min-h-[30rem] items-end overflow-hidden bg-charcoal pt-32 md:min-h-[38rem] md:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src={image}
          alt={imageAlt}
          fill
          preload
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/88 via-charcoal/50 to-charcoal/55" />
      </div>

      <div className={cn("shell w-full pb-16 md:pb-20", centered && "text-center")}>
        {breadcrumb?.length ? (
          <Reveal y={10} duration={0.6}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol
                className={cn(
                  "flex items-center gap-2 text-[0.6875rem] tracking-[0.14em] text-white/45",
                  centered && "justify-center",
                )}
              >
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="uppercase transition-colors duration-400 hover:text-sand"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="uppercase text-white/70">
                        {crumb.label}
                      </span>
                    )}
                    {i < breadcrumb.length - 1 ? (
                      <ChevronRight
                        className="h-3 w-3 text-white/25"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        ) : null}

        {eyebrow ? (
          <Reveal y={12} duration={0.7}>
            <p className="eyebrow text-sand">{eyebrow}</p>
          </Reveal>
        ) : null}

        <RevealLines
          as="h1"
          lines={title}
          delay={0.12}
          className={cn("text-section mt-5 text-white", centered && "mx-auto")}
        />

        {subtitle ? (
          <Reveal y={16} delay={0.4}>
            <p
              className={cn(
                "mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-white/65",
                centered && "mx-auto",
              )}
            >
              {subtitle}
            </p>
          </Reveal>
        ) : null}

        {children ? (
          <Reveal y={16} delay={0.5}>
            <div className={cn("mt-10", centered && "flex justify-center")}>
              {children}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
