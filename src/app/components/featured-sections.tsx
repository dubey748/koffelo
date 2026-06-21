"use client";

import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TProductsTypes } from "./types";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

export default function FeaturedSections() {
  const router = useRouter();
  const [products, setProducts] = useState<TProductsTypes>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINT.GET_PRODUCT_INFO);
        const rawProducts = response.data?.data?.products || [];
        setProducts(rawProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleGtmClick = (product: any, actualProductId: any) => {
    const payload = {
      content_ids: [String(actualProductId)],
      contents: [
        {
          id: actualProductId,
          quantity: 1,
          item_price: product?.variants[0]?.discountedPrice,
        },
      ],
      content_type: "product",
      value: product.variants[0]?.discountedPrice,
      currency: "INR",
      num_items: 1,
      page_url: window.location.pathname + " " + "ProductDetails",
      page_title: document.title,
    };
    GTMTracker.trackViewContent(payload);
  };

  const goToProduct = (product: any, actualProductId: any) => {
    handleGtmClick(product, actualProductId);
    const contents = product.variants.map((item: any) => ({
      id: item.productId,
      quantity: 0,
      item_price: item.price,
    }));
    pushToDataLayer({
      event: "ViewContent",
      content_ids: [actualProductId],
      contents,
      content_type: "product",
      value: 0,
      currency: "INR",
      num_items: 0,
      page_url: window.location.pathname + " " + "featured-sections",
      page_title: document.title,
    });
    router.push(`/product/${actualProductId}`);
  };

  return (
    <section
      data-testid="featured-products-section"
      id="products"
      className="bg-k-espresso text-k-paper section-padding relative overflow-hidden"
    >
      {/* Decorative giant text */}
      <div
        aria-hidden
        className="absolute -bottom-10 left-0 right-0 font-display text-[20rem] leading-none uppercase text-k-paper/[0.03] whitespace-nowrap select-none overflow-hidden pointer-events-none"
      >
        Koffelo Koffelo Koffelo
      </div>

      <div className="container-koffee relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-3xl">
            <div className="eyebrow text-k-amber mb-5">— The Collection</div>
            <h2
              data-testid="featured-heading"
              className="font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.92] uppercase tracking-tightest text-k-paper text-balance"
            >
              Coffee that works as hard{" "}
              <em className="italic font-normal text-k-gold lowercase">as you do.</em>
            </h2>
          </div>
          <button
            data-testid="featured-shop-all"
            onClick={() => router.push("/")}
            className="hidden md:inline-flex items-center gap-3 text-k-amber text-sm tracking-[0.22em] uppercase link-underline shrink-0"
          >
            Shop the full range <span>→</span>
          </button>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[4/5] rounded-3xl bg-k-paper/5 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-k-paper/60">
            No products available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, 6).map((product: any, idx: number) => {
              const actualProductId = product?.variants?.[0]?.productId;
              const productVariant = product?.variants?.[0];
              const image = product.bannerUrl || "/assets/speciality.jpg";

              return (
                <article
                  key={actualProductId || idx}
                  data-testid={`featured-product-card-${actualProductId}`}
                  onClick={() => goToProduct(product, actualProductId)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-k-coffee img-hover-zoom mb-5">
                    <img
                      src={image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-k-espresso/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Index number top-left */}
                    <div className="absolute top-5 left-5 font-display text-3xl text-k-paper/90 leading-none">
                      0{idx + 1}
                    </div>

                    {/* Gold dot */}
                    <div className="absolute top-6 right-5 w-2 h-2 rounded-full bg-k-gold" />

                    {/* Hover CTA bar */}
                    <div className="absolute bottom-4 left-4 right-4 bg-k-paper text-k-espresso rounded-full px-5 py-3 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-medium opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out-expo">
                      <span>View product</span>
                      <span>→</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-k-paper leading-tight mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-k-paper/55 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                    {productVariant?.price && (
                      <div className="text-right shrink-0">
                        <div className="font-display text-lg text-k-amber">
                          ₹
                          {productVariant?.discountedPrice ||
                            productVariant?.price}
                        </div>
                        {productVariant?.discountedPrice &&
                          productVariant?.price !==
                            productVariant?.discountedPrice && (
                            <div className="text-xs text-k-paper/40 line-through">
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
