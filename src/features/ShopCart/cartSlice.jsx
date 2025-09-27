import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Final Cart Item
    tempItems: [], // Temporary Cart Item
    totalPrice: 0,
  },

  reducers: {
    // action Creator
    addToCart(state, actions) {
      const extistingItem = state.items.find(
        (item) => item.id === actions.payload.id
      );
      if (extistingItem) {
        extistingItem.quantity += 1;
      } else {
        state.items.push({ ...actions.payload, quantity: 1 });
      }
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart(state, actions) {
      state.items = state.items.filter((item) => item.id !== actions.payload);
      state.tempItems = [...state.items];
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const tempItem = state.tempItems.find((item) => item.id === id);

      if (tempItem && typeof quantity === "number" && quantity > 0) {
        tempItem.quantity = quantity;
      }
    },

    applyTempUpdate(state, action) {
      const tempItem = state.tempItems.find(
        (item) => item.id === action.payload
      );
      const cartItems = state.items.find((item) => item.id === action.payload);

      if (tempItem && cartItems) {
        cartItems.quantity = tempItem.quantity;
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, applyTempUpdate } =
  cartSlice.actions;
export default cartSlice.reducer;
