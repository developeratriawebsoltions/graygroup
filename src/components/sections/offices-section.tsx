import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";
import { Reveal } from "@/components/motion/reveal";

const offices = [
  {
    name: "Camelback Towers",
    address: "6900 E Camelback Road",
    suite: "Suite 110",
    city: "Scottsdale, AZ",
    phone: "+1 (602) 717-2422",
    email: "info@graygrouprealty.com",
    image: "/images/neighborhoods/scottsdale.jpg",
    mapUrl: "https://maps.google.com/?q=6900+E+Camelback+Road+Suite+110+Scottsdale+AZ",
  },
];

export function OfficesSection() {
  return (
    <section className="bg-ivory-200/50 py-24 md:py-32 lg:py-40">
      <div className="shell">
        <Reveal y={16}>
          <p className="eyebrow text-bronze">Our Offices</p>
        </Reveal>
        <Reveal y={22} delay={0.06}>
          <h2 className="text-section mt-5 font-display text-charcoal">
            Where to Find Us.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20">
          {offices.map((office, i) => (
            <Reveal key={office.name} y={24} delay={0.1 + i * 0.08}>
              <div className="grid overflow-hidden border border-line lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
                  <SmartImage
                    src={office.image}
                    alt={office.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center bg-white p-10 lg:p-14">
                  <span className="eyebrow text-bronze/70">Office</span>

                  <h3 className="mt-4 font-display text-[2rem] leading-tight text-charcoal">
                    {office.name}
                  </h3>

                  <div className="mt-6 flex items-start gap-3 text-charcoal/70">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={1.5} />
                    <div className="text-[0.9375rem] leading-relaxed">
                      <p>{office.address}</p>
                      <p>{office.suite}</p>
                      <p>{office.city}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 text-[0.9375rem] text-charcoal/70">
                    <Phone className="h-4 w-4 shrink-0 text-bronze" strokeWidth={1.5} />
                    <a href={`tel:${office.phone}`} className="transition-colors hover:text-bronze">
                      {office.phone}
                    </a>
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[0.9375rem] text-charcoal/70">
                    <Mail className="h-4 w-4 shrink-0 text-bronze" strokeWidth={1.5} />
                    <a href={`mailto:${office.email}`} className="transition-colors hover:text-bronze">
                      {office.email}
                    </a>
                  </div>

                  <div className="mt-2 h-px w-16 bg-line" />

                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:text-bronze"
                  >
                    Get Directions
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
