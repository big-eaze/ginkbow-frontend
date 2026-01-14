import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaBlender,
  FaMobileAlt,
  FaHeartbeat,
  FaHome,
  FaTv,
  FaTshirt,
  FaShoppingBasket,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AllCategories } from "../components/AllCategories";

const categories = [
  { name: "Kitchen Appliances", to: "kitchen-appliances", Icon: FaBlender, color: "bg-amber-50" },
  { name: "Phones & Tablets", to: "phones-tablets", Icon: FaMobileAlt, color: "bg-sky-50" },
  { name: "Health & Beauty", to: "health-beauty", Icon: FaHeartbeat, color: "bg-pink-50" },
  { name: "Home & Office", to: "home-office", Icon: FaHome, color: "bg-emerald-50" },
  { name: "Electronics", to: "electronics", Icon: FaTv, color: "bg-violet-50" },
  { name: "Fashion", to: "fashion", Icon: FaTshirt, color: "bg-rose-50" },
  { name: "Supermarket", to: "supermarket", Icon: FaShoppingBasket, color: "bg-lime-50" },
];

const slides = [
  { src: "images/desktopSlide/desktop1.jpg", title: "Mega Sale — Up To 50% Off", cta: "Shop the Deals" },
  { src: "images/desktopSlide/desktop2.jpg", title: "Fresh Drops — New Arrivals", cta: "Explore New" },
  { src: "images/desktopSlide/desktop3.jpg", title: "Wellness & Beauty Picks", cta: "Discover" },
  { src: "images/desktopSlide/desktop4.jpg", title: "Open Box Tech Offers", cta: "Grab Now" },
  { src: "images/desktopSlide/desktop6.jpg", title: "Style Edit — Trending Now", cta: "View Collection" },
];

export default function HomeSecTwo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const nextSlide = useCallback(
    () => setCurrentSlide((s) => (s + 1) % slides.length),
    []
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(nextSlide, 4500);
    return () => clearInterval(id);
  }, [paused, nextSlide]);

  const popularCategories = categories.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto py-0 lg:px-6 sm:py-12 space-y-12">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="lg:col-span-8 -mx-4 sm:mx-0 rounded-none sm:rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="h-[260px] sm:h-[360px] lg:h-[520px] relative overflow-hidden">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="min-w-full h-full relative">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />


                  <div className="
                    absolute
                    left-3 right-3 bottom-3
                    sm:left-6 sm:right-auto sm:bottom-6
                    md:left-10 md:bottom-10
                    bg-black/40 sm:bg-white/10
                    backdrop-blur-sm sm:backdrop-blur
                    rounded-xl sm:rounded-2xl
                    px-4 py-3 sm:p-5 md:p-7
                    max-w-none sm:max-w-xl
                  ">

                    <h2 className="text-white text-xl md:text-3xl font-extrabold">
                      {slide.title}
                    </h2>
                    <p className="text-sky-100/80 mt-2 text-sm md:text-base">
                      Curated collections and limited-time offers updated weekly.
                    </p>
                    <Link
                      to="#"
                      className="inline-block mt-4 bg-white text-indigo-700 px-4 py-2 rounded-full font-semibold"
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute top-4 left-4 flex gap-2">
              <button onClick={prevSlide} className="bg-white/10 text-white p-2 rounded-full">
                <FiChevronLeft />
              </button>
              <button onClick={nextSlide} className="bg-white/10 text-white p-2 rounded-full">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* ===== SIDE CARD ===== */}
        <aside className="lg:col-span-4 space-y-4 px-4 sm:px-0">
          <div className="rounded-3xl p-6 bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl">
            <h3 className="text-lg font-extrabold">🔥 Hot Deals Today</h3>
            <p className="text-sm text-indigo-100 mt-1">
              Up to 50% off selected gadgets & essentials.
            </p>
            <Link to="#" className="inline-block mt-4 underline text-sm font-semibold">
              View deals →
            </Link>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl">📞</div>
            <div>
              <div className="text-xs text-gray-300">Call to order</div>
              <div className="font-semibold">41011111222</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <img src="/demo-display1.jpg" alt="demo-display1" className="w-32 h-32 object-cover rounded-lg" />
            <img src="/phone.jpg" alt="phone" className="w-32 h-32 object-cover rounded-lg" />
            <img src="/demo-display3.jpg" alt="demo-display3" className="w-32 h-32 object-cover rounded-lg" />
            <img src="/demo-display4.jpg" alt="demo-display4" className="w-32 h-32 object-cover rounded-lg" />
            <img src="/demo-display5.jpg" alt="demo-display5" className="w-32 h-32 object-cover rounded-lg" />
            <img src="/demo-display6.jpg" alt="demo-display6" className="w-32 h-32 object-cover rounded-lg" />
          </div>
        </aside>
      </div>



      {/* ================= ALL CATEGORIES (ON DEMAND) ================= */}
      {showAllCategories ? (
        <div className="px-4 sm:px-0">
          <AllCategories onClose={() => setShowAllCategories(false)} />
        </div>
      ) : (
        <section className="px-4 sm:px-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-gray-900">
              Popular Categories
            </h3>
            <button
              onClick={() => setShowAllCategories(true)}
              className="text-sm font-semibold text-indigo-600"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {popularCategories.map(({ name, to, Icon, color }) => (
              <Link
                key={name}
                to={to}
                className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-110 group"
              >
                {/* Icon Circle */}
                <div
                  className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gray-200 group-hover:border-${color}-500 transition-all duration-300`}
                >
                  <Icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-${color}-500 transition-colors duration-300`}
                  />
                </div>

                {/* Category Name */}
                <div className="mt-2 text-xs sm:text-sm font-light text-gray-800 group-hover:text-${color}-600 transition-colors duration-300 text-center">
                  {name}
                </div>
              </Link>
            ))}
          </div>






        </section>
      )
      }
    </section >
  );
}
