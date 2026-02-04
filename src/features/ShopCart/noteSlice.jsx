import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    items: [],
    search: "",
    filterTag: null,
  },
  reducers: {
    addNote(state, action) {
      const { title, content, tags } = action.payload;
      state.items.push({
        id: Date.now(),
        title,
        content,
        tags,
        pinned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    },
    deleteNotes(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { addNote, deleteNotes, setSearch } = noteSlice.actions;
export default noteSlice.reducer;
