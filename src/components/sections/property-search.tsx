import { Reveal } from "@/components/motion/reveal";
import { SearchBar } from "@/components/property/search-bar";

export function PropertySearch() {
  return (
    <section className="bg-ivory-200/50 py-20 md:py-28" id="search">
      <div className="shell">
        <Reveal>
          <div className="bg-charcoal px-8 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-sand">Property Search</p>
              <h2 className="text-section mt-5 text-ivory">
                Your Next Address
                <br />
                Starts Here.
              </h2>
              <p className="mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-ivory/55">
                Filter by community, architecture and scale. If nothing here
                matches what you have in mind, that is precisely the
                conversation worth having.
              </p>
            </div>

            <SearchBar className="mt-12 border-t border-white/12 bg-transparent p-0 pt-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
