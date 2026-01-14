import React, { useEffect, useState } from "react";
import { MenuContext } from "./MenuContext.jsx";
import { useLocation } from "react-router";




export function MenuProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [paymentSumm, setPaymentSumm] = useState([]);
  const [orders, setOrders] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [healthBeauty, setHealthBeauty] = useState([]);
  const [homeOffice, setHomeOffice] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [gadgets, setGadgets] = useState([]);
  const [supermarket, setSupermarket] = useState([]);
  const [tracking, setTracking] = useState(() => {
    const stored = localStorage.getItem("track");
    return stored ? JSON.parse(stored) : null;
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path === "/home-office") {
      setCurrentCategory("homeOffice");
    } else if (path === "/kitchen-appliances") {
      setCurrentCategory("kitchenAppliances");
    } else if (path === "/phones-tablets") {
      setCurrentCategory("phoneTablets");
    } else if (path === "/supermarket") {
      setCurrentCategory("supermarket");
    } else if (path === "/electronics") {
      setCurrentCategory("electronics");
    } else if (path === "/fashion") {
      setCurrentCategory("fashion");
    } else if (path === "/health-beauty") {
      setCurrentCategory("healthBeauty");
    } else {
      setCurrentCategory(null);
    }
  }, [location.pathname]);


  return (
    <MenuContext.Provider value={
      {
        products,
        setProducts,
        cart,
        setCart,
        orders,
        setOrders,
        electronics,
        setElectronics,
        fashion,
        setFashion,
        healthBeauty,
        setHealthBeauty,
        homeOffice,
        setHomeOffice,
        kitchen,
        setKitchen,
        gadgets,
        setGadgets,
        supermarket,
        setSupermarket,
        tracking,
        setTracking,
        filteredProducts,
        setFilteredProducts,
        showPopup,
        setShowPopup,
        paymentSumm,
        setPaymentSumm,
        cartQuantity,
        setCartQuantity,
        currentCategory,
        setCurrentCategory
      }
    } >
      {children}
    </MenuContext.Provider>
  )
}