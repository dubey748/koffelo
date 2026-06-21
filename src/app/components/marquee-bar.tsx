"use client";

const items = [
  "Pocket-sized nitro cold brew",
  "180mg clean caffeine",
  "Zero added sugar",
  "Ready in 10 seconds",
  "No machine. No fridge.",
  "12+ month shelf life",
];

export default function MarqueeBar() {
  // Duplicate for seamless scroll
  const loop = [...items, ...items, ...items];

  return (
    <div
      data-testid="marquee-bar"
      className="bg-k-espresso text-k-paper py-5 md:py-6 overflow-hidden border-y border-k-paper/10"
      aria-hidden
    >
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {loop.map((text, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10 shrink-0">
            <span className="font-display text-xl md:text-2xl lg:text-3xl uppercase tracking-tight">
              {text}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-k-gold shrink-0"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}
