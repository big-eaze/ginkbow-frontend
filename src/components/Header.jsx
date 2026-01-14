import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext } from "react";
import { FaBars, FaSearch, FaShoppingCart } from "react-icons/fa";
import SideMenu from "./SideBar";
import Fuse from "fuse.js";
import { MenuContext } from "../../utils/MenuContext";
import categoryThemes from "../../utils/categoriesTheme";

function Header({ products, setFilteredProducts, cartQuantity }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentCategory } = useContext(MenuContext);
  console.log(currentCategory);
  const theme = categoryThemes[currentCategory] || {
    heroGradient: "from-indigo-600 via-purple-600 to-pink-500",
    accent: "indigo-500"
  };

  const inputRef = useRef();
  const navigate = useNavigate();
  const closeMenu = () => {
    setIsMenuOpen(false);

  };

  function openMenu() {
    setIsMenuOpen(true);
  }
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }


    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);




  const fuse = new Fuse(Array.isArray(products) ? products : [], {
    keys: ['name', 'keywords', 'type'],
    threshold: 0.2
  });



  function searchAction() {

    const currentValue = inputRef.current.value.trim().toLowerCase();
    if (!currentValue) return;

    const result = fuse.search(currentValue);

    if (!result || result.length === 0) {
      setFilteredProducts([]);
      navigate('/');
    }
    const matches = result.map(r => r.item);
    setFilteredProducts(matches);
    navigate('/');

    inputRef.current.value = '';

  }



  return (
    <header className={`bg-gradient-to-r ${theme.heroGradient} shadow-lg sticky top-0 z-50`}>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Left: Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            style={{ backgroundColor: `${theme.accent}` }}
            className="inline md:hidden p-1 rounded-full transition hover:brightness-90"
            onClick={openMenu}
          >
            <FaBars className="text-white w-5 h-5" />
          </button>
          <SideMenu
            isMenuOpen={isMenuOpen}
            cartQuantity={cartQuantity}
            toggleMenu={closeMenu}
          />
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={closeMenu}
            />
          )}
          <Link className="flex gap-2 items-center" to="/" onClick={() => setFilteredProducts([])}>
            
            <p className="text-white font-dancing text-3xl">Ginkbow</p>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <input
            ref={inputRef}
            onKeyDown={(e) => e.key === "Enter" && searchAction()}
            placeholder="Search for products, brands, categories..."
            className="w-full py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent transition placeholder-white/80 text-white bg-white/20"
          />
          <button
            onClick={searchAction}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition"
          >
            <FaSearch className="text-white w-4 h-4" />
          </button>
        </div>

        {/* Right: Orders, Help, Cart */}
        <div className="flex items-center gap-6 text-white">

          {/* Orders */}
          <Link
            to="/order"
            className="hidden md:flex flex-col items-center group relative hover:text-yellow-300 transition"
          >
            <FaShoppingCart size={22} />
            <span className="text-xs mt-1 font-medium">Orders</span>
          </Link>

          {/* Help */}
          <div className="hidden md:flex flex-col items-center cursor-pointer group hover:text-yellow-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 -960 960 960"
              className="w-6 h-6"
            >
              <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Help</span>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex flex-col items-center group hover:text-yellow-300 transition"
          >
            <FaShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-semibold text-white">
              {cartQuantity}
            </span>
            <span className="text-xs mt-1 font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
export default Header;