import { Fragment, useContext } from "react";
import supabase from "../../utils/supaClient.js";
import { MenuContext } from "../../utils/MenuContext.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { fetchCart, useCart } from "../Hooks/useCart.js";

function CartSummary({ cart, setCart, setPaymentSumm, setShowDeletePopup }) {


  const { setCartQuantity } = useContext(MenuContext);

  async function removeFromCart(cartId) {
    try {
      const { error } = await supabase
        .from("carts")
        .delete()
        .eq("id", cartId);

      if (error) throw error;

      // Refresh cart state
      await fetchCart(setCart, setCartQuantity, setPaymentSumm);

    } catch (err) {
      console.error("Error removing from cart:", err.message);
      alert("Failed to update the cart. Please try again.");
    }
  }



  const { updateQuantity } = useCart({ setCart, setPaymentSumm, setCartQuantity });

  console.log(cart);
  return (
    <Fragment>
      {cart?.cartItems?.length > 0 ? (
        <div className="flex flex-col gap-6">
          {cart.cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition"
            >
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-gray-900 font-medium text-sm sm:text-base line-clamp-2">
                  {item.product.name}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-900 font-semibold">
                    ₦{item.product.price.toLocaleString()}
                  </span>
                  {item.product.initial_price && (
                    <span className="line-through text-gray-400 text-sm">
                      ₦{item.product.initial_price}
                    </span>
                  )}
                  {item.product.discount_percent && (
                    <span className="text-red-500 font-medium text-sm">
                      {item.product.discount_percent}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() =>
                    updateQuantity(item.id, "reduction")
                  }
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="text-gray-900 text-sm">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, "addition")
                  }
                  className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => {
                  removeFromCart(item.id)
                  setShowDeletePopup(true);
                }}
                className="ml-2 sm:ml-4 text-gray-400 hover:text-red-500 transition"
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-24 gap-4">
          <FaShoppingCart
            className="w-40 h-40 text-gray-500"
          />
          <p className="text-gray-500 text-lg font-medium">Your Cart is Empty</p>
          <a
            href="/"
            className="px-6 py-2 bg-white border text-black border-gray-800 hover:text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </Fragment>
  );
}

export default CartSummary;