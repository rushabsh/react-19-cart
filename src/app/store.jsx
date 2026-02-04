import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/ShopCart/productSlice";
import cartReducer from "../features/ShopCart/cartSlice";
import todoReducer from "../features/ShopCart/todoSlice";
import notesReducer from "../features/ShopCart/noteSlice";

import { saveCartToStorage, saveTaskToStorage } from "../utilities/cartStorage";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    todo: todoReducer,
    notes: notesReducer,
  },
});

store.subscribe(() => {
  const { cart, todo } = store.getState();
  saveCartToStorage(cart.items);
  saveTaskToStorage(todo.todos);
});
