"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiUser,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiTruck,
  FiTag,
  FiStar,
} from "react-icons/fi";
import {
  useCartItems,
  useUpdateCartItems,
  useRemoveCartItems,
  useAuthModalStore,
} from "@/store/useCartStore";
import { TCartItems } from "./types";
import { cookieHelper } from "@/utils/cookieHelper";
import Authentication from "../components/Authentication";
import Nav from "../components/nav";
import { useGetAddresses } from "@/provider/queryProvider";
import toast from "react-hot-toast";
import { GTMTracker } from "@/utils/GTMEventManager";

export default function CartPage() {
  const { setOpen, setStep, open } = useAuthModalStore();
  const router = useRouter();
  const { data, isLoading, error } = useCartItems();
  const updateCartMutation = useUpdateCartItems();
  const removeCartMutation = useRemoveCartItems();
  const cartItems = (data?.cartItems as TCartItems[]) || [];

  const { data: addressData } = useGetAddresses();
  const hasAddress = !!(addressData && addressData.length > 0);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent] = useState(0.1); // 10% discount
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price)
        : Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  const shippingCost: number = 0; // Free shipping
  const discountAmount = couponApplied ? subtotal * discountPercent : 0;
  const total = subtotal + shippingCost - discountAmount;

  const totalItems = cartItems.length;
  const totalQuantity = cartItems.reduce(
    (count, item) => count + (Number(item.quantity) || 0),
    0
  );

  const handleQuantityChange = async (cartItemId: number, change: number) => {
    const item = cartItems.find((item) => item.cartItemId === cartItemId);
    if (!item) return;
    const currentQuantity = Number(item.quantity) || 1;
    const newQuantity = Math.max(1, currentQuantity + change);
    if (newQuantity === currentQuantity) return; // No change needed
    try {
      await updateCartMutation.mutateAsync({
        cartId: cartItemId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartMutation.mutateAsync({ cartId: cartItemId });
      // Remove coupon if cart becomes empty
      if (cartItems.length <= 1) {
        setCouponApplied(false);
        setAppliedCoupon("");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  const handleApplyCoupon = () => {
    // Basic validation - replace with actual API call/logic
    if (couponCode.toUpperCase() === "ENJOYKOFFELO" && cartItems.length > 0) {
      setCouponApplied(true);
      setAppliedCoupon(couponCode.toUpperCase());
    } else {
      setCouponApplied(false);
      setAppliedCoupon("");
      alert("Invalid coupon code or empty cart.");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Nav showCartIcon />
        <div className="min-h-screen bg-k-ivory flex items-center justify-center pt-28">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-k-cream-200 border-t-k-copper mx-auto mb-4" />
            <p className="text-[11px] tracking-[0.3em] uppercase text-k-walnut">
              Loading your cart…
            </p>
          </div>
        </div>
      </>
    );
  }

  // Error / unreachable API — degrade gracefully to empty-cart presentation
  if (error) {
    return (
      <>
        <Nav showCartIcon />
        <div className="min-h-screen bg-k-ivory pt-28 md:pt-32 pb-20">
          <div className="container-koffee">
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <span className="block w-8 sm:w-10 h-px bg-k-copper" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-k-copper">
                Your Bag
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95] tracking-tightest text-k-espresso mb-6">
              Your bag is{" "}
              <span className="italic text-k-copper">empty.</span>
            </h1>
            <p className="text-k-ink-muted text-lg leading-relaxed max-w-md mb-10">
              Browse the Collection and fill it with something worth waking up
              for.
            </p>
            <Link
              href="/#collection"
              data-testid="cart-empty-cta"
              className="group inline-flex items-center gap-3 sm:gap-4 pl-6 sm:pl-8 pr-2 py-2 bg-k-espresso text-k-ivory rounded-full hover:bg-k-coffee transition-all duration-500 ease-out-expo min-h-[52px]"
            >
              <span className="text-[11px] sm:text-[12px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-medium">
                Discover the Collection
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-k-copper text-k-ivory transition-transform duration-500 group-hover:rotate-45">
                →
              </span>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const isLoggedIn = Boolean(cookieHelper.get("token"));

  // --- Main JSX ---
  return (
    <div className="min-h-screen bg-[#F8F1E9]">
      <Nav showCartIcon />
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Progress Bar */}
        <div className="flex justify-center items-center my-8 md:my-12 px-2">
          {["Cart", "Checkout", "Payment"].map((step, index, arr) => {
            const isActive = step === "Cart";
            return (
              <div
                key={step}
                className={`flex items-center ${
                  index < arr.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base ${
                      isActive ? "bg-[#8B5E3C]" : "bg-[#D4B996]"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs sm:text-sm md:text-base ${
                      isActive
                        ? "text-[#8B5E3C] font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex-1 h-0.5 bg-[#D4B996] mx-1 sm:mx-2 md:mx-4 max-w-[60px] sm:max-w-[100px] md:max-w-[150px]"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Cart Items & Coupon */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#4A4A4A] mb-6 text-center lg:text-left">
              Shopping Cart{" "}
              {totalItems > 0 &&
                `(${totalItems} ${totalItems === 1 ? "item" : "items"})`}
            </h1>

            {/* Cart Items List */}
            <div className="mb-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => {
                  return (
                    <div
                      key={item.cartItemId}
                      className="flex flex-col border-b border-gray-200 py-6 space-y-4"
                    >
                      <div className="flex items-start space-x-3 w-full">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mt-1 accent-[#8B5E3C] flex-shrink-0"
                        />

                        {/* Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0">
                          <img
                            src={item.Product?.ProductImages?.[0].imageUrl}
                            alt={item.Product?.name}
                            className="object-contain rounded w-full h-full"
                          />
                        </div>

                        {/* Details - takes remaining space */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-[#4A4A4A] mb-1">
                            {item.Product?.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.Product?.productVariant}
                          </p>

                          {/* <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600 mb-3">
                            <FiTruck size={14} />
                            <span>Free Shipping</span>
                          </div> */}

                          {/* Price - Mobile */}
                          <div className="text-lg font-semibold text-[#4A4A4A] mb-3">
                            ₹
                            {(
                              (typeof item.price === "string"
                                ? parseFloat(item.price)
                                : Number(item.price) || 0) *
                              (Number(item.quantity) || 1)
                            ).toFixed(2)}
                            {(Number(item.quantity) || 1) > 1 && (
                              <span className="text-sm text-gray-500 font-normal ml-2">
                                (₹
                                {(typeof item.price === "string"
                                  ? parseFloat(item.price)
                                  : Number(item.price) || 0
                                ).toFixed(2)}{" "}
                                each)
                              </span>
                            )}
                          </div>

                          {/* Actions Row */}
                          <div className="flex flex-wrap items-center gap-3">
                            {/* Quantity Selector */}
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() =>
                                  handleRemoveItem(item.cartItemId)
                                }
                                className="text-gray-500 hover:text-red-500 p-2 border-r border-gray-300"
                                title="Remove item"
                              >
                                <FiTrash2 size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.cartItemId, -1)
                                }
                                disabled={item.quantity <= 1}
                                className="text-gray-600 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed p-2"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(item.cartItemId, 1)
                                }
                                className="text-gray-600 hover:text-black p-2"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>

                            {/* Remove Link */}
                            <button
                              onClick={() => handleRemoveItem(item.cartItemId)}
                              className="text-sm text-gray-500 hover:text-[#8B5E3C]"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl text-gray-300 mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">
                    Your shopping cart is empty
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Add some coffee to get started!
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="inline-block bg-[#8B5E3C] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>

            {/* Subtotal for Cart Items */}
            {cartItems.length > 0 && (
              <div className="text-center lg:text-right text-lg md:text-xl font-semibold text-[#4A4A4A] py-4 border-t border-gray-300">
                Subtotal ({totalQuantity}{" "}
                {totalQuantity === 1 ? "item" : "items"}): ₹
                {subtotal.toFixed(2)}
              </div>
            )}
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border border-gray-200 rounded-md shadow-sm bg-white lg:sticky lg:top-24">
                <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4 pb-2 border-b text-center lg:text-left">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Subtotal ({totalQuantity}{" "}
                      {totalQuantity === 1 ? "item" : "items"}):
                    </span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div> */}
                  {couponApplied && discountAmount > 0 && (
                    <div className="flex justify-between text-[#3FA94E]">
                      <span>
                        Discount ({(discountPercent * 100).toFixed(0)}%):
                      </span>
                      <span className="font-medium">
                        -₹{discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-[#4A4A4A] pt-3 border-t mt-3">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                {couponApplied && (
                  <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded text-center text-xs text-[#3FA94E] font-medium flex items-center justify-center">
                    <FiTag className="mr-1" size={14} /> YOUR COUPON HAS BEEN
                    APPLIED
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    GTMTracker.trackInitiateCheckout({
                      content_ids: cartItems.map((item) =>
                        String(item?.productId)
                      ),
                      contents: cartItems.map((item) => {
                        return {
                          id: String(item.productId),
                          quantity: Number(item?.quantity),
                          item_price: Number(item.price!),
                        };
                      }), // same format as AddToCart
                      value: cartItems.reduce(
                        (acc, curr) => acc + (Number(curr?.price) || 0),
                        0
                      ),
                      currency: "INR",
                      num_items: cartItems.length,
                      coupon: "N/A",
                    });
                    if (!isLoggedIn) {
                      setStep(1); // Always start at login step
                      setOpen(true);
                    } else if (!hasAddress) {
                      toast("Please add an address to place your order.");
                      setStep(3); // Go to address step first if no address
                      setOpen(true);
                    } else {
                      setStep(4); // Go directly to COD/payment step if address exists
                      setOpen(true);
                    }
                  }}
                  className="mt-6 w-full bg-[#8B5E3C] text-white py-3 rounded-md hover:bg-opacity-90 transition font-semibold flex justify-between items-center px-4 text-base md:text-lg"
                >
                  <span>Proceed to Checkout</span>
                  <span>₹{total.toFixed(2)}</span>
                </button>
                {/* Render Authentication dialog (modal) */}
                <Authentication />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
