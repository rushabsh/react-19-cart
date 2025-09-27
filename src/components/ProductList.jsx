import { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ShopCart/productSlice";
import { addToCart } from "../features/ShopCart/cartSlice";

const ProductList = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status]);

  if (status === "loading")
    return <p className="text-center py-8 text-lg font-medium">Loading Products...</p>;
  if (status === "failed")
    return <p className="text-center py-8 text-lg font-medium text-red-600">Failed To Load Data. Please Try Again...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-contain mb-4"
              />
              <div className="p-4 flex flex-col justify-between">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title.length > 20
                    ? `${product.title.slice(0, 20)}...`
                    : product.title}
                </h2>
                <p className="text-xl font-bold text-gray-600 mb-4">Price: ${product.price}</p>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-200"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
