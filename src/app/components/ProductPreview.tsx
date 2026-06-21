"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FallbackProduct } from "./_fallbackCatalogue";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductPreview({
  product,
  others,
}: {
  product: FallbackProduct;
  others: FallbackProduct[];
}) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = Math.round(
    ((product.price - product.discountedPrice) / product.price) * 100
  );

  return (
    <main className="bg-k-ivory min-h-screen">
      <section className="pt-28 md:pt-32 pb-20">
        <div className="container-koffee">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-k-walnut/70 mb-8 md:mb-12">
            <button
              onClick={() => router.push("/")}
              className="hover:text-k-copper transition-colors"
              type="button"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => router.push("/#collection")}
              className="hover:text-k-copper transition-colors"
              type="button"
            >
              Collection
            </button>
            <span>/</span>
            <span className="text-k-espresso truncate">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* IMAGE */}
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-[560px] mx-auto lg:mx-0">
                <div
                  aria-hidden
                  className="absolute -inset-3 sm:-inset-5 border border-k-copper/30 rounded-[1.75rem] sm:rounded-[2.5rem] pointer-events-none"
                />
                <div className="relative aspect-[4/5] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-k-cream-100 shadow-premium">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/25 to-transparent" />
                  <div className="absolute top-5 left-5 font-display italic text-3xl sm:text-4xl text-k-ivory drop-shadow">
                    N°{String(product.id).padStart(2, "0")}
                  </div>
                  <div className="absolute top-5 right-5 px-3 py-1.5 bg-k-ivory/95 backdrop-blur-sm rounded-full text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-k-espresso shadow-soft border border-k-cream-200">
                    {product.tag}
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <span className="block w-8 sm:w-10 h-px bg-k-copper" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
                  N°{String(product.id).padStart(2, "0")} · {product.tag}
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.95] tracking-tightest text-k-espresso mb-5 md:mb-6">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-k-ink-muted leading-relaxed mb-8 max-w-xl">
                {product.description}
              </p>

              {/* Price row */}
              <div className="flex items-baseline gap-4 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-k-cream-200">
                <div className="font-display text-3xl sm:text-4xl text-k-espresso">
                  ₹{product.discountedPrice}
                </div>
                <div className="text-base text-k-walnut/60 line-through">
                  ₹{product.price}
                </div>
                {discount > 0 && (
                  <div className="text-[10px] tracking-[0.22em] uppercase text-k-copper bg-k-copper/10 px-3 py-1 rounded-full">
                    Save {discount}%
                  </div>
                )}
              </div>

              {/* Tasting Notes */}
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.3em] uppercase text-k-copper mb-4">
                  Tasting Notes
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="px-4 py-2 rounded-full border border-k-cream-200 bg-k-paper text-sm text-k-espresso"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-k-cream-200">
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-k-walnut/70 mb-2">
                    Origin
                  </div>
                  <div className="font-display text-lg text-k-espresso">
                    {product.origin}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-k-walnut/70 mb-2">
                    Roast
                  </div>
                  <div className="font-display text-lg text-k-espresso">
                    {product.roast}
                  </div>
                </div>
              </div>

              {/* Quantity + Add */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="inline-flex items-center bg-k-paper border border-k-cream-200 rounded-full">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    type="button"
                    className="w-12 h-12 inline-flex items-center justify-center text-k-espresso hover:text-k-copper transition-colors"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-4 font-display text-xl text-k-espresso min-w-[2.5rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    type="button"
                    className="w-12 h-12 inline-flex items-center justify-center text-k-espresso hover:text-k-copper transition-colors"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setAdded(true);
                    setTimeout(() => setAdded(false), 2200);
                  }}
                  data-testid="product-add-to-cart"
                  type="button"
                  className="group flex-1 inline-flex items-center justify-between bg-k-espresso text-k-ivory rounded-full pl-6 pr-2 py-2 transition-all duration-500 ease-out-expo hover:bg-k-coffee min-h-[52px]"
                >
                  <span className="text-[11px] sm:text-[12px] tracking-[0.22em] sm:tracking-[0.25em] uppercase">
                    {added ? "Added to bag" : "Add to bag"}
                  </span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-k-copper text-k-ivory transition-transform duration-500 group-hover:rotate-45">
                    →
                  </span>
                </button>
              </div>

              <div className="text-xs text-k-walnut/70 italic max-w-md">
                Ships within 48 hours of roasting · Recyclable packaging
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other expressions */}
      {others.length > 0 && (
        <section className="bg-k-paper border-t border-k-cream-200 py-16 md:py-20">
          <div className="container-koffee">
            <div className="flex items-center justify-between gap-4 mb-10">
              <div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-k-copper mb-3">
                  More expressions
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-k-espresso">
                  You may also enjoy
                </h2>
              </div>
              <button
                onClick={() => router.push("/#collection")}
                className="text-[11px] tracking-[0.25em] uppercase text-k-copper link-underline"
                type="button"
              >
                View all →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {others.slice(0, 3).map((o) => (
                <article
                  key={o.id}
                  onClick={() => router.push(`/product/${o.id}`)}
                  className="group cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden img-hover-zoom shadow-soft mb-4 bg-k-cream-100">
                    <img
                      src={o.img}
                      alt={o.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/15 to-transparent" />
                    <div className="absolute top-3 left-3 font-display italic text-lg text-k-ivory">
                      N°{String(o.id).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-base sm:text-lg text-k-espresso truncate">
                      {o.name}
                    </h3>
                    <div className="font-display text-sm sm:text-base text-k-copper shrink-0">
                      ₹{o.discountedPrice}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
