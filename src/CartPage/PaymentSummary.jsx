import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MenuContext } from "../../utils/MenuContext.jsx";
import supabase from "../../utils/supaClient.js";
import { v4 as uuidv4 } from "uuid";

function PaymentSummary({ cart, setCart, setOrders }) {
  const { paymentSumm, setPaymentSumm, setCartQuantity } = useContext(MenuContext);

  // Recalculate payment summary whenever the cart changes
  useEffect(() => {
    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      setPaymentSumm({ subTotal: 0, totalDeliveryFee: 0, totalCost: 0 });
      return;
    }

    let subTotal = 0;
    let totalDeliveryFee = 0;

    cart.cartItems.forEach((item) => {
      const price = item.product?.price ?? 0;
      const quantity = item.quantity ?? 0;
      const deliveryFee = item.deliveryFee ?? 0;

      subTotal += price * quantity;
      totalDeliveryFee += deliveryFee;
    });

    const totalCost = subTotal + totalDeliveryFee;

    setPaymentSumm({ subTotal, totalDeliveryFee, totalCost });
    //eslint-disable-next-line
  }, [cart]);

  async function placeOrder() {
    try {
      const cartContent = cart.cartItems;

      if (!cartContent || cartContent.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const orderId = uuidv4();                // UUID for the order
      const orderTimeMs = Date.now();

      // Calculate total cost safely
      const totalCostCents = cartContent.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
        0
      );

      // 1️⃣ Create the order
      const { error: orderError } = await supabase.from("orders").insert({
        id: orderId,
        order_time_ms: orderTimeMs,
        total_cost_cents: totalCostCents,
      });

      if (orderError) throw orderError;

      // 2️⃣ Prepare products payload, filtering out invalid items
      const validItems = cartContent.filter(
        item => (item.productId || item.product?.id) && item.quantity > 0
      );

      if (validItems.length === 0) {
        alert("No valid products in cart to place order!");
        return;
      }

      const orderProductsPayload = validItems.map(item => ({
        order_id: orderId,
        product_id: item.productId || item.product.id,
        quantity: item.quantity,
        estimated_delivery_time_ms: orderTimeMs + 7 * 24 * 60 * 60 * 1000, // 7 days
      }));

      const { error: orderProductsError } = await supabase
        .from("orderproducts")
        .insert(orderProductsPayload);

      if (orderProductsError) throw orderProductsError;

      // 3️⃣ Insert tracking record
      const { error: trackingError } = await supabase.from("trackings").insert({
        id: uuidv4(),
        order_id: orderId,
        carrier: "FedEx",
        tracking_number: Math.random().toString(36).slice(2, 10).toUpperCase(),
        status: "Order Placed",
        estimated_delivery_time_ms: orderTimeMs + 7 * 24 * 60 * 60 * 1000,
        updated_at: new Date(),
        created_at: new Date(),
      });

      if (trackingError) throw trackingError;

      // 4️⃣ Clear the cart safely (delete only the current cart items)
      const cartIds = cartContent.map(item => item.id).filter(Boolean);

      if (cartIds.length > 0) {
        const { error: clearCartError } = await supabase
          .from("carts")
          .delete()
          .in("id", cartIds); // <- important: must use WHERE clause
        if (clearCartError) throw clearCartError;
      }

      // 5️⃣ Fetch updated orders with products
      const { data: updatedOrders, error: fetchError } = await supabase
        .from("orders")
        .select(`
        *,
        orderproducts (
          product_id,
          quantity,
          estimated_delivery_time_ms,
          product:products (*)
        )
      `);

      if (fetchError) throw fetchError;

      // 6️⃣ Update frontend state
      setOrders(updatedOrders);
      setCart({ cartItems: [], totalQuantity: 0 });
      setCartQuantity(0);
      setPaymentSumm({ subTotal: 0, totalDeliveryFee: 0, totalCost: 0 });

      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  }




  return (
    <>
      {paymentSumm ? (
        <div className="relative w-full sm:w-96 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
          {/* Header */}
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              Order Summary
            </h3>
            <p className="text-xs text-gray-500">
              Review your order before checkout
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">
                ₦{(paymentSumm.subTotal ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span className="font-medium text-gray-900">
                ₦{(paymentSumm.totalDeliveryFee ?? 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total payable</p>
              <p className="text-xl font-bold text-gray-900">
                ₦{(paymentSumm.totalCost ?? 0).toLocaleString()}
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              Secure checkout
            </span>
          </div>

          {/* CTA */}
          <Link to="/order" className="mt-6 block">
            <button
              className="group relative w-full overflow-hidden rounded-xl bg-gray-900 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              onClick={(e) => {
                if (!cart.cartItems || cart.cartItems.length === 0) {
                  e.preventDefault();
                  alert("Cart is empty! Kindly fill it up");
                } else {
                  placeOrder();
                }
              }}
            >
              <span className="relative z-10">
                Place Order — ₦{(paymentSumm.totalCost ?? 0).toLocaleString()}
              </span>

              {/* Hover sheen */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </Link>

          {/* Trust line */}
          <p className="mt-4 text-center text-[11px] text-gray-400">
            Taxes & delivery calculated at checkout • SSL secured
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-gray-500 animate-pulse">
            Calculating order summary…
          </p>
        </div>
      )}
    </>

  );
}

export default PaymentSummary;
