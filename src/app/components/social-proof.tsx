"use client";

const stats = [
  { value: "4.9", label: "Avg. rating", suffix: "★" },
  { value: "12K+", label: "Cartridges shipped" },
  { value: "98%", label: "Reorder rate" },
  { value: "100%", label: "Arabica beans" },
];

export default function SocialProof() {
  return (
    <section
      data-testid="social-proof-section"
      className="bg-k-paper border-y border-k-cream-200"
    >
      <div className="container-koffee py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8">
          {stats.map((s, i) => (
            <div
              key={i}
              data-testid={`stat-${i}`}
              className="text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-k-espresso mb-2 tracking-tightest flex items-baseline gap-1">
                {s.value}
                {s.suffix && (
                  <span className="text-k-gold text-[0.5em]">{s.suffix}</span>
                )}
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-k-ink-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
