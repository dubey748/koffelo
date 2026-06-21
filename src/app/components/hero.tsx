"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const scrollToProducts = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative bg-k-black text-k-ivory overflow-hidden min-h-[100vh] flex flex-col"
    >
      {/* Subtle radial copper glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[42rem] h-[42rem] rounded-full bg-k-copper/15 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 w-[36rem] h-[36rem] rounded-full bg-k-walnut/20 blur-[100px] pointer-events-none"
      />
      {/* Grain texture */}
      <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none mix-blend-overlay" />

      {/* Vertical edge labels */}
      <div className="hidden lg:flex absolute left-6 top-0 bottom-0 items-center pointer-events-none z-20">
        <div className="rotate-180 text-[10px] tracking-[0.5em] uppercase text-k-ivory/45" style={{ writingMode: "vertical-rl" }}>
          Est. MMXX · Atelier Koffelo
        </div>
      </div>
      <div className="hidden lg:flex absolute right-6 top-0 bottom-0 items-center pointer-events-none z-20">
        <div className="text-[10px] tracking-[0.5em] uppercase text-k-ivory/45" style={{ writingMode: "vertical-rl" }}>
          No. 001 — A Considered Brew
        </div>
      </div>

      <div className="container-koffee relative flex-1 flex flex-col justify-center pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — Editorial copy */}
          <div className="lg:col-span-7 relative z-10">
            <div className={`transition-all duration-1000 ease-out-expo ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-4 mb-9">
                <span className="block w-10 h-px bg-k-copper" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper-light">
                  Chapter I · Manifesto
                </span>
              </div>

              <h1
                data-testid="hero-headline"
                className="font-display leading-[0.86] tracking-tightest text-k-ivory mb-10"
              >
                <span className="block text-[clamp(3rem,9vw,9rem)]">An honest</span>
                <span className="block text-[clamp(3rem,9vw,9rem)] italic font-normal text-k-copper-light">
                  brew,&nbsp;
                  <span className="not-italic text-k-ivory">for the</span>
                </span>
                <span className="block text-[clamp(3rem,9vw,9rem)]">few who notice.</span>
              </h1>

              <p className={`text-lg md:text-xl text-k-ink-light-muted leading-relaxed max-w-xl mb-12 transition-all duration-1000 delay-200 ease-out-expo ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                Single-origin beans. Slow nitrogen extraction. A cartridge
                that fits in your pocket and rewrites your morning. This is
                coffee made the way it should taste — quietly, deliberately,
                without compromise.
              </p>

              <div className={`flex flex-wrap items-center gap-6 transition-all duration-1000 delay-400 ease-out-expo ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <button
                  data-testid="hero-shop-btn"
                  onClick={scrollToProducts}
                  className="group relative inline-flex items-center gap-4 px-9 py-5 bg-k-copper text-k-ivory rounded-full overflow-hidden transition-all duration-500 ease-out-expo hover:bg-k-copper-light"
                  type="button"
                >
                  <span className="text-[12px] tracking-[0.25em] uppercase font-medium relative z-10">
                    Discover the Collection
                  </span>
                  <span className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-k-ivory text-k-copper text-xs transition-transform duration-500 group-hover:rotate-45">
                    →
                  </span>
                </button>
                <a
                  href="#ritual"
                  data-testid="hero-ritual-btn"
                  className="text-[12px] tracking-[0.3em] uppercase text-k-ivory/80 hover:text-k-copper-light transition-colors duration-400 link-underline"
                >
                  The Ritual ↓
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Product spotlight, asymmetric */}
          <div className="lg:col-span-5 relative">
            <div className={`relative transition-all duration-[1200ms] ease-out-expo ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
              {/* Decorative copper plate behind image */}
              <div
                aria-hidden
                className="absolute -inset-4 lg:-inset-8 rounded-[3rem] bg-gradient-to-br from-k-copper/35 via-k-rust/15 to-transparent blur-2xl"
              />
              {/* Number plate */}
              <div className="absolute -top-6 -left-2 z-20 font-display text-[clamp(6rem,12vw,11rem)] leading-none text-k-copper/85 italic select-none">
                N°
                <span className="text-k-ivory not-italic">01</span>
              </div>

              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-k-coffee shadow-premium img-hover-zoom border border-k-ivory/10">
                <img
                  src="/assets/Banner.jpg"
                  alt="Koffelo NOC — Nitro Cold Brew"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-k-black/65 via-transparent to-transparent" />

                {/* Side label */}
                <div className="absolute top-6 right-6 rotate-0">
                  <div className="px-3 py-1.5 bg-k-ivory/10 backdrop-blur-md rounded-full border border-k-ivory/20 text-[9px] tracking-[0.3em] uppercase text-k-ivory">
                    Limited · Batch 04
                  </div>
                </div>

                {/* Bottom product callout */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-k-copper-light mb-1.5">
                      The Signature
                    </div>
                    <div className="font-display text-2xl md:text-3xl italic text-k-ivory leading-tight">
                      Koffelo NOC
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-k-ivory/60 mb-0.5">From</div>
                    <div className="font-display text-2xl text-k-ivory">₹899</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-t border-k-ivory/10 py-4 overflow-hidden">
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
                className="flex items-center gap-6 px-6 text-[11px] tracking-[0.3em] uppercase text-k-ivory/55 shrink-0"
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
