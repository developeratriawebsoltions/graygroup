import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Wordmark, socialIcons } from "@/components/ui/brand-icons";
import { navLinks, site } from "@/lib/site";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="shell py-16 md:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Gray Group — home" className="inline-block">
              <Wordmark />
            </Link>
            <p className="mt-7 max-w-xs text-sm leading-relaxed text-ivory/50">
              A Scottsdale-based team guiding buyers, sellers, investors and
              international clients through Arizona&rsquo;s most distinctive
              properties.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {site.social.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/12 text-ivory/60 transition-colors duration-500 hover:border-sand hover:text-sand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow text-ivory/35">Explore</h2>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors duration-400 hover:text-sand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory/35">Contact</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-3 text-sm text-ivory/70 transition-colors duration-400 hover:text-sand"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="group inline-flex items-center gap-3 text-sm text-ivory/70 transition-colors duration-400 hover:text-sand"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Office */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-ivory/35">Office</h2>
            <address className="mt-6 flex gap-3 not-italic">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
              <span className="text-sm leading-relaxed text-ivory/70">
                {site.office.building}
                <br />
                {site.office.street}
                <br />
                {site.office.suite}
                <br />
                {site.office.city}, {site.office.state}
              </span>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-wide text-ivory/40">
            © {year} {site.name}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-7">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-wide text-ivory/40 transition-colors duration-400 hover:text-sand"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-xs tracking-wide text-sand"
            >
              Start a Conversation
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.6}
              />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-[0.6875rem] leading-relaxed text-ivory/25">
          Gray Group Realty is a licensed real estate brokerage in the State of
          Arizona. All property information is deemed reliable but not
          guaranteed and should be independently verified.
        </p>
      </div>
    </footer>
  );
}
