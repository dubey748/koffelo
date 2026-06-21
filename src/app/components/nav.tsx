"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cookieHelper } from "@/utils/cookieHelper";
import { useAuthModalStore, useCartItems } from "@/store/useCartStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { FiUser, FiShoppingCart, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import Authentication from "../components/Authentication";
import { axiosInstance } from "@/utils/axiosInstance";
import { ENDPOINT } from "@/endpoint";

export default function Nav({
  showCartIcon = true,
}: {
  showCartIcon?: boolean;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setOpen, setStep } = useAuthModalStore();
  const { data: cartData } = useCartItems();
  const hasCartItems = !!(
    cartData &&
    cartData.cartItems &&
    cartData.cartItems.length > 0
  );
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!cookieHelper.get("token"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLoginClick = () => {
    setStep(1);
    setOpen(true);
    setMobileMenuOpen(false);
  };

  const handleLogoutClick = async () => {
    await axiosInstance.post(ENDPOINT.LOGOUT);
    cookieHelper.remove("token");
    cookieHelper.remove("user");
    cookieHelper.remove("sessionId");
    router.push("/");
  };

  const linkCls = "text-[11px] tracking-[0.28em] uppercase transition-colors duration-300 link-underline hover:text-k-copper min-h-[40px] inline-flex items-center";
  const iconCls = "hover:text-k-copper transition-colors duration-300";

  return (
    <>
      <nav
        data-testid="site-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out-expo text-k-espresso ${
          scrolled
            ? "bg-k-ivory/95 backdrop-blur-lg shadow-soft border-b border-k-cream-200"
            : "bg-k-ivory/80 backdrop-blur-md"
        }`}
      >
        <div className="container-koffee flex items-center justify-between py-3 md:py-4">
          <Link
            href="/"
            data-testid="nav-logo"
            className="flex-shrink-0 transition-transform duration-400 hover:scale-[1.03] min-h-[44px] inline-flex items-center"
          >
            <div className="font-display italic text-2xl sm:text-3xl md:text-4xl tracking-tightest">
              Koffelo<span className="text-k-copper not-italic">.</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link href="/" data-testid="nav-home" className={linkCls}>
              Home
            </Link>
            <button
              data-testid="nav-products"
              className={linkCls}
              onClick={() => {
                if (
                  ["/aboutus", "/cart", "/product/[productId]"].some((p) =>
                    pathname.startsWith(p.split("[")[0])
                  )
                ) {
                  router.push("/");
                } else {
                  router.push("#collection");
                }
              }}
              type="button"
            >
              Collection
            </button>
            <Link href="/aboutus" data-testid="nav-about" className={linkCls}>
              Story
            </Link>
            <button
              data-testid="nav-contact"
              className={linkCls}
              onClick={() => {
                if (
                  ["/aboutus", "/cart", "/product/[productId]"].some((p) =>
                    pathname.startsWith(p.split("[")[0])
                  )
                ) {
                  router.push("/");
                } else {
                  router.push("#contact");
                }
              }}
              type="button"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {showCartIcon && (
              <Link
                href="/cart"
                data-testid="nav-cart"
                className={`relative ${iconCls} min-h-[40px] inline-flex items-center`}
              >
                <FiShoppingCart size={19} strokeWidth={1.6} />
                {hasCartItems && (
                  <span
                    data-testid="nav-cart-count"
                    className="absolute -top-1 -right-2 bg-k-copper text-k-ivory text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-semibold"
                  >
                    {cartData?.cartItems?.length || 0}
                  </span>
                )}
              </Link>
            )}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    data-testid="nav-user-menu"
                    className={`${iconCls} min-h-[40px] inline-flex items-center`}
                    type="button"
                  >
                    <FiUser size={19} strokeWidth={1.6} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-k-paper border-k-cream-200 shadow-medium"
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/account")}
                    className="text-k-espresso"
                  >
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/orders")}
                    className="text-k-espresso"
                  >
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogoutClick}
                    className="text-k-espresso"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                data-testid="nav-login"
                className={`${iconCls} min-h-[40px] inline-flex items-center`}
                onClick={handleLoginClick}
                type="button"
              >
                <FiUser size={19} strokeWidth={1.6} />
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {showCartIcon && (
              <Link
                href="/cart"
                data-testid="nav-cart-mobile"
                className="relative min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              >
                <FiShoppingCart size={22} strokeWidth={1.6} />
                {hasCartItems && (
                  <span className="absolute -top-0 -right-0 bg-k-copper text-k-ivory text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {cartData?.cartItems?.length || 0}
                  </span>
                )}
              </Link>
            )}
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              type="button"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-k-paper shadow-premium z-50 transform transition-transform duration-500 ease-out-expo ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden flex flex-col`}
        >
          <div className="flex items-center justify-between p-6 border-b border-k-cream-200">
            <span className="font-display italic text-2xl text-k-espresso">
              Koffelo<span className="text-k-copper not-italic">.</span>
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              type="button"
              className="text-k-espresso min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              <FiX size={26} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-1 text-k-espresso">
            <Link
              href="/"
              data-testid="mobile-nav-home"
              className="py-4 text-sm tracking-[0.22em] uppercase border-b border-k-cream-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              data-testid="mobile-nav-products"
              className="py-4 text-sm tracking-[0.22em] uppercase border-b border-k-cream-200 text-left"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/#collection");
              }}
              type="button"
            >
              Collection
            </button>
            <Link
              href="/aboutus"
              data-testid="mobile-nav-about"
              className="py-4 text-sm tracking-[0.22em] uppercase border-b border-k-cream-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Story
            </Link>
            <button
              data-testid="mobile-nav-contact"
              className="py-4 text-sm tracking-[0.22em] uppercase border-b border-k-cream-200 text-left"
              onClick={() => {
                setMobileMenuOpen(false);
                router.push("/#contact");
              }}
              type="button"
            >
              Contact
            </button>

            <div className="mt-6">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-left min-h-[44px]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/account");
                    }}
                  >
                    <FiUser size={18} /> My Account
                  </button>
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-left min-h-[44px]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/orders");
                    }}
                  >
                    <FiShoppingCart size={18} /> My Orders
                  </button>
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-left min-h-[44px]"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogoutClick();
                    }}
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <button
                  data-testid="mobile-nav-login"
                  className="w-full inline-flex items-center justify-center gap-2 bg-k-espresso text-k-ivory rounded-full px-5 py-3 text-[12px] tracking-[0.22em] uppercase min-h-[48px]"
                  onClick={handleLoginClick}
                  type="button"
                >
                  <FiUser size={16} />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Authentication hasCartItems={hasCartItems} />
    </>
  );
}
