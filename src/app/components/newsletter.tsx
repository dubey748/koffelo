"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [pref, setPref] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const prefs = ["Black", "With Milk", "Iced", "Surprise me"];

  return (
    <section
      data-testid="newsletter-section"
      className="bg-k-espresso text-k-paper section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />

      {/* Decorative giant background text */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 font-display text-[14rem] md:text-[20rem] leading-none uppercase text-k-paper/[0.025] whitespace-nowrap select-none pointer-events-none text-center"
      >
        Get 50% off
      </div>

      <div className="container-koffee relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow text-k-amber mb-6">— Get exclusive access</div>
          <h2
            data-testid="newsletter-heading"
            className="font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.92] uppercase tracking-tightest mb-7 text-balance"
          >
            Get it{" "}
            <em className="italic font-normal text-k-gold lowercase">
              before
            </em>{" "}
            anyone else.
          </h2>
          <p className="text-k-cream-50/80 md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            New blends, brewing rituals, and quiet little discounts.
            50% off your first order — just for joining.
          </p>

          {submitted ? (
            <div
              data-testid="newsletter-success"
              className="inline-flex flex-col items-center gap-3 p-7 rounded-3xl bg-k-paper/5 border border-k-paper/15 backdrop-blur-sm max-w-lg mx-auto"
            >
              <div className="w-14 h-14 rounded-full bg-k-gold/20 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E0B768"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="font-display text-2xl uppercase tracking-tight">
                You&apos;re in.
              </div>
              <p className="text-k-cream-50/70 text-sm">
                Check your inbox — your code is waiting.
              </p>
            </div>
          ) : (
            <form
              data-testid="newsletter-form"
              onSubmit={handleSubmit}
              noValidate
              className="max-w-xl mx-auto"
            >
              <div className="mb-6">
                <div className="text-[11px] tracking-[0.22em] uppercase text-k-amber/80 mb-4">
                  How do you take your coffee?
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {prefs.map((p) => (
                    <button
                      key={p}
                      type="button"
                      data-testid={`pref-${p.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => setPref(p)}
                      className={`px-5 py-2.5 rounded-full text-sm tracking-wide border transition-all duration-400 ease-out-expo ${
                        pref === p
                          ? "bg-k-gold text-k-espresso border-k-gold"
                          : "bg-transparent text-k-paper/80 border-k-paper/20 hover:border-k-paper/50 hover:text-k-paper"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  data-testid="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="your@email.com"
                  className="flex-1 bg-k-paper/8 border border-k-paper/20 rounded-full px-6 py-4 text-k-paper placeholder:text-k-paper/40 outline-none focus:border-k-gold focus:bg-k-paper/12 transition-all duration-400 select-text-on"
                />
                <button
                  type="submit"
                  data-testid="newsletter-submit-btn"
                  className="bg-k-gold text-k-espresso px-8 py-4 rounded-full text-sm tracking-[0.18em] uppercase font-medium hover:bg-k-gold-light transition-all duration-400 ease-out-expo hover-lift whitespace-nowrap"
                >
                  Get 50% off →
                </button>
              </div>
              {error && (
                <p
                  data-testid="newsletter-error"
                  className="text-sm text-red-300 mt-3"
                >
                  {error}
                </p>
              )}
              <p className="text-xs text-k-cream-50/40 mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
