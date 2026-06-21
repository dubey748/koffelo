"use client";

const chapters = [
  {
    no: "II",
    tag: "The Source",
    title: "From one hand to another.",
    body: "We work with smallholder growers across Karnataka, Kerala, and Tamil Nadu — names we know, harvests we visit. Every bean is hand-sorted before it ever sees fire.",
    image: "/assets/handpicked.png",
    accent: "Single-origin · Hand-sorted",
  },
  {
    no: "III",
    tag: "The Fire",
    title: "Slow roasted. Small batches.",
    body: "Each batch spends time in the drum — not on a schedule, but until the bean tells us it's ready. The result is a cup that tastes like intent.",
    image: "/assets/superbold.png",
    accent: "Small batch · 11 minute roast",
  },
  {
    no: "IV",
    tag: "The Pour",
    title: "Pressed in pure nitrogen.",
    body: "Concentrate meets nitrogen meets cartridge — sealed at peak extraction. No oxidation, no compromise. Spray it, and the cascade tells the story.",
    image: "/assets/beans.png",
    accent: "N₂ infused · 10s cascade",
  },
];

export default function Chapters() {
  return (
    <section
      id="ritual"
      data-testid="chapters-section"
      className="bg-k-ivory section-padding relative overflow-hidden"
    >
      {/* Decorative giant chapter number background */}
      <div
        aria-hidden
        className="absolute -top-10 -right-20 font-display italic text-[28rem] leading-none text-k-copper/[0.05] select-none pointer-events-none"
      >
        ii
      </div>

      <div className="container-koffee relative">
        {/* Section preface */}
        <div className="max-w-3xl mb-20 md:mb-28">
          <div className="flex items-center gap-4 mb-7">
            <span className="block w-10 h-px bg-k-copper" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper">
              Chapters II — IV · The Craft
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] tracking-tightest text-k-espresso text-balance">
            Coffee is a sequence{" "}
            <span className="italic text-k-copper">of small decisions,</span>{" "}
            made with care.
          </h2>
        </div>

        {/* Chapters — alternating asymmetric */}
        <div className="space-y-24 md:space-y-32">
          {chapters.map((c, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={c.no}
                data-testid={`chapter-${i}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <div className="lg:col-span-6 relative">
                  <div className={`relative ${reverse ? "lg:ml-auto" : ""} max-w-[560px]`}>
                    {/* Frame */}
                    <div className="absolute -inset-4 md:-inset-6 border border-k-copper/30 rounded-[2.5rem] pointer-events-none" />
                    <div className="relative img-hover-zoom rounded-[2rem] overflow-hidden aspect-[4/5] bg-k-coffee shadow-medium">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-k-black/35 to-transparent" />
                      {/* Roman numeral overlay */}
                      <div className={`absolute ${reverse ? "right-6" : "left-6"} top-5 font-display italic text-7xl md:text-8xl text-k-ivory/90 leading-none`}>
                        {c.no}
                      </div>
                      {/* Accent ribbon */}
                      <div className="absolute bottom-5 left-5 right-5 px-4 py-2.5 bg-k-black/50 backdrop-blur-md rounded-full border border-k-ivory/20 text-[10px] tracking-[0.3em] uppercase text-k-ivory text-center">
                        {c.accent}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="lg:col-span-6">
                  <div className={`max-w-xl ${reverse ? "" : "lg:pl-4"}`}>
                    <div className="text-[10px] tracking-[0.4em] uppercase text-k-copper mb-5">
                      Chapter {c.no} · {c.tag}
                    </div>
                    <h3 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] text-k-espresso mb-7 text-balance">
                      {c.title.split(" ").map((w, k) =>
                        k === c.title.split(" ").length - 2 ? (
                          <span key={k} className="italic text-k-copper">{w} </span>
                        ) : (
                          <span key={k}>{w} </span>
                        )
                      )}
                    </h3>
                    <p className="text-k-ink-muted text-lg leading-relaxed mb-8">
                      {c.body}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-k-walnut">
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
