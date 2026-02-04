import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, Command } from "lucide-react";
import { filterProducts } from "../features/ShopCart/productSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname === path;
  const handelSearch = (e) => {
    dispatch(filterProducts(e.target.value));
  };
  
  return (
    <div className="sticky top-0 z-50 w-full px-4 md:px-8 pt-6">
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] px-8 py-3 flex items-center justify-between transition-all duration-500">
        {/* --- BRAND IDENTITY --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#050515] rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 group-hover:bg-[#103639]">
            <Command size={20} className="text-[#F6FEFF]" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#fff] leading-none tracking-tighter text-xl uppercase">
              SHOPPING CART
            </span>
          </div>
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { name: "Collection", path: "/" },
            { name: "Cart", path: "/cart" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                isActive(link.path)
                  ? "text-[#103639]"
                  : "text-gray-400 hover:text-[#050515]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#103639] rounded-full animate-in fade-in slide-in-from-left-2" />
              )}
            </Link>
          ))}
        </div>

        {/* --- UTILITIES & CART --- */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden sm:flex p-2.5 text-gray-400 hover:text-[#050515] transition-colors hover:bg-gray-50 rounded-xl border-1">
            <input
              type="text"
              placeholder="Search items..."
              className="outline-none"
              onChange={handelSearch}
            />
            <Search size={20} />
          </button>

          <Link
            to="/cart"
            className={`relative flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-500 border ${
              isActive("/cart")
                ? "bg-[#103639] border-[#103639] text-white shadow-xl shadow-[#103639]/20"
                : "bg-transparent border-gray-100 text-[#050515] hover:border-[#103639]"
            }`}
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            {cartItems.length > 0 && (
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black shadow-sm ${
                  isActive("/cart")
                    ? "bg-white text-[#103639]"
                    : "bg-[#050515] text-white"
                }`}
              >
                {cartItems.length}
              </span>
            )}
          </Link>

          <div className="h-8 w-[1px] bg-gray-100 mx-1 hidden lg:block" />

          {/* User Section */}
          <button className="hidden lg:flex items-center gap-3 p-1 pr-4 bg-gray-50 rounded-full border border-gray-100 hover:border-[#103639] transition-all group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#103639] group-hover:text-white transition-colors">
              <User size={14} />
            </div>
            <span className="text-[10px] font-bold text-[#050515] uppercase tracking-wider">
              Portal
            </span>
          </button>

          <button className="p-2.5 text-gray-400 hover:text-[#050515] lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
