"use client";

import { useRouter } from "next/navigation";

export default function BestSelling() {
  const router = useRouter();

  return (
    <section
      id="ourphillosophy"
      data-testid="philosophy-section"
      className="bg-k-cream-50 section-padding relative overflow-hidden"
    >
      <div className="container-koffee">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative img-hover-zoom rounded-[2rem] overflow-hidden shadow-premium aspect-[4/5] max-w-[520px] mx-auto">
              <img
                src="/assets/philosophy.jpg"
                alt="Koffelo philosophy — handcrafted coffee"
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-k-paper rounded-2xl shadow-medium p-5 max-w-[200px] hidden sm:block">
                <div className="text-[10px] tracking-[0.25em] uppercase text-k-gold mb-1.5">
                  Since 2020
                </div>
                <div className="font-display text-xl text-k-espresso leading-tight">
                  Slow roasted.<br />
                  Boldly brewed.
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:pl-6">
            <div className="eyebrow mb-5">— Our Philosophy</div>
            <h2 className="font-display text-display-lg text-k-espresso mb-6 text-balance">
              A cup that <em className="italic text-k-gold">honors</em> the bean,
              the maker, and the moment.
            </h2>
            <p className="text-k-ink-muted text-base md:text-lg leading-relaxed mb-5">
              Every Koffelo blend begins with single-origin beans sourced
              directly from growers we know by name. We slow-roast in small
              batches, then brew with nitro precision — capturing the full
              character of the coffee without compromise.
            </p>
            <p className="text-k-ink-muted text-base md:text-lg leading-relaxed mb-10">
              No shortcuts. No artificial extras. Just coffee that tastes
              the way it was meant to.
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10 pt-8 border-t border-k-cream-200">
              {[
                { value: "100%", label: "Arabica beans" },
                { value: "<48h", label: "From roast to ship" },
                { value: "12+", label: "Origin partners" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-3xl md:text-4xl text-k-espresso leading-none mb-2">
                    {s.value}
                  </div>
                  <div className="text-[11px] tracking-[0.16em] uppercase text-k-ink-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/aboutus")}
              data-testid="philosophy-cta"
              className="btn-pill-primary hover-lift group"
              type="button"
            >
              <span>Discover our story</span>
              <span className="inline-block transition-transform duration-400 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
