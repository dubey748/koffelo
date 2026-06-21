"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What makes Koffelo different?",
    a: "We aren't trying to make the most coffee in the country, just the most considered. Small-batch roasting, single-origin beans we know by name, and a nitrogen-cartridge format that meets you wherever your day takes you.",
  },
  {
    q: "How do I use Koffelo NOC?",
    a: "Pour 5oz of water, milk, or oat milk. Twist off the cap. Aim the nozzle into your cup and press. Real nitro cold brew, ready in seconds. Add ice or sweetener — your call.",
  },
  {
    q: "Do I need to refrigerate it?",
    a: "Not at all. Each cartridge is shelf-stable for over twelve months. Toss it in your bag, your drawer, your carry-on. Wait until you want it.",
  },
  {
    q: "Is the caffeine strong?",
    a: "180mg per cartridge — about a double espresso. 0g sugar, 15 calories. Clean energy, no crash.",
  },
  {
    q: "How is it shipped?",
    a: "Within 48 hours of roasting, in fully recyclable packaging. India-wide delivery within 2–4 working days.",
  },
  {
    q: "Do you offer subscriptions?",
    a: "Yes — our Atelier members receive new releases first, plus 15% off every recurring order. Pause or cancel anytime.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      data-testid="faq-section"
      className="bg-k-ivory section-padding relative overflow-hidden"
    >
      <div
        aria-hidden
        className="hidden md:block absolute top-10 right-10 font-display italic text-[10rem] lg:text-[14rem] leading-none text-k-copper/[0.06] select-none pointer-events-none"
      >
        ?
      </div>

      <div className="container-koffee relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-7">
                <span className="block w-8 sm:w-10 h-px bg-k-copper" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
                  Chapter VIII · The Notes
                </span>
              </div>
              <h2
                data-testid="faq-heading"
                className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tightest text-k-espresso mb-6 md:mb-7 text-balance"
              >
                Small print,{" "}
                <span className="italic text-k-copper">in plain words.</span>
              </h2>
              <p className="text-k-ink-muted leading-relaxed mb-6 md:mb-7 max-w-sm">
                The things people most often ask before their first cup.
              </p>
              <a
                href="#contact"
                data-testid="faq-contact-link"
                className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-espresso group min-h-[44px]"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-k-espresso/30 transition-all duration-400 group-hover:bg-k-espresso group-hover:text-k-ivory">
                  →
                </span>
                Write to us
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
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
                      className="w-full flex items-start justify-between gap-4 sm:gap-6 py-5 sm:py-6 md:py-7 text-left group"
                      aria-expanded={isOpen}
                      type="button"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 min-w-0">
                        <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] text-k-copper italic shrink-0">
                          N°{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg sm:text-xl md:text-2xl text-k-espresso leading-snug">
                          {f.q}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 mt-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-500 ease-out-expo ${
                          isOpen
                            ? "bg-k-espresso text-k-ivory border-k-espresso rotate-90"
                            : "border-k-espresso/30 text-k-espresso group-hover:bg-k-espresso/5"
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {isOpen ? (
                            <line x1="5" y1="12" x2="19" y2="12" />
                          ) : (
                            <>
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </>
                          )}
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out-expo ${
                        isOpen ? "max-h-96 pb-6 md:pb-7" : "max-h-0"
                      }`}
                    >
                      <div className="pl-0 sm:pl-14 md:pl-[5.5rem]">
                        <p className="text-k-ink-muted leading-relaxed text-base md:text-lg max-w-2xl">
                          {f.a}
                        </p>
                      </div>
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
