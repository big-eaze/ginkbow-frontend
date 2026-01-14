import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart.js";
import { MenuContext } from "../../utils/MenuContext.jsx";

function HomeProduct({ type, products, route, setCart, setPaymentSumm, setShowPopup }) {
  const { setCartQuantity } = useContext(MenuContext);
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity });

  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter((product) => product.type === type).slice(0, 5);

  return (
    <section className="py-8 max-w-7xl mx-auto px-0 lg:px-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{type}</h2>
        <Link
          to={route}
          className="text-sm md:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          See All ❯
        </Link>
      </div>

      {/* Product Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} setShowPopup={setShowPopup} />
        ))}
      </div>

      {/* Horizontal Scroll on Mobile */}
      <div className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide py-2">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setShowPopup={setShowPopup}
            mobile
          />
        ))}
      </div>
    </section>
  );
}

// ProductCard component to keep layout consistent
function ProductCard({ product, addToCart, setShowPopup, mobile }) {
  return (

    <div
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col flex-shrink-0 ${mobile ? "w-56 sm:w-60" : "w-full"
        }`}
    >

      {/* Image Container */}
      <div className="w-[92%] mt-2 mx-auto h-48 relative overflow-hidden rounded-t-2xl bg-gray-100 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay for Depth */}
        <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

        {/* Wishlist Icon */}
        <div className="absolute top-3 right-3 bg-white/20 p-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
          <img
            src="images/kitchen-Accessories/wishlist.svg"
            alt="wishlist"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Product Name */}
        <p className="text-sm md:text-base font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </p>

        {/* Price & Discount */}
        <div className="flex relative flex-col md:gap-2 mb-3">
          <span className="text-lg md:text-xl font-bold text-gray-900">
            ₦{product.price.toLocaleString()}
          </span>

          {(product.initialPrice || product.discountPercent) && (
            <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-sm md:text-base text-gray-500 mt-1 md:mt-0">
              {product.initialPrice && (
                <span className="line-through">₦{product.initialPrice}</span>
              )}
              {product.discountPercent && (
                <span className="absolute right-2 text-yellow-300 font-semibold">{product.discountPercent}</span>
              )}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={`images/ratings/rating-${product.rating.star || 0}.png`}
            alt="rating"
            className="w-20 h-4"
          />
          <p className="text-xs text-gray-500">({product.rating.rank})</p>
        </div>

        {/* Add to Cart Button */}
        <button
          className="mt-auto w-full py-2 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-sm transition-all shadow-sm hover:shadow-md"
          onClick={() => {
            addToCart(product.id);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
          }}
        >
          Add to Cart
        </button>

      </div>
    </div>

  );
}

export default HomeProduct;
