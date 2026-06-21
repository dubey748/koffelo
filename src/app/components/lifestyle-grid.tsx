"use client";

const scenarios = [
  {
    tag: "The Morning",
    title: "Your daily latte. No line. No $7 price tag.",
    body: "Spray Koffelo NOC into cold oat milk, add ice, and walk out the door with a better coffee than that drive-through.",
    image: "/assets/up.jpg",
    span: "md:col-span-2",
  },
  {
    tag: "The Desk Drawer",
    title: "The 2pm wall doesn't stand a chance.",
    body: "Keep a pack in your drawer. Skip the vending-machine run.",
    image: "/assets/philosophy.jpg",
    span: "md:col-span-1",
  },
  {
    tag: "The Gym Bag",
    title: "Better than any energy drink in that cooler.",
    body: "180mg, 0g sugar. Skip the supplement aisle entirely.",
    image: "/assets/customer.jpg",
    span: "md:col-span-1",
  },
  {
    tag: "The Carry-On",
    title: "Goes wherever your passport does.",
    body: "Hotel room, red-eye, layover — no more bad airport coffee. TSA-approved and shelf-stable for 12+ months.",
    image: "/assets/hero1.jpg",
    span: "md:col-span-2",
  },
];

export default function LifestyleGrid() {
  return (
    <section
      data-testid="lifestyle-section"
      className="bg-k-cream section-padding relative overflow-hidden"
    >
      <div className="container-koffee relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5">— Built for every moment</div>
            <h2
              data-testid="lifestyle-heading"
              className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] uppercase tracking-tightest text-k-espresso text-balance"
            >
              Your day never stops.{" "}
              <em className="italic font-normal text-k-gold lowercase">
                Neither does
              </em>{" "}
              Koffelo.
            </h2>
          </div>
          <p className="text-k-ink-muted max-w-sm leading-relaxed">
            Wherever your day takes you, Koffelo comes with — pocket, drawer,
            bag, suitcase.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {scenarios.map((s, i) => (
            <article
              key={i}
              data-testid={`lifestyle-card-${i}`}
              className={`group relative overflow-hidden rounded-3xl bg-k-espresso ${s.span} aspect-[4/3] md:aspect-auto md:min-h-[420px] img-hover-zoom shadow-soft hover:shadow-premium transition-all duration-700 ease-out-expo`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Heavy gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-k-espresso via-k-espresso/55 to-k-espresso/10" />

              <div className="relative h-full flex flex-col justify-end p-7 md:p-9 lg:p-10 text-k-paper">
                <div className="text-[11px] tracking-[0.22em] uppercase text-k-amber mb-4">
                  {s.tag}
                </div>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.05] uppercase tracking-tight mb-3 text-balance">
                  {s.title}
                </h3>
                <p className="text-k-cream-50/85 max-w-md leading-relaxed text-sm md:text-base">
                  {s.body}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-k-amber opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500 ease-out-expo">
                  Explore
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
