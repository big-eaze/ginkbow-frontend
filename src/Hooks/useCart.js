import supabase from "../../utils/supaClient";

// ------------------------------------------------------
// FETCH CART FUNCTION
// ------------------------------------------------------
export async function fetchCart(setCart, setCartQuantity, setPaymentSumm) {
  try {
    const { data: cartItems, error } = await supabase
      .from("carts")
      .select(`
        id,
        quantity,
        delivery_fee,
        product:products (
          id,
          name,
          price,
          image,
          initial_price,
          discount_percent,
          rating,
          type,
          category_key
        )
      `)
      .order("id", { ascending: true }); // stable order by id

    if (error) throw error;

    // Normalize keys
    const normalizedCartItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      deliveryFee: item.delivery_fee,
      product: {
        ...item.product,
        categoryKey: item.product.category_key,
      },
    }));

    // Totals
    const totalQuantity = normalizedCartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = normalizedCartItems.reduce(
      (sum, item) => sum + item.quantity * (item.product.price ?? 0) + (item.deliveryFee ?? 0),
      0
    );

    // Update state
    setCart({ cartItems: normalizedCartItems, totalQuantity });
    setCartQuantity(totalQuantity);
    setPaymentSumm(totalCost);

    return normalizedCartItems; // return for local updates if needed
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return [];
  }
}

// ------------------------------------------------------
// USE CART HOOK
// ------------------------------------------------------
export function useCart({ setCart, setPaymentSumm, setCartQuantity }) {
  const unitDeliveryFee = 500;

  // Add to cart
  const addToCart = async (productId) => {
    try {
      // 1️⃣ Check if product already exists in cart
      const { data: existingItems, error: fetchError } = await supabase
        .from("carts")
        .select("id, quantity, delivery_fee")
        .eq("product_id", productId);

      if (fetchError) throw fetchError;

      const unitDeliveryFee = 500;

      if (existingItems.length > 0) {
        // 2️⃣ Item exists, increment quantity & delivery_fee
        const item = existingItems[0];
        const newQuantity = item.quantity + 1;
        const newDeliveryFee = unitDeliveryFee * newQuantity;

        await supabase
          .from("carts")
          .update({ quantity: newQuantity, delivery_fee: newDeliveryFee, updated_at: new Date().toISOString() })
          .eq("id", item.id);
      } else {
        // 3️⃣ Item doesn't exist, insert new
        await supabase
          .from("carts")
          .insert({ product_id: productId, quantity: 1, delivery_fee: unitDeliveryFee });
      }

      // 4️⃣ Update UI
      await fetchCart(setCart, setCartQuantity, setPaymentSumm);

    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };


  // Update quantity
  const updateQuantity = async (cartId, action) => {
    try {
      const { data: cartItem, error } = await supabase
        .from("carts")
        .select("id, quantity, delivery_fee")
        .eq("id", cartId)
        .single();

      if (error || !cartItem) return;

      const newQuantity = action === "addition" ? cartItem.quantity + 1 : cartItem.quantity - 1;
      if (newQuantity < 1 || newQuantity > 10) return;

      // Update in Supabase
      await supabase
        .from("carts")
        .update({
          quantity: newQuantity,
          delivery_fee: unitDeliveryFee * newQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cartId);

      // Update UI locally without fetching
      setCart((prev) => {
        const updatedCartItems = prev.cartItems.map((item) =>
          item.id === cartId
            ? { ...item, quantity: newQuantity, deliveryFee: unitDeliveryFee * newQuantity }
            : item
        );
        const totalQuantity = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = updatedCartItems.reduce(
          (sum, item) => sum + item.quantity * (item.product.price ?? 0) + (item.deliveryFee ?? 0),
          0
        );
        setCartQuantity(totalQuantity);
        setPaymentSumm(totalCost);
        return { cartItems: updatedCartItems, totalQuantity };
      });
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  return { addToCart, updateQuantity };
}
