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
        <div key={order.id} className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b border-gray-200 pb-3">
            <p className="text-sm text-gray-500">
              Order Placed: {dayjs(order.order_time_ms).format("MMMM D, YYYY")}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-2 sm:mt-0">
              Order ID: <span className="text-indigo-600">{order.id}</span>
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col divide-y divide-gray-200">
            {order.orderproducts?.map((op) => (
              <div
                key={op.product.id}
                className="flex flex-col sm:flex-row sm:items-center py-4 gap-4"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={op.product.image}
                    alt={op.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between gap-2">
                  <p className="text-xs text-gray-500">
                    Arriving on: {dayjs(op.estimated_delivery_time_ms).format("MMMM D")}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{op.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {op.quantity}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <button
                      onClick={() => {
                        if (timeoutId.current) clearTimeout(timeoutId.current);
                        addToCart(op.product.id);
                        setShowPopup(true);
                        timeoutId.current = setTimeout(() => setShowPopup(false), 3000);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition"
                    >
                      Buy it again
                    </button>

                    <Link to={`/tracking`}>
                      <button
                        onClick={() => trackPackage(order.id)}
                        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                      >
                        Track Package
                      </button>
                    </Link>
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
