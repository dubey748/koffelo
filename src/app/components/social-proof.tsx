"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(end * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="font-display text-[clamp(3rem,7vw,6rem)] leading-none text-k-ivory tracking-tightest">
      {val.toLocaleString()}
      <span className="text-k-copper-light">{suffix}</span>
    </div>
  );
}

const numbers = [
  { value: 12, suffix: "K+", label: "Cups Brewed", note: "& counting daily" },
  { value: 48, suffix: "H", label: "Roast to Door", note: "always fresh" },
  { value: 100, suffix: "%", label: "Arabica Origin", note: "ethically sourced" },
  { value: 4, suffix: ".9★", label: "Customer Love", note: "across 200+ reviews" },
];

export default function NumbersBar() {
  return (
    <section
      data-testid="numbers-section"
      className="bg-k-black text-k-ivory border-y border-k-ivory/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none mix-blend-overlay" />
      <div className="container-koffee py-16 md:py-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 gap-x-6 md:gap-x-10">
          {numbers.map((n, i) => (
            <div
              key={i}
              data-testid={`number-tile-${i}`}
              className={`relative ${i > 0 ? "md:border-l md:border-k-ivory/10 md:pl-10" : ""}`}
            >
              <div className="text-[10px] tracking-[0.4em] uppercase text-k-copper-light mb-4">
                {String(i + 1).padStart(2, "0")} ⁄ {String(numbers.length).padStart(2, "0")}
              </div>
              <CountUp end={n.value} suffix={n.suffix} />
              <div className="mt-4 pt-4 border-t border-k-ivory/15">
                <div className="text-[11px] tracking-[0.3em] uppercase text-k-ivory mb-1.5">
                  {n.label}
                </div>
                <div className="text-xs italic text-k-ink-light-muted">{n.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
