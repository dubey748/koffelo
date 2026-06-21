"use client";

import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { TProductsTypes } from "./types";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

const CLONE_COUNT = 3;
const TRANSITION_DURATION = 600;

export default function FeaturedSections() {
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionClass, setTransitionClass] = useState(
    `duration-${TRANSITION_DURATION}`
  );
  const router = useRouter();
  const [products, setProducts] = useState<TProductsTypes>([]);

  const extendedProducts = useMemo(() => {
    if (products.length === 0) return [];
    const startClones = products.slice(0, CLONE_COUNT);
    const endClones = products.slice(-CLONE_COUNT);
    return [...endClones, ...products, ...startClones];
  }, [products]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get(ENDPOINT.GET_PRODUCT_INFO);
        const rawProducts = response.data?.data?.products || [];
        setProducts(rawProducts);
        setCurrentIndex(CLONE_COUNT);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (!isAutoSliding || products.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoSliding, products]);

  useEffect(() => {
    if (
      currentIndex === CLONE_COUNT - 1 ||
      currentIndex === products.length + CLONE_COUNT
    ) {
      const timer = setTimeout(() => {
        setTransitionClass("duration-0");
        const newIndex =
          currentIndex === CLONE_COUNT - 1
            ? products.length + CLONE_COUNT - 1
            : CLONE_COUNT;
        setCurrentIndex(newIndex);

        setTimeout(() => {
          setTransitionClass(`duration-${TRANSITION_DURATION}`);
        }, 50);
      }, TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, products.length]);

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

  const handleSlide = (newIndex: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  const handlePrev = () => {
    setIsAutoSliding(false);
    handleSlide(currentIndex - 1);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const handleNext = () => {
    setIsAutoSliding(false);
    handleSlide(currentIndex + 1);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoSliding(false);
    handleSlide(index + CLONE_COUNT);
    setTimeout(() => setIsAutoSliding(true), 8000);
  };

  const getCardDimensions = () => {
    if (typeof window === "undefined")
      return { width: 360, gap: 32, isMobile: false };
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      return { width: Math.min(320, screenWidth - 40), gap: 16, isMobile: true };
    } else if (screenWidth < 1024) {
      return { width: 320, gap: 24, isMobile: false };
    } else {
      return { width: 360, gap: 32, isMobile: false };
    }
  };

  const [cardDimensions, setCardDimensions] = useState(getCardDimensions());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => setCardDimensions(getCardDimensions());
    setCardDimensions(getCardDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!cardDimensions.isMobile) return;
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardDimensions.isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!cardDimensions.isMobile || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  const { width: cardWidth, gap, isMobile } = cardDimensions;
  const totalCardWidth = cardWidth + gap;
  const transformValue = -currentIndex * totalCardWidth;

  return (
    <section
      data-testid="featured-products-section"
      className="relative bg-k-cream section-padding overflow-hidden"
      id="products"
    >
      {/* Decorative grain */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="container-koffee relative">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">— The Collection</div>
            <h2
              data-testid="featured-heading"
              className="font-display text-display-lg text-k-espresso text-balance"
            >
              Coffee that works as hard as <em className="italic text-k-gold">you do.</em>
            </h2>
          </div>
          <p className="text-k-ink-muted max-w-md leading-relaxed">
            Single-origin beans, slow-crafted blends, and a nitro cold brew
            unlike anything you&apos;ve tasted. Every cup, a quiet ritual.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-3xl bg-k-cream-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Carousel */}
            <div className="relative flex items-center justify-center">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                data-testid="featured-prev-btn"
                className="hidden md:flex absolute -left-2 lg:-left-6 z-20 w-12 h-12 rounded-full bg-k-paper border border-k-cream-200 text-k-espresso hover:bg-k-espresso hover:text-k-paper hover:border-k-espresso transition-all duration-400 ease-out-expo items-center justify-center shadow-soft hover:shadow-medium disabled:opacity-40"
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div
                className="overflow-hidden w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`flex items-stretch transition-transform ease-out-expo ${transitionClass}`}
                  style={{ transform: `translateX(${transformValue}px)` }}
                >
                  {extendedProducts.map((product, idx) => {
                    const actualProductId = product?.variants?.[0]?.productId;
                    const productVariant = product?.variants?.[0];
                    const image = (product as any).bannerUrl;

                    return (
                      <article
                        key={`product-clone-${actualProductId}-${idx}`}
                        data-testid={`featured-product-card-${actualProductId}`}
                        onClick={(e) => {
                          handleGtmClick(product, actualProductId);
                          if ((e.target as HTMLElement).tagName !== "BUTTON")
                            router.push(`/product/${actualProductId}`);
                        }}
                        className="group flex-shrink-0 cursor-pointer select-none flex flex-col"
                        style={{
                          width: `${cardWidth}px`,
                          marginRight: `${gap}px`,
                        }}
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-k-cream-100 img-hover-zoom shadow-soft group-hover:shadow-medium transition-shadow duration-600">
                          <img
                            src={image || "/assets/speciality.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {/* gold tag */}
                          {productVariant?.discountedPrice && (
                            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-k-paper/95 backdrop-blur-sm text-k-espresso text-[11px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-k-gold" />
                              Best Seller
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="pt-5 px-1 flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="font-display text-2xl text-k-espresso leading-tight group-hover:text-k-coffee transition-colors duration-400">
                              {product.name}
                            </h3>
                            {productVariant?.price && (
                              <div className="text-right shrink-0">
                                <div className="text-base font-medium text-k-espresso">
                                  ₹{productVariant?.discountedPrice || productVariant?.price}
                                </div>
                                {productVariant?.discountedPrice &&
                                  productVariant?.price !== productVariant?.discountedPrice && (
                                    <div className="text-xs text-k-ink-muted line-through">
                                      ₹{productVariant?.price}
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-k-ink-muted leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                          <button
                            data-testid={`featured-shop-btn-${actualProductId}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleGtmClick(product, actualProductId);
                              const contents = product.variants.map((item) => ({
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
                                page_url:
                                  window.location.pathname + " " + "featured-sections",
                                page_title: document.title,
                              });
                              router.push(`/product/${actualProductId}`);
                            }}
                            className="mt-3 self-start inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-k-espresso link-underline group/btn"
                            type="button"
                          >
                            Shop Now
                            <span className="inline-block transition-transform duration-400 group-hover/btn:translate-x-1">→</span>
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={isTransitioning}
                data-testid="featured-next-btn"
                className="hidden md:flex absolute -right-2 lg:-right-6 z-20 w-12 h-12 rounded-full bg-k-paper border border-k-cream-200 text-k-espresso hover:bg-k-espresso hover:text-k-paper hover:border-k-espresso transition-all duration-400 ease-out-expo items-center justify-center shadow-soft hover:shadow-medium disabled:opacity-40"
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-10 gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  data-testid={`featured-dot-${index}`}
                  onClick={() => handleDotClick(index)}
                  className={`h-1 rounded-full transition-all duration-500 ease-out-expo ${
                    currentIndex === index + CLONE_COUNT
                      ? "w-10 bg-k-espresso"
                      : "w-5 bg-k-cream-200 hover:bg-k-walnut"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
