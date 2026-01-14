import { FaBlender, FaHeartbeat, FaHome, FaMobileAlt, FaShoppingBasket, FaTshirt, FaTv } from "react-icons/fa";
import { Link } from "react-router-dom";

export function AllCategories({ onClose }) {


  const categories = [
    { name: "Kitchen Appliances", to: "kitchen-appliances", Icon: FaBlender, color: "bg-amber-50" },
    { name: "Phones & Tablets", to: "phones-tablets", Icon: FaMobileAlt, color: "bg-sky-50" },
    { name: "Health & Beauty", to: "health-beauty", Icon: FaHeartbeat, color: "bg-pink-50" },
    { name: "Home & Office", to: "home-office", Icon: FaHome, color: "bg-emerald-50" },
    { name: "Electronics", to: "electronics", Icon: FaTv, color: "bg-violet-50" },
    { name: "Fashion", to: "fashion", Icon: FaTshirt, color: "bg-rose-50" },
    { name: "Supermarket", to: "supermarket", Icon: FaShoppingBasket, color: "bg-lime-50" },
  ];
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          All Categories
        </h2>

        <button
          onClick={onClose}
          className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          Collapse ↑
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map(({ name, to, Icon, color }) => (
          <Link
            key={name}
            to={to}
            className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-110 group"
          >

            <div
              className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 group-hover:border-${color}-500 transition-all duration-300`}
            >
              <Icon
                className={`w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-${color}-500 transition-colors duration-300`}
              />
            </div>


            <div className="mt-2 text-xs sm:text-sm font-light text-gray-800 group-hover:text-${color}-600 transition-colors duration-300 text-center">
              {name}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
