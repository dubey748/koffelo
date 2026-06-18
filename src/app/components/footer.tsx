import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { SiX } from "react-icons/si";
export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-3xl font-bold mb-4">Koffelo</h3>
          <p className="text-gray-400 mb-2">
            {/* Enjoy Better And Better Quality Coffee With Caffeine. */}
            Koffelo is a premium coffee crafted for bold flavor, smooth aroma ,
            and a wholesome coffee experience.We blend tradition with innovation
            to bring you a cup that energizes and delights every day.
          </p>
          <div className="space-y-2">
            <div></div>
            <div></div>
            <div></div>
            <Link
              href="/aboutus#terms"
              className="text-xl pt-[53px] font-semibold underline block"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        <div className="text-center md:text-left mb-8 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2 text-gray-400">
            <p>info@morningbrew.Com</p>
            <p>Call Us: (+91) 966-794-6833</p>
            <p>Urbtech Trade Centre,IS 16,1601,First Floor Sector 132,</p>
            <p>Gautam Buddha Nagar,Noida 201301,U.P.</p>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://www.facebook.com/koffelo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/koffelo_brew/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
            </a>
            <div className="flex gap-4">
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2Fkoffelo_brew"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiX className="h-5 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </a>
            </div>
            <a
              href="https://www.youtube.com/@koffelo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>Copyright 2025 Koffelo</p>
      </div>
    </footer>
  );
}
