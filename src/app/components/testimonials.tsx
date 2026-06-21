"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Shalima Hayden",
    role: "Verified Customer · Mumbai",
    image: "/assets/customer.jpg",
    text: "I have trusted Koffelo for many years. Truly amazing balance — the aroma alone is worth it. I won't order coffee from anywhere else.",
    rating: 5,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Verified Customer · Bangalore",
    image: "/assets/customer.jpg",
    text: "The nitro cold brew is unreal. Smooth, deep, and never bitter. Koffelo has become part of my morning ritual.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Verified Customer · Delhi",
    image: "/assets/customer.jpg",
    text: "Premium feel from the moment it arrives. The roast is exactly what I hoped for — bold, clean, and beautifully crafted.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section
      data-testid="testimonials-section"
      className="bg-k-espresso text-k-paper section-padding relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none" />
      {/* Decorative quote mark */}
      <div className="absolute top-0 right-0 font-display text-[20rem] leading-none text-k-paper/[0.04] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
        &ldquo;
      </div>

      <div className="container-koffee relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative img-hover-zoom rounded-[2rem] overflow-hidden aspect-square max-w-[440px] mx-auto shadow-premium">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover transition-opacity duration-700"
                key={t.id}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/40 to-transparent" />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-7">
            <div className="eyebrow text-k-amber mb-5">— Voices of Koffelo</div>
            <h2 className="font-display text-display-md text-k-paper mb-10 text-balance">
              Loved by those who <em className="italic text-k-amber">savour</em>{" "}
              the ritual.
            </h2>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg
                  key={i}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#E0B768"
                  stroke="#E0B768"
                  strokeWidth="1.2"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>

            <blockquote
              key={t.id}
              data-testid="testimonial-quote"
              className="font-display text-2xl md:text-3xl text-k-paper/95 leading-relaxed mb-8 animate-fade-in"
            >
              &ldquo;{t.text}&rdquo;
            </blockquote>

            <div className="mb-10">
              <div className="text-base font-medium text-k-paper">
                {t.name}
              </div>
              <div className="text-sm text-k-amber/80 tracking-wide">
                {t.role}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {testimonials.map((tt, i) => (
                  <button
                    key={tt.id}
                    data-testid={`testimonial-dot-${i}`}
                    onClick={() => setActive(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-500 ease-out-expo ${
                      i === active
                        ? "w-10 bg-k-amber"
                        : "w-5 bg-k-paper/30 hover:bg-k-paper/60"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase text-k-paper/50">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
