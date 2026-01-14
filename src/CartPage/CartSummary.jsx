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
        <div className="flex flex-col gap-5">
          {cart.cartItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {item.product.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900">
                      ₦{item.product.price.toLocaleString()}
                    </span>

                    {item.product.initial_price && (
                      <span className="text-xs line-through text-gray-400">
                        ₦{item.product.initial_price}
                      </span>
                    )}

                    {item.product.discount_percent && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                        {item.product.discount_percent}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="mt-3 flex items-center justify-between">
                  {/* Quantity Control */}
                  <div className="flex items-center rounded-full bg-gray-100 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, "reduction")}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 hover:bg-white hover:shadow"
                    >
                      −
                    </button>

                    <span className="mx-3 text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, "addition")}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-600 hover:bg-white hover:shadow"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      setShowDeletePopup(true);
                    }}
                    className="text-xs font-medium text-gray-400 hover:text-red-500 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <FaShoppingCart className="h-10 w-10 text-gray-400" />
          </div>

          <p className="text-lg font-semibold text-gray-900">
            Your cart is empty
          </p>

          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Looks like you haven’t added anything yet. Discover products you’ll love.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </Fragment>

  );
}

export default CartSummary;