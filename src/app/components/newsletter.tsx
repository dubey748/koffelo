"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("A valid email, please.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      data-testid="newsletter-section"
      className="bg-k-black text-k-ivory section-padding relative overflow-hidden"
    >
      {/* Decor */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-k-copper/15 blur-[120px] pointer-events-none"
      />
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none mix-blend-overlay" />

      <div className="container-koffee relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-7">
              <span className="block w-10 h-px bg-k-copper-light" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper-light">
                Chapter IX · The Atelier
              </span>
            </div>
            <h2
              data-testid="newsletter-heading"
              className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.88] tracking-tightest text-k-ivory mb-7 text-balance"
            >
              Become an{" "}
              <span className="italic text-k-copper-light">insider.</span>
            </h2>
            <p className="text-k-ink-light-muted text-lg md:text-xl leading-relaxed max-w-md mb-2">
              New releases. Tasting notes. Members-only blends.
              Quiet drops you won&apos;t see anywhere else.
            </p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-k-copper-light">
              No spam, ever. Unsubscribe in one tap.
            </p>
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <div className="relative bg-k-ivory/5 backdrop-blur-md border border-k-ivory/15 rounded-[2rem] p-8 md:p-10">
              {/* corner decoration */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-k-copper-light rounded-tl-xl" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-k-copper-light rounded-br-xl" />

              {submitted ? (
                <div data-testid="newsletter-success" className="text-center py-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-k-copper/20 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E0B868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="font-display text-3xl italic text-k-ivory mb-3">
                    You&apos;re in.
                  </div>
                  <p className="text-k-ink-light-muted text-sm">
                    A welcome note is on its way to your inbox.
                  </p>
                </div>
              ) : (
                <form
                  data-testid="newsletter-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-[10px] tracking-[0.4em] uppercase text-k-copper-light mb-3">
                      Your email
                    </label>
                    <input
                      data-testid="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="hello@yourdomain.com"
                      className="w-full bg-transparent border-b border-k-ivory/30 pb-3 text-k-ivory placeholder:text-k-ivory/35 outline-none focus:border-k-copper-light transition-colors duration-300 text-lg select-text-on"
                    />
                  </div>

                  {error && (
                    <p
                      data-testid="newsletter-error"
                      className="text-sm text-k-copper-light italic"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    data-testid="newsletter-submit-btn"
                    className="group w-full inline-flex items-center justify-between bg-k-copper text-k-ivory rounded-full pl-6 pr-2 py-2 transition-all duration-500 ease-out-expo hover:bg-k-copper-light"
                  >
                    <span className="text-[12px] tracking-[0.3em] uppercase">
                      Subscribe to the Atelier
                    </span>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-k-ivory text-k-copper transition-transform duration-500 group-hover:rotate-45">
                      →
                    </span>
                  </button>

                  <div className="pt-4 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-k-ivory/45">
                    <span className="w-6 h-px bg-k-ivory/30" />
                    By joining, you accept our notes
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
