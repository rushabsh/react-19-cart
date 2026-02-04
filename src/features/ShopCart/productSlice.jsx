import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("https://fakestoreapi.com/products/");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    status: "idle",
  },
  reducers: {
    filterProducts: (state, action) => {
      const searchItem = action.payload.toLowerCase();
      console.log("searchItem", searchItem);
      if (!searchItem || searchItem == undefined) {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter((item) =>
          item.title.toLowerCase().includes(searchItem)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { filterProducts } = productSlice.actions;
export default productSlice.reducer;
