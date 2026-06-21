"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Koffelo NOC?",
    a: "Koffelo NOC is a pocket-sized, nitrogen-pressurized cold brew cartridge. Spray it into any liquid — water, milk, oat milk — and you have genuine nitro cold brew in under 10 seconds. No machine, no fridge, no wait.",
  },
  {
    q: "How do I use it?",
    a: "Pour at least 5oz of your preferred base into a cup. Twist off the cap, aim the nozzle into the liquid, and press to spray. Add ice or sweetener to taste. Done.",
  },
  {
    q: "What's actually inside?",
    a: "A nitrogen-infused cold brew concentrate made from a premium Arabica blend. 180mg caffeine, 15 calories, 0g sugar. No preservatives. No artificial ingredients.",
  },
  {
    q: "Why nitrogen?",
    a: "Nitrogen preserves coffee at peak extraction — the same technology behind every nitro tap at your favorite coffee shop. It creates a naturally creamy texture and fine cascading bubbles. No oxidation, no stale flavor.",
  },
  {
    q: "Do I need to refrigerate it?",
    a: "No. Koffelo NOC is shelf-stable for 12+ months. Toss it in your bag, desk, suitcase — and forget about it until you need it.",
  },
  {
    q: "How much caffeine in one cartridge?",
    a: "180mg — roughly equivalent to a double shot of espresso. Zero sugar, just 15 calories.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      data-testid="faq-section"
      className="bg-k-cream section-padding relative"
    >
      <div className="container-koffee">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow mb-5">— Got questions?</div>
              <h2
                data-testid="faq-heading"
                className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] uppercase tracking-tightest text-k-espresso mb-7 text-balance"
              >
                Everything you{" "}
                <em className="italic font-normal text-k-gold lowercase">
                  need
                </em>{" "}
                to know.
              </h2>
              <p className="text-k-ink-muted leading-relaxed mb-7 max-w-md">
                Still curious? We&apos;re happy to chat about beans, brewing,
                or anything in between.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm tracking-[0.22em] uppercase text-k-espresso link-underline"
              >
                Contact us <span>→</span>
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7">
            <div className="border-t border-k-espresso/15">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={i}
                    data-testid={`faq-item-${i}`}
                    className="border-b border-k-espresso/15"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      data-testid={`faq-toggle-${i}`}
                      className="w-full flex items-start justify-between gap-6 py-6 md:py-7 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg md:text-2xl text-k-espresso uppercase tracking-tight leading-snug group-hover:text-k-coffee transition-colors duration-300">
                        {f.q}
                      </span>
                      <span
                        className={`shrink-0 mt-1 w-9 h-9 rounded-full border border-k-espresso/30 flex items-center justify-center transition-all duration-500 ease-out-expo ${
                          isOpen
                            ? "bg-k-espresso text-k-paper rotate-45 border-k-espresso"
                            : "text-k-espresso group-hover:bg-k-espresso/5"
                        }`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out-expo ${
                        isOpen ? "max-h-96 pb-6 md:pb-7" : "max-h-0"
                      }`}
                    >
                      <p className="text-k-ink-muted leading-relaxed pr-12 md:text-lg">
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
