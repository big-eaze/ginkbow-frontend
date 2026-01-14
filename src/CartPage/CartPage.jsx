import { useContext, useEffect, useState } from "react";
import { fetchCart } from "../Hooks/useCart.js";
import Header from "../components/Header";
import CartSummary from "./CartSummary";
import PaymentSummary from "./PaymentSummary";
import DeletePopup from "../components/DeletePopup";
import { MenuContext } from "../../utils/MenuContext.jsx";
import Footer from "../components/Footer.jsx";


function CartPage() {


  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const { cart, setCart, paymentSumm, setPaymentSumm, setOrders, setFilteredProducts, products, cartQuantity, setCartQuantity } = useContext(MenuContext);




  useEffect(() => {
    fetchCart(setCart, setCartQuantity, setPaymentSumm);
    //eslint-disable-next-line
  }, [])

  if (!cart) {
    return <p>Loading cart.....</p>
  }



  return (
    <div >
      {
        showDeletePopup && <DeletePopup setShowDeletePopup={setShowDeletePopup} />
      }
      <Header
        setFilteredProducts={setFilteredProducts}
        products={products}
        cartQuantity={cartQuantity}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-x-[1px] my-3 border-l-gray-200">
        {/* Cart Items Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Cart (<span className="text-indigo-600">{cart.totalQuantity || 0}</span>)
          </h2>
          <div className="flex flex-col gap-4">
            <CartSummary
              cart={cart}
              setCart={setCart}
              setPaymentSumm={setPaymentSumm}
              showDeletePopup={showDeletePopup}
              setShowDeletePopup={setShowDeletePopup}
            />
          </div>
        </div>

        {/* Cart Summary / Payment Section */}
        <div className="lg:col-span-4 sm:p-6 flex flex-col gap-6">
          <PaymentSummary
            paymentSumm={paymentSumm}
            cart={cart}
            setCart={setCart}
            setOrders={setOrders}
          />
        </div>
      </div>

      <Footer />
    </div>

  )
}

export default CartPage;

