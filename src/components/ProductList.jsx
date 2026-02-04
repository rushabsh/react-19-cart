import { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ShopCart/productSlice";
import { addToCart } from "../features/ShopCart/cartSlice";
import { ShoppingCart, AlertCircle } from "lucide-react";

const ProductList = () => {
  const {
    filteredItems: products,
    status,
  } = useSelector((state) => state.products);
  console.log(useSelector((state) => state.products.filteredItems));
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
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-96 bg-gray-200/50 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      </div>
    );
  }

  /* --- ERROR STATE --- */
  if (status === "failed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6FEFF] p-6">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-[#103639]">Connection Issue</h2>
        <p className="text-gray-500 mb-6 text-center">
          We couldn't reach the warehouse. Please check your connection.
        </p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="px-6 py-2 bg-[#103639] text-white rounded-full font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6FEFF]">
      <Navbar />

      {/* Hero Section / Category Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-4">
        <h1 className="text-4xl font-black text-[#103639] mb-8">
          Our Products
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-transparent hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-[#f9f9f9] rounded-[1.5rem] overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#103639] shadow-sm uppercase">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2">
                <h2 className="text-lg font-bold text-[#103639] leading-tight mb-1 group-hover:text-green-700 transition-colors">
                  {product.title.length > 35
                    ? `${product.title.slice(0, 35)}...`
                    : product.title}
                </h2>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">
                      Price
                    </span>
                    <span className="text-2xl font-black text-[#050515]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="p-4 bg-[#103639] text-white rounded-2xl hover:bg-[#050515] transition-all transform active:scale-90 shadow-lg shadow-teal-900/20"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
