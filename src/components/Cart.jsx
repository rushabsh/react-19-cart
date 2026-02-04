import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  ArrowLeft,
  RefreshCw,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import {
  removeFromCart,
  updateQuantity,
  applyTempUpdate,
} from "../features/ShopCart/cartSlice";

const Cart = () => {
  const {
    items: cartItems,
    tempItems,
    totalPrice,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getQty = (item) =>
    tempItems.find((t) => t.id === item.id)?.quantity ?? item.quantity;

  return (
    <div className="min-h-screen bg-[#F6FEFF] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-[#103639] mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Ready to boost your crop yield? Start shopping.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-full bg-[#103639] text-white font-semibold hover:bg-[#050515] transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT: PRODUCT LIST */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-[#103639] tracking-tight">
                  Shopping Cart
                </h1>
                <p className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                  {cartItems.length} Items Selected
                </p>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-transparent hover:border-indigo-100 transition-all"
                  >
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 p-2 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:justify-between mb-2">
                        <h3 className="font-bold text-[#103639] text-lg">
                          {item.title.length > 50
                            ? item.title.slice(0, 50) + "..."
                            : item.title}
                        </h3>
                        <span className="font-bold text-gray-900 mt-1 md:mt-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                        {/* Custom Qty Control */}
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                          <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition text-gray-500"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, getQty(item) - 1),
                                })
                              )
                            }
                          >
                            −
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-[#103639]">
                            {getQty(item)}
                          </span>
                          <button
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition text-gray-500"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: getQty(item) + 1,
                                })
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => dispatch(applyTempUpdate(item.id))}
                            className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                            title="Apply Changes"
                          >
                            <RefreshCw size={16} />
                          </button>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Remove Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: PREMIUM SUMMARY CARD */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#103639] to-[#050515] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Shipping</span>
                    <span className="text-green-400 font-bold uppercase text-xs">
                      Free
                    </span>
                  </div>
                  <div className="pt-6 mt-2 border-t border-white/10 flex justify-between items-end">
                    <span className="text-gray-300 font-medium">
                      Grand Total
                    </span>
                    <span className="text-4xl font-extrabold tracking-tighter">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-white text-[#103639] font-bold hover:bg-[#F6FEFF] transition-all transform active:scale-95 shadow-xl shadow-black/20">
                  Proceed to Checkout
                </button>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest border-t border-white/5 pt-6">
                    <ShieldCheck size={14} className="text-green-400" />
                    <span>Secure Encrypted Checkout</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-[#fff] font-bold hover:underline transition-all"
                >
                  <ArrowLeft size={18} /> Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
