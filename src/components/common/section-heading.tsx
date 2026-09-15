import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The shared editorial heading block. Keeps every section's typographic
 * hierarchy identical: eyebrow → serif title → supporting line.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  action,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
        centered && "md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <Reveal y={14} duration={0.7}>
            <p
              className={cn(
                "eyebrow mb-5",
                tone === "light" ? "text-sand" : "text-bronze",
              )}
            >
              {eyebrow}
            </p>
          </Reveal>
        ) : null}

        <Reveal y={20} delay={0.05}>
          <h2
            className={cn(
              "text-section",
              tone === "light" ? "text-ivory" : "text-charcoal",
              titleClassName,
            )}
          >
            {title}
          </h2>
        </Reveal>

        {subtitle ? (
          <Reveal y={18} delay={0.12}>
            <p
              className={cn(
                "mt-6 max-w-xl text-[0.9375rem] leading-relaxed",
                centered && "mx-auto",
                tone === "light" ? "text-ivory/65" : "text-charcoal/60",
              )}
            >
              {subtitle}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal y={18} delay={0.18} className={cn(centered && "mx-auto")}>
          {action}
        </Reveal>
      ) : null}
    </div>
  );
}
