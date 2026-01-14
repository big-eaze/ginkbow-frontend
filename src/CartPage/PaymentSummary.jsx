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
        <div className="p-6 flex flex-col gap-4 w-full sm:w-80">
          {/* Header */}
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Cart Summary
          </h3>

          {/* Subtotal */}
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ₦{(paymentSumm.subTotal ?? 0).toLocaleString()}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Delivery Fee</span>
            <span className="font-semibold text-gray-900">
              ₦{(paymentSumm.totalDeliveryFee ?? 0).toLocaleString()}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-gray-900 text-lg font-bold border-t border-gray-200 pt-2">
            <span>Order Total</span>
            <span>₦{(paymentSumm.totalCost ?? 0).toLocaleString()}</span>
          </div>

          {/* Place Order Button */}
          <Link to="/order" className="mt-4 w-full">
            <button
              className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-shadow shadow-md hover:shadow-xl"
              onClick={(e) => {
                if (!cart.cartItems || cart.cartItems.length === 0) {
                  e.preventDefault();
                  alert("Cart is empty! Kindly fill it up");
                } else {
                  placeOrder();
                }
              }}
            >
              Place Your Order (₦{(paymentSumm.totalCost ?? 0).toLocaleString()})
            </button>
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Loading payment summary...</p>
      )}
    </>
  );
}

export default PaymentSummary;
