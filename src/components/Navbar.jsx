import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div>
      <nav>
        <h1>Shopping Cart</h1>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/cart"}>Cart({cartItems.length})</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
