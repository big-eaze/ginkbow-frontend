import React, { useContext, useEffect } from "react";
import { MenuContext } from "../../utils/MenuContext.jsx";
import supabase from "../../utils/supaClient.js";
import Header from "../components/Header.jsx";
import HomeSecTwo from "./HomeSecTwo.jsx";
import HomeProduct from "./HomeProduct.jsx";
import SearchResults from "../components/SearchResults.jsx";
import PopUp from "../components/PopUp.jsx";
import Footer from "../components/Footer.jsx";
import FeaturedBrand from "../components/FeaturedBrand.jsx";
import AboutShopText from "../components/AboutShopText.jsx";
import Marquee from "../components/Marquee.jsx";

function HomePage() {
  const {
    products,
    setProducts,
    setCart,
    setPaymentSumm,
    filteredProducts,
    setFilteredProducts,
    showPopup,
    setShowPopup,
    cartQuantity,
  } = useContext(MenuContext);


  async function fetchProducts() {
    try {
      console.log(supabase);
      const { data, error } = await supabase
        .from('products')       // your table name
        .select('*');           // you can select specific columns instead of '*'
      console.log(data);
      if (error) {
        console.error('Error fetching products from Supabase:', error.message);
        return;
      }

      setProducts(data);
    } catch (err) {
      console.error('Unexpected error fetching products:', err.message);
    }
  }


  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-overall bg-gray-50 min-h-screen">
      {/* Popup */}
      {showPopup && <PopUp setShowPopup={setShowPopup} />}

      {/* Header */}
      <Header
        products={products}
        setFilteredProducts={setFilteredProducts}
        setPaymentSumm={setPaymentSumm}
        cartQuantity={cartQuantity}
      />
      <Marquee />
      <main className="px-4 md:px-8 lg:px-16 md:py-6 space-y-10">
        {filteredProducts.length === 0 ? (
          <>
            {/* First Layer: Slideshow + Categories */}
            <HomeSecTwo />

            {/* Product Sections */}
            <div className="js-shopping-container space-y-5">
              <HomeProduct
                type="Kitchen-Appliances"
                products={products}
                route="/kitchen-appliances"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Gadgets"
                products={products}
                route="/phones-tablets"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Health and Beauty"
                products={products}
                route="/health-beauty"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Home and Office"
                products={products}
                route="/home-office"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Electronics"
                products={products}
                route="/electronics"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Fashion"
                products={products}
                route="/fashion"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />

              <HomeProduct
                type="Supermarket"
                products={products}
                route="/supermarket"
                setCart={setCart}
                setPaymentSumm={setPaymentSumm}
                setShowPopup={setShowPopup}
              />
            </div>
          </>
        ) : (
          <SearchResults
            filteredProducts={filteredProducts}
            setShowPopup={setShowPopup}
            setCart={setCart}
            setPaymentSumm={setPaymentSumm}
          />
        )}
      </main>
      <AboutShopText />

      <FeaturedBrand />
      <Footer />
    </div>
  );
}

export default HomePage;
