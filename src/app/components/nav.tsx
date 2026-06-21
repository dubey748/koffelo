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

  const navLinkBase =
    "text-[13px] tracking-[0.18em] uppercase text-k-espresso/85 hover:text-k-espresso transition-colors duration-300 relative";

  return (
    <>
      <nav
        data-testid="site-nav"
        className={`sticky top-0 z-40 transition-all duration-500 ease-out-expo ${
          scrolled
            ? "bg-k-cream/95 backdrop-blur-md shadow-soft"
            : "bg-k-sand/90 backdrop-blur-sm"
        }`}
      >
        <div className="container-koffee flex items-center justify-between py-4 md:py-5">
          {/* Logo */}
          <Link
            href="/"
            data-testid="nav-logo"
            className="flex-shrink-0 transition-transform duration-400 hover:scale-[1.03]"
          >
            <img
              src="/assets/logo.png"
              alt="Koffelo"
              width={72}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" data-testid="nav-home" className={`${navLinkBase} link-underline`}>
              Home
            </Link>
            <button
              data-testid="nav-products"
              className={`${navLinkBase} link-underline`}
              onClick={() => {
                if (
                  ["/aboutus", "/cart", "/product/[productId]"].some((p) =>
                    pathname.startsWith(p.split("[")[0])
                  )
                ) {
                  router.push("/");
                } else {
                  router.push("#products");
                }
              }}
              type="button"
            >
              Products
            </button>
            <Link href="/aboutus" data-testid="nav-about" className={`${navLinkBase} link-underline`}>
              About
            </Link>
            <button
              data-testid="nav-contact"
              className={`${navLinkBase} link-underline`}
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

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-6">
            {showCartIcon && (
              <Link
                href="/cart"
                data-testid="nav-cart"
                className="relative text-k-espresso hover:text-k-gold transition-colors duration-300"
              >
                <FiShoppingCart size={20} strokeWidth={1.6} />
                {hasCartItems && (
                  <span
                    data-testid="nav-cart-count"
                    className="absolute -top-2 -right-2 bg-k-gold text-k-paper text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold"
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
                    className="text-k-espresso hover:text-k-gold transition-colors duration-300"
                    type="button"
                  >
                    <FiUser size={20} strokeWidth={1.6} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-k-paper border-k-cream-200 shadow-medium"
                >
                  <DropdownMenuItem onClick={() => router.push("/account")} className="text-k-espresso">
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/orders")} className="text-k-espresso">
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogoutClick} className="text-k-espresso">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                data-testid="nav-login"
                className="text-k-espresso hover:text-k-gold transition-colors duration-300"
                onClick={handleLoginClick}
                type="button"
              >
                <FiUser size={20} strokeWidth={1.6} />
              </button>
            )}
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            {showCartIcon && (
              <Link
                href="/cart"
                data-testid="nav-cart-mobile"
                className="relative text-k-espresso"
              >
                <FiShoppingCart size={22} strokeWidth={1.6} />
                {hasCartItems && (
                  <span className="absolute -top-2 -right-2 bg-k-gold text-k-paper text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                    {cartData?.cartItems?.length || 0}
                  </span>
                )}
              </Link>
            )}
            <button
              data-testid="nav-menu-toggle"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Open menu"
              type="button"
              className="text-k-espresso"
            >
              {mobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-out */}
        <div
          className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-k-paper shadow-premium z-50 transform transition-transform duration-500 ease-out-expo ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden flex flex-col`}
        >
          <div className="flex items-center justify-between p-6 border-b border-k-cream-200">
            <span className="font-display text-2xl text-k-espresso">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              type="button"
              className="text-k-espresso"
            >
              <FiX size={26} />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-1">
            <Link
              href="/"
              data-testid="mobile-nav-home"
              className="py-3 text-sm tracking-[0.18em] uppercase text-k-espresso border-b border-k-cream-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <button
              data-testid="mobile-nav-products"
              className="py-3 text-sm tracking-[0.18em] uppercase text-k-espresso border-b border-k-cream-200 text-left"
              onClick={() => {
                setMobileMenuOpen(false);
                if (
                  ["/aboutus", "/cart", "/product/[productId]"].some((p) =>
                    pathname.startsWith(p.split("[")[0])
                  )
                ) {
                  router.push("/");
                } else {
                  router.push("#products");
                }
              }}
              type="button"
            >
              Products
            </button>
            <Link
              href="/aboutus"
              data-testid="mobile-nav-about"
              className="py-3 text-sm tracking-[0.18em] uppercase text-k-espresso border-b border-k-cream-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button
              data-testid="mobile-nav-contact"
              className="py-3 text-sm tracking-[0.18em] uppercase text-k-espresso border-b border-k-cream-200 text-left"
              onClick={() => {
                setMobileMenuOpen(false);
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

            <div className="mt-6">
              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-k-espresso text-left"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/account");
                    }}
                  >
                    <FiUser size={18} /> My Account
                  </button>
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-k-espresso text-left"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/orders");
                    }}
                  >
                    <FiShoppingCart size={18} /> My Orders
                  </button>
                  <button
                    className="flex items-center gap-3 py-3 text-sm text-k-espresso text-left"
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
                  className="btn-pill-primary w-full justify-center"
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
