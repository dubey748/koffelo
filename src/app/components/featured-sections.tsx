"use client";

import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

// Premium fallback display so the collection never feels empty
const fallback = [
  {
    name: "The Signature",
    description: "Nitro cold brew · classic body",
    price: 899,
    img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&q=85&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    name: "Midnight Reserve",
    description: "Bold extract · deep roast",
    price: 1199,
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=85&auto=format&fit=crop",
    tag: "Limited",
  },
  {
    name: "Morning Whisper",
    description: "Light bodied · floral notes",
    price: 749,
    img: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800&q=85&auto=format&fit=crop",
    tag: "New",
  },
  {
    name: "Atelier No. 4",
    description: "Cold brew · single origin",
    price: 949,
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=85&auto=format&fit=crop",
    tag: "Editor's Pick",
  },
  {
    name: "Slow Sunday",
    description: "Pour-over · honey roast",
    price: 829,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85&auto=format&fit=crop",
    tag: "Classic",
  },
  {
    name: "The Carry-On",
    description: "Travel pack · 4 cartridges",
    price: 2499,
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=85&auto=format&fit=crop",
    tag: "Bundle",
  },
];

export default function FeaturedSections() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const r = await axiosInstance.get(ENDPOINT.GET_PRODUCT_INFO);
        const raw = r.data?.data?.products || [];
        setProducts(raw);
      } catch {
        // Silent — fallback renders
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const useFallback = products.length === 0;
  const list = useFallback ? fallback : products.slice(0, 6);

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
      className="relative bg-k-ivory text-k-espresso section-padding overflow-hidden"
    >
      <div
        aria-hidden
        className="hidden md:block absolute -bottom-16 left-0 right-0 font-display italic text-[clamp(10rem,24vw,26rem)] leading-none text-k-copper/[0.05] select-none pointer-events-none whitespace-nowrap text-center"
      >
        collection
      </div>

      <div className="container-koffee relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <span className="block w-8 sm:w-10 h-px bg-k-copper" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
                Chapter V · The Menu
              </span>
            </div>
            <h2
              data-testid="collection-heading"
              className="font-display text-[clamp(2rem,6.5vw,5.5rem)] leading-[0.9] tracking-tightest text-k-espresso text-balance"
            >
              A small collection,{" "}
              <span className="italic text-k-copper">made well.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-k-ink-muted leading-relaxed mb-4 sm:mb-5 max-w-md">
              Six expressions of the same idea — coffee with personality, dressed
              for any moment. Choose your character below.
            </p>
            <button
              onClick={() => router.push("/")}
              data-testid="collection-view-all"
              className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-k-copper link-underline min-h-[44px] inline-flex items-center"
              type="button"
            >
              View all expressions →
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-3xl bg-k-cream-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {list.map((item: any, idx: number) => {
              const isApi = !useFallback;
              const actualProductId = isApi
                ? item?.variants?.[0]?.productId
                : null;
              const productVariant = isApi ? item?.variants?.[0] : null;
              const image = isApi
                ? item.bannerUrl ||
                  fallback[idx % fallback.length].img
                : item.img;
              const price = isApi
                ? productVariant?.discountedPrice || productVariant?.price
                : item.price;
              const tag = isApi
                ? idx === 0
                  ? "Best Seller"
                  : null
                : item.tag;

              return (
                <article
                  key={(actualProductId || idx).toString()}
                  data-testid={`collection-item-${idx}`}
                  className="group cursor-pointer flex flex-col"
                  onClick={() => isApi && goToProduct(item)}
                  role={isApi ? "button" : undefined}
                  tabIndex={isApi ? 0 : undefined}
                  style={{ cursor: isApi ? "pointer" : "default" }}
                >
                  <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden img-hover-zoom shadow-soft hover:shadow-premium transition-shadow duration-500 mb-5 bg-k-cream-100">
                    <img
                      src={image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/15 to-transparent" />

                    {/* N° plate */}
                    <div className="absolute top-4 left-4 font-display italic text-2xl text-k-ivory drop-shadow">
                      N°{String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Tag */}
                    {tag && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-k-ivory/95 backdrop-blur-sm rounded-full text-[9px] tracking-[0.25em] uppercase text-k-espresso shadow-soft border border-k-cream-200">
                        {tag}
                      </div>
                    )}

                    {/* Hover overlay CTA */}
                    <div className="absolute bottom-4 left-4 right-4 bg-k-ivory text-k-espresso rounded-full px-5 py-3 flex items-center justify-between text-[10px] tracking-[0.22em] uppercase font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out-expo">
                      <span>View product</span>
                      <span className="text-k-copper">→</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl text-k-espresso leading-tight mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-k-ink-muted line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    {price && (
                      <div className="text-right shrink-0">
                        <div className="font-display text-lg text-k-copper">
                          ₹{price}
                        </div>
                        {isApi &&
                          productVariant?.discountedPrice &&
                          productVariant?.price !==
                            productVariant?.discountedPrice && (
                            <div className="text-xs text-k-ink-muted line-through">
                              ₹{productVariant?.price}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
