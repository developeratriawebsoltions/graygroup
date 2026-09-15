import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SmartImage } from "@/components/common/smart-image";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-charcoal">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src="/images/site/desert-road.jpg"
          alt=""
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/78" />
      </div>

      <div className="shell py-32">
        <p className="eyebrow text-sand">Error 404</p>
        <h1 className="text-section mt-6 text-white">
          This address
          <br />
          does not exist.
        </h1>
        <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-white/65">
          The page you were looking for has been moved, sold, or never listed.
          The properties below are very much available.
        </p>

        <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/properties"
            className="group inline-flex h-13 items-center justify-center gap-3 bg-ivory px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 hover:bg-sand"
          >
            Browse Properties
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.6}
            />
          </Link>
          <Link
            href="/"
            className="inline-flex h-13 items-center justify-center border border-white/45 px-8 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-charcoal"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
