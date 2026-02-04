import { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ShopCart/productSlice";
import { addToCart } from "../features/ShopCart/cartSlice";
import { ShoppingCart, AlertCircle } from "lucide-react";

const ProductList = () => {
  const { filteredItems: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  /* --- SKELETON LOADING STATE --- */
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F6FEFF]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="h-64 md:h-96 bg-gray-200/50 animate-pulse rounded-[1.5rem] md:rounded-3xl"
            />
          ))}
        </div>
      </div>
    );
  }

  /* --- ERROR STATE --- */
  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6FEFF] p-6 text-center">
        <div className="bg-red-50 p-6 rounded-[2.5rem] flex flex-col items-center">
            <AlertCircle size={48} className="text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-[#103639]">Connection Issue</h2>
            <p className="text-gray-500 mb-6 max-w-xs">
              We couldn't reach the warehouse. Please check your internet connection.
            </p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="px-8 py-3 bg-[#103639] text-white rounded-2xl font-semibold active:scale-95 transition-transform"
            >
              Try Again
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FEFF]">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#103639] mb-4 md:mb-8 tracking-tight">
          Our Products
        </h1>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Changed grid-cols-1 to grid-cols-2 for better mobile density */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-[#f9f9f9] rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden mb-3 md:mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 md:p-6 transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 md:top-3 md:right-3">
                  <span className="bg-white/90 backdrop-blur-md px-2 md:px-3 py-1 rounded-full text-[8px] md:text-[10px] font-bold text-[#103639] shadow-sm uppercase">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-1">
                <h2 className="text-sm md:text-lg font-bold text-[#103639] leading-tight mb-1 line-clamp-2 min-h-[2.5rem] md:min-h-0">
                  {product.title}
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 md:mt-4 gap-2">
                  <div className="flex flex-col">
                    <span className="hidden md:block text-xs text-gray-400 font-medium">
                      Price
                    </span>
                    <span className="text-lg md:text-2xl font-black text-[#050515]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="flex items-center justify-center w-full sm:w-auto p-3 md:p-4 bg-[#103639] text-white rounded-xl md:rounded-2xl hover:bg-[#050515] transition-all transform active:scale-90 shadow-lg shadow-teal-900/10"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {products.length === 0 && (
            <div className="py-20 text-center">
                <p className="text-gray-400 font-medium">No products found matching your search.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;