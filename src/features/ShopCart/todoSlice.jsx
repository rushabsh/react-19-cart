import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTask(state, action) {
      //   const existing = state.todos.find((todo) => todo == action.payload);
      state.todos.push({
        id: Date.now(),
        task: action.payload,
        completed: false,
      });
    },

    deleteTask(state, action) {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },

  },
});

export const { addTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
