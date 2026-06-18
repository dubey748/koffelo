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

  return (
    <>
      <nav className="flex items-center justify-between p-4 sm:px-8 md:px-10 bg-[#c4a484] text-black relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex-shrink-0">
          <div>
            <img
              src="/assets/logo.png"
              alt="logo"
              width={80}
              height={50}
              className="mr-4"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-9 px-10">
          <Link
            href="/"
            className="hover:text-[#8B5E3C] font-medium transition-colors"
          >
            Home
          </Link>
          <button
            className="hover:text-[#8B5E3C] font-medium transition-colors bg-transparent border-none outline-none cursor-pointer"
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
          <Link
            href="/aboutus"
            className="hover:text-[#8B5E3C] font-medium transition-colors"
          >
            About Us
          </Link>
          <button
            className="hover:text-[#8B5E3C] font-medium transition-colors bg-transparent border-none outline-none cursor-pointer"
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
          {showCartIcon && (
            <Link href="/cart" className="relative hover:text-brand-dark">
              <FiShoppingCart size={22} />
              {hasCartItems && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartData?.cartItems?.length || 0}
                </span>
              )}
            </Link>
          )}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hover:text-brand-dark font-semibold flex items-center gap-1"
                  type="button"
                >
                  <FiUser size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/account")}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orders")}>
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleLogoutClick();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              className="hover:text-brand-dark font-semibold flex items-center gap-1"
              onClick={handleLoginClick}
              type="button"
            >
              <FiUser size={20} />
            </button>
          )}
        </div>

        {/* Mobile: Cart Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {showCartIcon && (
            <Link href="/cart" className="relative hover:text-[#8B5E3C]">
              <FiShoppingCart size={24} />
              {hasCartItems && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartData?.cartItems?.length || 0}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Open menu"
            type="button"
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Slide-out Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#f8f1e9] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden flex flex-col p-6`}
        >
          <button
            className="self-end mb-6"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <FiX size={28} />
          </button>

          <Link
            href="/"
            className="mb-4 font-medium text-lg hover:text-[#8B5E3C]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <button
            className="mb-4 font-medium text-lg hover:text-[#8B5E3C] bg-transparent border-none outline-none cursor-pointer text-left"
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
            className="mb-4 font-medium text-lg hover:text-[#8B5E3C]"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>

          <button
            className="mb-4 font-medium text-lg hover:text-[#8B5E3C] bg-transparent border-none outline-none cursor-pointer text-left"
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

          {isLoggedIn ? (
            <>
              <button
                className="mb-4 font-medium text-lg hover:text-[#8B5E3C] flex items-center text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/account");
                }}
                type="button"
              >
                <FiUser size={20} className="mr-2" />
                My Account
              </button>

              <button
                className="mb-4 font-medium text-lg hover:text-[#8B5E3C] flex items-center text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/orders");
                }}
                type="button"
              >
                <FiShoppingCart size={20} className="mr-2" />
                My Orders
              </button>

              <button
                className="mb-4 font-medium text-lg hover:text-[#8B5E3C] flex items-center text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogoutClick();
                }}
                type="button"
              >
                <FiLogOut size={20} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <button
              className="mb-4 font-medium text-lg hover:text-[#8B5E3C] flex items-center text-left"
              onClick={handleLoginClick}
              type="button"
            >
              <FiUser size={20} className="mr-2" />
              Login
            </button>
          )}
        </div>
      </nav>
      <Authentication hasCartItems={hasCartItems} />
    </>
  );
}
