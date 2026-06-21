"use client";

const testimonials = [
  {
    id: 1,
    name: "Shalima Hayden",
    role: "Mumbai",
    text: "I&apos;ve trusted Koffelo for years. Truly amazing balance — the aroma alone is worth it. I won&apos;t order coffee from anywhere else now.",
    rating: 5,
    tag: "Verified Buyer",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Bangalore",
    text: "The NOC nitro cartridge is unreal. Smooth, deep, never bitter. It&apos;s officially part of my morning ritual — and my carry-on.",
    rating: 5,
    tag: "Verified Buyer",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Delhi",
    text: "Premium feel from the second it arrives. The roast hits exactly the way I hoped — bold, clean, beautifully crafted.",
    rating: 5,
    tag: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="bg-k-cream-50 section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay opacity-50 pointer-events-none" />

      <div className="container-koffee relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5">— Don&apos;t take our word for it</div>
            <h2
              data-testid="testimonials-heading"
              className="font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] uppercase tracking-tightest text-k-espresso text-balance"
            >
              Real people.{" "}
              <em className="italic font-normal text-k-gold lowercase">
                Real
              </em>{" "}
              reactions.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#C8932D"
                  stroke="none"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <div className="text-sm text-k-ink-muted">
              <span className="font-medium text-k-espresso">4.9</span> · 200+ reviews
            </div>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.id}
              data-testid={`testimonial-card-${i}`}
              className="group relative bg-k-paper rounded-3xl p-7 md:p-8 shadow-soft hover:shadow-medium transition-all duration-500 ease-out-expo border border-k-cream-200 hover-lift flex flex-col"
            >
              {/* Decorative quote */}
              <div className="font-display text-7xl text-k-gold/20 leading-none mb-2 select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg
                    key={j}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#C8932D"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>

              <p
                className="text-k-espresso text-base md:text-lg leading-relaxed mb-7 flex-grow"
                dangerouslySetInnerHTML={{ __html: t.text }}
              />

              <div className="pt-5 border-t border-k-cream-200 flex items-center justify-between">
                <div>
                  <div className="font-medium text-k-espresso">{t.name}</div>
                  <div className="text-xs text-k-ink-muted tracking-wide">
                    {t.role}
                  </div>
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-k-gold">
                  {t.tag}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
