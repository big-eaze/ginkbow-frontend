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
  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col flex-shrink-0 
    ${mobile ? "w-44 sm:w-56" : "w-full"}
  `}
>
  {/* Image Container */}
  <div className="w-[92%] mt-2 mx-auto h-36 sm:h-44 relative overflow-hidden rounded-t-xl bg-gray-100 group">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-cover"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

    {/* Wishlist Icon */}
    <div className="absolute top-2 right-2 bg-white/20 p-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
      <img
        src="images/kitchen-Accessories/wishlist.svg"
        alt="wishlist"
        className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
      />
    </div>
  </div>

  {/* Product Info */}
  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
    {/* Product Name */}
    <p className="text-xs sm:text-sm md:text-base font-medium text-gray-900 mb-1 line-clamp-2">
      {product.name}
    </p>

    {/* Price & Discount */}
    <div className="flex relative flex-col gap-1 mb-2">
      <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
        ₦{product.price.toLocaleString()}
      </span>

      {(product.initialPrice || product.discountPercent) && (
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          {product.initialPrice && (
            <span className="line-through">₦{product.initialPrice}</span>
          )}
          {product.discountPercent && (
            <span className="ml-auto text-yellow-400 font-semibold">
              {product.discountPercent}
            </span>
          )}
        </div>
      )}
    </div>

    {/* Rating */}
    <div className="flex items-center gap-1 mb-3">
      <img
        src={`images/ratings/rating-${product.rating.star || 0}.png`}
        alt="rating"
        className="w-16 h-3"
      />
      <p className="text-[11px] text-gray-500">
        ({product.rating.rank})
      </p>
    </div>

    {/* Add to Cart Button */}
    <button
      className="mt-auto w-full py-1.5 sm:py-2 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-medium text-xs sm:text-sm transition-all shadow-sm hover:shadow-md"
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
