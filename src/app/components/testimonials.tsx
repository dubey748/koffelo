"use client";

import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Shalima Hayden",
    role: "Mumbai · Tasted 04 blends",
    title: "A daily quiet luxury.",
    text: "I&apos;ve tried boutique roasters across three cities. Koffelo holds its own and then some — there&apos;s an honesty in the cup that you can&apos;t fake. It is now my one and only.",
    pull: "Honest in the cup.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Bangalore · Subscriber for 8 mo",
    title: "Made my mornings unrecognisable.",
    text: "The NOC cartridge changed the way I think about coffee at home. Smooth, deep, no compromise — and it travels with me. Hotel rooms have never looked at me the same way.",
    pull: "Coffee that travels.",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Delhi · Roaster's pick member",
    title: "This is the standard.",
    text: "Premium feel from the moment it arrives. The roast tastes considered — bold without being burnt, clean without being thin. Everything else I&apos;ve been drinking tastes like a draft now.",
    pull: "Considered, every time.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const r = reviews[active];

  return (
    <section
      data-testid="reviews-section"
      className="bg-k-ivory section-padding relative overflow-hidden"
    >
      <div className="container-koffee relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — header & list */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-7">
              <span className="block w-10 h-px bg-k-copper" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper">
                Chapter VII · The Press
              </span>
            </div>
            <h2
              data-testid="reviews-heading"
              className="font-display text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.95] tracking-tightest text-k-espresso mb-10 text-balance"
            >
              What people are{" "}
              <span className="italic text-k-copper">whispering.</span>
            </h2>

            <ul className="space-y-2">
              {reviews.map((rev, i) => (
                <li key={rev.id}>
                  <button
                    onClick={() => setActive(i)}
                    data-testid={`review-tab-${i}`}
                    className={`w-full text-left py-5 border-t border-k-ink/15 transition-all duration-500 ease-out-expo group flex items-center justify-between gap-4 ${i === active ? "" : "hover:pl-2"}`}
                    type="button"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <span className={`text-[11px] tracking-[0.3em] italic transition-colors duration-300 ${i === active ? "text-k-copper" : "text-k-walnut/70"}`}>
                        N°{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-display text-lg md:text-2xl leading-tight truncate transition-colors duration-300 ${i === active ? "text-k-espresso" : "text-k-walnut/80 group-hover:text-k-espresso"}`}>
                        {rev.title}
                      </span>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ${i === active ? "bg-k-copper text-k-ivory rotate-0" : "bg-transparent text-k-walnut/40 border border-k-walnut/30 group-hover:border-k-walnut"}`}
                    >
                      →
                    </span>
                  </button>
                </li>
              ))}
              <li className="border-t border-k-ink/15" />
            </ul>
          </div>

          {/* Right — quote display */}
          <div className="lg:col-span-7 relative">
            <article
              key={r.id}
              data-testid="review-display"
              className="relative bg-k-paper rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-soft border border-k-cream-200 animate-fade-in"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 font-display italic text-[8rem] leading-none text-k-copper/15 select-none">
                &rdquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-7">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#B5651D">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              {/* Pull quote */}
              <div className="font-display italic text-k-copper text-2xl md:text-3xl leading-tight mb-7 max-w-md">
                &ldquo;{r.pull}&rdquo;
              </div>

              {/* Full review */}
              <p
                className="text-k-ink text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: r.text }}
              />

              <div className="pt-6 border-t border-k-cream-200 flex items-center justify-between">
                <div>
                  <div className="font-display text-xl text-k-espresso italic">
                    — {r.name}
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-k-walnut/80 mt-1">
                    {r.role}
                  </div>
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-k-copper">
                  Verified · MMXXVI
                </div>
              </div>
            </article>

            {/* Index */}
            <div className="mt-6 text-right text-[11px] tracking-[0.3em] uppercase text-k-walnut/70">
              {String(active + 1).padStart(2, "0")} ⁄ {String(reviews.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
