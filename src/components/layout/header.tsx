"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Overlay header: transparent above the hero, solid ivory with charcoal type
 * once the page has scrolled. The wordmark inverts with it.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "border-b border-line bg-ivory"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
          <Link href="/" aria-label="Gray Group — home" className="shrink-0">
            <Image
              src="/logograygorup.png"
              alt="Gray Group"
              width={280}
              height={80}
              className={cn(
                "h-10 w-auto transition-all duration-700",
                solid ? "brightness-0" : "brightness-0 invert",
              )}
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative block py-1 text-[1rem] tracking-[0.06em] transition-colors duration-500",
                        solid
                          ? active
                            ? "text-charcoal"
                            : "text-charcoal/60 hover:text-charcoal"
                          : active
                            ? "text-white"
                            : "text-white/70 hover:text-white",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
                          active && "scale-x-100",
                          solid ? "bg-bronze" : "bg-white",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Image
              src="/mgroup.webp"
              alt="M Group"
              width={280}
              height={80}
              className={cn(
                "h-10 w-auto transition-all duration-700",
                solid ? "brightness-0" : "brightness-0 invert",
              )}
            />
            <Link
              href="/contact"
              className={cn(
                "hidden h-11 items-center gap-2.5 border px-6 text-[0.8125rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 lg:inline-flex",
                solid
                  ? "border-charcoal/30 text-charcoal hover:border-bronze hover:bg-bronze hover:text-white"
                  : "border-white/45 text-white hover:border-white hover:bg-white hover:text-charcoal",
              )}
            >
              Let&rsquo;s Talk
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className={cn(
                "flex h-11 w-11 items-center justify-center transition-colors duration-500 lg:hidden",
                solid ? "text-charcoal" : "text-white",
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>

        {/* Reading progress — a single hairline, only visible once scrolled. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left bg-bronze transition-opacity duration-700",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </header>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}
