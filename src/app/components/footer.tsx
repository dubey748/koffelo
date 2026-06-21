import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="bg-k-paper text-k-espresso relative overflow-hidden border-t border-k-cream-200"
    >
      <div className="container-koffee py-16 md:py-20">
        {/* Top — giant wordmark */}
        <div className="mb-12 md:mb-16">
          <Link
            href="/"
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.85] uppercase tracking-tightest text-k-espresso inline-block hover:text-k-coffee transition-colors duration-500"
          >
            Koffelo<span className="text-k-gold">.</span>
          </Link>
          <p className="font-display text-xl md:text-2xl text-k-ink-muted italic mt-4 max-w-xl">
            United by coffee. Brewed with intention.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Explore */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.22em] uppercase text-k-gold mb-5">
              Explore
            </div>
            <ul className="space-y-3">
              {[
                { label: "Shop", href: "/#products" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "About", href: "/aboutus" },
                { label: "Cart", href: "/cart" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.22em] uppercase text-k-gold mb-5">
              Support
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/aboutus#terms"
                  data-testid="footer-terms"
                  className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.22em] uppercase text-k-gold mb-5">
              Contact
            </div>
            <ul className="space-y-3 select-text-on">
              <li>
                <a
                  href="mailto:info@morningbrew.com"
                  className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                >
                  info@morningbrew.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919667946833"
                  className="text-k-espresso/80 hover:text-k-gold transition-colors duration-300 inline-block"
                >
                  +91 966-794-6833
                </a>
              </li>
              <li className="text-sm text-k-ink-muted leading-relaxed pt-2">
                Urbtech Trade Centre, IS 16, 1601
                <br />
                Sector 132, Noida 201301, U.P.
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <div className="text-[11px] tracking-[0.22em] uppercase text-k-gold mb-5">
              Follow
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { href: "https://www.facebook.com/koffelo/", Icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/koffelo_brew/", Icon: Instagram, label: "Instagram" },
                { href: "https://x.com/i/flow/login?redirect_after_login=%2Fkoffelo_brew", Icon: SiX, label: "X" },
                { href: "https://www.youtube.com/@koffelo", Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="w-11 h-11 rounded-full border border-k-espresso/20 flex items-center justify-center text-k-espresso/70 hover:text-k-paper hover:bg-k-espresso hover:border-k-espresso transition-all duration-400 ease-out-expo"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-k-ink-muted mt-6 leading-relaxed">
              Tag us <span className="text-k-gold">@koffelo</span> — get featured.
            </p>
          </div>
        </div>

        <div className="border-t border-k-cream-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wider text-k-ink-muted">
            © {new Date().getFullYear()} Koffelo. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-k-ink-muted/70">
            Crafted slowly. Shipped freshly.
          </p>
        </div>
      </div>
    </footer>
  );
}
