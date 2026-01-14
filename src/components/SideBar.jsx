import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

function SideMenu({ isMenuOpen, cartQuantity }) {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72
      bg-[#111827]/65 backdrop-blur-xl
      text-white
      border-r border-white/10
      shadow-2xl
      transform transition-transform duration-300 ease-out
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10">
        <h2 className="text-2xl font-dancing font-semibold tracking-wide">
          GinkBow
        </h2>
      </div>

      {/* Menu */}
      <nav className="px-4 py-6 space-y-2 text-sm">
        {/* Categories toggle */}
        <button
          onClick={() => setShowCategories((p) => !p)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg
          hover:bg-white/10 transition"
        >
          <span className="font-medium text-white/90">Categories</span>
          <FaChevronDown
            className={`w-4 h-4 transition-transform ${showCategories ? "rotate-180" : ""
              }`}
          />
        </button>

        {/* Category list */}
        <div
          className={`ml-3 overflow-hidden transition-all duration-300
          ${showCategories ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="mt-2 space-y-1 border-l border-white/10 pl-4">
            {[
              { name: "Kitchen Appliances", to: "/kitchen-appliances" },
              { name: "Phones & Tablets", to: "/phones-tablets" },
              { name: "Health & Beauty", to: "/health-beauty" },
              { name: "Home & Office", to: "/home-office" },
              { name: "Electronics", to: "/electronics" },
              { name: "Fashion", to: "/fashion" },
              { name: "Supermarket", to: "/supermarket" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block py-1.5 px-2 rounded-md
                  text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-white/10" />

        {/* Main links */}
        <Link
          to="/order"
          className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          Orders
        </Link>

        <Link
          to="/profile"
          className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          Profile
        </Link>

        <Link
          to="/help"
          className="block px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
        >
          Help
        </Link>
      </nav>
    </aside>
  );
}

export default SideMenu;
