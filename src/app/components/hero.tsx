"use client";

import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative bg-k-cream overflow-hidden"
    >
      {/* Decorative noise */}
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-60" />

      {/* Floating bean decorations */}
      <div
        aria-hidden
        className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-k-amber/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-k-gold/10 blur-3xl pointer-events-none"
      />

      <div className="container-koffee relative pt-12 md:pt-16 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* LEFT: Bold editorial copy */}
          <div className="lg:col-span-7 relative z-10">
            <div
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-2 rounded-full bg-k-espresso/8 border border-k-espresso/15"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-k-gold animate-pulse" />
              <span className="text-[11px] tracking-[0.22em] uppercase text-k-espresso/85">
                Coffee 2.0 · United by Koffelo
              </span>
            </div>

            <h1
              data-testid="hero-headline"
              className="font-display text-[clamp(3rem,8.5vw,8rem)] leading-[0.92] tracking-tightest text-k-espresso mb-7 md:mb-9 uppercase"
            >
              Real Nitro
              <br />
              Cold&nbsp;Brew{" "}
              <em className="italic font-normal text-k-gold lowercase tracking-tight">
                in&nbsp;under
              </em>
              <br />
              10&nbsp;Seconds.
            </h1>

            <p className="text-lg md:text-xl text-k-ink-muted leading-relaxed max-w-xl mb-9 md:mb-11">
              A nitrogen-infused cold brew concentrate, pocket-sized.
              No machine, no fridge, no waiting — just smooth, bold flavor,
              anywhere your day takes you.
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-12 md:mb-14">
              <button
                data-testid="hero-shop-btn"
                onClick={scrollToProducts}
                className="group inline-flex items-center gap-3 bg-k-espresso text-k-paper px-8 py-4 rounded-full text-sm tracking-[0.18em] uppercase font-medium hover:bg-k-coffee transition-all duration-500 ease-out-expo hover-lift"
                type="button"
              >
                Try Koffelo NOC
                <span className="inline-block w-6 h-px bg-k-paper transition-all duration-500 group-hover:w-10" />
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <a
                href="#how-it-works"
                data-testid="hero-how-btn"
                className="text-sm tracking-[0.2em] uppercase text-k-espresso/80 hover:text-k-gold transition-colors duration-400 inline-flex items-center gap-2 group"
              >
                See how it works
                <span className="inline-block transition-transform duration-500 group-hover:translate-y-1">
                  ↓
                </span>
              </a>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl">
              {[
                { value: "180mg", label: "Clean caffeine" },
                { value: "0g", label: "Sugar added" },
                { value: "N₂", label: "Nitrogen infused" },
              ].map((s, i) => (
                <div
                  key={i}
                  data-testid={`hero-stat-${i}`}
                  className="px-4 py-4 sm:px-5 sm:py-5 rounded-2xl bg-k-paper/60 backdrop-blur-sm border border-k-cream-200"
                >
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl text-k-espresso leading-none mb-1.5">
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-k-ink-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: NOC product banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative img-hover-zoom rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-premium aspect-[4/5] lg:aspect-[3/4] bg-k-espresso">
              <img
                src="/assets/Banner.jpg"
                alt="Koffelo NOC — Nitro Cold Brew Cartridge"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-tr from-k-espresso/30 via-transparent to-transparent" />

              {/* Floating "NEW" badge */}
              <div className="absolute top-5 left-5 md:top-6 md:left-6 bg-k-gold text-k-espresso px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium animate-float">
                New · NOC
              </div>

              {/* Floating bottom card */}
              <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 max-w-[200px] bg-k-paper/95 backdrop-blur-md rounded-2xl p-4 shadow-medium">
                <div className="text-[10px] tracking-[0.22em] uppercase text-k-gold mb-1">
                  Best Seller
                </div>
                <div className="font-display text-lg text-k-espresso leading-tight mb-2">
                  India&apos;s first nitro
                  <br />
                  cold brew cartridge.
                </div>
                <button
                  onClick={scrollToProducts}
                  className="text-[11px] tracking-[0.2em] uppercase text-k-espresso link-underline"
                  type="button"
                >
                  Shop now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
