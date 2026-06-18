"use client";

import { ENDPOINT } from "@/endpoint";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { TProductsTypes } from "./types";
import { CloudCog } from "lucide-react";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

const CLONE_COUNT = 3;
const TRANSITION_DURATION = 200;

export default function CoffeeProductsPage() {
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
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
    }, 500);

    return () => clearInterval(interval);
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
    setExpandedInfo(null);
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

  const toggleInfo = (id: any) => {
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(0); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Touch handlers for individual cards
  const handleCardTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    e.stopPropagation(); // Prevent container touch events
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleCardTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart || !touchEnd) return;
    e.stopPropagation();

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Responsive card dimensions
  const getCardDimensions = () => {
    if (typeof window === "undefined")
      return { width: 320, gap: 30, isMobile: false };

    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      // sm - mobile
      return {
        width: Math.min(300, screenWidth - 60),
        gap: 20,
        isMobile: true,
      };
    } else if (screenWidth < 1024) {
      // lg
      return { width: 300, gap: 20, isMobile: false };
    } else {
      return { width: 320, gap: 30, isMobile: false };
    }
  };

  const [cardDimensions, setCardDimensions] = useState(getCardDimensions());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setCardDimensions(getCardDimensions());
    };

    // Set initial dimensions after component mounts
    setCardDimensions(getCardDimensions());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width: cardWidth, gap, isMobile } = cardDimensions;
  const totalCardWidth = cardWidth + gap;
  const transformValue = -currentIndex * totalCardWidth;

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#f5e6d3] to-[#f0dcc7] min-h-screen py-4 sm:py-8 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-[#3a2a1a] text-center">
          Our Premium Coffee Collection
        </h2>
        <p className="text-[#5a4a3a] text-sm sm:text-base">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-[#f5e6d3] to-[#f0dcc7] py-4 sm:py-8 flex flex-col items-center px-2 sm:px-4 overflow-x-hidden"
      id="products"
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
      }}
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-[#3a2a1a] text-center w-full max-w-7xl mx-auto px-2">
        Our Premium Coffee Collection
      </h2>

      <div className="flex justify-center items-center w-full relative">
        {/* Left Arrow - Hidden on Mobile */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="hidden sm:flex mr-1 sm:mr-2 lg:mr-4 z-20 bg-[#f0e0c8]/90 backdrop-blur-sm hover:bg-white text-[#42281e] rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#42281e]/10 hover:border-[#42281e]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 flex-shrink-0"
          aria-label="Previous products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          className="overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm p-2 sm:p-3 lg:p-5"
          style={{
            width: isMobile ? `${cardWidth + 4}px` : "auto",
            maxWidth: isMobile
              ? `${cardWidth + 4}px`
              : `${3 * cardWidth + 2 * gap + 40}px`,
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex items-stretch transition-transform ease-out ${transitionClass}`}
            style={{ transform: `translateX(${transformValue}px)` }}
          >
            {extendedProducts.map((product, index) => {
              const actualProductId = product?.variants?.[0]?.productId;
              const productVariant = product?.variants?.[0];
              const image = (product as any).bannerUrl;
              const isExpanded = expandedInfo === actualProductId;

              return (
                <div
                  onClick={(e) => {
                    handleGtmClick(product, actualProductId);
                    if ((e.target as HTMLElement).tagName !== "BUTTON")
                      router.push(`/product/${actualProductId}`);
                  }}
                  onTouchStart={handleCardTouchStart}
                  onTouchMove={handleCardTouchMove}
                  onTouchEnd={handleCardTouchEnd}
                  key={`product-clone-${actualProductId}-${index}`}
                  className={`select-none border-2 border-[#42281e]/20 rounded-xl sm:rounded-2xl overflow-hidden relative flex flex-col bg-[#f0e0c8] group flex-shrink-0 transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-105 transform-gpu cursor-pointer ${
                    isMobile ? "touch-manipulation" : ""
                  }`}
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${gap}px`,
                    height: "auto",
                    minHeight: "400px",
                    maxHeight: isMobile ? "500px" : "600px",
                    boxShadow: "0 10px 40px rgba(66, 40, 30, 0.15)",
                  }}
                >
                  {/* Card Image */}
                  <div
                    className="relative w-full overflow-hidden bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0] flex-shrink-0"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <img
                      src={image || "/assets/speciality.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow min-h-0">
                    <h3 className="text-lg sm:text-xl font-bold text-[#3a2a1a] mb-2 sm:mb-3 group-hover:text-[#42281e] transition-colors flex-shrink-0 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#5a4a3a] mb-3 sm:mb-4 flex-grow overflow-hidden">
                      <span className="line-clamp-2 sm:line-clamp-3">
                        {product.description}
                      </span>
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleInfo(actualProductId);
                      }}
                      className="flex items-center text-[#8a7a6a] mb-3 sm:mb-4 border-2 border-[#d8c8b0] px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm self-start hover:bg-[#e8d8c0] hover:border-[#c8b8a0] transition-all duration-300 font-medium group/btn flex-shrink-0"
                    >
                      <span>MORE INFO</span>
                      <svg
                        className={`ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 flex-shrink-0 ${
                        isExpanded
                          ? "max-h-24 sm:max-h-32 opacity-100 mb-3 sm:mb-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="bg-gradient-to-r from-[#e8d8c0] to-[#f0e0c8] p-2 sm:p-3 lg:p-4 rounded-lg text-xs sm:text-sm text-[#5a4a3a] border border-[#d8c8b0]">
                        <p className="line-clamp-2 sm:line-clamp-3">
                          More detailed information about {product.name}...
                        </p>
                        <p className="mt-1 sm:mt-2 text-xs opacity-80">
                          Perfect for morning brew and afternoon picks!
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGtmClick(product, actualProductId);

                        const contents = product.variants.map((item) => {
                          return {
                            id: item.productId,
                            quantity: 0,
                            item_price: item.price,
                          };
                        });
                        pushToDataLayer({
                          event: "ViewContent",
                          content_ids: [actualProductId],
                          contents: contents,
                          content_type: "product",
                          value: 0,
                          currency: "INR",
                          num_items: 0,
                          page_url:
                            window.location.pathname +
                            " " +
                            "featured-sections",
                          page_title: document.title,
                        });
                        router.push(`/product/${actualProductId}`);
                      }}
                      className="w-full bg-gradient-to-r from-[#42281e] to-[#2a1a12] text-white py-2 sm:py-2.5 lg:py-3 font-semibold rounded-lg sm:rounded-xl hover:from-[#2a1a12] hover:to-[#1a0f08] transition-all duration-300 flex justify-center items-center px-2 sm:px-4 text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 flex-shrink-0 mt-auto"
                    >
                      <div className="flex items-center">
                        <p>Shop Now</p>
                        {/* <span className="text-lg font-bold">
                          ₹{productVariant?.price}
                        </span> */}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow - Hidden on Mobile */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="hidden sm:flex ml-1 sm:ml-2 lg:ml-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-[#42281e] rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#42281e]/10 hover:border-[#42281e]/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 flex-shrink-0"
          aria-label="Next products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-4 sm:mt-6 space-x-1.5 sm:space-x-2 px-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index + CLONE_COUNT
                ? "bg-[#42281e] w-4 sm:w-6"
                : "bg-[#c8b8a0] hover:bg-[#8a7a6a] w-2.5 sm:w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
