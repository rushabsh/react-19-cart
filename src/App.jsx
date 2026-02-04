import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Todo from "./components/todo";
import Notes from "./components/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
