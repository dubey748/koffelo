"use client";

import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TProductsTypes } from "./types";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

// Editorial fallback "menu" so the section never feels empty
const fallback = [
  { name: "The Signature", description: "Nitro cold brew · classic body", price: 899 },
  { name: "Midnight Reserve", description: "Bold extract · deep roast", price: 1199 },
  { name: "Morning Whisper", description: "Light bodied · floral notes", price: 749 },
];

export default function FeaturedSections() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const r = await axiosInstance.get(ENDPOINT.GET_PRODUCT_INFO);
        const raw = r.data?.data?.products || [];
        setProducts(raw);
      } catch {
        // Silent — render fallback editorial menu
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const list = products.length > 0 ? products.slice(0, 6) : fallback;

  const goToProduct = (product: any) => {
    const actualProductId = product?.variants?.[0]?.productId;
    if (!actualProductId) return;
    try {
      GTMTracker.trackViewContent({
        content_ids: [String(actualProductId)],
        contents: [
          {
            id: actualProductId,
            quantity: 1,
            item_price: product?.variants?.[0]?.discountedPrice,
          },
        ],
        content_type: "product",
        value: product.variants[0]?.discountedPrice,
        currency: "INR",
        num_items: 1,
        page_url: window.location.pathname,
        page_title: document.title,
      });
      pushToDataLayer({
        event: "ViewContent",
        content_ids: [actualProductId],
        contents: product.variants.map((it: any) => ({
          id: it.productId,
          quantity: 0,
          item_price: it.price,
        })),
        content_type: "product",
        value: 0,
        currency: "INR",
        num_items: 0,
        page_url: window.location.pathname,
        page_title: document.title,
      });
    } catch {}
    router.push(`/product/${actualProductId}`);
  };

  return (
    <section
      id="collection"
      data-testid="collection-section"
      className="relative bg-k-black text-k-ivory section-padding overflow-hidden"
    >
      {/* Decorative copper line */}
      <div className="divider-gold absolute top-0 left-0 right-0" />

      {/* Decorative italic word */}
      <div
        aria-hidden
        className="absolute -bottom-16 left-0 right-0 font-display italic text-[clamp(12rem,28vw,32rem)] leading-none text-k-ivory/[0.025] select-none pointer-events-none whitespace-nowrap text-center"
      >
        collection
      </div>

      <div className="container-koffee relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-10 h-px bg-k-copper" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper-light">
                Chapter V · The Menu
              </span>
            </div>
            <h2
              data-testid="collection-heading"
              className="font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.9] tracking-tightest text-k-ivory text-balance"
            >
              A small collection,{" "}
              <span className="italic text-k-copper-light">made well.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <p className="text-k-ink-light-muted leading-relaxed max-w-md mb-5">
              Six expressions of the same idea — coffee with personality,
              dressed for any moment. Choose your character below.
            </p>
            <button
              onClick={() => router.push("/")}
              data-testid="collection-view-all"
              className="text-[11px] tracking-[0.3em] uppercase text-k-copper-light link-underline"
              type="button"
            >
              View all expressions →
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-3xl bg-k-ivory/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <ul className="border-t border-k-ivory/15">
            {list.map((product: any, idx: number) => {
              const actualProductId = product?.variants?.[0]?.productId;
              const productVariant = product?.variants?.[0];
              const image = product.bannerUrl || "/assets/Banner.jpg";
              const price = productVariant?.discountedPrice || productVariant?.price || product.price;
              const isHover = hover === idx;
              const isClickable = !!actualProductId;

              return (
                <li
                  key={(actualProductId || idx).toString()}
                  data-testid={`collection-item-${idx}`}
                  className="border-b border-k-ivory/15 group relative"
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => isClickable && goToProduct(product)}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                >
                  <div className="grid grid-cols-12 gap-6 py-7 md:py-9 items-center transition-all duration-500 ease-out-expo">
                    <div className="col-span-2 md:col-span-1 text-[11px] tracking-[0.3em] text-k-copper-light italic">
                      N°{String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-7 md:col-span-7 lg:col-span-8">
                      <h3 className={`font-display text-[clamp(1.5rem,3.5vw,3rem)] leading-tight transition-all duration-500 ${isHover ? "text-k-copper-light translate-x-3" : "text-k-ivory"}`}>
                        {product.name}
                      </h3>
                      <p className="text-sm md:text-base text-k-ink-light-muted mt-2 max-w-xl line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="col-span-3 md:col-span-4 lg:col-span-3 text-right">
                      <div className="font-display text-xl md:text-2xl text-k-ivory">
                        {price ? `₹${price}` : "—"}
                      </div>
                      {productVariant?.discountedPrice &&
                        productVariant?.price !== productVariant?.discountedPrice && (
                          <div className="text-xs text-k-ivory/40 line-through">
                            ₹{productVariant?.price}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Hover preview image */}
                  <div
                    aria-hidden
                    className={`pointer-events-none hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 w-56 h-72 rounded-2xl overflow-hidden border border-k-ivory/15 shadow-premium transition-all duration-700 ease-out-expo z-20 ${isHover ? "opacity-100 scale-100 rotate-[-3deg]" : "opacity-0 scale-90 rotate-0"}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-k-black/40 to-transparent" />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
