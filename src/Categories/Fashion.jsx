import { useContext, useEffect, useRef } from "react";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { useCart } from "../Hooks/useCart";
import { MenuContext } from "../../utils/MenuContext.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import supabase from "../../utils/supaClient.js";

function Fashion() {
  const {
    fashion,
    setFashion,
    setFilteredProducts,
    products,
    showPopup,
    setShowPopup,
    setCart,
    setPaymentSumm,
    cartQuantity,
    setCartQuantity,
  } = useContext(MenuContext);

  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity });
  const timeoutId = useRef(null);

  // Fetch fashion products
  async function fetchFashionProducts() {
    try {
      const { data, error } = await supabase
      .from('products')
      .select('*');
      if (error) throw error;
      setFashion(data.filter((item) => item.type === "Fashion"));
    } catch (err) {
      console.error("Error fetching fashion:", err.message);
    }
  }

  useEffect(() => {
    fetchFashionProducts();
    // eslint-disable-next-line
  }, []);

  // Trending fashion items (top 5 by rating)
  const trending = fashion
    .slice()
    .sort((a, b) => b.rating.star - a.rating.star)
    .slice(0, 5);

  // Featured fashion collections
  const featuredCollections = [
    {
      title: "Streetwear Picks",
      image: "fashion1.jpg",
      route: "/fashion?collection=streetwear",
    },
    {
      title: "Workwear Essentials",
      image: "fashion2.jpg",
      route: "/fashion?collection=workwear",
    },
    {
      title: "Accessories & Jewelry",
      image: "fashion3.jpg",
      route: "/fashion?collection=accessories",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {showPopup && <PopUp setShowPopup={setShowPopup} />}

      <Header
        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />

      {/* Fashion Hero Banner */}
      <div className="relative h-60 sm:h-80 lg:h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center rounded-b-3xl shadow-xl mb-8">
        <div className="text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Fashion
          </h1>
          <p className="text-white/90 mt-2 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Discover trending outfits, stylish collections, and exclusive deals curated for fashion enthusiasts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-12">

        {/* Trending Fashion */}
        {trending.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                🔥 Trending Fashion
              </h2>
              <Link
                to="/fashion?sort=trending"
                className="text-sm sm:text-base text-gray-500 hover:text-gray-900 transition"
              >
                See All
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trending.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col"
                >
                  <div className="relative w-[92%] h-40 mx-auto mt-2 sm:h-48 overflow-hidden rounded-t-2xl bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/20 p-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                      <img
                        src="images/kitchen-Accessories/wishlist.svg"
                        alt="wishlist"
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </p>
                    <div className="flex relative flex-col md:gap-2 mb-3">
                      <span className="text-sm md:text-lg font-bold text-gray-900">
                        ₦{item.price.toLocaleString()}
                      </span>

                      {(item.initialPrice || item.discountPercent) && (
                        <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-sm md:text-base text-gray-500 mt-1 md:mt-0">
                          {item.initialPrice && (
                            <span className="line-through text-sm">₦{item.initialPrice}</span>
                          )}
                          {item.discountPercent && (
                            <span className="absolute right-2 text-sm text-yellow-300 font-semibold">{item.discountPercent}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={`images/ratings/rating-${item.rating.star}.png`}
                        alt="rating"
                        className="w-20 h-4"
                      />
                      <p className="text-xs text-gray-500">({item.rating.rank})</p>
                    </div>
                    <button
                      onClick={() => {
                        if (timeoutId.current) clearTimeout(timeoutId.current);
                        addToCart(item.id);
                        setShowPopup(true);
                        timeoutId.current = setTimeout(() => setShowPopup(false), 3000);
                      }}
                      className="mt-auto w-full py-2 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-sm transition-all shadow-sm hover:shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Fashion Items */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              All Fashion
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {fashion.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col"
              >
                <div className="relative w-[92%] h-40 mx-auto mt-2 sm:h-48 overflow-hidden rounded-t-2xl bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/20 p-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                    <img
                      src="images/kitchen-Accessories/wishlist.svg"
                      alt="wishlist"
                      className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                    {item.name}
                  </p>
                  <div className="flex relative flex-col md:gap-2 mb-3">
                    <span className="text-sm md:text-lg font-bold text-gray-900">
                      ₦{item.price.toLocaleString()}
                    </span>

                    {(item.initialPrice || item.discountPercent) && (
                      <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-sm md:text-base text-gray-500 mt-1 md:mt-0">
                        {item.initialPrice && (
                          <span className="line-through text-sm">₦{item.initialPrice}</span>
                        )}
                        {item.discountPercent && (
                          <span className="absolute right-2 text-sm text-yellow-300 font-semibold">{item.discountPercent}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={`images/ratings/rating-${item.rating.star}.png`}
                      alt="rating"
                      className="w-20 h-4"
                    />
                    <p className="text-xs text-gray-500">({item.rating.rank})</p>
                  </div>
                  <button
                    onClick={() => {
                      if (timeoutId.current) clearTimeout(timeoutId.current);
                      addToCart(item.id);
                      setShowPopup(true);
                      timeoutId.current = setTimeout(() => setShowPopup(false), 3000);
                    }}
                    className="mt-auto w-full py-2 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-sm transition-all shadow-sm hover:shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Collections */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredCollections.map((col, idx) => (
              <Link
                key={idx}
                to={col.route}
                className="relative overflow-hidden rounded-2xl group"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-48 sm:h-60 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <h3 className="text-white text-lg sm:text-xl font-bold text-center px-4">
                    {col.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Fashion;
