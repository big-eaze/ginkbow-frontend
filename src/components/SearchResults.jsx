import React, { useRef } from 'react';
import { useCart } from '../Hooks/useCart';

function SearchResults({ filteredProducts, setShowPopup, setCart, setPaymentSumm }) {
  const { addToCart } = useCart({ setCart, setPaymentSumm });
  const timeoutId = useRef(null);

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <section className="px-4 py-6 max-w-7xl mx-auto ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Search results</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition flex flex-col"
          >
            {/* Image + Wishlist */}
            <div className="relative w-[92%] h-40 sm:h-48 mx-auto mt-2 overflow-hidden rounded-t-2xl bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/20 p-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                <img
                  src="images/kitchen-Accessories/wishlist.svg"
                  alt="wishlist"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-t-2xl"></div>
            </div>

            {/* Product Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <p className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                {product.name}
              </p>

              <div className="flex relative flex-col md:gap-2 mb-3">
                <span className="text-sm md:text-lg font-bold text-gray-900">
                  ₦{product.price.toLocaleString()}
                </span>

                {(product.initialPrice || product.discountPercent) && (
                  <div className="flex flex-col md:flex-row md:items-center md:gap-2 text-sm md:text-base text-gray-500 mt-1 md:mt-0">
                    {product.initialPrice && (
                      <span className="line-through text-sm">
                        ₦{product.initialPrice.toLocaleString()}
                      </span>
                    )}
                    {product.discountPercent && (
                      <span className="absolute right-2 text-sm text-yellow-300 font-semibold">
                        {product.discountPercent}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={`images/ratings/rating-${product.rating.star}.png`}
                  alt="rating"
                  className="w-20 h-4"
                />
                <p className="text-xs text-gray-500">({product.rating.rank})</p>
              </div>

              <button
                onClick={() => {
                  if (timeoutId.current) clearTimeout(timeoutId.current);
                  addToCart(product.id);
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
  );
}

export default SearchResults;
