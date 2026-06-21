"use client";

const steps = [
  {
    n: "01",
    title: "Fill your cup",
    body: "Pour at least 5oz of water or milk. Hot or cold — Koffelo NOC works with both. The cartridge is designed for either.",
    image: "/assets/up.jpg",
  },
  {
    n: "02",
    title: "Twist. Aim. Press.",
    body: "Point the cartridge nozzle into your liquid and press. Nitrogen-infused cold brew sprays in, layered foam forms naturally.",
    image: "/assets/hero1.jpg",
  },
  {
    n: "03",
    title: "Make it yours",
    body: "Drink it straight, over ice, or topped with oat milk and a touch of sweetener. Your café, your way — no machine required.",
    image: "/assets/philosophy.jpg",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="bg-k-cream-50 section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay pointer-events-none opacity-50" />

      <div className="container-koffee relative">
        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="eyebrow mb-5">— From pocket to perfect</div>
          <h2
            data-testid="how-heading"
            className="font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95] uppercase tracking-tightest text-k-espresso text-balance"
          >
            Three steps.{" "}
            <em className="italic font-normal text-k-gold lowercase">Ten</em>{" "}
            seconds.{" "}
            <br className="hidden md:block" />
            Café quality.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-testid={`how-step-${i}`}
              className="group relative flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden img-hover-zoom shadow-soft mb-6 bg-k-cream-100">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/40 via-transparent to-transparent" />
                {/* Step number */}
                <div className="absolute top-5 left-5 font-display text-5xl md:text-6xl text-k-paper leading-none">
                  {s.n}
                </div>
                {/* Connecting line (desktop only) */}
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-px bg-k-walnut/30"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-k-gold" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-k-gold mb-3">
                  Step {s.n}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-k-espresso mb-3 uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-k-ink-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer chip */}
        <div className="mt-14 md:mt-16 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-k-paper border border-k-cream-200 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-k-gold animate-pulse" />
            <span className="text-[12px] tracking-[0.22em] uppercase text-k-espresso">
              Ready in 10 secs &nbsp;·&nbsp; Anywhere you go
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
