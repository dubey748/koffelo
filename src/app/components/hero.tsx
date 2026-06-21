"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative bg-k-ivory text-k-espresso overflow-hidden pt-24 md:pt-28"
    >
      {/* Decorative copper glow (subtle) */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-k-copper/8 blur-[110px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] rounded-full bg-k-amber/10 blur-[100px] pointer-events-none"
      />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      {/* Vertical edge labels — desktop only */}
      <div className="hidden lg:flex absolute left-6 top-32 bottom-24 items-center pointer-events-none z-20">
        <div
          className="text-[10px] tracking-[0.5em] uppercase text-k-walnut/60"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Est. MMXX · Atelier Koffelo
        </div>
      </div>
      <div className="hidden lg:flex absolute right-6 top-32 bottom-24 items-center pointer-events-none z-20">
        <div
          className="text-[10px] tracking-[0.5em] uppercase text-k-walnut/60"
          style={{ writingMode: "vertical-rl" }}
        >
          No. 001 — A Considered Brew
        </div>
      </div>

      <div className="container-koffee relative pb-16 md:pb-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center pt-6 md:pt-12">
          {/* LEFT: Editorial copy */}
          <div className="lg:col-span-7 relative z-10 order-2 lg:order-1">
            <div
              className={`transition-all duration-1000 ease-out-expo ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-9">
                <span className="block w-8 sm:w-10 h-px bg-k-copper" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
                  Chapter I · Manifesto
                </span>
              </div>

              <h1
                data-testid="hero-headline"
                className="font-display leading-[0.92] tracking-tightest text-k-espresso mb-7 md:mb-10"
              >
                <span className="block text-[clamp(2.5rem,9vw,8rem)]">An honest</span>
                <span className="block text-[clamp(2.5rem,9vw,8rem)] italic font-normal text-k-copper">
                  brew,&nbsp;
                  <span className="not-italic text-k-espresso">for the</span>
                </span>
                <span className="block text-[clamp(2.5rem,9vw,8rem)]">few who notice.</span>
              </h1>

              <p
                className={`text-base sm:text-lg md:text-xl text-k-ink-muted leading-relaxed max-w-xl mb-9 md:mb-11 transition-all duration-1000 delay-200 ease-out-expo ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                Single-origin beans. Slow nitrogen extraction. A cartridge that
                fits in your pocket and rewrites your morning. Coffee made the
                way it should taste — quietly, deliberately, without compromise.
              </p>

              <div
                className={`flex flex-wrap items-center gap-5 sm:gap-6 transition-all duration-1000 delay-400 ease-out-expo ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <button
                  data-testid="hero-shop-btn"
                  onClick={scrollToCollection}
                  className="group relative inline-flex items-center gap-3 sm:gap-4 pl-6 sm:pl-8 pr-2 py-2 bg-k-espresso text-k-ivory rounded-full overflow-hidden transition-all duration-500 ease-out-expo hover:bg-k-coffee min-h-[52px]"
                  type="button"
                >
                  <span className="text-[11px] sm:text-[12px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-medium">
                    Discover the Collection
                  </span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-k-copper text-k-ivory text-sm transition-transform duration-500 group-hover:rotate-45">
                    →
                  </span>
                </button>
                <a
                  href="#ritual"
                  data-testid="hero-ritual-btn"
                  className="text-[11px] sm:text-[12px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-espresso/80 hover:text-k-copper transition-colors duration-400 link-underline min-h-[44px] inline-flex items-center"
                >
                  The Ritual ↓
                </a>
              </div>

              {/* Bottom mini-stats — light cards */}
              <div className="mt-10 md:mt-14 grid grid-cols-3 gap-2 sm:gap-4 max-w-md">
                {[
                  { value: "180mg", label: "Caffeine" },
                  { value: "0g", label: "Sugar" },
                  { value: "N₂", label: "Infused" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-3 sm:px-4 sm:py-4 rounded-2xl bg-k-paper border border-k-cream-200/80 shadow-soft"
                  >
                    <div className="font-display text-xl sm:text-2xl md:text-3xl text-k-espresso leading-none mb-1">
                      {s.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-k-ink-muted">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product spotlight */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div
              className={`relative max-w-[480px] mx-auto lg:max-w-none transition-all duration-[1200ms] ease-out-expo ${
                mounted
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
            >
              {/* Soft copper glow */}
              <div
                aria-hidden
                className="absolute -inset-3 sm:-inset-6 rounded-[2.5rem] bg-gradient-to-br from-k-copper/25 via-k-amber/15 to-transparent blur-2xl"
              />
              {/* N° plate */}
              <div className="absolute -top-3 -left-1 sm:-top-5 sm:-left-2 z-20 font-display text-[clamp(4rem,12vw,9rem)] leading-none italic text-k-copper select-none">
                N°
                <span className="not-italic text-k-espresso">01</span>
              </div>

              <div className="relative aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-premium img-hover-zoom border border-k-cream-200">
                <img
                  src="https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=85&auto=format&fit=crop"
                  alt="Koffelo NOC — Premium nitro cold brew"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/35 via-transparent to-transparent" />

                {/* Top tag */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 bg-k-ivory/95 backdrop-blur-sm rounded-full border border-k-cream-200 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-k-espresso shadow-soft">
                  Limited · Batch 04
                </div>

                {/* Bottom callout */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-end justify-between gap-3">
                  <div className="bg-k-paper/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-medium flex-1 max-w-[220px]">
                    <div className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-k-copper mb-1">
                      The Signature
                    </div>
                    <div className="font-display text-lg sm:text-xl md:text-2xl italic text-k-espresso leading-tight">
                      Koffelo NOC
                    </div>
                  </div>
                  <div className="bg-k-espresso text-k-ivory rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-medium text-right shrink-0">
                    <div className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-k-ivory/70">
                      From
                    </div>
                    <div className="font-display text-lg sm:text-xl">₹899</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <div className="relative border-y border-k-cream-200 bg-k-paper py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {Array.from({ length: 3 }).flatMap((_, k) =>
            [
              "Single-origin Arabica",
              "Nitrogen-infused cold brew",
              "Roasted in small batches",
              "180mg clean caffeine",
              "Crafted in India",
              "Shipped within 48 hours",
            ].map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-walnut shrink-0"
              >
                {t}
                <span className="w-1 h-1 rounded-full bg-k-copper shrink-0" />
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
