import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  applyTempUpdate,
} from "../features/ShopCart/cartSlice";

const Cart = () => {
  const { items: cartItems, tempItems, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handelApplyUpdates = (id) => {
    dispatch(applyTempUpdate(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Cart Is Empty
          </h2>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Your Cart
          </h2>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 object-contain rounded-md mr-6"
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title.length > 20
                      ? `${item.title.slice(0, 20)}...`
                      : item.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      value={
                        tempItems.find((tempItem) => tempItem.id === item.id)
                          ?.quantity ?? item.quantity
                      }
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 py-2 px-3 border rounded-md text-center text-lg"
                    />
                    <button
                      onClick={() => handelApplyUpdates(item.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handelRemoveItem(item.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => navigate("/")}
            >
              Back to Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
