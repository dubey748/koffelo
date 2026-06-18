"use client";
import React, { useState, useMemo, useEffect } from "react";
// Link is unused in this file
import { useRouter } from "next/navigation";
import {
  RiPercentLine,
  RiStarSFill,
  RiStarLine,
  RiSubtractLine,
  RiAddLine,
} from "react-icons/ri";
import { axiosInstance } from "@/utils/axiosInstance";
import { cookieHelper } from "@/utils/cookieHelper";
import { ENDPOINT } from "@/endpoint";
// removed unused TProduct import
import {
  useAddTocartItemsAPI,
  useCartItems,
  useRemoveCartItems,
  useUpdateCartItems,
  useAuthModalStore,
} from "@/store/useCartStore";
import Nav from "./nav";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import Footer from "./footer";
import toast from "react-hot-toast";
import { pushToDataLayer } from "@/utils/gtm";
import { GTMTracker } from "@/utils/GTMEventManager";

export interface ProductUsp {
  title: string;
  description: string;
  icon: string;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Product {
  productId: number;
  name: string;
  description: string;
  productShortDescription: string;
  productUsp: ProductUsp[];
  marketPlaceLink: {
    platformName: string;
    redirectUrl: string;
    iconUrl: string;
  }[];
  price: string;
  stockQuantity: number;
  sku: string;
  productVariant: string;
  categoryId: number;
  isActive: boolean;
  Category: Category;
  ProductImages: ProductImage[];
  discountedPrice: string;
  discountedPercentage: number;
}

export interface ProductDetails {
  product: Product;
  variants: Product[];
}

export interface TProductDetails {
  productDetails: ProductDetails;
}

interface CartItem {
  id: string;
  productId: number;
  label: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
  name?: string;
  cartItemId: number;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  timeAgo: string;
  images?: string[];
}

// RatingBreakdown interface removed (unused)

const ProductOfferCard: React.FC = () => {
  const timer = { hours: "04", minutes: "57", seconds: "59" };
  return (
    // <div className="bg-brand-offer-bg border border-brand-offer-border rounded-lg p-4 my-6 shadow-sm">
    // <div className="flex items-center mb-2">
    // <div className="bg-brand-offer-btn p-2 rounded-full mr-3">
    // <RiPercentLine size={20} className="text-white" />
    // </div>
    // <span className="text-base md:text-lg font-bold text-brand-dark">
    // GET EXTRA 12% OFF
    // </span>
    // </div>
    // <hr className="border-t border-brand-offer-border my-3" />
    // <div className="flex justify-between items-center">
    // <span className="text-xs md:text-sm text-gray-600">
    // Ends In {timer.hours}h : {timer.minutes}m : {timer.seconds}s
    // </span>
    // <button className="bg-brand-offer-btn text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-brand-dark transition-colors duration-200">
    // Claim offer
    // </button>
    // </div>
    // </div>
    <div></div>
  );
};

const FeatureIcon: React.FC<{ iconSrc: string; text: string }> = ({
  iconSrc,
  text,
}) => (
  <div className="flex items-center space-x-2 text-sm text-gray-700">
    <img
      src={iconSrc}
      alt={text}
      width={24}
      height={24}
      className="object-contain"
    />
    <span>{text}</span>
  </div>
);

const ProductImageCarousel: React.FC<{
  images: ProductImage[];
  alt: string;
}> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 p-10">No Image Available</div>
    );
  }

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full max-w-xs sm:max-w-md mx-auto relative">
      <img
        src={images[current].imageUrl}
        alt={alt}
        width={500}
        height={600}
        className="object-contain w-full h-auto max-h-[65vh] mx-auto rounded-lg"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-brand-offer-btn text-white rounded-full p-2 shadow hover:bg-brand-dark transition"
            aria-label="Previous image"
            style={{ zIndex: 2 }}
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-offer-btn text-white rounded-full p-2 shadow hover:bg-brand-dark transition"
            aria-label="Next image"
            style={{ zIndex: 2 }}
          >
            &#8594;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${
                  idx === current ? "bg-brand-offer-btn" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StarRating: React.FC<{ rating: number; size?: number }> = ({
  rating,
  size = 16,
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star}>
          {star <= rating ? (
            <RiStarSFill size={size} className="brand-dark" />
          ) : (
            <RiStarLine size={size} className="text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

const ReviewsSection = ({ productId }: { productId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(3);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasUserReviewed, setHasUserReviewed] = useState<boolean>(false);
  const [meta, setMeta] = useState<any>({
    averageRating: 0,
    totalReviews: 0,
    breakdown: [],
    categories: [],
  });

  // auth modal controls (for OTP/login flow)
  const setAuthOpen = useAuthModalStore((s) => s.setOpen);
  const setAuthStep = useAuthModalStore((s) => s.setStep);

  const decodeJWT = (token: string | undefined) => {
    if (!token) return null;
    try {
      const parts = token.split(".");
      if (parts.length < 2) return null;
      const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(decodeURIComponent(escape(atob(payload))));
      return decoded;
    } catch {
      return null;
    }
  };

  // const fetchReviews = async (id: number, pageNumber = 1) => {
  // try {
  // const resp = await axiosInstance.get(
  // `${ENDPOINT.GET_REVIEWS}/${id}/reviews?page=${pageNumber}&limit=${limit}`
  // );
  // const data: any = resp?.data?.data ?? resp?.data;

  // const fetched: Review[] = data?.reviews ?? [];

  // // If first page, replace; otherwise append
  // setReviews((prev) =>
  // pageNumber === 1 ? fetched : [...prev, ...fetched]
  // );

  // setMeta((m: any) => ({
  // ...m,
  // averageRating: data?.averageRating ?? m.averageRating,
  // totalReviews: data?.count ?? data?.totalReviews ?? m.totalReviews,
  // breakdown: data?.breakdown ?? m.breakdown,
  // categories: data?.categories ?? m.categories,
  // page: data?.page ?? pageNumber,
  // limit: data?.limit ?? limit,
  // totalPages:
  // data?.totalPages ??
  // Math.ceil((data?.count ?? fetched.length) / limit),
  // }));

  // const totalPages =
  // data?.totalPages ?? Math.ceil((data?.count ?? fetched.length) / limit);
  // setHasMore(pageNumber < totalPages);
  // setPage(pageNumber);

  // // detect whether current user (from token/session) already has a review
  // try {
  // const token = cookieHelper.get("token");
  // const sessionId = cookieHelper.get("sessionId");
  // const payload = decodeJWT(token);
  // const currentId =
  // payload?.sub ||
  // payload?.id ||
  // payload?.userId ||
  // payload?.email ||
  // sessionId ||
  // null;
  // const combined =
  // pageNumber === 1 ? fetched : [...(reviews || []), ...fetched];
  // if (currentId && combined && combined.length > 0) {
  // const found = combined.some((rv: any) => {
  // const u = rv.user || {};
  // return (
  // u?.id === currentId ||
  // u?.userId === currentId ||
  // u?.email === currentId ||
  // u?.sessionId === currentId
  // );
  // });
  // setHasUserReviewed(Boolean(found));
  // }
  // } catch {
  // // ignore detection errors
  // }

  // // adjust visible count: show 3 initially, then increase by fetched length on subsequent pages
  // // visible count is handled by server-side limit; we fetch page=1 with limit=3
  // } catch (err) {
  // console.error("Failed to fetch reviews", err);
  // toast.error("Failed to load reviews");
  // }
  // };

  const fetchReviews = async (id: number, pageNumber = 1) => {
    try {
      const resp = await axiosInstance.get(
        `${ENDPOINT.GET_REVIEWS}/${id}/reviews?page=${pageNumber}&limit=${limit}`
      );

      const data: any = resp?.data?.data ?? resp?.data;
      const fetched: Review[] = data?.reviews ?? [];

      // Merge reviews and deduplicate by review.id
      setReviews((prev) => {
        if (pageNumber === 1) return fetched;

        const all = [...prev, ...fetched];
        const unique = all.filter(
          (item, index, self) =>
            index === self.findIndex((rv) => rv.id === item.id)
        );
        return unique;
      });

      // Update metadata
      setMeta((m: any) => ({
        ...m,
        averageRating: data?.averageRating ?? m.averageRating,
        totalReviews: data?.count ?? data?.totalReviews ?? m.totalReviews,
        breakdown: data?.breakdown ?? m.breakdown,
        categories: data?.categories ?? m.categories,
        page: data?.page ?? pageNumber,
        limit: data?.limit ?? limit,
        totalPages:
          data?.totalPages ??
          Math.ceil((data?.count ?? fetched.length) / limit),
      }));

      // Pagination handling
      const totalPages =
        data?.totalPages ?? Math.ceil((data?.count ?? fetched.length) / limit);
      setHasMore(pageNumber < totalPages);
      setPage(pageNumber);

      // Detect whether current user already has a review
      try {
        const token = cookieHelper.get("token");
        const sessionId = cookieHelper.get("sessionId");
        const payload = decodeJWT(token);

        const currentId =
          payload?.sub ||
          payload?.id ||
          payload?.userId ||
          payload?.email ||
          sessionId ||
          null;

        if (currentId) {
          // Build deduplicated combined list
          const combined =
            pageNumber === 1
              ? fetched
              : [...(reviews || []), ...fetched].filter(
                  (item, index, self) =>
                    index === self.findIndex((rv) => rv.id === item.id)
                );

          const found = combined.some((rv: any) => {
            const u = rv.user || {};
            return (
              u?.id === currentId ||
              u?.userId === currentId ||
              u?.email === currentId ||
              u?.sessionId === currentId
            );
          });

          setHasUserReviewed(Boolean(found));
        }
      } catch {
        // ignore detection errors
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      toast.error("Failed to load reviews");
    }
  };

  const loadMore = async () => {
    if (!hasMore) return;
    const next = page + 1;
    setLoadingMore(true);
    await fetchReviews(productId, next);
    setLoadingMore(false);
  };
  const loadless = async () => {
    if (hasMore) return;
    const next = page - 1;
    setLoadingMore(false);
    await fetchReviews(productId, next);
    setLoadingMore(false);
  };

  useEffect(() => {
    if (!productId) return;
    // reset and fetch first page
    setReviews([]);
    setPage(1);
    setHasMore(true);
    fetchReviews(productId, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // loadMore will fetch the next page when the user clicks View more

  const formatNumber = (num: number): string => {
    if (!num) return "0";
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  // Write review dialog state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const initialReviewCount = 4; // Number of reviews to show initially

  const visibleReviews = isExpanded
    ? reviews
    : reviews.slice(0, initialReviewCount);

  const handleFilesChange = (files: FileList | null) => {
    if (!files) return;
    const MAX_FILES = 5;
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const all = Array.from(files);
    if (all.length > MAX_FILES) {
      toast(
        `Only up to ${MAX_FILES} images are allowed. Taking the first ${MAX_FILES}.`
      );
    }
    const sliced = all.slice(0, MAX_FILES);
    const accepted: File[] = [];
    const rejected: string[] = [];
    sliced.forEach((file) => {
      if (file.size <= MAX_SIZE) accepted.push(file);
      else rejected.push(file.name || file.type || "(unknown)");
    });

    if (rejected.length > 0) {
      toast.error(
        `Some files were too large (max 5MB) and were skipped: ${rejected.join(
          ", "
        )}`
      );
    }

    setImageFiles(accepted);
    const readers = accepted.map(
      (file) =>
        new Promise<string>((res) => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result as string);
          fr.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((urls) => setImagePreviews(urls));
  };

  const handleSubmitReview = async () => {
    try {
      // Upload selected files first (if any), enforcing limits
      let uploadedUrls: string[] = [];
      if (imageFiles && imageFiles.length > 0) {
        const MAX_FILES = 5;
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB

        const filesToUse = imageFiles
          .slice(0, MAX_FILES)
          .filter((f) => f.size <= MAX_SIZE);

        if (filesToUse.length === 0) {
          toast.error("No valid images to upload (max 5 images, each <= 5MB).");
        } else {
          const form = new FormData();
          filesToUse.forEach((file) => form.append("files", file));
          form.append("folderName", "storage/reviewImages/");

          const uploadResp = await axiosInstance.post(
            "/api/storage/upload",
            form
          );

          const uploadData = uploadResp?.data?.data?.paths ?? null;
          uploadedUrls = uploadData;
        }
      }

      const payload = {
        title,
        rating,
        description,
        imageUrls: uploadedUrls,
      };

      await axiosInstance.post(`/api/products/${productId}/reviews`, payload);
      toast.success("Review submitted");
      fetchReviews(productId, 1);
      // reset form and reload
      setOpen(false);
      setTitle("");
      setRating(5);
      setDescription("");
      setImageFiles([]);
      setImagePreviews([]);
      fetchReviews(productId, 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="bg-brand-offer">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Customer Reviews
        </h2>
        <div className="flex flex-col">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-gray-900">
                {meta.averageRating || 0}
              </div>
              <div>
                <StarRating
                  rating={Math.floor(meta.averageRating || 0)}
                  size={20}
                />
                <p className="text-gray-600 text-sm mt-1">
                  {formatNumber(meta.totalReviews)} ratings
                </p>
              </div>
            </div>
            <div className="flex mb-10 justify-end ">
              {!hasUserReviewed ? (
                <Button
                  className="border border-brand-darker/50"
                  variant="outline"
                  onClick={() => {
                    const token = cookieHelper.get("token");
                    if (!token) {
                      // open auth/OTP modal first
                      setAuthStep(1);
                      setAuthOpen(true);
                      return;
                    }
                    // already logged in -> open review dialog
                    setOpen(true);
                  }}
                >
                  Write a review
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  disabled
                  title="You've already reviewed"
                >
                  Already reviewed
                </Button>
              )}
            </div>

            <div className="space-y-2 mb-2">
              <div className="max-w-4xl flex flex-col justify-center mx-auto lg:mx-0">
                {(() => {
                  const breakdown = Array.isArray(meta.breakdown)
                    ? meta.breakdown
                    : [];
                  // prefer server-provided counts when available
                  let countsByRating: Record<number, number> = (
                    breakdown || []
                  ).reduce((acc: any, b: any) => {
                    if (b && typeof b.rating !== "undefined") {
                      acc[b.rating] = (acc[b.rating] || 0) + (b.count || 0);
                    }
                    return acc;
                  }, {} as Record<number, number>);

                  let totalCount = Object.values(countsByRating).reduce(
                    (s: number, v: number) => s + (v || 0),
                    0
                  );

                  // If server didn't give breakdown counts, estimate from loaded reviews and scale to meta.totalReviews
                  if (totalCount === 0) {
                    const sample = reviews || [];
                    const sampleTotal = sample.length || 0;
                    const targetTotal = meta.totalReviews || sampleTotal || 0;
                    const sampleCounts = sample.reduce((acc: any, r: any) => {
                      const rr = r?.rating || 0;
                      if (rr) acc[rr] = (acc[rr] || 0) + 1;
                      return acc;
                    }, {} as Record<number, number>);

                    // scale sample counts proportionally to targetTotal when possible
                    countsByRating = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                    if (sampleTotal > 0 && targetTotal > 0) {
                      Object.keys(countsByRating).forEach((k) => {
                        const key = Number(k);
                        const sc = sampleCounts[key] || 0;
                        countsByRating[key] = Math.round(
                          (sc / sampleTotal) * targetTotal
                        );
                      });
                    } else {
                      // fallback: if no sample, but meta.totalReviews exists, make small distribution (all zeros)
                      countsByRating = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                    }

                    totalCount =
                      Object.values(countsByRating).reduce(
                        (s: number, v: number) => s + (v || 0),
                        0
                      ) || targetTotal;
                  }

                  const ratings = [5, 4, 3, 2, 1];
                  return ratings.map((r) => {
                    const count = countsByRating[r] || 0;
                    let pct =
                      totalCount > 0
                        ? Math.round((count / totalCount) * 100)
                        : 0;
                    // ensure tiny non-zero counts are visible
                    if (pct === 0 && count > 0) pct = 6;
                    return (
                      <div key={r} className="flex items-center ">
                        <span className="text-sm font-medium w-8">{r}.0</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: "#8B4513",
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-28 text-right">
                          {formatNumber(count)} reviews
                        </span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {(meta.categories || []).map(({ name, rating }: any) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-green-600">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-600">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-end mb-4">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Write a review</DialogTitle>
                    <DialogDescription>
                      Share your honest feedback to help others.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-2">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Great quality And Taste"
                      />
                    </div>

                    <div>
                      <Label>Rating</Label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button
                            key={r}
                            onClick={() => setRating(r)}
                            className={`px-3 py-1 rounded ${
                              r <= rating ? "bg-amber-300" : "bg-gray-200"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Well worth it"
                      />
                    </div>

                    <div>
                      <Label>Attach images</Label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFilesChange(e.target.files)}
                        className="block w-full text-sm text-gray-600"
                      />

                      {imagePreviews.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {imagePreviews.map((src, idx) => (
                            <div key={idx} className="relative">
                              <img
                                src={src}
                                alt={`Review image ${idx + 1}`}
                                className="w-full h-20 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const nextFiles = imageFiles.filter(
                                    (_, i) => i !== idx
                                  );
                                  const nextPreviews = imagePreviews.filter(
                                    (_, i) => i !== idx
                                  );
                                  setImageFiles(nextFiles);
                                  setImagePreviews(nextPreviews);
                                }}
                                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                                aria-label="Remove image"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitReview}>
                        Submit review
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => {
                return (
                  <div
                    key={(review as any).reviewId || (review as any).id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8B4513] to-[#A67B5B] rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <span className="text-base font-bold text-white">
                            {(
                              (review as any).user?.firstName ||
                              (review as any).user ||
                              ""
                            )
                              .toString()
                              .split(" ")
                              .map((n: any) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-[#8B4513] transition-colors">
                            {(review as any).user?.firstName ??
                              (review as any).user ??
                              "User"}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#8B4513]">
                              {(review as any).rating ?? 0}.0
                            </span>
                            <StarRating rating={(review as any).rating ?? 0} />
                            <span className="text-xs text-gray-500 ml-auto">
                              {new Date(
                                (review as any).createdAt ||
                                  (review as any).timeAgo ||
                                  Date.now()
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {(review as any).title && (
                        <p className="text-gray-800 font-semibold mb-2">
                          {(review as any).title}
                        </p>
                      )}

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {(review as any).description ?? (review as any).comment}
                      </p>

                      {(review as any).imageUrls &&
                        (review as any).imageUrls.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {(review as any).imageUrls.map(
                              (image: string, index: number) => (
                                <div
                                  key={index}
                                  className="relative group/image overflow-hidden rounded-lg"
                                >
                                  <img
                                    src={image}
                                    alt={`Review image ${index + 1}`}
                                    className="w-full h-20 object-cover transform group-hover/image:scale-110 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/image:opacity-100 transition-opacity" />
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                );
              })}

              {hasMore && (
                <div className="col-span-full text-center mt-8">
                  <button
                    onClick={() => {
                      setLoadingMore(true);
                      loadMore();
                      setLoadingMore(false);
                    }}
                    className="bg-gradient-to-r from-[#8B4513] to-[#A67B5B] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Show More Reviews"
                    )}
                  </button>
                </div>
              )}
              {!hasMore && (
                <div className="col-span-full text-center mt-8">
                  <button
                    onClick={() => {
                      setLoadingMore(false);
                      loadless();
                    }}
                    className="bg-gradient-to-r from-[#8B4513] to-[#A67B5B] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Show less Reviews"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductPage: React.FC<TProductDetails> = ({ productDetails }) => {
  const { product, variants } = productDetails;

  const addToCartMutation = useAddTocartItemsAPI();
  const updateCartMutation = useUpdateCartItems();
  const removeCartMutation = useRemoveCartItems();
  const router = useRouter();
  const { data, refetch } = useCartItems();
  const [quantity, setQuantity] = useState<number>(1);

  const cartItems = data?.cartItems ?? [];

  const currentItemInCart = cartItems.find(
    (item: CartItem) => item.productId === product.productId
  );

  const currentPrice = useMemo(
    () => parseFloat(product.discountedPrice),
    [product.discountedPrice]
  );

  const originalPrice = useMemo(
    () => parseFloat(product.price),
    [product.price]
  );

  // Treat specific product names as Inaugural Offer variants
  const isInaugural = useMemo(() => {
    const name = (productDetails?.product?.name || "").toString().toLowerCase();
    return ["noc", "extra bold", "speciality instant"].includes(name);
  }, [productDetails?.product?.name]);

  // useEffect(() => {
  // handleAddToCart(quantity);
  // }, [quantity]);

  const handleAddToCart = async () => {
    if (addToCartMutation.status === "pending") return;
    const content_id = [String(product.productId)];

    try {
      GTMTracker.trackAddToCart({
        content_ids: content_id,
        contents: [
          {
            id: String(product.productId),
            quantity: quantity,
            item_price: String(Number(product?.discountedPrice) * quantity),
          },
        ],
        value: String(Number(product?.discountedPrice) * quantity),
        currency: "INR",
        num_items: quantity,
      });

      await addToCartMutation.mutateAsync({ product, quantity });
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleUpdateCartQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    if (updateCartMutation.status === "pending") return;
    if (newQuantity < 1) {
      await handleRemoveFromCart(cartItemId);

      return;
    }
    const content_id = [String(product.productId)];
    try {
      GTMTracker.trackAddToCart({
        content_ids: content_id,
        contents: [
          {
            id: String(product.productId),
            quantity: newQuantity,
            item_price: String(Number(product?.discountedPrice) * newQuantity),
          },
        ],
        value: String(Number(product?.discountedPrice) * newQuantity),
        currency: "INR",
        num_items: newQuantity,
      });
      await updateCartMutation.mutateAsync({
        cartId: cartItemId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Failed to update cart quantity", error);
    }
  };

  const handleRemoveFromCart = async (cartItemId: number) => {
    if (removeCartMutation.status === "pending") return;
    const content_id = [String(product.productId)];
    try {
      GTMTracker.trackAddToCart({
        content_ids: content_id,
        contents: [
          {
            id: String(product.productId),
            quantity: 1,
            item_price: String(Number(product?.discountedPrice) * 1),
          },
        ],
        value: String(Number(product?.discountedPrice) * 1),
        currency: "INR",
        num_items: 1,
      });

      await removeCartMutation.mutateAsync({ cartId: cartItemId });
      await refetch();
      setQuantity(1);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const handleGtmClick = (variant: any) => {
    GTMTracker.trackViewContent({
      content_ids: [String(productDetails.product.productId)],
      contents: [
        {
          id: variant.productId,
          quantity: currentItemInCart?.quantity,
          item_price: variant.discountedPrice!,
        },
      ],
      content_type: "product",
      value: variant.discountedPrice,
      currency: "INR",
      num_items: currentItemInCart?.quantity,
      page_url: window.location.pathname + " " + "ProductDetails",
      page_title: document.title,
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto p-10 text-center">
        Product data is missing or invalid.
      </div>
    );
  }

  return (
    <div className="bg-brand-bg min-h-screen font-sans">
      <Nav showCartIcon />
      <main className="container mx-auto px-2 sm:px-4 py-8 md:py-12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 md:gap-12">
        <div className="lg:pr-8 flex flex-col">
          {/* <span className="inline-block self-start bg-brand-offer-btn text-white text-sm font-medium px-4 py-1 rounded-full mb-3">
 {product.Category?.name || "Coffee"}
 </span> */}
          <div className="flex flex-row items-center justify-between ">
            <span className="inline-block self-center sm:self-start bg-brand-offer-btn text-white text-sm font-medium px-4 py-1 rounded-full mb-3">
              {product.Category?.name || "Coffee"}
            </span>
            {isInaugural && (
              <span className="inline-block self-center sm:self-start bg-brand-offer-btn text-white text-sm font-medium px-4 py-1 rounded-full mb-3">
                Inaugural Offer
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-1 text-center lg:text-left">
            {product.name}
          </h1>

          <p className="text-gray-600 leading-relaxed my-4 text-sm md:text-base text-center lg:text-left">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 my-4 justify-center lg:justify-start">
            {product.productUsp.map((usp) => (
              <FeatureIcon
                key={usp.title}
                iconSrc={usp.icon}
                text={usp.title}
              />
            ))}
          </div>
          <ProductOfferCard />

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
            {variants.map((variant) => {
              return (
                <button
                  key={variant.productId}
                  onClick={() => {
                    handleGtmClick(variant);
                    router.push(`/product/${variant.productId}`);
                  }}
                  className={`
 px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent whitespace-nowrap
 ${
   product.productVariant === variant.productVariant
     ? "bg-brand-offer-btn text-white"
     : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
 }
 `}
                >
                  {variant.productVariant}
                </button>
              );
            })}
          </div>

          <div className="w-full text-white mt-auto">
            {currentItemInCart ? (
              <>
                {/* --- If item is already in cart --- */}
                <div className="flex p-4 md:p-6 rounded-lg bg-brand-dark flex-col sm:flex-row items-center sm:items-center justify-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                    <button
                      onClick={() =>
                        handleUpdateCartQuantity(
                          currentItemInCart.cartItemId,
                          currentItemInCart.quantity - 1
                        )
                      }
                      className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                      disabled={
                        updateCartMutation.status === "pending" ||
                        removeCartMutation.status === "pending"
                      }
                    >
                      <RiSubtractLine className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-semibold min-w-[40px] text-center">
                      {currentItemInCart.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateCartQuantity(
                          currentItemInCart.cartItemId,
                          currentItemInCart.quantity + 1
                        )
                      }
                      className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                      disabled={updateCartMutation.status === "pending"}
                    >
                      <RiAddLine className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    {/* --- Container for price & discount --- */}
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-2xl font-bold">
                        ₹
                        {(
                          parseFloat(
                            currentItemInCart.price?.toString() || "0"
                          ) * currentItemInCart.quantity
                        ).toFixed(2)}
                      </span>

                      {/* --- Discount Info --- */}
                      {originalPrice > currentPrice && (
                        <div className="flex items-baseline space-x-2 mt-1">
                          <span className="text-xs line-through text-gray-400">
                            ₹
                            {(
                              originalPrice * currentItemInCart.quantity
                            ).toFixed(2)}
                          </span>
                          {product.discountedPercentage !== 0 && (
                            <span className="text-xs font-bold text-green-400">
                              ({product.discountedPercentage}% off)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveFromCart(currentItemInCart.cartItemId)
                      }
                      className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                      disabled={removeCartMutation.status === "pending"}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {product.marketPlaceLink &&
                  product.marketPlaceLink.length > 0 && (
                    <div className="mt-[20px] border border-gray-400 rounded-lg">
                      <p className="text-sm text-gray-600 mb-3 ml-5 mt-2">
                        Also available on:
                      </p>
                      <div className="flex overflow-x-auto pb-4 px-4">
                        {product.marketPlaceLink.map((item, i) => (
                          <a
                            key={i}
                            href={item.redirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors group flex-shrink-0"
                          >
                            <img
                              src={item.iconUrl}
                              alt={`${item.platformName} icon`}
                              className="h-[60px] w-[150px] bg-white p-[10px] object-contain rounded-md"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                {/* Marketplace Links removed per request */}
              </>
            ) : (
              <>
                {/* --- If item is NOT in cart --- */}
                <div className="flex mb-[10px] bg-brand-dark md:p-6 p-4 rounded-lg flex-col sm:flex-row items-center sm:items-center justify-center gap-4">
                  {/* Quantity Controls */}

                  {/* Add to Cart Button */}
                  {product.stockQuantity === 0 ? (
                    <p className="text-center w-full">Currently Unavailable</p>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 bg-white/10 rounded-lg px-4 py-2 sm:w-auto">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                          disabled={quantity <= 1}
                        >
                          <RiSubtractLine className="w-5 h-5" />
                        </button>
                        <span className="text-xl font-semibold min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <RiAddLine className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          handleAddToCart();
                        }}
                        className="w-full sm:flex-1 bg-brand-offer-btn hover:bg-brand-dark text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        aria-label={`Add ${product.name} - ${product.productVariant} to cart`}
                        disabled={addToCartMutation.status === "pending"}
                      >
                        {addToCartMutation.status === "pending"
                          ? "Adding..."
                          : "Add to Cart"}
                      </button>
                    </>
                  )}
                  {/* Price Display */}
                  <div className="flex flex-col items-center sm:items-end justify-center w-full sm:w-auto">
                    <span className="text-2xl font-bold">
                      ₹{(currentPrice * quantity).toFixed(2)}
                    </span>

                    {originalPrice > currentPrice && (
                      <div className="flex items-baseline space-x-3 mt-1">
                        <span className="text-sm font-medium text-gray-200">
                          MRP
                        </span>
                        <span className="text-sm line-through decoration-amber-300 decoration-2 leading-none">
                          ₹{originalPrice.toFixed(2)}
                        </span>
                        {/* --- STYLED DISCOUNT TEXT --- */}
                        {product.discountedPercentage !== 0 && (
                          <span className="text-xs font-bold text-green-400">
                            ({product.discountedPercentage}% off)
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Marketplace Links removed per request */}
                {product.marketPlaceLink &&
                  product.marketPlaceLink.length > 0 && (
                    <div className="mt-[20px] border border-gray-400 rounded-lg">
                      <p className="text-sm text-gray-600 mb-3 ml-5 mt-2">
                        Also available on:
                      </p>
                      <div className="flex overflow-x-auto pb-4 px-4">
                        {product.marketPlaceLink.map((item, i) => (
                          <a
                            key={i}
                            href={item.redirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors group flex-shrink-0"
                          >
                            <img
                              src={item.iconUrl}
                              alt={`${item.platformName} icon`}
                              className="h-[60px] w-[150px] bg-white p-[10px] object-contain rounded-md"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>

        <div className=" p-4 md:p-6 rounded-lg flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-[500px]">
          <ProductImageCarousel
            images={product.ProductImages}
            alt={`${product.name} - ${product.productVariant}`}
          />
        </div>
      </main>
      <img src="/assets/liner.png" alt="" className="w-full" />
      <ReviewsSection productId={productDetails.product.productId} />
      <Footer />
    </div>
  );
};

export default ProductPage;
