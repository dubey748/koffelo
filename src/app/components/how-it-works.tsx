"use client";

const chapters = [
  {
    no: "II",
    tag: "The Source",
    title: "From one hand to another.",
    body: "We work with smallholder growers across Karnataka, Kerala, and Tamil Nadu — names we know, harvests we visit. Every bean is hand-sorted before it ever sees fire.",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&q=85&auto=format&fit=crop",
    accent: "Single-origin · Hand-sorted",
  },
  {
    no: "III",
    tag: "The Fire",
    title: "Slow roasted. Small batches.",
    body: "Each batch spends time in the drum — not on a schedule, but until the bean tells us it's ready. The result is a cup that tastes like intent, not output.",
    image: "https://images.unsplash.com/photo-1542367592-8849eb950fd8?w=900&q=85&auto=format&fit=crop",
    accent: "Small batch · 11 minute roast",
  },
  {
    no: "IV",
    tag: "The Pour",
    title: "Pressed in pure nitrogen.",
    body: "Concentrate meets nitrogen meets cartridge — sealed at peak extraction. No oxidation, no compromise. Spray it, and the cascade tells the story.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&auto=format&fit=crop",
    accent: "N₂ infused · 10s cascade",
  },
];

export default function Chapters() {
  return (
    <section
      id="ritual"
      data-testid="chapters-section"
      className="bg-k-paper section-padding relative overflow-hidden"
    >
      <div
        aria-hidden
        className="hidden md:block absolute -top-10 -right-20 font-display italic text-[20rem] lg:text-[28rem] leading-none text-k-copper/[0.05] select-none pointer-events-none"
      >
        ii
      </div>

      <div className="container-koffee relative">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 md:mb-7">
            <span className="block w-8 sm:w-10 h-px bg-k-copper" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
              Chapters II — IV · The Craft
            </span>
          </div>
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] tracking-tightest text-k-espresso text-balance">
            Coffee is a sequence{" "}
            <span className="italic text-k-copper">of small decisions,</span>{" "}
            made with care.
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {chapters.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={c.no}
                data-testid={`chapter-${i}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
              >
                <div
                  className={`lg:col-span-6 relative ${reverse ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div
                    className={`relative ${reverse ? "lg:ml-auto" : ""} max-w-[520px] mx-auto lg:mx-0`}
                  >
                    <div className="absolute -inset-3 sm:-inset-5 border border-k-copper/30 rounded-[1.75rem] sm:rounded-[2.5rem] pointer-events-none" />
                    <div className="relative img-hover-zoom rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden aspect-[4/5] bg-k-cream-100 shadow-medium">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/40 via-transparent to-transparent" />
                      <div
                        className={`absolute ${reverse ? "right-5" : "left-5"} top-4 sm:top-5 font-display italic text-6xl sm:text-7xl md:text-8xl text-k-ivory/90 leading-none`}
                      >
                        {c.no}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 px-4 py-2 sm:py-2.5 bg-k-espresso/55 backdrop-blur-md rounded-full border border-k-ivory/20 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-ivory text-center">
                        {c.accent}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                  <div className={`max-w-xl mx-auto lg:mx-0 ${reverse ? "" : "lg:pl-4"}`}>
                    <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper mb-4 sm:mb-5">
                      Chapter {c.no} · {c.tag}
                    </div>
                    <h3 className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[0.95] text-k-espresso mb-5 sm:mb-7 text-balance">
                      {c.title.split(" ").map((w, k, arr) =>
                        k === arr.length - 2 ? (
                          <span key={k} className="italic text-k-copper">
                            {w}{" "}
                          </span>
                        ) : (
                          <span key={k}>{w} </span>
                        )
                      )}
                    </h3>
                    <p className="text-k-ink-muted text-base sm:text-lg leading-relaxed mb-7 sm:mb-8">
                      {c.body}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-walnut">
                      <span className="block w-6 h-px bg-k-walnut" />
                      Read on
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
