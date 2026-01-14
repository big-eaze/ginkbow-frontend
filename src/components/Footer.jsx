import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-neutral-300 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand */}
        <div className="space-y-4 lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img
              src="images/letter-g.png"
              alt="Ginkbow Logo"
              className="h-9 w-auto"
            />
            <span className="sr-only">Ginkbow</span>
          </Link>

          <p className="text-sm leading-relaxed text-neutral-400 max-w-md">
            Ginkbow is your everyday marketplace — from fashion and electronics
            to home essentials and groceries. Built for convenience, speed, and
            trust.
          </p>

          {/* Socials */}
          <div className="flex gap-3 pt-2">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
              >
                <Icon className="w-4 h-4 text-neutral-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/fashion" className="hover:text-white transition">Fashion</Link></li>
            <li><Link to="/electronics" className="hover:text-white transition">Electronics</Link></li>
            <li><Link to="/home-office" className="hover:text-white transition">Home & Office</Link></li>
            <li><Link to="/health-beauty" className="hover:text-white transition">Health & Beauty</Link></li>
            <li><Link to="/supermarket" className="hover:text-white transition">Supermarket</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/order" className="hover:text-white transition">Orders</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            <li><Link to="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link to="/sell" className="hover:text-white transition">Sell on Ginkbow</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
            Stay Updated
          </h4>

          <p className="text-sm text-neutral-400">
            Get updates on deals, new arrivals, and special offers.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 rounded-md bg-white/5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <button className="px-4 py-2 rounded-md bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-200 transition">
              Subscribe
            </button>
          </div>

          <div className="flex gap-3 text-2xl pt-2 text-neutral-400">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Ginkbow. All rights reserved.
      </div>
    </footer>
  );
}
