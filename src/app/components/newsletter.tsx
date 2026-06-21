"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
    // Note: Newsletter signup is a local UX-only confirmation;
    // wire to backend in a future iteration if/when an endpoint exists.
  };

  return (
    <section
      data-testid="newsletter-section"
      className="bg-k-cream relative overflow-hidden section-padding"
    >
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="container-koffee relative">
        <div className="bg-k-paper rounded-[2.5rem] shadow-medium overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto img-hover-zoom">
              <img
                src="/assets/scan.jpg"
                alt="Koffelo brewing"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-k-espresso/30 to-transparent lg:hidden" />
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="eyebrow mb-4">— Stay in the loop</div>
              <h2 className="font-display text-display-md text-k-espresso mb-5 text-balance">
                First sips, slow secrets, <em className="italic text-k-gold">delivered.</em>
              </h2>
              <p className="text-k-ink-muted text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Join the Koffelo circle for new blends, brewing rituals, and
                quiet little discounts. No spam — just coffee.
              </p>

              {submitted ? (
                <div
                  data-testid="newsletter-success"
                  className="flex items-center gap-3 p-5 rounded-2xl bg-k-cream-50 border border-k-cream-200"
                >
                  <div className="w-10 h-10 rounded-full bg-k-gold/15 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8932D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-display text-lg text-k-espresso">Welcome aboard.</div>
                    <div className="text-sm text-k-ink-muted">
                      We&apos;ll be in touch with something good very soon.
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-testid="newsletter-form"
                  className="space-y-3"
                  noValidate
                >
                  <div className="relative flex flex-col sm:flex-row gap-3">
                    <input
                      data-testid="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="your@email.com"
                      className="flex-1 bg-k-cream-50 border border-k-cream-200 rounded-full px-6 py-4 text-k-espresso placeholder:text-k-ink-muted/60 outline-none focus:border-k-gold focus:ring-2 focus:ring-k-gold/20 transition-all duration-300 select-text-on"
                    />
                    <button
                      type="submit"
                      data-testid="newsletter-submit-btn"
                      className="btn-pill-primary hover-lift whitespace-nowrap justify-center"
                    >
                      Subscribe
                      <span>→</span>
                    </button>
                  </div>
                  {error && (
                    <p data-testid="newsletter-error" className="text-sm text-red-600 pl-2">
                      {error}
                    </p>
                  )}
                  <p className="text-xs text-k-ink-muted/80 pl-2">
                    By subscribing you agree to receive coffee-related updates.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
