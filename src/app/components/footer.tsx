import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      id="contact"
      data-testid="site-footer"
      className="bg-k-espresso text-k-paper relative overflow-hidden"
    >
      {/* Subtle gold accent line */}
      <div className="divider-gold" />

      <div className="container-koffee py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-display text-4xl md:text-5xl mb-5 text-k-paper">
              Koffelo<span className="text-k-gold">.</span>
            </div>
            <p className="text-k-cream-50/75 leading-relaxed mb-8 max-w-md">
              Premium coffee crafted for bold flavor, smooth aroma, and a
              wholesome experience. We blend tradition with innovation to bring
              you a cup that energizes and delights every day.
            </p>
            <Link
              href="/aboutus#terms"
              data-testid="footer-terms"
              className="text-sm tracking-[0.18em] uppercase text-k-amber link-underline inline-block"
            >
              Terms &amp; Conditions
            </Link>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="eyebrow text-k-amber mb-5">— Contact</div>
            <ul className="space-y-3 text-k-cream-50/75 select-text-on">
              <li>
                <a
                  href="mailto:info@morningbrew.com"
                  className="hover:text-k-amber transition-colors duration-300"
                >
                  info@morningbrew.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919667946833"
                  className="hover:text-k-amber transition-colors duration-300"
                >
                  +91 966-794-6833
                </a>
              </li>
              <li className="text-sm leading-relaxed pt-2 border-t border-k-paper/10">
                Urbtech Trade Centre, IS 16, 1601<br />
                First Floor, Sector 132<br />
                Gautam Buddha Nagar, Noida 201301, U.P.
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-3">
            <div className="eyebrow text-k-amber mb-5">— Follow</div>
            <div className="flex gap-3">
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
                  className="w-10 h-10 rounded-full border border-k-paper/15 flex items-center justify-center text-k-paper/70 hover:text-k-espresso hover:bg-k-amber hover:border-k-amber transition-all duration-400 ease-out-expo"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <p className="text-xs text-k-cream-50/50 mt-8 leading-relaxed">
              Crafted slowly. Shipped freshly.<br />
              Made for those who notice the difference.
            </p>
          </div>
        </div>

        <div className="border-t border-k-paper/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wider text-k-cream-50/50">
            © {new Date().getFullYear()} Koffelo · United by Coffee
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-k-cream-50/40">
            Made with care · Brewed with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
