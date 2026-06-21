import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="relative bg-k-cream text-k-espresso overflow-hidden border-t border-k-cream-200"
    >
      {/* Subtle gold accent line at top */}
      <div className="divider-gold" />

      <div className="container-koffee py-14 md:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="block w-8 sm:w-10 h-px bg-k-copper" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper">
              Colophon · Est. MMXX
            </span>
          </div>
          <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-walnut/70">
            No. 042 · Final Page
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <Link
            href="/"
            className="font-display italic text-[clamp(3.5rem,14vw,12rem)] leading-[0.85] tracking-tightest text-k-espresso inline-block transition-colors duration-500 hover:text-k-copper"
          >
            Koffelo
            <span className="text-k-copper not-italic">.</span>
          </Link>
          <p className="font-display text-lg sm:text-xl md:text-2xl text-k-ink-muted italic mt-3 md:mt-4 max-w-xl">
            United by coffee, in pursuit of quiet excellence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="md:col-span-3">
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper mb-4 md:mb-5">
              The House
            </div>
            <ul className="space-y-3">
              {[
                { label: "Shop", href: "/#collection" },
                { label: "The Ritual", href: "/#ritual" },
                { label: "Our Story", href: "/aboutus" },
                { label: "Cart", href: "/cart" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    data-testid={`footer-link-${l.label
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block link-underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper mb-4 md:mb-5">
              The Quiet Print
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/aboutus#terms"
                  data-testid="footer-terms"
                  className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block link-underline"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block link-underline"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block link-underline"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper mb-4 md:mb-5">
              The Address
            </div>
            <ul className="space-y-3 select-text-on text-sm">
              <li>
                <a
                  href="mailto:info@morningbrew.com"
                  className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block break-all"
                >
                  info@morningbrew.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919667946833"
                  className="text-k-espresso/80 hover:text-k-copper transition-colors duration-300 inline-block"
                >
                  +91 966-794-6833
                </a>
              </li>
              <li className="text-k-ink-muted leading-relaxed pt-3 border-t border-k-cream-200">
                Urbtech Trade Centre, IS 16, 1601
                <br />
                Sector 132, Noida 201301, India
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-k-copper mb-4 md:mb-5">
              Elsewhere
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  href: "https://www.facebook.com/koffelo/",
                  Icon: Facebook,
                  label: "Facebook",
                },
                {
                  href: "https://www.instagram.com/koffelo_brew/",
                  Icon: Instagram,
                  label: "Instagram",
                },
                {
                  href: "https://x.com/i/flow/login?redirect_after_login=%2Fkoffelo_brew",
                  Icon: SiX,
                  label: "X",
                },
                {
                  href: "https://www.youtube.com/@koffelo",
                  Icon: Youtube,
                  label: "YouTube",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="w-11 h-11 rounded-full border border-k-espresso/20 flex items-center justify-center text-k-espresso/70 hover:text-k-ivory hover:bg-k-copper hover:border-k-copper transition-all duration-400 ease-out-expo"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-k-ink-muted italic mt-5">
              Tag <span className="text-k-copper">@koffelo</span> &mdash;
              quietly featured.
            </p>
          </div>
        </div>

        <div className="border-t border-k-cream-200 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-xs tracking-wider text-k-walnut/70">
            © {new Date().getFullYear()} Koffelo Atelier. All rights reserved.
          </p>
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-k-walnut/60">
            Brewed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
