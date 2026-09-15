"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";

import { Wordmark, socialIcons } from "@/components/ui/brand-icons";
import { navLinks, site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen mobile navigation. Built on Radix Dialog so focus trapping,
 * escape-to-close and screen-reader semantics come for free.
 */
export function MobileMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[60] bg-charcoal lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                aria-describedby={undefined}
                className="fixed inset-0 z-[61] flex flex-col overflow-y-auto bg-charcoal text-ivory lg:hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Dialog.Title className="sr-only">
                  Gray Group navigation
                </Dialog.Title>

                <div className="shell flex h-16 shrink-0 items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => onOpenChange(false)}
                    className="text-ivory"
                    aria-label="Gray Group — home"
                  >
                    <Wordmark />
                  </Link>

                  <Dialog.Close
                    className="flex h-11 w-11 items-center justify-center text-ivory/80 transition-colors hover:text-ivory"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" strokeWidth={1.4} />
                  </Dialog.Close>
                </div>

                <nav className="shell flex flex-1 flex-col justify-center py-8">
                  <ul className="space-y-1">
                    {navLinks.map((link, i) => {
                      const active =
                        pathname === link.href ||
                        pathname.startsWith(`${link.href}/`);
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.12 + i * 0.07,
                            ease: EASE,
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => onOpenChange(false)}
                            className="group flex items-baseline justify-between border-b border-white/10 py-4"
                          >
                            <span
                              className={`font-display text-[2rem] leading-none transition-colors duration-500 ${
                                active
                                  ? "text-sand"
                                  : "text-ivory group-hover:text-sand"
                              }`}
                            >
                              {link.label}
                            </span>
                            <span className="eyebrow text-ivory/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <motion.div
                  className="shell shrink-0 border-t border-white/10 py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <a
                    href={site.phoneHref}
                    className="font-display text-2xl text-ivory"
                  >
                    {site.phone}
                  </a>
                  <a
                    href={site.emailHref}
                    className="mt-2 block text-sm text-ivory/55"
                  >
                    {site.email}
                  </a>

                  <div className="mt-6 flex items-center gap-3">
                    {site.social.map((s) => {
                      const Icon = socialIcons[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="flex h-10 w-10 items-center justify-center border border-white/15 text-ivory/70 transition-colors hover:border-sand hover:text-sand"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => onOpenChange(false)}
                    className="mt-8 inline-flex h-12 items-center gap-2.5 border border-sand px-7 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sand transition-colors duration-500 hover:bg-sand hover:text-charcoal"
                  >
                    Let&rsquo;s Talk
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
