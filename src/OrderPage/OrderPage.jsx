import { useContext, useEffect } from "react";
import Order from "./Order";
import Header from "../components/Header";
import PopUp from "../components/PopUp";
import { MenuContext } from "../../utils/MenuContext";
import supabase from "../../utils/supaClient";

function OrderPage() {


  const {
    orders,
    setOrders,
    setCart,
    setPaymentSumm,
    setTracking,
    setFilteredProducts,
    products,
    showPopup,
    setShowPopup,
    cartQuantity,
    setCartQuantity
  } = useContext(MenuContext);
  <title>order</title>



  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
  *,
  orderproducts (
    id,
    product_id,
    quantity,
    estimated_delivery_time_ms,
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
  )
`);

      if (error) throw error;

      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  }



  useEffect(() => {
    fetchOrders();
    //eslint-disable-next-line
  }, [])

  return (
    <>
      {showPopup && <PopUp setShowPopup={setShowPopup} />}
      <Header

        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-2 sm:mt-6">
        <Order
          orders={orders}
          setCart={setCart}
          setPaymentSumm={setPaymentSumm}
          setTracking={setTracking}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          setCartQuantity={setCartQuantity}
        />
      </div>

    </>
  )
}


export default OrderPage;