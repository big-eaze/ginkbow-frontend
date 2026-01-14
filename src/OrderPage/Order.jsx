import dayjs from "dayjs";
import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Hooks/useCart.js";
import supabase from "../../utils/supaClient.js";

function Order({ orders, setCart, setPaymentSumm, setTracking, setShowPopup, setCartQuantity }) {
  const { addToCart } = useCart({ setCart, setPaymentSumm, setCartQuantity });
  const timeoutId = useRef(null);

  // Track package function
  async function trackPackage(orderId) {
    try {
      const { data, error } = await supabase
        .from("trackings")
        .select("*")
        .eq("order_id", orderId);

      if (error) throw error;

      // Ensure it's always an array
      if (!Array.isArray(data)) {
        console.warn("Expected array of trackings, got:", data);
        setTracking([]);
      } else {
        setTracking(data);
        localStorage.setItem("track", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Tracking error:", err.message || err);
      setTracking([]); // fallback
    }
  }




  console.log(orders)
  return (
    <Fragment>
      {orders?.map((order) => (
        <div
          key={order.id}
          className="relative mb-10 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-gray-100"
        >
          {/* Order Header */}
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Order placed
              </p>
              <p className="text-sm font-medium text-gray-900">
                {dayjs(order.order_time_ms).format("MMMM D, YYYY")}
              </p>
            </div>

            <div className="text-sm">
              <span className="text-gray-500">Order ID</span>
              <p className="font-semibold text-indigo-600">{order.id}</p>
            </div>
          </div>

          {/* Products Timeline */}
          <div className="relative space-y-8">
            {order.orderproducts?.map((op, index) => (
              <div key={op.product.id} className="relative flex gap-5">
                {/* Timeline Rail */}
                <div className="flex flex-col items-center">
                  <span className="h-3 w-3 rounded-full bg-indigo-500" />
                  {index !== order.orderproducts.length - 1 && (
                    <span className="mt-1 h-full w-px bg-gray-200" />
                  )}
                </div>

                {/* Product Card */}
                <div className="flex flex-1 gap-4 rounded-2xl bg-gray-50 p-4">
                  {/* Image */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={op.product.image}
                      alt={op.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-500">
                        Estimated delivery ·{" "}
                        {dayjs(op.estimated_delivery_time_ms).format("MMM D")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {op.product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Quantity · {op.quantity}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          if (timeoutId.current) clearTimeout(timeoutId.current);
                          addToCart(op.product.id);
                          setShowPopup(true);
                          timeoutId.current = setTimeout(
                            () => setShowPopup(false),
                            3000
                          );
                        }}
                        className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
                      >
                        Buy again
                      </button>

                      <Link to="/tracking">
                        <button
                          onClick={() => trackPackage(order.id)}
                          className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                          Track package
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Fragment>

  );
}

export default Order;
