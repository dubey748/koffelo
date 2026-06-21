"use client";

import { useRouter } from "next/navigation";

export default function Manifesto() {
  const router = useRouter();

  return (
    <section
      data-testid="manifesto-section"
      className="relative bg-k-copper text-k-ivory section-padding overflow-hidden"
    >
      {/* Layered decorative shapes */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full border border-k-ivory/15 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-20 -left-20 w-[32rem] h-[32rem] rounded-full border border-k-ivory/10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[44rem] h-[44rem] rounded-full bg-k-oxblood/30 blur-3xl pointer-events-none"
      />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none mix-blend-overlay" />

      <div className="container-koffee relative">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-10">
            <span className="block w-10 h-px bg-k-ivory/70" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-k-ivory/85">
              Chapter VI · The Manifesto
            </span>
          </div>

          <blockquote className="font-display text-[clamp(2.25rem,6vw,6rem)] leading-[1] text-k-ivory mb-12 text-balance tracking-tightest">
            <span className="block">&ldquo;Coffee shouldn&apos;t be in a hurry.</span>
            <span className="block italic">Neither should the people</span>
            <span className="block">who choose it.&rdquo;</span>
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl text-k-ivory/85 leading-relaxed max-w-2xl">
                We don&apos;t make the most coffee. We don&apos;t make the
                cheapest. We make a cup that asks for two minutes of your
                day — and gives you something worth those minutes back.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <div className="text-[11px] tracking-[0.3em] uppercase text-k-ivory/70 mb-2">
                Koffelo Atelier · Est. MMXX
              </div>
              <button
                onClick={() => router.push("/aboutus")}
                data-testid="manifesto-cta"
                className="group inline-flex items-center gap-3 text-k-ivory hover:text-k-cream-100 transition-colors duration-400"
                type="button"
              >
                <span className="text-[12px] tracking-[0.3em] uppercase">
                  Read the full story
                </span>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-k-ivory/40 transition-all duration-500 group-hover:border-k-ivory group-hover:bg-k-ivory group-hover:text-k-copper">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
