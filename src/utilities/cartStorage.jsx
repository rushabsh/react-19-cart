export const loadCartFromStorag = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load cart from storage", error);
    return [];
  }
};

export const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to storage", error);
  }
};

export const loadTodoFromStorage = () => {
  try {
    const data = localStorage.getItem("todoItems");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load todo from storage", error);
    return [];
  }
};

export const saveTaskToStorage = (task) => {
  try {
    localStorage.setItem("todoItems", JSON.stringify(task));
  } catch (error) {
    console.error("Failed to save todo to storage", error);
  }
};
